/* =====================================================================
   АНКЕТА КЛИЕНТА (кровельщик). Заполняй ТОЛЬКО то, что точно знаешь
   (Google-профиль, Facebook, Yelp, лицензия на сайте штата).
   Пустое поле ""  или пустой список []  -> блок на сайте просто не появится.
   true / false -> да / нет.
   ===================================================================== */
window.SITE = {

  // true = демо (жёлтая полоска сверху, форма не отправляет заявки).
  // false = оплаченный, "боевой" сайт.
  demo: true,

  business: {
    name: "Northeast Florida Roofing, Inc.",            // Название компании, напр. "Smith Roofing LLC"
    ownerName: "",       // Имя владельца (если известно)
    tagline: "",         // Слоган, если есть у них самих. Пусто -> "Roofing Contractor in Город, Штат"
    phone: "(386) 937-2598",           // Телефон как пишется: "(813) 555-1234"
    email: "",
    address: "178 Pinecrest Cir, San Mateo, FL 32187",         // Полный адрес. Пусто, если работают без офиса
    city: "San Mateo",            // Главный город, напр. "Tampa"
    state: "FL",           // "FL" или "TX"
    hours: ["Mon–Sun: 9am – 8pm"],           // напр. ["Mon–Fri: 7am – 6pm", "Sat: 8am – 2pm"]
    logo: "",            // путь к файлу логотипа, напр. "images/logo.png"
    heroImage: "",       // большое фото сверху (их крыша/бригада), напр. "images/hero.jpg"
    googleReviewsUrl: "",// ссылка на их отзывы в Google
    facebookUrl: "https://www.facebook.com/p/Northeast-Florida-Roofing-61566958793525",
  },

  // ---- Факты для блока "Почему нам доверять" (только подтверждённые!) ----
  trust: {
    license: "",           // Номер лицензии, напр. "CCC1234567" (во Флориде проверяется на myfloridalicense.com)
    insured: false,        // true только если они сами пишут, что застрахованы
    yearsInBusiness: "",   // напр. 15
    foundedYear: "",       // напр. 2009 (если известен год, а не стаж)
    googleRating: "5.0",      // напр. 4.9
    googleReviewCount: "6", // напр. 87
    certifications: [],    // напр. ["GAF Certified Contractor", "Owens Corning Preferred"]
    warranty: "",          // как пишут они сами, напр. "10-Year Workmanship Warranty"
    insuranceClaims: true,// true, если помогают со страховыми случаями
    financing: false,      // true, если есть рассрочка
    emergency247: false,   // true, если аварийный выезд 24/7
    familyOwned: false,    // true, если семейный бизнес
  },

  // Дополнительные пункты "почему мы", если есть что-то своё:
  // [{ title: "Owner on every job", text: "..." }]
  whyUs: [],

  // ---- Услуги (только те, что они реально указывают) ----
  // [{ title: "Roof Repair", text: "Короткое описание (можно пусто)" }]
  // Иконка подбирается сама по словам: repair, replace, shingle, metal, tile, flat, storm, gutter, inspection, leak...
  services: [],

  // ---- Районы, где работают ----
  serviceAreas: [],      // напр. ["Tampa", "Brandon", "Riverview"]
  showMap: true,         // карта Google по адресу/городу на странице контактов

  // ---- Отзывы (копировать дословно из Google/Facebook) ----
  // [{ name: "John D.", stars: 5, text: "…", source: "Google" }]
  reviews: [
    { name: "Ashley Darby", stars: 5, text: "We used Northeast Florida Roofing last year and have nothing but positive feedback. Kyle was informative and easy to work with. My husband and I obviously had different visions for the metal roof color. Kyle was able to talk through our options and we were able to settle on a mutual color. Overall Northeast Florida Roofing was 10+ out of 10 and I would recommend them to my family and friends!", source: "Google" },
    { name: "Paula Hollingsworth", stars: 5, text: "Northeast Florida roofing has replaced my roof and about seven roofs in my neighborhood in Clay County. They all still look wonderful, they were easy to work with, and some people had to use their insurance which Northeast Florida Roofing was able to provide help with that too.", source: "Google" },
    { name: "James McDaniel", stars: 5, text: "I called Kyle with Northeast Roofing and he came out the same day to give me an estimate about 40% less than I had feared it would be. His crew was here and done in a day and a half. My roof is a fortress now. Highly recommend. Also did a great job cleaning up.", source: "Google" },
  ],

  // ---- Работы (страница "Our Work") ----
  // До/после:  { title: "Shingle replacement", city: "Tampa", before: "images/p1-before.jpg", after: "images/p1-after.jpg" }
  // Одно фото: { title: "Metal roof", city: "Brandon", photo: "images/p2.jpg" }
  projects: [],

  // ---- Вопросы-ответы (только если ответы известны от них самих) ----
  // [{ q: "Do you work with insurance companies?", a: "…" }]
  faq: [],

  // ---- Форма заявки (для оплаченного сайта) ----
  // endpoint: адрес Formspree, напр. "https://formspree.io/f/xxxxxx"
  // Пусто -> форма откроет письмо на business.email. Нет и email -> формы нет, только кнопка звонка.
  form: { endpoint: "" },

  // ---- Внешний вид ----
  theme: {
    accent: "#E8702A",   // главный цвет кнопок (можно подогнать под их логотип)
  },
};
