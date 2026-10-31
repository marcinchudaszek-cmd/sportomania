// „Ciekawostka dnia” — codzienne lokalne powiadomienie, tylko w aplikacji na Androidzie.
// Treść powiadomienia ustala się w chwili planowania, dlatego planujemy z góry 30 kolejnych dni
// (każdy z inną ciekawostką) i odświeżamy to okno przy każdym uruchomieniu aplikacji.
// isExactNotification: false — wystarczy powiadomienie „około” wybranej godziny; nie prosimy
// o uprawnienie do dokładnych alarmów (usunięte z manifestu, bo Google Play wymaga dla niego uzasadnienia).
import { Capacitor } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";
import type { Fact } from "../data/facts";

const KEY = "sm_daily";
const BASE_ID = 7000;
const DAYS = 30;

export interface DailySettings {
  enabled: boolean;
  hour: number;
}

export function dailySupported(): boolean {
  return Capacitor.isNativePlatform();
}

export function loadDaily(): DailySettings {
  try {
    return { enabled: false, hour: 9, ...JSON.parse(localStorage.getItem(KEY) ?? "{}") };
  } catch {
    return { enabled: false, hour: 9 };
  }
}

function saveDaily(s: DailySettings) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {}
}

/** Ta sama data daje zawsze tę samą ciekawostkę — po ponownym zaplanowaniu dzień nie zmienia treści,
 *  a baner „Ciekawostka dnia” w aplikacji pokazuje to samo co powiadomienie. */
export function pickDailyFact(date: Date, facts: Fact[]): Fact {
  const n = date.getFullYear() * 372 + date.getMonth() * 31 + date.getDate();
  const hash = Math.imul(n, 2654435761) >>> 0; // rozrzuca kolejne dni po całej bazie
  return facts[hash % facts.length];
}

async function cancelDaily() {
  await LocalNotifications.cancel({
    notifications: Array.from({ length: DAYS }, (_, i) => ({ id: BASE_ID + i })),
  });
}

async function scheduleDaily(facts: Fact[], hour: number, askPermission: boolean): Promise<boolean> {
  let display = (await LocalNotifications.checkPermissions()).display;
  if (display !== "granted" && askPermission) display = (await LocalNotifications.requestPermissions()).display;
  if (display !== "granted") return false;

  await cancelDaily();
  const now = new Date();
  const notifications = [];
  for (let i = 0; i < DAYS; i++) {
    const at = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i, hour, 0, 0);
    if (at <= now) continue;
    const fact = pickDailyFact(at, facts);
    notifications.push({
      id: BASE_ID + i,
      title: "🏆 Ciekawostka dnia",
      body: fact.text,
      largeBody: fact.text,
      schedule: { at },
      isExactNotification: false,
      extra: { factId: fact.id },
    });
  }
  await LocalNotifications.schedule({ notifications });
  return true;
}

/** Włącza/wyłącza powiadomienia. Zwraca faktyczny stan (np. wyłączony, gdy odmówiono zgody). */
export async function setDaily(next: DailySettings, facts: Fact[]): Promise<DailySettings> {
  let result = next;
  if (next.enabled) {
    if (!(await scheduleDaily(facts, next.hour, true))) result = { ...next, enabled: false };
  } else {
    await cancelDaily();
  }
  saveDaily(result);
  return result;
}

/** Przy uruchomieniu: przesuwa 30-dniowe okno do przodu, bez pytania o zgodę. */
export async function refreshDaily(facts: Fact[]): Promise<void> {
  if (!dailySupported()) return;
  const s = loadDaily();
  if (s.enabled) await scheduleDaily(facts, s.hour, false).catch(() => {});
}

/** Dotknięcie powiadomienia — przekazuje id ciekawostki do aplikacji. */
export function onDailyTap(cb: (factId: string) => void): void {
  if (!dailySupported()) return;
  LocalNotifications.addListener("localNotificationActionPerformed", (action) => {
    const id = action.notification.extra?.factId;
    if (typeof id === "string") cb(id);
  });
}
