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
    name: "Roof Masters Inc",            // Название компании, напр. "Smith Roofing LLC"
    ownerName: "",       // Имя владельца (если известно)
    tagline: "",         // Слоган, если есть у них самих. Пусто -> "Roofing Contractor in Город, Штат"
    phone: "(352) 402-4388",           // Телефон как пишется: "(813) 555-1234"
    email: "",
    address: "5065 SE 38th St, Ocala, FL 34480",         // Полный адрес. Пусто, если работают без офиса
    city: "Ocala",            // Главный город, напр. "Tampa"
    state: "FL",           // "FL" или "TX"
    hours: ["Mon–Sat: Open 24 hours", "Sun: Closed"],           // напр. ["Mon–Fri: 7am – 6pm", "Sat: 8am – 2pm"]
    logo: "",            // путь к файлу логотипа, напр. "images/logo.png"
    heroImage: "",       // большое фото сверху (их крыша/бригада), напр. "images/hero.jpg"
    googleReviewsUrl: "",// ссылка на их отзывы в Google
    facebookUrl: "",
  },

  // ---- Факты для блока "Почему нам доверять" (только подтверждённые!) ----
  trust: {
    license: "",           // Номер лицензии, напр. "CCC1234567" (во Флориде проверяется на myfloridalicense.com)
    insured: false,        // true только если они сами пишут, что застрахованы
    yearsInBusiness: "",   // напр. 15
    foundedYear: "",       // напр. 2009 (если известен год, а не стаж)
    googleRating: "",      // напр. 4.9
    googleReviewCount: "", // напр. 87
    certifications: [],    // напр. ["GAF Certified Contractor", "Owens Corning Preferred"]
    warranty: "",          // как пишут они сами, напр. "10-Year Workmanship Warranty"
    insuranceClaims: false,// true, если помогают со страховыми случаями
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
    { name: "Jeff Billingsley", stars: 5, text: "I've had nothing but great service from Jim. He installed a new roof about 15 years ago. He highly suggested the architectural shingles and I am very glad he did. Many years AFTER the warranty expired, I developed a leak. Like most roof leaks, they are very hard to locate. Mine was that type. By process of elimination, Jim was finally able to locate the leak and fix it once and for all. Much to my chagrin, he never accepted payment for the service calls or the labor to fix it. He said, \"If this fixes it, then we'll talk.\" Who does this?! My roof STILL looks great.", source: "Google" },
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
