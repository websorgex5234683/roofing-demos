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
    name: "Tyler Roofing",            // Название компании, напр. "Smith Roofing LLC"
    ownerName: "",       // Имя владельца (если известно)
    tagline: "",         // Слоган, если есть у них самих. Пусто -> "Roofing Contractor in Город, Штат"
    phone: "(903) 260-0218",           // Телефон как пишется: "(813) 555-1234"
    email: "",
    address: "2304 W Gentry Pkwy, Tyler, TX 75702",         // Полный адрес. Пусто, если работают без офиса
    city: "Tyler",            // Главный город, напр. "Tampa"
    state: "TX",           // "FL" или "TX"
    hours: ["Mon–Fri: 8am – 8pm", "Sat–Sun: 9am – 6pm"],           // напр. ["Mon–Fri: 7am – 6pm", "Sat: 8am – 2pm"]
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
    googleRating: "4.2",      // напр. 4.9
    googleReviewCount: "10", // напр. 87
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
    { name: "K Sam", stars: 5, text: "These guys are the best!! They came out and installed new roof on my house, working around their busy schedule to get it done. Took the time to answer all of my questions and return all my calls. We had a wonderful experience and would choose them again for roof work. Chris is such a great person to work with and takes his time to address any concerns. I do recommend this company!!", source: "Google" },
    { name: "Robert Parker", stars: 5, text: "We experienced a roof leak in our barn during recent heavy rains. Tyler Roofing installed the roof 6-7 years ago when the barn was built. All it took was one call - they remembered us as customers and had the problem identified and fixed within 2 days. They are very professional and courteous people that clearly understand customer service and support.", source: "Google" },
    { name: "Annette Scott", stars: 5, text: "Tyler Roofing Company did a follow up visit on a repair and did not charge for the visit. They were helpful, responsible and went above and beyond to make sure everything was repaired correctly. Thank you!", source: "Google" },
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
