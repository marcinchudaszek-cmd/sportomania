# SportoMania — Historia sportu

Ponad **1500 ciekawostek** ze **111 dyscyplin**, od piłki nożnej i olimpiad po Formułę 1.
Wersja webowa: **https://beagleapps.pl/apps/sportomania/**
APK: **https://beagleapps.pl/apk/sportomania.apk**

## Co jest w środku

| Ekran | Do czego |
|---|---|
| **Losowa** | ciekawostka na chybił trafił |
| **W tym dniu** | sportowe rocznice dzisiejszej daty |
| **Oś czasu** | fakty ułożone chronologicznie |
| **Przeglądaj** | filtrowanie po dyscyplinie |
| **Quiz** | tryb pytań ze wszystkich kategorii |
| **Legendy** | 40 sylwetek zawodników |
| **Ulubione** | własna lista zapisanych faktów |
| **Osiągnięcia** | odznaki za korzystanie z aplikacji |

Dane siedzą w `src/data/facts.ts` (ok. 420 KB) i `src/data/legends.ts` — bez backendu,
wszystko działa offline.

## Uruchomienie

```bash
npm install
npm run dev          # podgląd na porcie 5200
npm run build        # dist/index.html — jeden plik na stronę
npm run build:cap    # dist-cap/ — warstwa web dla Androida
npm run cap:android  # otwiera projekt w Android Studio
```

## Android

Capacitor, `applicationId` **com.sportomania.app**.

```bash
npm run build:cap && npx cap copy android
cd android && ./gradlew.bat assembleDebug --no-daemon
```

Gradle potrafi zakończyć się `BUILD SUCCESSFUL` bez nowego pliku (`UP-TO-DATE`),
więc przed wysyłką warto sprawdzić datę i zawartość APK, a nie sam komunikat.

## Dlaczego single-file na stronie

`vite.config.ts` używa `vite-plugin-singlefile`, więc wersja webowa to jeden plik HTML
z wbudowanym JS i CSS — wystarczy skopiować go do `apps/sportomania/` w repo strony.
Build androidowy (`vite.cap.config.ts`) jest zwykły, wieloplikowy.
