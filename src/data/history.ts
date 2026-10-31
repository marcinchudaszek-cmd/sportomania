// Historia dyscyplin — dłuższe rozdziały, w przeciwieństwie do pojedynczych ciekawostek.
// Na początek Polska; pole `region` pozwala dołożyć historię światową bez przebudowy widoku.

export interface HistoryEra {
  years: string;
  title: string;
  text: string;
}

export interface HistoryMilestone {
  year: number;
  title: string;
  text: string;
}

export interface SportHistory {
  id: string;
  region: "pl" | "world";
  title: string;
  emoji: string;
  color: string; // gradient Tailwinda, jak w CATEGORIES
  categories: string[]; // powiązane kategorie ciekawostek z facts.ts
  lead: string;
  eras: HistoryEra[];
  milestones: HistoryMilestone[];
  legends: string[];
}

export const HISTORY_REGIONS = [
  { id: "pl", label: "Polska", emoji: "🇵🇱" },
  { id: "world", label: "Świat", emoji: "🌍" },
] as const;

export const SPORT_HISTORIES: SportHistory[] = [
  {
    id: "pl-volleyball",
    region: "pl",
    title: "Polska siatkówka",
    emoji: "🏐",
    color: "from-sky-500 to-blue-700",
    categories: ["volleyball", "polandclubs"],
    lead: "Siatkówka dotarła do Polski po I wojnie światowej i w ciągu stulecia przeszła drogę od szkolnych sal gimnastycznych do światowej czołówki. Dziś reprezentacja mężczyzn należy do najlepszych na świecie, a mecze kadry wypełniają największe hale i stadiony w kraju.",
    eras: [
      {
        years: "1919–1945",
        title: "Gra z sal gimnastycznych",
        text: "Siatkówkę przywieźli do Polski instruktorzy amerykańskiej organizacji YMCA, którzy po I wojnie światowej pomagali odbudowywać kraj. Gra szybko przyjęła się w szkołach i wojsku, bo wymagała tylko siatki, piłki i kawałka sali. W latach 20. rozegrano pierwsze mistrzostwa Polski.",
      },
      {
        years: "1946–1972",
        title: "Najpierw kobiety",
        text: "W 1947 roku Polska była jednym z krajów założycielskich światowej federacji siatkówki (FIVB). Pierwsze wielkie sukcesy przyniosły kobiety: polskie siatkarki zdobyły brązowe medale olimpijskie w Tokio 1964 i Meksyku 1968. Mężczyźni długo pozostawali w cieniu potęg z ZSRR, Czechosłowacji i Japonii.",
      },
      {
        years: "1973–1980",
        title: "Era Wagnera",
        text: "W 1973 roku kadrę objął Hubert Wagner, nazywany „Katem” za mordercze treningi. W ciągu trzech lat zbudował drużynę, która w 1974 roku zdobyła mistrzostwo świata w Meksyku, a w 1976 roku złoto olimpijskie w Montrealu — po pięciosetowym finale z ZSRR. Wielu kibiców do dziś uważa ten zespół za najlepszy w historii polskiego sportu drużynowego.",
      },
      {
        years: "1981–2013",
        title: "Długi powrót",
        text: "Po latach Wagnera przyszła długa przerwa w sukcesach mężczyzn. Kibiców porwały wtedy kobiety: „Złotka” Andrzeja Niemczyka wygrały mistrzostwa Europy w 2003 i 2005 roku. Mężczyźni wrócili na podium mistrzostw świata w 2006 roku (srebro w Japonii), a w 2009 roku zostali mistrzami Europy.",
      },
      {
        years: "2014–dziś",
        title: "Złota era",
        text: "Mistrzostwa świata w 2014 roku Polska zorganizowała u siebie i je wygrała, a cztery lata później obroniła tytuł. Przyszły kolejne medale: mistrzostwo Europy i Ligi Narodów w 2023 roku oraz srebro olimpijskie w Paryżu 2024 — pierwszy medal igrzysk od 48 lat. W tym samym czasie ZAKSA Kędzierzyn-Koźle trzy razy z rzędu wygrała Ligę Mistrzów.",
      },
    ],
    milestones: [
      { year: 1947, title: "Współzałożyciel FIVB", text: "Polska znalazła się wśród krajów, które w Paryżu założyły światową federację siatkówki." },
      { year: 1964, title: "Pierwszy medal olimpijski", text: "Siatkarki zdobyły brąz w Tokio — w pierwszym w historii olimpijskim turnieju siatkówki. Cztery lata później powtórzyły ten wynik." },
      { year: 1974, title: "Mistrzostwo świata", text: "Drużyna Huberta Wagnera wygrała mistrzostwa świata w Meksyku." },
      { year: 1976, title: "Złoto w Montrealu", text: "Finał olimpijski z ZSRR Polacy wygrali 3:2 po dramatycznym, pięciosetowym meczu." },
      { year: 2003, title: "„Złotka” mistrzyniami Europy", text: "Siatkarki Andrzeja Niemczyka wygrały mistrzostwa Europy, a w 2005 roku obroniły tytuł." },
      { year: 2009, title: "Mistrzowie Europy", text: "Mężczyźni po raz pierwszy w historii wygrali mistrzostwa Europy — w tureckim Izmirze." },
      { year: 2014, title: "Mistrzostwo świata u siebie", text: "Turniej rozpoczęty meczem na Stadionie Narodowym zakończył się złotem Polaków w katowickim Spodku." },
      { year: 2018, title: "Obrona tytułu", text: "Polacy jako jedna z nielicznych drużyn w historii obronili mistrzostwo świata." },
      { year: 2023, title: "Rok kompletu", text: "Reprezentacja wygrała Ligę Narodów i mistrzostwa Europy." },
      { year: 2024, title: "Srebro w Paryżu", text: "Pierwszy olimpijski medal siatkarzy od złota w Montrealu — po 48 latach." },
    ],
    legends: ["Hubert Wagner", "Tomasz Wójtowicz", "Edward Skorek", "Małgorzata Glinka", "Bartosz Kurek", "Michał Kubiak", "Wilfredo León"],
  },
  {
    id: "pl-football",
    region: "pl",
    title: "Polska piłka nożna",
    emoji: "⚽",
    color: "from-red-600 to-rose-800",
    categories: ["polandwc", "polandeuro", "polandclubs"],
    lead: "Futbol trafił na ziemie polskie jeszcze pod zaborami, a niepodległa Polska od razu stworzyła własny związek i reprezentację. Najwspanialsze lata przyszły w latach 70., gdy „Orły Górskiego” należały do najlepszych drużyn świata.",
    eras: [
      {
        years: "1894–1939",
        title: "Pod zaborami i w II RP",
        text: "Za pierwszy mecz piłkarski na ziemiach polskich uchodzi pokaz rozegrany we Lwowie w 1894 roku. Na przełomie wieków powstały pierwsze kluby, m.in. Cracovia i Wisła Kraków. W 1919 roku założono Polski Związek Piłki Nożnej, a dwa lata później reprezentacja rozegrała pierwszy mecz — z Węgrami w Budapeszcie. W 1938 roku Polska zadebiutowała na mundialu, przegrywając z Brazylią 5:6 po dogrywce.",
      },
      {
        years: "1945–1970",
        title: "Odbudowa",
        text: "Po wojnie futbol odbudowywano w nowych granicach, a kluby przypisano do resortów i zakładów pracy. Potęgą stał się Górnik Zabrze z Włodzimierzem Lubańskim — w 1970 roku jako jedyny polski klub zagrał w finale europejskiego pucharu.",
      },
      {
        years: "1971–1986",
        title: "Złota era",
        text: "Kazimierz Górski zbudował drużynę, która w 1972 roku zdobyła złoto olimpijskie w Monachium, a w 1973 roku remisem na Wembley wyeliminowała Anglię. Na mundialu 1974 Polska zajęła trzecie miejsce, a Grzegorz Lato został królem strzelców. Osiem lat później, pod wodzą Antoniego Piechniczka, Polacy znów stanęli na podium mistrzostw świata.",
      },
      {
        years: "1987–2005",
        title: "Lata posuchy",
        text: "Po 1986 roku reprezentacja na 16 lat zniknęła z mundiali. Jaśniejszym punktem było srebro olimpijskie drużyny Janusza Wójcika w Barcelonie 1992. Na mistrzostwa świata Polska wróciła w 2002 roku dzięki golom Emmanuela Olisadebe.",
      },
      {
        years: "2006–dziś",
        title: "Epoka Lewandowskiego",
        text: "W 2008 roku Polska po raz pierwszy zagrała na mistrzostwach Europy, a w 2012 roku współorganizowała je z Ukrainą. Najlepszym wynikiem tego okresu był ćwierćfinał Euro 2016. Liderem kadry na ponad dekadę stał się Robert Lewandowski, najlepszy strzelec w jej historii.",
      },
    ],
    milestones: [
      { year: 1894, title: "Pierwszy mecz", text: "We Lwowie rozegrano pokaz uznawany za pierwszy mecz piłkarski na ziemiach polskich." },
      { year: 1919, title: "Powstaje PZPN", text: "Założono Polski Związek Piłki Nożnej." },
      { year: 1921, title: "Debiut reprezentacji", text: "W Budapeszcie Polska przegrała z Węgrami 0:1." },
      { year: 1938, title: "Pierwszy mundial", text: "Mecz z Brazylią zakończył się porażką 5:6, a Ernest Wilimowski strzelił cztery gole." },
      { year: 1972, title: "Złoto olimpijskie", text: "W finale w Monachium Polska pokonała Węgry 2:1." },
      { year: 1973, title: "Wembley", text: "Remis 1:1 z Anglią dał awans na mundial; Jan Tomaszewski bronił wszystko." },
      { year: 1974, title: "Trzecie miejsce na świecie", text: "Polska pokonała w meczu o brąz Brazylię, a Lato strzelił siedem goli." },
      { year: 1982, title: "Znów na podium", text: "Drużyna Antoniego Piechniczka zajęła trzecie miejsce na mundialu w Hiszpanii." },
      { year: 1992, title: "Srebro w Barcelonie", text: "Olimpijska drużyna przegrała dopiero w finale z gospodarzami." },
      { year: 2016, title: "Ćwierćfinał Euro", text: "Najlepszy wynik Polski w mistrzostwach Europy — porażka dopiero w karnych z Portugalią." },
      { year: 2022, title: "Wyjście z grupy", text: "Pierwszy od 36 lat awans z grupy mistrzostw świata." },
    ],
    legends: ["Ernest Wilimowski", "Kazimierz Górski", "Włodzimierz Lubański", "Kazimierz Deyna", "Grzegorz Lato", "Zbigniew Boniek", "Robert Lewandowski"],
  },
  {
    id: "pl-skijumping",
    region: "pl",
    title: "Polskie skoki narciarskie",
    emoji: "🎿",
    color: "from-sky-400 to-indigo-700",
    categories: ["skijumping", "winter"],
    lead: "Skoki narciarskie to w Polsce coś więcej niż sport — w zimowe weekendy przed telewizorami zasiadają miliony widzów. Ta pasja ma ponad stuletnie korzenie w Zakopanem, ale prawdziwy boom przyszedł wraz z Adamem Małyszem.",
    eras: [
      {
        years: "1907–1939",
        title: "Zakopiańskie korzenie",
        text: "Na początku XX wieku w Zakopanem powstawały pierwsze skocznie, a w 1919 roku założono Polski Związek Narciarski. W 1925 roku otwarto Wielką Krokiew, która do dziś jest sercem polskich skoków. Największą gwiazdą tamtych lat był Stanisław Marusarz, wicemistrz świata z 1938 roku.",
      },
      {
        years: "1939–1971",
        title: "Wojna i powojnie",
        text: "W czasie wojny polscy narciarze byli kurierami między okupowanym krajem a Węgrami. Bronisław Czech zginął w Auschwitz, a Marusarz uciekł z więzienia przed wykonaniem wyroku. Po wojnie Zakopane organizowało wielkie zawody, w tym mistrzostwa świata w 1962 roku.",
      },
      {
        years: "1972–1999",
        title: "Fortuna i długa przerwa",
        text: "W 1972 roku w Sapporo Wojciech Fortuna zdobył pierwsze w historii złoto zimowych igrzysk dla Polski. Piotr Fijas w 1987 roku ustanowił rekord świata w lotach narciarskich. Potem przyszły lata, w których polscy skoczkowie rzadko liczyli się w walce o czołowe miejsca.",
      },
      {
        years: "2000–2011",
        title: "Małyszomania",
        text: "Sezon 2000/01 zmienił wszystko: Adam Małysz wygrał Turniej Czterech Skoczni i Puchar Świata, a skoki stały się sportem narodowym. Małysz zdobył cztery Kryształowe Kule, cztery tytuły mistrza świata i cztery medale olimpijskie. Na jego konkursy jeździły tysiące kibiców z biało-czerwonymi flagami.",
      },
      {
        years: "2012–dziś",
        title: "Pokolenie Stocha",
        text: "Następcą Małysza został Kamil Stoch — trzykrotny mistrz olimpijski i trzykrotny zwycięzca Turnieju Czterech Skoczni. Obok niego sukcesy odnosili Dawid Kubacki i Piotr Żyła, a polska drużyna w 2017 roku po raz pierwszy została mistrzem świata.",
      },
    ],
    milestones: [
      { year: 1919, title: "Powstaje PZN", text: "Założono Polski Związek Narciarski." },
      { year: 1925, title: "Wielka Krokiew", text: "W Zakopanem otwarto skocznię, która stała się symbolem polskich skoków." },
      { year: 1938, title: "Srebro Marusarza", text: "Stanisław Marusarz został wicemistrzem świata w fińskim Lahti." },
      { year: 1972, title: "Złoto Fortuny", text: "Pierwsze złoto zimowych igrzysk dla Polski — w Sapporo." },
      { year: 1987, title: "Rekord świata Fijasa", text: "Piotr Fijas poleciał w Planicy na 194 metry." },
      { year: 2001, title: "Początek Małyszomanii", text: "Małysz wygrał Turniej Czterech Skoczni i pierwszy Puchar Świata." },
      { year: 2014, title: "Podwójne złoto Stocha", text: "W Soczi Kamil Stoch wygrał oba konkursy indywidualne." },
      { year: 2017, title: "Drużynowi mistrzowie świata", text: "Polscy skoczkowie po raz pierwszy wygrali konkurs drużynowy mistrzostw świata." },
      { year: 2018, title: "Wielki Szlem Stocha", text: "Stoch wygrał wszystkie cztery konkursy Turnieju Czterech Skoczni, a kilka tygodni później obronił złoto olimpijskie." },
      { year: 2020, title: "Turniej dla Kubackiego", text: "Dawid Kubacki wygrał Turniej Czterech Skoczni." },
    ],
    legends: ["Stanisław Marusarz", "Wojciech Fortuna", "Adam Małysz", "Kamil Stoch", "Dawid Kubacki", "Piotr Żyła"],
  },
  {
    id: "pl-athletics",
    region: "pl",
    title: "Polska lekkoatletyka",
    emoji: "🏃",
    color: "from-orange-500 to-red-600",
    categories: ["athletics", "polandgames"],
    lead: "Lekkoatletyka przyniosła Polsce więcej medali olimpijskich niż jakakolwiek inna dyscyplina. Od pierwszego złota Haliny Konopackiej po rzuty młotem Anity Włodarczyk — to historia, w której niemal każde pokolenie miało swoich mistrzów.",
    eras: [
      {
        years: "1919–1939",
        title: "Pierwsze złota",
        text: "Polski Związek Lekkiej Atletyki powstał zaraz po odzyskaniu niepodległości. W 1928 roku Halina Konopacka wygrała rzut dyskiem w Amsterdamie i zdobyła pierwsze olimpijskie złoto dla Polski. Cztery lata później w Los Angeles złoto zdobyli Janusz Kusociński na 10 000 m i Stanisława Walasiewicz na 100 m.",
      },
      {
        years: "1950–1969",
        title: "Wunderteam",
        text: "Polskich lekkoatletów przełomu lat 50. i 60. nazywano „Wunderteamem”. Elżbieta Krzesińska wygrała skok w dal w Melbourne 1956, Zdzisław Krzyszkowiak bieg z przeszkodami w Rzymie 1960, a Józef Szmidt dwukrotnie triumfował w trójskoku. W 1964 roku zadebiutowała na igrzyskach Irena Szewińska.",
      },
      {
        years: "1970–1989",
        title: "Szewińska, Kozakiewicz, Malinowski",
        text: "Irena Szewińska zdobywała medale na czterech igrzyskach z rzędu, a w 1976 roku wygrała bieg na 400 m z rekordem świata. W tym samym roku złoto zdobyli tyczkarz Tadeusz Ślusarski i skoczek wzwyż Jacek Wszoła. W Moskwie 1980 Władysław Kozakiewicz wygrał skok o tyczce, a Bronisław Malinowski — bieg z przeszkodami.",
      },
      {
        years: "1990–2012",
        title: "Chód i rzuty",
        text: "Robert Korzeniowski zdobył cztery złota olimpijskie w chodzie, w tym unikatowy dublet 20 i 50 km w Sydney 2000. W tych samych igrzyskach 17-letnia Kamila Skolimowska wygrała rzut młotem. Tomasz Majewski dwukrotnie został mistrzem olimpijskim w pchnięciu kulą (2008, 2012).",
      },
      {
        years: "2013–dziś",
        title: "Potęga młociarzy",
        text: "Anita Włodarczyk zdobyła trzy złota olimpijskie i wielokrotnie biła rekord świata w rzucie młotem. W Tokio 2020 złoto zdobył też Wojciech Nowicki, a Paweł Fajdek pięć razy został mistrzem świata. W Tokio Polska wygrała również debiutującą na igrzyskach sztafetę mieszaną 4×400 m.",
      },
    ],
    milestones: [
      { year: 1928, title: "Pierwsze złoto Polski", text: "Halina Konopacka wygrała rzut dyskiem w Amsterdamie." },
      { year: 1932, title: "Kusociński i Walasiewicz", text: "Dwa złote medale w biegach na igrzyskach w Los Angeles." },
      { year: 1956, title: "Złoto Krzesińskiej", text: "Elżbieta Krzesińska wygrała skok w dal w Melbourne." },
      { year: 1960, title: "Krzyszkowiak i Szmidt", text: "W Rzymie złoto zdobyli przeszkodowiec i trójskoczek; Szmidt obronił tytuł cztery lata później." },
      { year: 1976, title: "Rekord świata Szewińskiej", text: "Irena Szewińska wygrała w Montrealu bieg na 400 m." },
      { year: 1980, title: "Gest Kozakiewicza", text: "Złoto i słynny gest wobec gwiżdżącej moskiewskiej publiczności." },
      { year: 2000, title: "Dublet Korzeniowskiego", text: "W Sydney Robert Korzeniowski wygrał chód na 20 i 50 km." },
      { year: 2008, title: "Złoto Majewskiego", text: "Tomasz Majewski wygrał pchnięcie kulą w Pekinie, a w Londynie obronił tytuł." },
      { year: 2016, title: "Rekord świata Włodarczyk", text: "Anita Włodarczyk wygrała w Rio i ustanowiła rekord świata w rzucie młotem." },
      { year: 2021, title: "Tokio 2020", text: "Złota Włodarczyk, Nowickiego i sztafety mieszanej 4×400 m." },
    ],
    legends: ["Halina Konopacka", "Janusz Kusociński", "Irena Szewińska", "Bronisław Malinowski", "Robert Korzeniowski", "Tomasz Majewski", "Anita Włodarczyk"],
  },
  {
    id: "pl-speedway",
    region: "pl",
    title: "Polski żużel",
    emoji: "🏍️",
    color: "from-stone-500 to-orange-800",
    categories: ["motorsport", "polandclubs"],
    lead: "Polska jest dziś światową stolicą żużla — ma najsilniejszą ligę świata, a na mecze przychodzą tysiące kibiców nawet w niewielkich miastach. Najlepsi zawodnicy z całego globu marzą o kontrakcie w polskim klubie.",
    eras: [
      {
        years: "1930–1947",
        title: "Pierwsze tory",
        text: "Wyścigi motocyklowe na torach żużlowych pojawiły się w Polsce w okresie międzywojennym, choć były wtedy jeszcze egzotyką. Prawdziwy rozwój przyszedł dopiero po II wojnie światowej, gdy żużel stał się jedną z najtańszych form sportu motorowego.",
      },
      {
        years: "1948–1972",
        title: "Liga i pierwsze tytuły",
        text: "W 1948 roku ruszyły rozgrywki ligowe, a żużel szybko zyskał rzesze kibiców, zwłaszcza w Wielkopolsce, na Śląsku i Pomorzu. Legendą lat powojennych był Alfred Smoczyk, który zginął w wypadku w 1950 roku. W latach 60. reprezentacja Polski czterokrotnie wygrała drużynowe mistrzostwa świata.",
      },
      {
        years: "1973–1999",
        title: "Szczakiel i długie czekanie",
        text: "W 1973 roku na Stadionie Śląskim Jerzy Szczakiel sensacyjnie został pierwszym polskim indywidualnym mistrzem świata. Na kolejny taki tytuł trzeba było czekać 37 lat. W latach 90. polska liga otworzyła się na zawodników zagranicznych i zaczęła przyciągać światowe gwiazdy.",
      },
      {
        years: "2000–dziś",
        title: "Światowa potęga",
        text: "Polska wielokrotnie wygrywała w XXI wieku drużynowe zawody o mistrzostwo świata, a Tomasz Gollob, przez lata najlepszy polski żużlowiec, w 2010 roku zdobył wreszcie indywidualne mistrzostwo świata. Jego następcą został Bartosz Zmarzlik, który w latach 2019–2024 zdobył pięć tytułów mistrza świata.",
      },
    ],
    milestones: [
      { year: 1948, title: "Rusza liga", text: "Rozegrano pierwszy sezon polskiej ligi żużlowej." },
      { year: 1961, title: "Drużynowe mistrzostwo świata", text: "Polska po raz pierwszy wygrała drużynowe mistrzostwa świata — przed własną publicznością we Wrocławiu." },
      { year: 1973, title: "Szczakiel mistrzem świata", text: "Pierwszy polski indywidualny mistrz świata, wyłoniony po wyścigu dodatkowym w Chorzowie." },
      { year: 2010, title: "Tytuł Golloba", text: "Tomasz Gollob po latach prób został indywidualnym mistrzem świata." },
      { year: 2019, title: "Pierwszy tytuł Zmarzlika", text: "Bartosz Zmarzlik rozpoczął serię mistrzostw świata." },
    ],
    legends: ["Alfred Smoczyk", "Jerzy Szczakiel", "Zenon Plech", "Tomasz Gollob", "Jarosław Hampel", "Bartosz Zmarzlik"],
  },
  {
    id: "pl-boxing",
    region: "pl",
    title: "Polski boks",
    emoji: "🥊",
    color: "from-red-600 to-rose-800",
    categories: ["combat"],
    lead: "„Polska szkoła boksu” Feliksa Stamma była w latach 50. i 60. jedną z najsilniejszych na świecie. Później, po latach amatorskiej świetności, polscy pięściarze zaczęli zdobywać pasy mistrzów świata na zawodowych ringach.",
    eras: [
      {
        years: "1923–1939",
        title: "Narodziny dyscypliny",
        text: "W 1923 roku powstał Polski Związek Bokserski. W latach 30. kadrę objął Feliks Stamm, trener, który przez kolejne dekady miał wychować pokolenia medalistów. Jeszcze przed wojną Polacy zaczęli zdobywać medale mistrzostw Europy.",
      },
      {
        years: "1945–1976",
        title: "Szkoła Stamma",
        text: "Po wojnie Stamm stworzył styl oparty na technice, szybkości i inteligencji w ringu. W 1953 roku na mistrzostwach Europy w Warszawie Polacy zdobyli pięć złotych medali. Na igrzyskach w Tokio 1964 złoto zdobyli Józef Grudzień, Jerzy Kulej i Marian Kasprzyk, a Kulej w 1968 roku obronił tytuł.",
      },
      {
        years: "1977–1999",
        title: "Od ringu amatorskiego do zawodowego",
        text: "Po odejściu Stamma sukcesy amatorów stawały się coraz rzadsze. Po 1989 roku polscy pięściarze zaczęli przechodzić na zawodowstwo. Dariusz Michalczewski przez dekadę bronił pasa wagi półciężkiej, a Andrzej Gołota stoczył głośne walki o najwyższą stawkę w wadze ciężkiej.",
      },
      {
        years: "2000–dziś",
        title: "Pasy i powrót medali",
        text: "Tomasz Adamek zdobył tytuły mistrza świata w dwóch kategoriach wagowych, a Krzysztof Głowacki w 2015 roku odebrał pas WBO w wadze junior ciężkiej. Na igrzyskach w Paryżu 2024 Julia Szeremeta wywalczyła srebro — pierwszy polski medal olimpijski w boksie od lat 90.",
      },
    ],
    milestones: [
      { year: 1923, title: "Powstaje związek", text: "Założono Polski Związek Bokserski." },
      { year: 1953, title: "Złota Warszawa", text: "Na mistrzostwach Europy w Warszawie Polacy zdobyli pięć złotych medali." },
      { year: 1964, title: "Trzy złota w Tokio", text: "Mistrzami olimpijskimi zostali Grudzień, Kulej i Kasprzyk." },
      { year: 1968, title: "Kulej znów najlepszy", text: "Jerzy Kulej jako jedyny polski bokser obronił złoto olimpijskie." },
      { year: 2015, title: "Głowacki mistrzem", text: "Krzysztof Głowacki pokonał Marco Hucka i zdobył pas WBO." },
      { year: 2024, title: "Srebro Szeremety", text: "Julia Szeremeta zdobyła w Paryżu pierwszy od dekad polski medal olimpijski w boksie." },
    ],
    legends: ["Feliks Stamm", "Zbigniew Pietrzykowski", "Jerzy Kulej", "Leszek Błażyński", "Dariusz Michalczewski", "Tomasz Adamek", "Julia Szeremeta"],
  },
  {
    id: "pl-cycling",
    region: "pl",
    title: "Polskie kolarstwo",
    emoji: "🚴",
    color: "from-yellow-500 to-amber-600",
    categories: ["cycling", "prl"],
    lead: "Polskie kolarstwo przeszło drogę od wielkich triumfów w Wyścigu Pokoju do zwycięstw w najważniejszych zawodowych wyścigach świata. Dla pokoleń kibiców kolarze byli bohaterami na miarę piłkarzy.",
    eras: [
      {
        years: "1886–1939",
        title: "Cykliści i pierwsze wyścigi",
        text: "W 1886 roku powstało Warszawskie Towarzystwo Cyklistów, jedno z najstarszych polskich stowarzyszeń sportowych. Na igrzyskach w Paryżu 1924 kolarze torowi zdobyli srebro w wyścigu drużynowym — jeden z dwóch pierwszych medali olimpijskich niepodległej Polski. W 1928 roku po raz pierwszy rozegrano Tour de Pologne.",
      },
      {
        years: "1948–1989",
        title: "Era Wyścigu Pokoju",
        text: "Największą kolarską imprezą bloku wschodniego był Wyścig Pokoju na trasie Warszawa–Berlin–Praga. W 1956 roku jako pierwszy Polak wygrał go Stanisław Królak, a Ryszard Szurkowski zwyciężał w nim czterokrotnie i w 1973 roku został amatorskim mistrzem świata. Polska drużyna należała do potęg w jeździe drużynowej na czas.",
      },
      {
        years: "1990–2008",
        title: "Wejście do zawodowego peletonu",
        text: "Po 1989 roku polscy kolarze mogli wreszcie ścigać się w zawodowych grupach. W 1993 roku Zenon Jaskuła zajął trzecie miejsce w Tour de France jako pierwszy Polak na podium tego wyścigu. Czesław Lang przejął organizację Tour de Pologne i wprowadził go do czołówki światowego kalendarza.",
      },
      {
        years: "2009–dziś",
        title: "Mistrzowie świata i Touru",
        text: "Michał Kwiatkowski w 2014 roku został zawodowym mistrzem świata, a później wygrał m.in. Mediolan–San Remo. Rafał Majka dwa razy zdobył koszulkę najlepszego górala Touru, Maja Włoszczowska dwa olimpijskie srebra w kolarstwie górskim, a Katarzyna Niewiadoma w 2024 roku wygrała Tour de France kobiet.",
      },
    ],
    milestones: [
      { year: 1886, title: "Warszawskie Towarzystwo Cyklistów", text: "Jedno z najstarszych stowarzyszeń sportowych na ziemiach polskich." },
      { year: 1928, title: "Pierwszy Tour de Pologne", text: "Rozegrano pierwszą edycję wyścigu dookoła Polski." },
      { year: 1956, title: "Królak wygrywa Wyścig Pokoju", text: "Pierwsze polskie zwycięstwo w największym wyścigu amatorów." },
      { year: 1973, title: "Szurkowski mistrzem świata", text: "Ryszard Szurkowski wygrał amatorskie mistrzostwa świata ze startu wspólnego." },
      { year: 1993, title: "Jaskuła na podium Touru", text: "Trzecie miejsce w Tour de France — pierwszy taki wynik Polaka." },
      { year: 2014, title: "Kwiatkowski mistrzem świata", text: "W hiszpańskiej Ponferradzie Polak wygrał wyścig zawodowców." },
      { year: 2024, title: "Niewiadoma wygrywa Tour", text: "Katarzyna Niewiadoma zwyciężyła w Tour de France Femmes po walce do ostatniego podjazdu." },
    ],
    legends: ["Stanisław Królak", "Ryszard Szurkowski", "Czesław Lang", "Zenon Jaskuła", "Michał Kwiatkowski", "Maja Włoszczowska", "Katarzyna Niewiadoma"],
  },
  {
    id: "pl-tennis",
    region: "pl",
    title: "Polski tenis",
    emoji: "🎾",
    color: "from-lime-500 to-green-600",
    categories: ["tennis"],
    lead: "Przez dziesięciolecia polski tenis miał tylko pojedyncze gwiazdy. W XXI wieku stał się jedną z najpopularniejszych dyscyplin w kraju, a Iga Świątek — najlepszą tenisistką świata.",
    eras: [
      {
        years: "1921–1939",
        title: "Jadwiga Jędrzejowska",
        text: "Polski Związek Lawn Tenisowy powstał w 1921 roku. Największą gwiazdą międzywojnia była Jadwiga Jędrzejowska, która w 1937 roku zagrała w finałach Wimbledonu i mistrzostw USA, a w 1939 roku w finale w Paryżu. W deblu wygrała turniej we francuskiej stolicy.",
      },
      {
        years: "1945–1989",
        title: "Czasy Fibaka",
        text: "W PRL tenis uchodził za sport elitarny i rozwijał się powoli. Wyjątkiem był Wojciech Fibak, który w latach 70. wszedł do światowej dziesiątki, wygrywał turnieje w grze pojedynczej i podwójnej, a w 1976 roku zagrał w finale turnieju Masters.",
      },
      {
        years: "1990–2019",
        title: "Radwańska i debliści",
        text: "Agnieszka Radwańska była przez lata w światowej czołówce: w 2012 roku zagrała w finale Wimbledonu i została wiceliderką rankingu, a w 2015 roku wygrała turniej mistrzyń WTA Finals. Jerzy Janowicz doszedł do półfinału Wimbledonu 2013, a Łukasz Kubot wygrał Wimbledon w deblu w 2017 roku.",
      },
      {
        years: "2020–dziś",
        title: "Era Igi Świątek",
        text: "W 2020 roku 19-letnia Iga Świątek wygrała Roland Garros jako pierwsza osoba z Polski z wielkoszlemowym tytułem w singlu. Potem przyszły kolejne tytuły w Paryżu, US Open 2022 i pozycja liderki rankingu. Równolegle Hubert Hurkacz wszedł do światowej czołówki mężczyzn, a w 2021 roku doszedł do półfinału Wimbledonu.",
      },
    ],
    milestones: [
      { year: 1921, title: "Powstaje związek", text: "Założono Polski Związek Lawn Tenisowy." },
      { year: 1937, title: "Jędrzejowska w finale Wimbledonu", text: "Pierwsza Polka w finale najsłynniejszego turnieju świata." },
      { year: 1976, title: "Fibak w finale Masters", text: "Wojciech Fibak zagrał w finale turnieju najlepszych tenisistów sezonu." },
      { year: 2012, title: "Radwańska w finale Wimbledonu", text: "Agnieszka Radwańska przegrała w trzech setach z Sereną Williams." },
      { year: 2015, title: "Radwańska wygrywa WTA Finals", text: "Największy triumf w karierze Radwańskiej — turniej mistrzyń w Singapurze." },
      { year: 2017, title: "Kubot z Wimbledonem", text: "Łukasz Kubot i Marcelo Melo wygrali Wimbledon w deblu." },
      { year: 2020, title: "Świątek wygrywa Roland Garros", text: "Pierwszy polski tytuł wielkoszlemowy w singlu — bez straty seta." },
      { year: 2022, title: "Liderka rankingu", text: "Iga Świątek została liderką rankingu i wygrała Roland Garros oraz US Open." },
    ],
    legends: ["Jadwiga Jędrzejowska", "Wojciech Fibak", "Agnieszka Radwańska", "Łukasz Kubot", "Hubert Hurkacz", "Iga Świątek"],
  },
  {
    id: "pl-handball",
    region: "pl",
    title: "Polska piłka ręczna",
    emoji: "🤾",
    color: "from-indigo-500 to-blue-700",
    categories: ["handball", "polandclubs"],
    lead: "W Polsce piłka ręczna ma własną, swojską nazwę — szczypiorniak. Dyscyplina przeżyła dwa wielkie okresy: medalowe lata 70. i 80. oraz erę Bogdana Wenty, gdy mecze reprezentacji oglądały miliony.",
    eras: [
      {
        years: "1917–1945",
        title: "Nazwa z obozu jenieckiego",
        text: "Nazwa „szczypiorniak” pochodzi od obozu w Szczypiornie koło Kalisza, w którym w 1917 roku internowano legionistów. Według tradycji to tam polscy żołnierze nauczyli się nowej gry od niemieckich strażników i po wyjściu na wolność spopularyzowali ją w kraju.",
      },
      {
        years: "1946–1989",
        title: "Medale z Montrealu i RFN",
        text: "Po wojnie piłka ręczna przeszła z boisk trawiastych do hal. Największym sukcesem PRL był brąz olimpijski w Montrealu 1976, a sześć lat później Polacy zdobyli brąz mistrzostw świata. Legendą tamtych lat był strzelec Jerzy Klempel.",
      },
      {
        years: "1990–2005",
        title: "Chude lata",
        text: "Po zmianach ustrojowych reprezentacja na długo wypadła z grona czołowych drużyn i rzadko grała na wielkich turniejach. Kluby zmagały się z brakiem pieniędzy, a najlepsi zawodnicy wyjeżdżali do Niemiec.",
      },
      {
        years: "2006–dziś",
        title: "Era Wenty i mocnych klubów",
        text: "Pod wodzą Bogdana Wenty Polacy zdobyli srebro mistrzostw świata w 2007 roku i brąz w 2009, a w 2015 roku — z Michaelem Bieglerem — kolejny brąz. Bramkarz Sławomir Szmal został wybrany najlepszym piłkarzem ręcznym świata. Kielecki klub w 2016 roku wygrał Ligę Mistrzów, a w 2023 roku Polska współorganizowała mistrzostwa świata.",
      },
    ],
    milestones: [
      { year: 1917, title: "Szczypiorno", text: "Internowani legioniści poznają grę, która w Polsce weźmie nazwę od ich obozu." },
      { year: 1976, title: "Brąz olimpijski", text: "Piłkarze ręczni zdobyli w Montrealu pierwszy medal olimpijski w tej dyscyplinie." },
      { year: 1982, title: "Brąz mistrzostw świata", text: "Polska stanęła na podium mistrzostw świata rozgrywanych w RFN." },
      { year: 2007, title: "Srebro w Niemczech", text: "Drużyna Bogdana Wenty przegrała dopiero w finale mistrzostw świata z gospodarzami." },
      { year: 2009, title: "Brąz w Chorwacji", text: "Kolejny medal mistrzostw świata dla drużyny Wenty." },
      { year: 2015, title: "Brąz w Katarze", text: "Trzeci medal mistrzostw świata w ciągu dziewięciu lat." },
      { year: 2016, title: "Kielce na szczycie Europy", text: "Kielecki klub wygrał Ligę Mistrzów po odrobieniu dziewięciu bramek straty w finale." },
      { year: 2023, title: "Mundial w Polsce", text: "Polska wspólnie ze Szwecją zorganizowała mistrzostwa świata." },
    ],
    legends: ["Jerzy Klempel", "Bogdan Wenta", "Grzegorz Tkaczyk", "Karol Bielecki", "Sławomir Szmal"],
  },
  {
    id: "pl-fencing",
    region: "pl",
    title: "Polska szermierka",
    emoji: "🤺",
    color: "from-slate-500 to-zinc-700",
    categories: ["polandgames", "combat"],
    lead: "Szabla to w Polsce broń z wielowiekową tradycją, a szermierka przez dekady była jedną z najbardziej medalodajnych polskich dyscyplin olimpijskich. Złotą erę przeżyła w latach 50.–70., gdy polscy szabliści i floreciści należeli do światowej czołówki.",
    eras: [
      {
        years: "1918–1939",
        title: "Szabla kawalerzystów",
        text: "W międzywojniu szermierkę uprawiano głównie w wojsku, a szablę traktowano jako kontynuację kawaleryjskiej tradycji. Polska drużyna szablistów zdobyła brązowe medale olimpijskie w Amsterdamie 1928 i w Los Angeles 1932.",
      },
      {
        years: "1946–1980",
        title: "Złota era",
        text: "Po wojnie polska szkoła szermierki stała się jedną z najsilniejszych na świecie. Egon Franke wygrał turniej florecistów w Tokio 1964, a Jerzy Pawłowski — wielokrotny mistrz świata — w 1968 roku sięgnął po złoto w szabli. Na igrzyskach w Monachium 1972 Witold Woyda zdobył dwa złota we florecie: indywidualnie i z drużyną.",
      },
      {
        years: "1981–dziś",
        title: "Nowe pokolenia",
        text: "Po latach dominacji medale przychodziły rzadziej, ale regularnie. Polskie florecistki zdobyły srebro drużynowe w Sydney 2000, szpadziści — srebro drużynowe w Pekinie 2008, a szpadzistki — brąz drużynowy w Paryżu 2024.",
      },
    ],
    milestones: [
      { year: 1928, title: "Pierwszy medal", text: "Drużyna szablistów zdobyła brąz na igrzyskach w Amsterdamie." },
      { year: 1964, title: "Złoto Frankego", text: "Egon Franke wygrał turniej florecistów w Tokio — pierwsze indywidualne złoto polskiej szermierki." },
      { year: 1968, title: "Złoto Pawłowskiego", text: "Jerzy Pawłowski wygrał turniej szablistów w Meksyku." },
      { year: 1972, title: "Dwa złota Woydy", text: "Witold Woyda wygrał w Monachium turniej indywidualny i drużynowy we florecie." },
      { year: 2008, title: "Srebro szpadzistów", text: "Polska drużyna szpadzistów doszła w Pekinie do finału olimpijskiego." },
      { year: 2024, title: "Brąz szpadzistek", text: "Polki zdobyły w Paryżu brąz w turnieju drużynowym." },
    ],
    legends: ["Wojciech Zabłocki", "Jerzy Pawłowski", "Egon Franke", "Witold Woyda", "Sylwia Gruchała"],
  },
  {
    id: "pl-rowing",
    region: "pl",
    title: "Polskie wioślarstwo i kajakarstwo",
    emoji: "🚣",
    color: "from-blue-500 to-teal-700",
    categories: ["rowing", "polandgames"],
    lead: "Wiosła i kajaki to dyscypliny, w których Polska od lat regularnie przywozi medale z igrzysk, choć poza okresem olimpijskim rzadko trafiają na pierwsze strony gazet.",
    eras: [
      {
        years: "1919–1939",
        title: "Akademickie przystanie",
        text: "W międzywojniu wioślarstwo rozwijało się przy klubach akademickich i wojskowych nad Wisłą, Wartą i Brdą. Polscy wioślarze zdobyli pierwszy medal olimpijski już w Los Angeles w 1932 roku.",
      },
      {
        years: "1945–1989",
        title: "Budowanie szkoły",
        text: "Po wojnie powstały ośrodki szkoleniowe i tory regatowe, m.in. poznańska Malta. Kajakarstwo stało się jedną z popularniejszych dyscyplin w kraju dzięki dostępności rzek i jezior, a polscy zawodnicy regularnie startowali w finałach mistrzostw świata.",
      },
      {
        years: "1990–dziś",
        title: "Olimpijskie złota",
        text: "Robert Sycz i Tomasz Kucharski dwukrotnie wygrali olimpijski turniej dwójek podwójnych wagi lekkiej (2000, 2004), a czwórka podwójna zdobyła złoto w Pekinie 2008. W Rio 2016 złoto w dwójce podwójnej wywalczyły Magdalena Fularczyk-Kozłowska i Natalia Madaj. Kajakarki — m.in. Karolina Naja, Anna Puławska i Marta Walczykiewicz — zdobywały kolejne medale na trzech igrzyskach z rzędu.",
      },
    ],
    milestones: [
      { year: 1932, title: "Pierwszy medal wioślarzy", text: "Polscy wioślarze stanęli na podium igrzysk w Los Angeles." },
      { year: 2000, title: "Złoto Sycza i Kucharskiego", text: "Dwójka podwójna wagi lekkiej wygrała w Sydney, a cztery lata później obroniła tytuł." },
      { year: 2008, title: "Złota czwórka", text: "Czwórka podwójna wioślarzy zdobyła złoto w Pekinie." },
      { year: 2016, title: "Złoto Fularczyk i Madaj", text: "Polki wygrały olimpijski finał dwójek podwójnych w Rio." },
      { year: 2021, title: "Medale w Tokio", text: "Srebro czwórki podwójnej wioślarek i dwójki kajakarek Nai i Puławskiej, brąz kanadyjkarki Doroty Borowskiej." },
    ],
    legends: ["Robert Sycz", "Tomasz Kucharski", "Adam Korol", "Natalia Madaj", "Magdalena Fularczyk-Kozłowska", "Karolina Naja", "Marta Walczykiewicz"],
  },
  {
    id: "pl-nordic",
    region: "pl",
    title: "Polskie biegi narciarskie i biathlon",
    emoji: "⛷️",
    color: "from-cyan-500 to-blue-800",
    categories: ["nordic", "winter"],
    lead: "Przez większość XX wieku polskie biegi narciarskie miały niewiele wielkich chwil. Wszystko zmieniła Justyna Kowalczyk, która przez dekadę walczyła jak równa z równymi z Norweżkami i stała się jedną z najpopularniejszych sportsmenek w kraju.",
    eras: [
      {
        years: "1919–1970",
        title: "Tatrzańscy wszechstronni",
        text: "Przed wojną polscy narciarze startowali w wielu konkurencjach naraz — Bronisław Czech czy Stanisław Marusarz biegali, skakali i zjeżdżali. Zakopane gościło mistrzostwa świata w 1929 i 1939 roku, a po wojnie w 1962. Biegi długo pozostawały jednak w cieniu skoków.",
      },
      {
        years: "1971–2000",
        title: "Łuszczek i biathloniści",
        text: "W 1978 roku w Lahti Józef Łuszczek sensacyjnie wygrał bieg na 15 km i został pierwszym polskim mistrzem świata w biegach narciarskich. W biathlonie Polacy powoli budowali pozycję, a na przełomie wieków coraz częściej walczyli o czołowe lokaty w Pucharze Świata.",
      },
      {
        years: "2001–dziś",
        title: "Era Kowalczyk",
        text: "Turyn 2006 przyniósł srebro biathlonisty Tomasza Sikory i pierwszy medal Justyny Kowalczyk. Kowalczyk zdobyła potem złoto olimpijskie w Vancouver 2010 i w Soczi 2014 — tam ze złamaną kością stopy — a także cztery Kryształowe Kule i cztery zwycięstwa w Tour de Ski.",
      },
    ],
    milestones: [
      { year: 1929, title: "Mistrzostwa świata w Zakopanem", text: "Zakopane po raz pierwszy zorganizowało narciarskie mistrzostwa świata." },
      { year: 1978, title: "Złoto Łuszczka", text: "Józef Łuszczek wygrał w Lahti bieg na 15 km." },
      { year: 2006, title: "Medale w Turynie", text: "Srebro Tomasza Sikory w biathlonie i brąz Justyny Kowalczyk w biegu na 30 km." },
      { year: 2009, title: "Dwa złota w Libercu", text: "Kowalczyk została podwójną mistrzynią świata." },
      { year: 2010, title: "Złoto w Vancouver", text: "Kowalczyk wygrała bieg na 30 km po finiszu z Marit Bjørgen." },
      { year: 2014, title: "Złoto ze złamaną stopą", text: "W Soczi Kowalczyk wygrała bieg na 10 km techniką klasyczną." },
    ],
    legends: ["Bronisław Czech", "Józef Łuszczek", "Tomasz Sikora", "Justyna Kowalczyk"],
  },
  {
    id: "pl-weightlifting",
    region: "pl",
    title: "Polskie podnoszenie ciężarów",
    emoji: "🏋️",
    color: "from-red-700 to-rose-900",
    categories: ["strength", "polandgames"],
    lead: "Podnoszenie ciężarów przyniosło Polsce kilkanaście medali olimpijskich, a w latach 60. polscy sztangiści należeli do światowej elity. Ta historia ma też ciemną stronę — kilka głośnych afer dopingowych.",
    eras: [
      {
        years: "1945–1980",
        title: "Złota epoka sztangistów",
        text: "Pierwsze olimpijskie złoto zdobył Ireneusz Paliński w Rzymie 1960. Waldemar Baszanowski wygrał igrzyska w 1964 i 1968 roku, a Marian Zieliński zdobył trzy brązowe medale na trzech kolejnych igrzyskach. W Monachium 1972 złoto wywalczył Zygmunt Smalcerz.",
      },
      {
        years: "1981–2007",
        title: "Pierwsze medale kobiet",
        text: "W latach 80. i 90. polscy ciężarowcy nadal zdobywali medale mistrzostw świata i Europy. Gdy w 2000 roku kobiety zadebiutowały w olimpijskim podnoszeniu ciężarów, Agata Wróbel od razu zdobyła srebro, a cztery lata później brąz.",
      },
      {
        years: "2008–dziś",
        title: "Złoto i afery",
        text: "Szymon Kołecki po latach otrzymał złoto z Pekinu 2008, odebrane rywalowi za doping. Adrian Zieliński wygrał w Londynie 2012. Cztery lata później bracia Zielińscy opuścili igrzyska w Rio po wykryciu niedozwolonych substancji — dyscyplina przeżyła jeden z najtrudniejszych momentów.",
      },
    ],
    milestones: [
      { year: 1960, title: "Złoto Palińskiego", text: "Pierwsze polskie złoto olimpijskie w podnoszeniu ciężarów." },
      { year: 1964, title: "Baszanowski mistrzem", text: "Waldemar Baszanowski wygrał w Tokio, a w Meksyku obronił tytuł." },
      { year: 1972, title: "Złoto Smalcerza", text: "Zygmunt Smalcerz wygrał w Monachium w najlżejszej kategorii." },
      { year: 2000, title: "Srebro Wróbel", text: "Agata Wróbel zdobyła medal w pierwszym olimpijskim turnieju kobiet." },
      { year: 2012, title: "Złoto Zielińskiego", text: "Adrian Zieliński wygrał w Londynie w kategorii do 85 kg." },
      { year: 2016, title: "Afera w Rio", text: "Bracia Zielińscy wycofani z igrzysk po pozytywnych testach antydopingowych." },
    ],
    legends: ["Ireneusz Paliński", "Waldemar Baszanowski", "Marian Zieliński", "Zygmunt Smalcerz", "Agata Wróbel", "Szymon Kołecki"],
  },
  {
    id: "pl-basketball",
    region: "pl",
    title: "Polska koszykówka",
    emoji: "🏀",
    color: "from-orange-600 to-amber-700",
    categories: ["basketball"],
    lead: "Polska koszykówka przeżyła swój złoty wiek w latach 60., gdy reprezentacja regularnie stawała na podium mistrzostw Europy. Największy sukces w historii przyniosły jednak kobiety w 1999 roku.",
    eras: [
      {
        years: "1928–1945",
        title: "Brąz z Kowna",
        text: "Koszykówka szybko przyjęła się w polskich szkołach i klubach akademickich. Już w 1939 roku reprezentacja Polski zdobyła brąz mistrzostw Europy rozgrywanych w litewskim Kownie.",
      },
      {
        years: "1946–1989",
        title: "Złote lata 60.",
        text: "Na mistrzostwach Europy we Wrocławiu w 1963 roku Polacy zdobyli srebro, a w 1965 i 1967 roku dołożyli brązowe medale. Gwiazdami tamtej drużyny byli Mieczysław Łopatka i Bohdan Likszo. Potem przyszły lata, w których kadra rzadko liczyła się w walce o medale.",
      },
      {
        years: "1990–2014",
        title: "Złote kobiety i NBA",
        text: "W 1999 roku polskie koszykarki wygrały w Katowicach mistrzostwa Europy. Rok wcześniej Małgorzata Dydek, mierząca 218 cm, została wybrana z pierwszym numerem draftu ligi WNBA. Wśród mężczyzn do NBA dotarł m.in. Marcin Gortat, który zagrał w finałach w 2009 roku.",
      },
      {
        years: "2015–dziś",
        title: "Powrót do czołówki",
        text: "Na mistrzostwach świata w 2019 roku Polska zajęła ósme miejsce, a trzy lata później doszła do półfinału mistrzostw Europy, eliminując w ćwierćfinale broniącą tytułu Słowenię. W NBA zadebiutował Jeremy Sochan.",
      },
    ],
    milestones: [
      { year: 1939, title: "Brąz w Kownie", text: "Pierwszy medal mistrzostw Europy." },
      { year: 1963, title: "Srebro we Wrocławiu", text: "Najlepszy wynik reprezentacji mężczyzn w mistrzostwach Europy." },
      { year: 1998, title: "Dydek numerem 1", text: "Małgorzata Dydek wybrana jako pierwsza w drafcie WNBA." },
      { year: 1999, title: "Mistrzynie Europy", text: "Polskie koszykarki wygrały mistrzostwa Europy w Katowicach." },
      { year: 2019, title: "Ósemka mundialu", text: "Polska wróciła na mistrzostwa świata po 52 latach i zajęła ósme miejsce." },
      { year: 2022, title: "Półfinał Euro", text: "Po wygranej ze Słowenią Polacy zagrali w półfinale mistrzostw Europy." },
    ],
    legends: ["Mieczysław Łopatka", "Edward Jurkiewicz", "Małgorzata Dydek", "Adam Wójcik", "Marcin Gortat", "Mateusz Ponitka"],
  },
  {
    id: "pl-swimming",
    region: "pl",
    title: "Polskie pływanie",
    emoji: "🏊",
    color: "from-blue-500 to-cyan-600",
    categories: ["water"],
    lead: "Na pierwszy olimpijski medal w pływaniu Polska czekała aż do 1988 roku. Kolejne dekady przyniosły jednak mistrzów świata i olimpijskie złoto Otylii Jędrzejczak.",
    eras: [
      {
        years: "1920–1987",
        title: "Długie czekanie",
        text: "Polscy pływacy startowali na igrzyskach od lat 20., ale brakowało im krytych pływalni i zaplecza. Przez dziesięciolecia medale olimpijskie pozostawały poza zasięgiem, a sukcesem były awanse do finałów.",
      },
      {
        years: "1988–2003",
        title: "Przełamanie",
        text: "W Seulu 1988 Artur Wojdat zdobył brąz na 400 m stylem dowolnym — pierwszy olimpijski medal polskiego pływaka. Cztery lata później Rafał Szukała wywalczył srebro na 100 m stylem motylkowym.",
      },
      {
        years: "2004–dziś",
        title: "Mistrzowie świata",
        text: "W Atenach 2004 Otylia Jędrzejczak zdobyła złoto na 200 m stylem motylkowym i dwa srebra. Paweł Korzeniowski został mistrzem świata na 200 m motylkiem w 2005 roku, a Mateusz Sawrymowicz w 2007 roku wygrał na 1500 m stylem dowolnym.",
      },
    ],
    milestones: [
      { year: 1988, title: "Brąz Wojdata", text: "Pierwszy polski medal olimpijski w pływaniu." },
      { year: 1992, title: "Srebro Szukały", text: "Rafał Szukała drugi na 100 m stylem motylkowym w Barcelonie." },
      { year: 2004, title: "Złoto Jędrzejczak", text: "Otylia Jędrzejczak mistrzynią olimpijską na 200 m motylkiem." },
      { year: 2005, title: "Korzeniowski mistrzem świata", text: "Złoto na 200 m stylem motylkowym w Montrealu." },
      { year: 2007, title: "Złoto Sawrymowicza", text: "Mateusz Sawrymowicz mistrzem świata na 1500 m stylem dowolnym." },
    ],
    legends: ["Artur Wojdat", "Rafał Szukała", "Otylia Jędrzejczak", "Paweł Korzeniowski", "Mateusz Sawrymowicz"],
  },
];
