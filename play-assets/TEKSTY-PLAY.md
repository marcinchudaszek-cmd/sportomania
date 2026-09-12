# SportoMania — materiały do Play Console

Pakiet: **com.beagleappsstudio.sportomania**
versionCode 1 · versionName 1.0
Plik do wysłania: `android/app/build/outputs/bundle/release/app-release.aab`

---

## Nazwa aplikacji (max 30 znaków)

```
SportoMania
```

## Krótki opis (max 80 znaków)

```
1560 ciekawostek o historii sportu, sportowe rocznice dnia, quiz i oś czasu.
```

## Pełny opis (max 4000 znaków)

```
SportoMania to kieszonkowa encyklopedia historii sportu — 1560 starannie
napisanych ciekawostek z 111 dyscyplin, od igrzysk w starożytnej Olimpii
do rekordów sprzed kilku miesięcy.

CO ZNAJDZIESZ W APLIKACJI

Losowanie bez powtórek
Jedno naciśnięcie i masz nową ciekawostkę. Aplikacja pamięta, co już widziałeś,
więc te same historie nie wracają po kilku dniach.

W tym dniu w historii sportu
Codziennie aktualizowana lista sportowych rocznic: wydarzenia, urodzeni i zmarli
danego dnia. Dane pobierane na bieżąco z polskiej Wikipedii.

Silny akcent polski
Sześć osobnych kategorii poświęconych naszemu sportowi: Polski sport, Polska na
igrzyskach, Polska na mundialach, Polska na Euro, Polskie kluby i areny, Polskie
pierwszyzny, a do tego sport w PRL i 18 polskich legend.

Oś czasu
Historia sportu ułożona chronologicznie — od antyku do dziś, dekada po dekadzie.

Quiz w dwóch trybach
Zgadnij kategorię albo rok wydarzenia. Wyniki i serie poprawnych odpowiedzi
zapisują się na urządzeniu.

Legendy sportu
39 sylwetek zawodników, którzy zmienili swoje dyscypliny — z osiągnięciami
i krótkimi biografiami.

Osiągnięcia i ulubione
Odznaki za czytanie, serie dni i quizy. Ciekawostki, które najbardziej Ci się
spodobały, zapisujesz do ulubionych.

Własne ciekawostki
Możesz dopisać swoje fakty i mieć je w tej samej puli losowania.

DYSCYPLINY

Piłka nożna, mundiale i Euro, igrzyska letnie i zimowe, lekkoatletyka, tenis,
koszykówka, siatkówka, piłka ręczna, hokej, motorsport, sporty walki, skoki
narciarskie, kolarstwo, pływanie, szachy, e-sport, rugby, jeździectwo,
gimnastyka, sporty ekstremalne i dziesiątki innych — łącznie 111 kategorii.

BEZ KONTA, BEZ REKLAM, BEZ ZBIERANIA DANYCH

Nie musisz się rejestrować. Aplikacja nie wyświetla reklam, nie zbiera danych
osobowych i nie wysyła niczego o Tobie. Wszystko poza zakładką „W tym dniu"
działa bez internetu.

Historia sportu bez granic.
```

## Kategoria

Sport (alternatywnie: Edukacja)

## Tagi / słowa kluczowe

historia sportu, ciekawostki, mundial, igrzyska olimpijskie, quiz sportowy,
rocznice, polski sport, legendy sportu

## Adres kontaktowy

```
beagleappsstudio@gmail.com
```

## Polityka prywatności

Opublikowana i sprawdzona (HTTP 200):

```
https://marcinchudaszek-cmd.github.io/sportomania-privacy/
```

Źródło: repo `marcinchudaszek-cmd/sportomania-privacy`, kopia w
`play-assets/privacy/index.html`.

---

## Formularz bezpieczeństwa danych

| Pytanie | Odpowiedź |
|---|---|
| Czy aplikacja zbiera lub udostępnia dane użytkownika? | **Nie** |
| Czy dane są szyfrowane w tranzycie? | Tak (połączenie z Wikipedią po HTTPS) |
| Czy użytkownik może zażądać usunięcia danych? | Nie dotyczy — dane są tylko na urządzeniu |

Uzasadnienie do formularza: aplikacja zapisuje ulubione, historię losowania,
postęp quizu i osiągnięcia wyłącznie w pamięci urządzenia (localStorage).
Nic nie jest przesyłane na serwery. Jedyne połączenie wychodzące to zapytanie
do publicznego API Wikipedii o stronę danego dnia kalendarza — bez żadnych
identyfikatorów użytkownika.

## Uprawnienia w manifeście

Jedno: `android.permission.INTERNET` — potrzebne do zakładki „W tym dniu".
Brak uprawnień wrażliwych (mikrofon, lokalizacja, pliki, kontakty).

## Dostęp do aplikacji (dla recenzenta)

Aplikacja nie ma logowania ani funkcji wymagających klucza API użytkownika.
Wszystkie ekrany są dostępne od razu po uruchomieniu. W polu „Dostęp do
aplikacji" wybierz: **cała zawartość dostępna bez ograniczeń**.

## Ocena treści

Treści edukacyjne, bez przemocy, hazardu i zakupów. Spodziewana kategoria: 3+.

---

## Lista kontrolna przed wysyłką

- [x] applicationId: com.beagleappsstudio.sportomania
- [x] AAB podpisany kluczem przesyłania, którego oczekuje Play:
      SHA1 F0:BB:CC:B4:22:B3:91:F9:CE:75:48:D9:22:E2:57:1C:AF:EF:B2:FB
      (alias `key0`, ten sam co CiekawostkoMania; lokalnie `android/beagleapps-upload.jks`)
- [x] versionCode 1 — pierwsze wydanie
- [x] wszystkie 7 zrzutów 1080×1920, proporcja dokładnie 9:16 (Play przyjmuje od 9:16 do 16:9 — 1:2 odrzuca)
- [x] ikona 512×512 bez kanału alfa, grafika promocyjna 1024×500
- [x] adres kontaktowy to beagleappsstudio@gmail.com
- [x] uprawnienia w manifeście = uprawnienia opisane w formularzu
- [x] polityka prywatności opublikowana pod publicznym adresem
- [ ] kopia zapasowa `android/beagleapps-upload.jks` i `android/keystore.properties`
      poza tym dyskiem (bez nich nie da się wydać żadnej aktualizacji).
      Nieużywany `android/release.keystore` można zostawić albo usunąć — Play
      go nie zna, bo pierwszy wysłany pakiet był podpisany kluczem `key0`.
