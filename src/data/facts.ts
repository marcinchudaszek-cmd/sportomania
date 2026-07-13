export interface Fact {
  id: string;
  text: string;
  category: string;
  year?: number;
  emoji: string;
}

export const CATEGORIES = [
  { id: "all", label: "Wszystkie", emoji: "🏆", color: "from-emerald-500 to-green-600" },
  { id: "football", label: "Piłka nożna", emoji: "⚽", color: "from-green-500 to-emerald-600" },
  { id: "olympics", label: "Igrzyska Olimpijskie", emoji: "🏅", color: "from-amber-500 to-yellow-600" },
  { id: "athletics", label: "Lekkoatletyka", emoji: "🏃", color: "from-orange-500 to-red-600" },
  { id: "tennis", label: "Tenis", emoji: "🎾", color: "from-lime-500 to-green-600" },
  { id: "basketball", label: "Koszykówka", emoji: "🏀", color: "from-orange-600 to-amber-700" },
  { id: "volleyball", label: "Siatkówka", emoji: "🏐", color: "from-sky-500 to-blue-600" },
  { id: "motorsport", label: "Motorsport", emoji: "🏎️", color: "from-red-500 to-rose-600" },
  { id: "combat", label: "Sporty walki", emoji: "🥊", color: "from-red-600 to-rose-800" },
  { id: "winter", label: "Sporty zimowe", emoji: "⛷️", color: "from-cyan-500 to-blue-600" },
  { id: "water", label: "Sporty wodne", emoji: "🏊", color: "from-blue-500 to-cyan-600" },
  { id: "cycling", label: "Kolarstwo", emoji: "🚴", color: "from-yellow-500 to-amber-600" },
  { id: "poland", label: "Polski sport", emoji: "🇵🇱", color: "from-red-600 to-rose-700" },
  { id: "ancient", label: "Sport starożytny", emoji: "🏛️", color: "from-stone-500 to-amber-800" },
  { id: "records", label: "Rekordy i kurioza", emoji: "🤯", color: "from-violet-500 to-purple-600" },
];

export const FACTS_DB: Fact[] = [
  // === PIŁKA NOŻNA ===
  {
    id: "f1",
    text: "Pierwsze mistrzostwa świata w piłce nożnej odbyły się w 1930 roku w Urugwaju. Wzięło w nich udział tylko 13 drużyn, a gospodarze pokonali w finale Argentynę 4:2.",
    category: "football",
    year: 1930,
    emoji: "🏆",
  },
  {
    id: "f2",
    text: "Najwyższe zwycięstwo w meczu międzypaństwowym padło w 2001 roku: Australia pokonała Samoa Amerykańskie 31:0, a Archie Thompson strzelił w tym meczu 13 goli.",
    category: "football",
    year: 2001,
    emoji: "🥅",
  },
  {
    id: "f3",
    text: "Pelé jest jedynym piłkarzem w historii, który trzy razy zdobył mistrzostwo świata — w 1958, 1962 i 1970 roku. W 1958 miał zaledwie 17 lat.",
    category: "football",
    year: 1958,
    emoji: "👑",
  },
  {
    id: "f4",
    text: "Najszybszy gol w historii mundiali padł po 10,8 sekundy — strzelił go Turek Hakan Şükür w meczu o 3. miejsce z Koreą Południową w 2002 roku.",
    category: "football",
    year: 2002,
    emoji: "⚡",
  },
  {
    id: "f5",
    text: "Pierwszy oficjalny mecz międzypaństwowy w historii futbolu rozegrano 30 listopada 1872 roku. Szkocja zremisowała z Anglią 0:0 w Glasgow.",
    category: "football",
    year: 1872,
    emoji: "📜",
  },
  {
    id: "f6",
    text: "Żółte i czerwone kartki wprowadzono dopiero na mundialu w 1970 roku. Pomysłodawca, sędzia Ken Aston, wpadł na ten pomysł stojąc na czerwonym świetle na skrzyżowaniu.",
    category: "football",
    year: 1970,
    emoji: "🟨",
  },
  {
    id: "f7",
    text: "Najstarszym klubem piłkarskim świata jest angielski Sheffield FC, założony w 1857 roku — jeszcze zanim powstały jednolite przepisy gry.",
    category: "football",
    year: 1857,
    emoji: "🏟️",
  },
  {
    id: "f8",
    text: "Finał MŚ 1950 Brazylia–Urugwaj na stadionie Maracanã obejrzało według szacunków około 200 tysięcy widzów — to rekord frekwencji w historii futbolu. Sensacyjna porażka gospodarzy 1:2 przeszła do historii jako „Maracanazo”.",
    category: "football",
    year: 1950,
    emoji: "😱",
  },
  {
    id: "f9",
    text: "W 1314 roku król Anglii Edward II zakazał gry w piłkę na ulicach Londynu pod karą więzienia — hałas i zamieszanie przeszkadzały kupcom. Futbol zakazywano w Anglii jeszcze wielokrotnie.",
    category: "football",
    year: 1314,
    emoji: "⛔",
  },
  {
    id: "f10",
    text: "Real Madryt zdobył Puchar Europy / Ligę Mistrzów rekordowe 15 razy, w tym pięć pierwszych edycji z rzędu w latach 1956–1960.",
    category: "football",
    year: 1956,
    emoji: "⭐",
  },
  {
    id: "f11",
    text: "Podczas I wojny światowej, w Boże Narodzenie 1914 roku, żołnierze brytyjscy i niemieccy przerwali walki i rozegrali mecze piłkarskie na ziemi niczyjej między okopami.",
    category: "football",
    year: 1914,
    emoji: "🕊️",
  },

  // === OLIMPIADY ===
  {
    id: "o1",
    text: "Starożytne igrzyska olimpijskie odbywały się od 776 r. p.n.e. przez ponad tysiąc lat, aż cesarz Teodozjusz I zakazał ich w 393 r. n.e. jako pogańskiego święta.",
    category: "olympics",
    emoji: "🏛️",
  },
  {
    id: "o2",
    text: "Pierwsze nowożytne igrzyska olimpijskie odbyły się w Atenach w 1896 roku. Wystartowało 241 sportowców z 14 państw — wyłącznie mężczyźni.",
    category: "olympics",
    year: 1896,
    emoji: "🇬🇷",
  },
  {
    id: "o3",
    text: "Kobiety po raz pierwszy wystartowały na igrzyskach w Paryżu w 1900 roku — mogły rywalizować m.in. w tenisie, golfie i żeglarstwie.",
    category: "olympics",
    year: 1900,
    emoji: "👩",
  },
  {
    id: "o4",
    text: "Michael Phelps to najbardziej utytułowany olimpijczyk w historii: zdobył 28 medali, w tym 23 złote. Samych złotych medali ma więcej niż większość państw świata.",
    category: "olympics",
    year: 2016,
    emoji: "🏊",
  },
  {
    id: "o5",
    text: "W latach 1912–1948 na igrzyskach olimpijskich przyznawano medale także w konkurencjach artystycznych: literaturze, muzyce, malarstwie, rzeźbie i architekturze.",
    category: "olympics",
    year: 1912,
    emoji: "🎨",
  },
  {
    id: "o6",
    text: "Dystans maratonu — 42 195 m — ustalono na igrzyskach w Londynie w 1908 roku. Trasę wydłużono tak, by start był pod zamkiem Windsor, a meta przed lożą królewską.",
    category: "olympics",
    year: 1908,
    emoji: "📏",
  },
  {
    id: "o7",
    text: "Jesse Owens zdobył 4 złote medale na igrzyskach w Berlinie w 1936 roku, obalając na oczach Hitlera propagandę o wyższości rasowej.",
    category: "olympics",
    year: 1936,
    emoji: "✊",
  },
  {
    id: "o8",
    text: "Sztafeta ognia olimpijskiego nie pochodzi ze starożytności — po raz pierwszy zorganizowano ją na igrzyskach w Berlinie w 1936 roku.",
    category: "olympics",
    year: 1936,
    emoji: "🔥",
  },
  {
    id: "o9",
    text: "Pierwsze zimowe igrzyska olimpijskie odbyły się w 1924 roku w Chamonix we Francji. Początkowo nazywano je „Tygodniem Sportów Zimowych”.",
    category: "olympics",
    year: 1924,
    emoji: "❄️",
  },
  {
    id: "o10",
    text: "Najstarszym medalistą olimpijskim w historii jest szwedzki strzelec Oscar Swahn, który w 1920 roku zdobył srebro w wieku 72 lat.",
    category: "olympics",
    year: 1920,
    emoji: "👴",
  },
  {
    id: "o11",
    text: "Rumuńska gimnastyczka Nadia Comăneci jako pierwsza w historii otrzymała notę 10.0 na igrzyskach (Montreal 1976). Tablica wyników nie była na to gotowa i wyświetliła „1.00”.",
    category: "olympics",
    year: 1976,
    emoji: "🤸",
  },

  // === LEKKOATLETYKA ===
  {
    id: "a1",
    text: "Usain Bolt ustanowił rekord świata na 100 m — 9,58 s — na MŚ w Berlinie w 2009 roku. Osiągnął wtedy prędkość maksymalną ok. 44,7 km/h.",
    category: "athletics",
    year: 2009,
    emoji: "⚡",
  },
  {
    id: "a2",
    text: "Bob Beamon skoczył w Meksyku w 1968 roku 8,90 m — poprawił rekord świata aż o 55 cm. Jego wynik przetrwał 23 lata, do skoku Mike'a Powella (8,95 m) w 1991 roku.",
    category: "athletics",
    year: 1968,
    emoji: "🦘",
  },
  {
    id: "a3",
    text: "Roger Bannister jako pierwszy człowiek przebiegł milę poniżej 4 minut (3:59,4) — 6 maja 1954 roku w Oksfordzie. Wcześniej uważano, że to fizycznie niemożliwe.",
    category: "athletics",
    year: 1954,
    emoji: "⏱️",
  },
  {
    id: "a4",
    text: "Dick Fosbury zrewolucjonizował skok wzwyż, przechodząc nad poprzeczką plecami. Techniką „flop” zdobył złoto olimpijskie w 1968 roku — dziś skaczą tak wszyscy.",
    category: "athletics",
    year: 1968,
    emoji: "🔄",
  },
  {
    id: "a5",
    text: "Siergiej Bubka pobił rekord świata w skoku o tyczce aż 35 razy — często poprawiał go o centymetr, bo za każdy rekord dostawał premię.",
    category: "athletics",
    year: 1994,
    emoji: "🪜",
  },
  {
    id: "a6",
    text: "Eliud Kipchoge w 2019 roku jako pierwszy człowiek przebiegł maraton poniżej 2 godzin (1:59:40). Wynik nie został uznany za rekord świata, bo osiągnięto go w specjalnie zaaranżowanym biegu.",
    category: "athletics",
    year: 2019,
    emoji: "🏃",
  },
  {
    id: "a7",
    text: "Rekord świata Jarmili Kratochvílovej na 800 m (1:53,28) pochodzi z 1983 roku i jest najdłużej niepobitym rekordem świata w lekkoatletyce.",
    category: "athletics",
    year: 1983,
    emoji: "📊",
  },
  {
    id: "a8",
    text: "Na maratonie olimpijskim w 1904 roku zwycięzca Thomas Hicks biegł wspomagany... strychniną i brandy, a inny zawodnik część trasy przejechał samochodem.",
    category: "athletics",
    year: 1904,
    emoji: "🤪",
  },

  // === TENIS ===
  {
    id: "t1",
    text: "Wimbledon to najstarszy turniej tenisowy świata — rozgrywany od 1877 roku. Do dziś obowiązuje na nim niemal całkowicie biały strój zawodników.",
    category: "tennis",
    year: 1877,
    emoji: "🌱",
  },
  {
    id: "t2",
    text: "Najdłuższy mecz w historii tenisa: John Isner pokonał Nicolasa Mahuta na Wimbledonie 2010 po 11 godzinach i 5 minutach gry, wygrywając piątego seta 70:68!",
    category: "tennis",
    year: 2010,
    emoji: "⏳",
  },
  {
    id: "t3",
    text: "Steffi Graf jako jedyna osoba w historii zdobyła „Złotego Szlema” — wygrała wszystkie cztery turnieje wielkoszlemowe i złoto olimpijskie w jednym roku (1988).",
    category: "tennis",
    year: 1988,
    emoji: "🥇",
  },
  {
    id: "t4",
    text: "Żółte piłki tenisowe wprowadzono na Wimbledonie dopiero w 1986 roku — wcześniej grano białymi. Zmianę wymusiła telewizja, bo żółte piłki lepiej widać na ekranie.",
    category: "tennis",
    year: 1986,
    emoji: "🎾",
  },
  {
    id: "t5",
    text: "Najszybszy oficjalnie zmierzony serwis należy do Australijczyka Sama Grotha — 263 km/h podczas challengera w Busan w 2012 roku.",
    category: "tennis",
    year: 2012,
    emoji: "🚀",
  },
  {
    id: "t6",
    text: "Novak Djoković zdobył rekordowe 24 tytuły wielkoszlemowe w grze pojedynczej mężczyzn — tyle samo, ile Margaret Court w całej historii kobiecego tenisa.",
    category: "tennis",
    year: 2023,
    emoji: "🐐",
  },
  {
    id: "t7",
    text: "W 1973 roku odbył się słynny mecz „Bitwa płci”: Billie Jean King pokonała Bobby'ego Riggsa przed 90 milionami telewidzów, przyspieszając walkę o równe nagrody dla kobiet.",
    category: "tennis",
    year: 1973,
    emoji: "⚔️",
  },

  // === KOSZYKÓWKA ===
  {
    id: "b1",
    text: "Koszykówkę wymyślił w 1891 roku kanadyjski nauczyciel WF James Naismith. Pierwsze kosze to były... kosze na brzoskwinie przybite do balkonu sali gimnastycznej.",
    category: "basketball",
    year: 1891,
    emoji: "🍑",
  },
  {
    id: "b2",
    text: "Wilt Chamberlain zdobył 100 punktów w jednym meczu NBA (1962, Philadelphia Warriors – New York Knicks). Ten rekord pozostaje niepobity do dziś.",
    category: "basketball",
    year: 1962,
    emoji: "💯",
  },
  {
    id: "b3",
    text: "Linia rzutów za 3 punkty pojawiła się w NBA dopiero w sezonie 1979/80 — dziś to fundament gry, a wtedy uważano ją za cyrkową sztuczkę.",
    category: "basketball",
    year: 1979,
    emoji: "🎯",
  },
  {
    id: "b4",
    text: "Przez pierwsze lata koszykówki po każdym celnym rzucie sędzia wchodził po drabinie i wyjmował piłkę z kosza — dopiero później wycięto dno.",
    category: "basketball",
    year: 1900,
    emoji: "🪜",
  },
  {
    id: "b5",
    text: "„Dream Team” z igrzysk w Barcelonie 1992 (z Jordanem, Magiciem i Birdem) wygrywał mecze średnio 44 punktami i nie wziął ani jednej przerwy na żądanie.",
    category: "basketball",
    year: 1992,
    emoji: "🌟",
  },
  {
    id: "b6",
    text: "Michael Jordan w połowie kariery odszedł z NBA, by grać... w baseball. Wrócił w 1995 roku słynnym faksem z dwoma słowami: „I'm back”.",
    category: "basketball",
    year: 1995,
    emoji: "⚾",
  },

  // === SIATKÓWKA ===
  {
    id: "v1",
    text: "Siatkówkę wymyślił w 1895 roku Amerykanin William Morgan jako mniej kontaktową alternatywę dla koszykówki. Pierwotnie nazywała się „mintonette”.",
    category: "volleyball",
    year: 1895,
    emoji: "📖",
  },
  {
    id: "v2",
    text: "Reprezentacja Polski siatkarzy zdobyła mistrzostwo świata w 1974 roku w Meksyku, a potem obroniła tytuł dopiero po 44 latach — wygrywając MŚ 2014 i 2018 z rzędu.",
    category: "volleyball",
    year: 2018,
    emoji: "🇵🇱",
  },
  {
    id: "v3",
    text: "Złoto olimpijskie polskich siatkarzy z Montrealu 1976 pod wodzą Huberta Wagnera, zwanego „Katem”, to efekt legendarnie ciężkich treningów, o których krążą anegdoty do dziś.",
    category: "volleyball",
    year: 1976,
    emoji: "🥇",
  },
  {
    id: "v4",
    text: "Siatkówka plażowa zadebiutowała na igrzyskach w Atlancie w 1996 roku, choć na plażach Kalifornii i Brazylii grano w nią już od lat 20. XX wieku.",
    category: "volleyball",
    year: 1996,
    emoji: "🏖️",
  },
  {
    id: "v5",
    text: "Libero — zawodnik grający w innym kolorze koszulki i tylko w obronie — to stosunkowo nowy wynalazek: wprowadzono go do siatkówki w 1998 roku.",
    category: "volleyball",
    year: 1998,
    emoji: "🎽",
  },

  // === MOTORSPORT ===
  {
    id: "m1",
    text: "Pierwszy wyścig mistrzostw świata Formuły 1 odbył się 13 maja 1950 roku na torze Silverstone. Wygrał Włoch Giuseppe Farina, który został też pierwszym mistrzem świata.",
    category: "motorsport",
    year: 1950,
    emoji: "🏁",
  },
  {
    id: "m2",
    text: "Robert Kubica jest jedynym Polakiem, który wygrał wyścig Formuły 1 — Grand Prix Kanady 2008. Rok wcześniej na tym samym torze przeżył potworny wypadek przy ok. 230 km/h.",
    category: "motorsport",
    year: 2008,
    emoji: "🇵🇱",
  },
  {
    id: "m3",
    text: "Michael Schumacher i Lewis Hamilton mają po 7 tytułów mistrza świata F1 — nikt w historii nie zdobył więcej.",
    category: "motorsport",
    year: 2020,
    emoji: "👑",
  },
  {
    id: "m4",
    text: "Najbliższy finisz w historii F1: na Monzy w 1971 roku Peter Gethin wygrał z przewagą 0,01 sekundy, a pierwszą piątkę dzieliło 0,61 s.",
    category: "motorsport",
    year: 1971,
    emoji: "📸",
  },
  {
    id: "m5",
    text: "24-godzinny wyścig Le Mans rozgrywany jest od 1923 roku. Zwycięska załoga pokonuje w dobę ponad 5000 km — więcej niż dystans z Lizbony do Moskwy.",
    category: "motorsport",
    year: 1923,
    emoji: "🕛",
  },
  {
    id: "m6",
    text: "Bartosz Zmarzlik to pięciokrotny indywidualny mistrz świata na żużlu (2019, 2020, 2022, 2023, 2024) — jeden z najlepszych żużlowców w historii tej dyscypliny.",
    category: "motorsport",
    year: 2024,
    emoji: "🏍️",
  },

  // === SPORTY WALKI ===
  {
    id: "c1",
    text: "Nowoczesne zasady boksu — w tym obowiązkowe rękawice i 3-minutowe rundy — spisano w 1867 roku jako tzw. przepisy markiza Queensberry.",
    category: "combat",
    year: 1867,
    emoji: "📜",
  },
  {
    id: "c2",
    text: "„Rumble in the Jungle” (1974, Kinszasa): Muhammad Ali znokautował niepokonanego George'a Foremana, stosując taktykę „rope-a-dope” — pozwalał się bić przy linach, aż rywal opadł z sił.",
    category: "combat",
    year: 1974,
    emoji: "🌍",
  },
  {
    id: "c3",
    text: "Rocky Marciano to jedyny mistrz świata wagi ciężkiej, który zakończył karierę niepokonany — bilans 49 zwycięstw, 0 porażek.",
    category: "combat",
    year: 1956,
    emoji: "💪",
  },
  {
    id: "c4",
    text: "Muhammad Ali, cierpiący już na chorobę Parkinsona, zapalił znicz olimpijski w Atlancie w 1996 roku — to jeden z najbardziej wzruszających momentów w historii igrzysk.",
    category: "combat",
    year: 1996,
    emoji: "🔥",
  },
  {
    id: "c5",
    text: "Węgier László Papp jako pierwszy bokser w historii zdobył trzy złote medale olimpijskie z rzędu (1948, 1952, 1956).",
    category: "combat",
    year: 1956,
    emoji: "🥇",
  },
  {
    id: "c6",
    text: "Judo stworzył w 1882 roku Japończyk Jigorō Kanō, łagodząc techniki samurajskiego jujutsu. Na igrzyska trafiło w 1964 roku w Tokio.",
    category: "combat",
    year: 1882,
    emoji: "🥋",
  },

  // === SPORTY ZIMOWE ===
  {
    id: "w1",
    text: "Adam Małysz zdobył 4 medale olimpijskie i 4 tytuły mistrza świata, a Puchar Świata w skokach wygrywał 4 razy — w tym trzy sezony z rzędu (2001–2003).",
    category: "winter",
    year: 2001,
    emoji: "🦅",
  },
  {
    id: "w2",
    text: "Kamil Stoch wygrał oba konkursy indywidualne na igrzyskach w Soczi 2014, a w 2018 roku dołożył trzecie złoto w Pjongczangu — tylko trzej skoczkowie w historii mają 3 złota indywidualne.",
    category: "winter",
    year: 2014,
    emoji: "🥇",
  },
  {
    id: "w3",
    text: "„Cud na lodzie” (1980): amerykańscy studenci pokonali na igrzyskach w Lake Placid radziecką maszynę hokejową, która wygrała wcześniej cztery olimpiady z rzędu.",
    category: "winter",
    year: 1980,
    emoji: "🏒",
  },
  {
    id: "w4",
    text: "Eddie „The Eagle” Edwards, brytyjski skoczek-amator w grubych okularach, zajął ostatnie miejsce na igrzyskach w Calgary 1988 — i został większą gwiazdą niż zwycięzcy.",
    category: "winter",
    year: 1988,
    emoji: "🤓",
  },
  {
    id: "w5",
    text: "Justyna Kowalczyk zdobyła 5 medali olimpijskich, w tym dwa złota (2010, 2014). Złoto w Soczi wywalczyła... biegnąc ze złamaną kością stopy.",
    category: "winter",
    year: 2014,
    emoji: "🎿",
  },
  {
    id: "w6",
    text: "Pierwszy skok narciarski ponad 250 metrów oddał Austriak Stefan Kraft — 253,5 m w Vikersund w 2017 roku. To oficjalny rekord świata w długości lotu.",
    category: "winter",
    year: 2017,
    emoji: "📏",
  },
  {
    id: "w7",
    text: "Reprezentacja Jamajki w bobslejach zadebiutowała na igrzyskach w Calgary w 1988 roku — ich historia zainspirowała film „Reggae na lodzie”.",
    category: "winter",
    year: 1988,
    emoji: "🛷",
  },

  // === SPORTY WODNE ===
  {
    id: "s1",
    text: "Gertrude Ederle w 1926 roku jako pierwsza kobieta przepłynęła kanał La Manche — i pobiła ówczesny rekord mężczyzn o prawie dwie godziny.",
    category: "water",
    year: 1926,
    emoji: "🌊",
  },
  {
    id: "s2",
    text: "Otylia Jędrzejczak zdobyła złoto olimpijskie na 200 m stylem motylkowym w Atenach 2004, a swój medal zlicytowała na rzecz dzieci chorych na białaczkę.",
    category: "water",
    year: 2004,
    emoji: "🦋",
  },
  {
    id: "s3",
    text: "Na pierwszych nowożytnych igrzyskach w 1896 roku zawody pływackie odbywały się w otwartym morzu. Zwycięzca Alfréd Hajós przyznał, że bardziej niż o wygranej myślał o tym, żeby nie utonąć.",
    category: "water",
    year: 1896,
    emoji: "🌊",
  },
  {
    id: "s4",
    text: "Kostiumy poliuretanowe, w których w latach 2008–2009 pobito ponad 130 rekordów świata w pływaniu, zostały zakazane od 2010 roku jako „doping technologiczny”.",
    category: "water",
    year: 2009,
    emoji: "🩱",
  },
  {
    id: "s5",
    text: "Regaty wioślarskie Oxford–Cambridge rozgrywane są na Tamizie od 1829 roku i są jednym z najstarszych cyklicznych wydarzeń sportowych świata.",
    category: "water",
    year: 1829,
    emoji: "🚣",
  },

  // === KOLARSTWO ===
  {
    id: "k1",
    text: "Tour de France powstał w 1903 roku jako akcja promocyjna gazety L'Auto. Żółta koszulka lidera nawiązuje do koloru papieru, na którym drukowano tę gazetę.",
    category: "cycling",
    year: 1903,
    emoji: "💛",
  },
  {
    id: "k2",
    text: "Ryszard Szurkowski, legenda polskiego kolarstwa, cztery razy wygrał Wyścig Pokoju i dwukrotnie zdobył srebro olimpijskie. Nazywano go „kolarzem stulecia”.",
    category: "cycling",
    year: 1973,
    emoji: "🚴",
  },
  {
    id: "k3",
    text: "Zwycięzca pierwszego Tour de France, Maurice Garin, rok później został zdyskwalifikowany za... przejechanie części trasy pociągiem.",
    category: "cycling",
    year: 1904,
    emoji: "🚂",
  },
  {
    id: "k4",
    text: "Lance Armstrong wygrał Tour de France siedem razy z rzędu (1999–2005), ale wszystkie tytuły odebrano mu w 2012 roku po udowodnieniu systematycznego dopingu.",
    category: "cycling",
    year: 2012,
    emoji: "❌",
  },
  {
    id: "k5",
    text: "Rafał Majka dwukrotnie wygrał klasyfikację górską Tour de France (2014, 2016) i zdobył brązowy medal olimpijski w Rio de Janeiro w 2016 roku.",
    category: "cycling",
    year: 2016,
    emoji: "⛰️",
  },

  // === POLSKI SPORT ===
  {
    id: "p1",
    text: "Pierwszy złoty medal olimpijski dla Polski zdobyła Halina Konopacka — w rzucie dyskiem na igrzyskach w Amsterdamie w 1928 roku, bijąc przy okazji rekord świata.",
    category: "poland",
    year: 1928,
    emoji: "🥇",
  },
  {
    id: "p2",
    text: "Janusz Kusociński zdobył złoto olimpijskie w biegu na 10 000 m w Los Angeles w 1932 roku. Zginął rozstrzelany przez Niemców w Palmirach w 1940 roku.",
    category: "poland",
    year: 1932,
    emoji: "🏃",
  },
  {
    id: "p3",
    text: "„Orły Górskiego” zdobyły złoto olimpijskie w 1972 roku i 3. miejsce na MŚ 1974. Grzegorz Lato został królem strzelców tamtego mundialu z 7 golami.",
    category: "poland",
    year: 1974,
    emoji: "🦅",
  },
  {
    id: "p4",
    text: "Irena Szewińska zdobywała medale olimpijskie na czterech kolejnych igrzyskach (1964–1976) i jako jedyna w historii lekkoatletyka biła rekordy świata na 100, 200 i 400 m.",
    category: "poland",
    year: 1976,
    emoji: "👑",
  },
  {
    id: "p5",
    text: "Polski „Wunderteam” — lekkoatletyczna reprezentacja z lat 1956–1966 — wygrywał mecze międzypaństwowe z potęgami takimi jak USA i ZSRR, a jego gwiazdami byli m.in. Zdzisław Krzyszkowiak i Józef Szmidt.",
    category: "poland",
    year: 1958,
    emoji: "💪",
  },
  {
    id: "p6",
    text: "Iga Świątek jako pierwsza polska tenisistka (i pierwszy polski tenisista w ogóle) została liderką światowego rankingu w grze pojedynczej — w kwietniu 2022 roku.",
    category: "poland",
    year: 2022,
    emoji: "🎾",
  },
  {
    id: "p7",
    text: "Władysław Kozakiewicz po zwycięskim skoku o tyczce na igrzyskach w Moskwie 1980 pokazał gwiżdżącej radzieckiej publiczności słynny gest, znany dziś jako „gest Kozakiewicza”.",
    category: "poland",
    year: 1980,
    emoji: "💪",
  },
  {
    id: "p8",
    text: "Robert Lewandowski w 2015 roku strzelił 5 goli w 9 minut w meczu Bayernu z Wolfsburgiem — to najszybszy hat-trick, 4 i 5 goli w historii Bundesligi, wpisane do Księgi Rekordów Guinnessa.",
    category: "poland",
    year: 2015,
    emoji: "⚽",
  },

  // === SPORT STAROŻYTNY ===
  {
    id: "an1",
    text: "Starożytni olimpijczycy startowali nago — słowo „gimnastyka” pochodzi od greckiego „gymnos”, czyli „nagi”.",
    category: "ancient",
    emoji: "🏛️",
  },
  {
    id: "an2",
    text: "Na czas starożytnych igrzysk ogłaszano „ekecheirię” — święty rozejm. Wojny przerywano, by zawodnicy i kibice mogli bezpiecznie dotrzeć do Olimpii.",
    category: "ancient",
    emoji: "🕊️",
  },
  {
    id: "an3",
    text: "Jedyną nagrodą na starożytnych igrzyskach był wieniec z gałązek oliwnych — ale w rodzinnych miastach zwycięzcy dostawali dożywotnie wyżywienie, pieniądze i pomniki.",
    category: "ancient",
    emoji: "🫒",
  },
  {
    id: "an4",
    text: "Wyścigi rydwanów w rzymskim Circus Maximus oglądało nawet 250 tysięcy widzów. Najlepszy woźnica, Gajusz Appulejusz Diokles, zarobił w karierze równowartość miliardów dzisiejszych dolarów.",
    category: "ancient",
    emoji: "🏇",
  },
  {
    id: "an5",
    text: "Starożytny pankration — brutalna mieszanka boksu i zapasów, w której zakazane było tylko gryzienie i wydłubywanie oczu — uważany jest za przodka dzisiejszego MMA.",
    category: "ancient",
    emoji: "🥊",
  },
  {
    id: "an6",
    text: "Kobiety nie mogły nawet oglądać starożytnych igrzysk pod karą śmierci. Miały jednak własne zawody — Heraje, biegi ku czci bogini Hery.",
    category: "ancient",
    emoji: "🏺",
  },

  // === REKORDY I KURIOZA ===
  {
    id: "r1",
    text: "Alan Shepard jest jedynym człowiekiem, który grał w golfa na Księżycu — w 1971 roku podczas misji Apollo 14 uderzył dwie piłki przemyconą główką kija golfowego.",
    category: "records",
    year: 1971,
    emoji: "🌕",
  },
  {
    id: "r2",
    text: "Najmłodszym medalistą olimpijskim w historii jest grecki gimnastyk Dimitrios Loundras, który w 1896 roku zdobył brąz drużynowo w wieku 10 lat.",
    category: "records",
    year: 1896,
    emoji: "👶",
  },
  {
    id: "r3",
    text: "Najdłuższy zarejestrowany mecz tenisa stołowego o jeden punkt trwał ponad 2 godziny — w 1936 roku na MŚ w Pradze zawodnicy przebijali piłeczkę ponad 12 tysięcy razy.",
    category: "records",
    year: 1936,
    emoji: "🏓",
  },
  {
    id: "r4",
    text: "W 1998 roku rumuński klub Jiul Petroșani sprzedał piłkarza Iona Radu do drużyny niższej ligi za... 500 kilogramów mięsa. To jeden z najdziwniejszych transferów w historii futbolu.",
    category: "records",
    year: 1998,
    emoji: "🥩",
  },
  {
    id: "r5",
    text: "Maraton olimpijski 1912 „ukończył” Japończyk Shizo Kanakuri — po 54 latach! Zasłabł w trakcie biegu i wrócił do domu, a w 1967 roku zaproszono go, by symbolicznie przekroczył metę.",
    category: "records",
    year: 1912,
    emoji: "⏰",
  },
  {
    id: "r6",
    text: "Najdłuższy mecz w historii sportu zawodowego to pojedynek baseballowy Pawtucket–Rochester z 1981 roku: 33 zmiany rozegrane w ciągu ponad 8 godzin.",
    category: "records",
    year: 1981,
    emoji: "⚾",
  },
  {
    id: "r7",
    text: "Przeciąganie liny było oficjalną dyscypliną olimpijską w latach 1900–1920. Złote medale zdobywały m.in. drużyny policjantów z Londynu.",
    category: "records",
    year: 1920,
    emoji: "🪢",
  },
  {
    id: "r8",
    text: "Podczas biegu na 3000 m z przeszkodami na IO 1932 zawodnicy przebiegli o jedno okrążenie za dużo — sędzia pomylił się w liczeniu. Wyniki i tak uznano.",
    category: "records",
    year: 1932,
    emoji: "🔢",
  },

  // === PIŁKA NOŻNA (cd.) ===
  {
    id: "f12",
    text: "W 1966 roku puchar mistrzostw świata (trofeum Julesa Rimeta) skradziono z wystawy w Londynie tuż przed mundialem. Odnalazł go pod żywopłotem pies o imieniu Pickles.",
    category: "football",
    year: 1966,
    emoji: "🐕",
  },
  {
    id: "f13",
    text: "Najwyższy wynik w historii futbolu: AS Adema pokonała SO l'Emyrne 149:0 (Madagaskar, 2002). Wszystkie gole były samobójcze — przegrani strzelali je w proteście przeciwko sędziemu.",
    category: "football",
    year: 2002,
    emoji: "🤯",
  },
  {
    id: "f14",
    text: "Francuz Just Fontaine strzelił 13 goli na jednym mundialu (Szwecja 1958). Ten rekord pozostaje niepobity od ponad 60 lat.",
    category: "football",
    year: 1958,
    emoji: "🎯",
  },
  {
    id: "f15",
    text: "Mundial w Szwajcarii w 1954 roku był pierwszym transmitowanym w telewizji. Finał Niemcy–Węgry 3:2 przeszedł do historii jako „cud w Bernie”.",
    category: "football",
    year: 1954,
    emoji: "📺",
  },
  {
    id: "f16",
    text: "Kameruńczyk Roger Milla jest najstarszym strzelcem gola na mistrzostwach świata — trafił do siatki na mundialu 1994 w wieku 42 lat.",
    category: "football",
    year: 1994,
    emoji: "👴",
  },
  {
    id: "f17",
    text: "FC Barcelona przez ponad sto lat nie miała sponsora na koszulkach. Pierwszym „sponsorem” w 2006 roku został UNICEF — i to klub płacił organizacji, a nie odwrotnie.",
    category: "football",
    year: 2006,
    emoji: "👕",
  },

  // === OLIMPIADY (cd.) ===
  {
    id: "o12",
    text: "Na igrzyskach w Paryżu w 1900 roku jedyny raz w historii strzelano do żywych gołębi. Rozegrano tam też zawody w krokiecie i przeciąganiu liny.",
    category: "olympics",
    year: 1900,
    emoji: "🐦",
  },
  {
    id: "o13",
    text: "Do 1992 roku zimowe i letnie igrzyska odbywały się w tym samym roku. Dopiero od Lillehammer 1994 rozdzielono je dwuletnim odstępem.",
    category: "olympics",
    year: 1994,
    emoji: "🗓️",
  },
  {
    id: "o14",
    text: "Etiopczyk Abebe Bikila wygrał maraton olimpijski w Rzymie w 1960 roku, biegnąc całą trasę boso. Cztery lata później obronił tytuł — już w butach.",
    category: "olympics",
    year: 1960,
    emoji: "🦶",
  },
  {
    id: "o15",
    text: "Igrzyska 1956 odbyły się w... dwóch krajach. Przez kwarantannę koni w Australii konkurencje jeździeckie rozegrano w Sztokholmie, a resztę w Melbourne.",
    category: "olympics",
    year: 1956,
    emoji: "🐴",
  },
  {
    id: "o16",
    text: "Pierre de Coubertin, twórca nowożytnych igrzysk, sam zdobył złoty medal olimpijski — w konkursie literatury w 1912 roku, za „Odę do sportu” zgłoszoną pod pseudonimem.",
    category: "olympics",
    year: 1912,
    emoji: "✍️",
  },

  // === LEKKOATLETYKA (cd.) ===
  {
    id: "a9",
    text: "Emil Zátopek dokonał na IO 1952 rzeczy niemożliwej: wygrał 5000 m, 10 000 m i maraton — który biegł pierwszy raz w życiu. Nikt nigdy tego nie powtórzył.",
    category: "athletics",
    year: 1952,
    emoji: "🚂",
  },
  {
    id: "a10",
    text: "Rekordy świata Florence Griffith-Joyner na 100 m (10,49 s) i 200 m (21,34 s) pochodzą z 1988 roku i wciąż pozostają niepobite.",
    category: "athletics",
    year: 1988,
    emoji: "💅",
  },
  {
    id: "a11",
    text: "Rekord świata w biegu na milę — 3:43,13 Marokańczyka Hichama El Guerrouja — pochodzi z 1999 roku i jest jednym z najtrwalszych w lekkoatletyce.",
    category: "athletics",
    year: 1999,
    emoji: "⏱️",
  },
  {
    id: "a12",
    text: "Szwed Armand Duplantis poprawiał rekord świata w skoku o tyczce kilkanaście razy — niemal zawsze o dokładnie 1 centymetr, wzorem Siergieja Bubki.",
    category: "athletics",
    year: 2025,
    emoji: "🪜",
  },

  // === TENIS (cd.) ===
  {
    id: "t8",
    text: "Martina Navratilova wygrała Wimbledon w singlu rekordowe 9 razy, a swój ostatni wielkoszlemowy tytuł (w mikście) zdobyła w wieku 49 lat.",
    category: "tennis",
    year: 2006,
    emoji: "🏆",
  },
  {
    id: "t9",
    text: "Rafael Nadal wygrał Roland Garros 14 razy. Jego bilans meczów na kortach Paryża to 112 zwycięstw i zaledwie 4 porażki.",
    category: "tennis",
    year: 2022,
    emoji: "🟠",
  },
  {
    id: "t10",
    text: "Do 1968 roku w turniejach wielkoszlemowych mogli grać wyłącznie amatorzy. Dopiero „era open” dopuściła zawodowców i nagrody pieniężne.",
    category: "tennis",
    year: 1968,
    emoji: "💰",
  },

  // === KOSZYKÓWKA (cd.) ===
  {
    id: "b7",
    text: "Najniższym graczem w historii NBA był Muggsy Bogues — 160 cm wzrostu. Mimo to zablokował w karierze 39 rzutów, w tym rzut 213-centymetrowego Patricka Ewinga.",
    category: "basketball",
    year: 1993,
    emoji: "📏",
  },
  {
    id: "b8",
    text: "Bill Russell zdobył z Boston Celtics 11 mistrzostw NBA w ciągu 13 sezonów — żaden zawodnik w amerykańskich ligach nie ma więcej pierścieni.",
    category: "basketball",
    year: 1969,
    emoji: "💍",
  },
  {
    id: "b9",
    text: "Pierwszy w historii mecz koszykówki (1891) zakończył się wynikiem 1:0. Jedyny celny rzut oddano z odległości ponad 7 metrów.",
    category: "basketball",
    year: 1891,
    emoji: "1️⃣",
  },

  // === SIATKÓWKA (cd.) ===
  {
    id: "v8",
    text: "Amerykanin Karch Kiraly to jedyny siatkarz w historii ze złotem olimpijskim i w hali (1984, 1988), i na plaży (1996).",
    category: "volleyball",
    year: 1996,
    emoji: "🏖️",
  },
  {
    id: "v9",
    text: "Siatkówka halowa zadebiutowała na igrzyskach w Tokio w 1964 roku. Pierwsze złoto wśród mężczyzn zdobył ZSRR, a wśród kobiet — Japonki.",
    category: "volleyball",
    year: 1964,
    emoji: "🇯🇵",
  },

  // === MOTORSPORT (cd.) ===
  {
    id: "m7",
    text: "Sebastian Vettel został najmłodszym mistrzem świata F1 w historii — tytuł z 2010 roku zdobył mając 23 lata i 134 dni.",
    category: "motorsport",
    year: 2010,
    emoji: "👶",
  },
  {
    id: "m8",
    text: "Ayrton Senna na GP Europy 1993 w Donington awansował w deszczu z 5. na 1. miejsce w ciągu jednego okrążenia. To okrążenie uchodzi za najlepsze w historii F1.",
    category: "motorsport",
    year: 1993,
    emoji: "🌧️",
  },
  {
    id: "m9",
    text: "Rajd Dakar przez dekady prowadził z Paryża do stolicy Senegalu. Ze względów bezpieczeństwa przeniesiono go najpierw do Ameryki Południowej (2009), a od 2020 roku odbywa się w Arabii Saudyjskiej.",
    category: "motorsport",
    year: 2020,
    emoji: "🏜️",
  },

  // === SPORTY WALKI (cd.) ===
  {
    id: "c7",
    text: "Mike Tyson został najmłodszym mistrzem świata wagi ciężkiej w historii — pas WBC zdobył w 1986 roku, mając 20 lat i 4 miesiące.",
    category: "combat",
    year: 1986,
    emoji: "🐅",
  },
  {
    id: "c8",
    text: "W 1976 roku Muhammad Ali stoczył w Tokio pokazową walkę z zapaśnikiem Antonio Inokim. Dziwaczny pojedynek bokser kontra zapaśnik uchodzi dziś za prekursora MMA.",
    category: "combat",
    year: 1976,
    emoji: "🤼",
  },
  {
    id: "c9",
    text: "Chabib Nurmagomiedow zakończył karierę w UFC z bilansem 29 zwycięstw i 0 porażek — jako niepokonany mistrz wagi lekkiej.",
    category: "combat",
    year: 2020,
    emoji: "🦅",
  },

  // === SPORTY ZIMOWE (cd.) ===
  {
    id: "w8",
    text: "Biathlon wywodzi się bezpośrednio z wojska — z ćwiczeń norweskich patroli narciarskich. Na igrzyskach do 1948 roku istniała nawet konkurencja „patrol wojskowy”.",
    category: "winter",
    year: 1948,
    emoji: "🎖️",
  },
  {
    id: "w9",
    text: "Norweska biegaczka Marit Bjørgen to najbardziej utytułowana zimowa olimpijka w historii: 15 medali, w tym 8 złotych.",
    category: "winter",
    year: 2018,
    emoji: "🇳🇴",
  },
  {
    id: "w10",
    text: "Wojciech Fortuna zdobył w Sapporo 1972 pierwsze zimowe złoto dla Polski — w skokach narciarskich. Do sukcesu Małysza pozostawał jedynym polskim medalistą zimowych igrzysk w skokach.",
    category: "winter",
    year: 1972,
    emoji: "🎿",
  },

  // === SPORTY WODNE (cd.) ===
  {
    id: "s6",
    text: "Mark Spitz zdobył w Monachium 1972 siedem złotych medali — i w każdym z siedmiu startów pobił rekord świata. Jego wyczyn przebił dopiero Phelps w 2008 roku.",
    category: "water",
    year: 1972,
    emoji: "🥇",
  },
  {
    id: "s7",
    text: "Skoczek do wody Greg Louganis uderzył głową w trampolinę podczas eliminacji na IO 1988. Mimo szwów na głowie następnego dnia zdobył złoty medal.",
    category: "water",
    year: 1988,
    emoji: "🤕",
  },

  // === KOLARSTWO (cd.) ===
  {
    id: "k6",
    text: "Eddy Merckx, zwany „Kanibalem”, odniósł około 525 zawodowych zwycięstw — wygrał m.in. po 5 razy Tour de France i Giro d'Italia. Uchodzi za najlepszego kolarza wszech czasów.",
    category: "cycling",
    year: 1974,
    emoji: "🍽️",
  },
  {
    id: "k7",
    text: "Rekord godzinny to najbardziej prestiżowy rekord kolarstwa torowego: ile kilometrów da się przejechać w 60 minut. Merckx wybrał na próbę w 1972 roku miasto Meksyk — dla rzadszego powietrza.",
    category: "cycling",
    year: 1972,
    emoji: "⏰",
  },

  // === POLSKI SPORT (cd.) ===
  {
    id: "p9",
    text: "Anita Włodarczyk to trzykrotna mistrzyni olimpijska w rzucie młotem i pierwsza kobieta w historii, która rzuciła ponad 80 metrów. Jej rekord świata to 82,98 m.",
    category: "poland",
    year: 2016,
    emoji: "🔨",
  },
  {
    id: "p10",
    text: "Widzew Łódź dotarł w 1983 roku do półfinału Pucharu Europy, eliminując po drodze wielki Liverpool. To jeden z największych sukcesów polskich klubów w Europie.",
    category: "poland",
    year: 1983,
    emoji: "⚽",
  },
  {
    id: "p11",
    text: "Wanda Rutkiewicz jako pierwsza osoba z Polski i trzecia kobieta na świecie stanęła na Mount Everest — 16 października 1978 roku, w dniu wyboru Karola Wojtyły na papieża.",
    category: "poland",
    year: 1978,
    emoji: "🏔️",
  },
  {
    id: "p12",
    text: "Tomasz Gollob po niemal dwóch dekadach ścigania się o tytuł został indywidualnym mistrzem świata na żużlu w 2010 roku, w wieku 39 lat.",
    category: "poland",
    year: 2010,
    emoji: "🏍️",
  },
  {
    id: "p13",
    text: "Aleksandra Mirosław zdobyła złoto olimpijskie w Paryżu 2024 we wspinaczce sportowej na czas. Wielokrotnie biła rekord świata, schodząc poniżej 6,1 sekundy na 15-metrowej ścianie.",
    category: "poland",
    year: 2024,
    emoji: "🧗",
  },

  // === SPORT STAROŻYTNY (cd.) ===
  {
    id: "an7",
    text: "Milon z Krotonu, sześciokrotny mistrz olimpijski w zapasach z VI w. p.n.e., według legendy trenował nosząc na barkach cielaka — codziennie, aż ten wyrósł na byka.",
    category: "ancient",
    emoji: "🐂",
  },
  {
    id: "an8",
    text: "Spartanka Kyniska została pierwszą kobietą „zwyciężczynią” starożytnych igrzysk — jako właścicielka zwycięskiego zaprzęgu konnego. Wieniec przyznawano bowiem właścicielowi, nie woźnicy.",
    category: "ancient",
    emoji: "🐎",
  },

  // === REKORDY I KURIOZA (cd.) ===
  {
    id: "r9",
    text: "Najdłuższa partia szachowa w historii turniejów: Nikolić–Arsović (Belgrad 1989) trwała 269 posunięć i ponad 20 godzin gry. Zakończyła się remisem.",
    category: "records",
    year: 1989,
    emoji: "♟️",
  },
  {
    id: "r10",
    text: "Magnus Carlsen osiągnął najwyższy ranking szachowy w historii — 2882 punkty. Mistrzem świata był nieprzerwanie od 2013 do 2023 roku, po czym... sam zrezygnował z obrony tytułu.",
    category: "records",
    year: 2013,
    emoji: "♚",
  },
  {
    id: "r11",
    text: "Pula nagród turnieju e-sportowego The International w Dota 2 przekroczyła w 2021 roku 40 milionów dolarów — więcej niż w wielu klasycznych turniejach sportowych.",
    category: "records",
    year: 2021,
    emoji: "🎮",
  },
  {
    id: "r12",
    text: "Japoński zapaśnik sumo Hakuhō wygrał rekordowe 45 wielkich turniejów. Wielcy mistrzowie (yokozuna) nie mogą zostać zdegradowani — mogą tylko odejść z honorem.",
    category: "records",
    year: 2021,
    emoji: "🇯🇵",
  },
  {
    id: "r13",
    text: "Fred Lorz „wygrał” maraton olimpijski 1904, ale wyszło na jaw, że 18 km trasy przejechał samochodem. Dożywotnią dyskwalifikację cofnięto po przeprosinach — rok później uczciwie wygrał maraton bostoński.",
    category: "records",
    year: 1904,
    emoji: "🚗",
  },
];

export function getRandomFact(category: string, facts: Fact[] = FACTS_DB): Fact {
  const pool = category === "all" ? facts : facts.filter((f) => f.category === category);
  const usable = pool.length > 0 ? pool : facts;
  return usable[Math.floor(Math.random() * usable.length)];
}

export function getFactsByCategory(category: string, facts: Fact[] = FACTS_DB): Fact[] {
  return category === "all" ? facts : facts.filter((f) => f.category === category);
}

export function searchFacts(query: string, facts: Fact[] = FACTS_DB): Fact[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return facts.filter((f) => {
    const cat = CATEGORIES.find((c) => c.id === f.category);
    return (
      f.text.toLowerCase().includes(q) ||
      (cat && cat.label.toLowerCase().includes(q)) ||
      (f.year !== undefined && String(f.year).includes(q))
    );
  });
}
