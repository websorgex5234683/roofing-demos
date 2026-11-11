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
    name: "J.R. Roofing and Construction, LLC",            // Название компании, напр. "Smith Roofing LLC"
    ownerName: "",       // Имя владельца (если известно)
    tagline: "",         // Слоган, если есть у них самих. Пусто -> "Roofing Contractor in Город, Штат"
    phone: "(903) 471-8877",           // Телефон как пишется: "(813) 555-1234"
    email: "",
    address: "3800 Paluxy Dr Ste. 130, Tyler, TX 75703",         // Полный адрес. Пусто, если работают без офиса
    city: "Tyler",            // Главный город, напр. "Tampa"
    state: "TX",           // "FL" или "TX"
    hours: ["Mon–Sat: 7am – 7pm", "Sun: Closed"],           // напр. ["Mon–Fri: 7am – 6pm", "Sat: 8am – 2pm"]
    logo: "",            // путь к файлу логотипа, напр. "images/logo.png"
    heroImage: "",       // большое фото сверху (их крыша/бригада), напр. "images/hero.jpg"
    googleReviewsUrl: "",// ссылка на их отзывы в Google
    facebookUrl: "https://www.facebook.com/jrroofingtylertx",
  },

  // ---- Факты для блока "Почему нам доверять" (только подтверждённые!) ----
  trust: {
    license: "",           // Номер лицензии, напр. "CCC1234567" (во Флориде проверяется на myfloridalicense.com)
    insured: false,        // true только если они сами пишут, что застрахованы
    yearsInBusiness: "",   // напр. 15
    foundedYear: "",       // напр. 2009 (если известен год, а не стаж)
    googleRating: "5.0",      // напр. 4.9
    googleReviewCount: "7", // напр. 87
    certifications: [],    // напр. ["GAF Certified Contractor", "Owens Corning Preferred"]
    warranty: "",          // как пишут они сами, напр. "10-Year Workmanship Warranty"
    insuranceClaims: true,// true, если помогают со страховыми случаями
    financing: false,      // true, если есть рассрочка
    emergency247: false,   // true, если аварийный выезд 24/7
    familyOwned: true,    // true, если семейный бизнес
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
    { name: "Russell W. Brown", stars: 5, text: "JR Roofing did an EXCELLENT JOB replacing my roof and gutters! He dealt with the insurance company, to make it a hassle free process! I would highly recommend him to anyone who needs roofing repair or a new roof.", source: "Google" },
    { name: "Susan Tillman", stars: 5, text: "JR Roofing and Construction were referred to us by Stringham Lumber. We love dealing with family owned businesses and we were not disappointed. Always on time, thorough and wonderful to work with.", source: "Google" },
    { name: "Michelle Cooper", stars: 5, text: "J.R. Roofing did an amazing job on my roof! I needed them in a pinch due to a leaky roof after a storm and they jumped right on it and got the job done quick! Jason is professional, easy to get ahold of and easy to work with - I highly recommend them!", source: "Google" },
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
