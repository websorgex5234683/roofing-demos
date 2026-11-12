/* Движок сайта. Трогать не нужно — всё меняется в config.js */
(function () {
  "use strict";
  var S = window.SITE || {};
  var B = S.business || {};
  var T = S.trust || {};
  var page = document.body.getAttribute("data-page") || "home";

  // ---------- helpers ----------
  function has(v) {
    if (Array.isArray(v)) return v.length > 0;
    return v !== undefined && v !== null && v !== false && String(v).trim() !== "";
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function tel(p) { return "tel:" + String(p).replace(/[^\d+]/g, ""); }
  function list(a) { return Array.isArray(a) ? a.filter(has) : []; }
  function $(id) { return document.getElementById(id); }
  function put(id, html) { var el = $(id); if (el) el.innerHTML = html || ""; }

  var where = [B.city, B.state].filter(has).join(", ");
  var inspLabel = "Request a Roof Inspection";
  var inspShort = "Get an Inspection";
  var areas = list(S.serviceAreas);
  var reviews = list(S.reviews);
  var projects = list(S.projects);
  var services = list(S.services);
  var faq = list(S.faq).filter(function (f) { return has(f.q) && has(f.a); });

  // ---------- icons ----------
  var I = {
    phone: '<path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" fill="currentColor"/>',
    roof: '<path d="M3 12 12 4l9 8M6 10v9h12v-9" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    repair: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    storm: '<path d="M7 15a4 4 0 0 1 .5-8 5.5 5.5 0 0 1 10.4 1.5A3.5 3.5 0 0 1 17.5 15M13 12l-3 5h4l-3 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>',
    drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" fill="none" stroke="currentColor" stroke-width="2"/>',
    gutter: '<path d="M3 6h18v4a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zM17 13v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    search: '<circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="m20 20-4.5-4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5zM3 13l9 5 9-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    building: '<path d="M4 21V9l8-5 8 5v12M4 21h16M9 21v-6h6v6" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    shield: '<path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6zM8.5 12l2.5 2.5 4.5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>',
    badge: '<circle cx="12" cy="9" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    star: '<path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3-4.6-4.4 6.3-.9z" fill="currentColor"/>',
    clock: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    dollar: '<path d="M12 3v18M16.5 7.5c-.8-1.2-2.4-2-4.5-2-2.5 0-4 1.3-4 3s1.5 2.6 4 3 4 1.4 4 3.2-1.6 3-4 3c-2.2 0-3.8-.9-4.6-2.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    home: '<path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    doc: '<path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    pin: '<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="9" r="2.5" fill="currentColor"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="m3 7 9 6 9-6" fill="none" stroke="currentColor" stroke-width="2"/>',
    check: '<path d="m5 12 4.5 4.5L19 7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  };
  function ic(n, cls) { return '<svg class="ic ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true">' + (I[n] || I.roof) + "</svg>"; }
  function serviceIcon(t) {
    t = String(t).toLowerCase();
    if (/storm|hurricane|hail|wind|emergency|tarp/.test(t)) return "storm";
    if (/leak|water/.test(t)) return "drop";
    if (/gutter/.test(t)) return "gutter";
    if (/inspect|assess/.test(t)) return "search";
    if (/repair|fix|patch/.test(t)) return "repair";
    if (/commercial|flat|tpo|modified|built-up/.test(t)) return "building";
    if (/shingle|tile|metal|replace|install|new|re-?roof/.test(t)) return "layers";
    return "roof";
  }
  function stars(n) {
    var k = Math.max(0, Math.min(5, Math.round(Number(n) || 0))), h = "";
    for (var i = 0; i < k; i++) h += ic("star");
    return '<span class="stars" aria-label="' + k + ' out of 5 stars">' + h + "</span>";
  }

  // ---------- theme ----------
  if (S.theme && has(S.theme.accent)) document.documentElement.style.setProperty("--accent", S.theme.accent);

  // ---------- head ----------
  var titles = { home: "", work: "Our Work · ", inspection: inspLabel + " · " };
  if (has(B.name)) {
    document.title = (titles[page] || "") + B.name + (where ? " | Roofing Contractor in " + where : " | Roofing Contractor");
  }
  var md = document.querySelector('meta[name="description"]');
  if (md && has(B.name)) md.setAttribute("content", B.name + " — roofing contractor" + (where ? " in " + where : "") + ". " + (has(B.phone) ? "Call " + B.phone + ". " : "") + inspLabel + ".");

  // ---------- demo bar ----------
  if (S.demo) {
    put("demo", '<div class="demo-bar"><strong>Demo preview</strong> — a free sample website' + (has(B.name) ? " made for " + esc(String(B.name).replace(/\.$/, "")) : "") + ". Not published.</div>");
  }

  // ---------- header ----------
  var brand = has(B.logo)
    ? '<img src="' + esc(B.logo) + '" alt="' + esc(B.name || "Logo") + '" class="logo">'
    : '<span class="brand-mark">' + ic("roof") + '</span><span class="brand-name">' + esc(B.name || "") + "</span>";
  var nav = [["index.html", "Home", "home"], ["work.html", "Our Work", "work"], ["inspection.html", inspShort, "inspection"]]
    .map(function (n) { return '<a href="' + n[0] + '"' + (page === n[2] ? ' aria-current="page"' : "") + ">" + n[1] + "</a>"; }).join("");
  put("header",
    '<div class="wrap head-row"><a class="brand" href="index.html">' + brand + "</a>" +
    '<nav class="nav">' + nav + "</nav>" +
    (has(B.phone) ? '<a class="btn btn-call head-call" href="' + tel(B.phone) + '">' + ic("phone") + "<span>" + esc(B.phone) + "</span></a>" : "") +
    "</div>");

  // ---------- trust facts (used in several places) ----------
  var facts = [];
  var yrs = has(T.yearsInBusiness) ? T.yearsInBusiness : "";
  if (has(T.googleRating)) facts.push({ i: "star", chip: T.googleRating + " ★ on Google" + (has(T.googleReviewCount) ? " (" + T.googleReviewCount + " reviews)" : ""), t: T.googleRating + "-Star Google Rating", d: has(T.googleReviewCount) ? "Rated by " + T.googleReviewCount + " customers on Google." : "Rated by local customers on Google." });
  if (has(T.license)) facts.push({ i: "doc", chip: "License #" + T.license, t: "Licensed Roofing Contractor", d: "State license #" + T.license + "." });
  if (T.insured === true) facts.push({ i: "shield", chip: "Fully Insured", t: "Fully Insured", d: "Your home is protected while we work on it." });
  if (has(yrs)) facts.push({ i: "cal", chip: yrs + "+ Years", t: yrs + "+ Years in Business", d: "Roofs" + (where ? " in " + where : "") + " for over " + yrs + " years." });
  else if (has(T.foundedYear)) facts.push({ i: "cal", chip: "Since " + T.foundedYear, t: "In Business Since " + T.foundedYear, d: "A local roofing company since " + T.foundedYear + "." });
  list(T.certifications).forEach(function (c) { facts.push({ i: "badge", chip: c, t: c, d: "Manufacturer-certified installation." }); });
  if (has(T.warranty)) facts.push({ i: "shield", chip: T.warranty, t: T.warranty, d: "Ask us for the full warranty details." });
  if (T.insuranceClaims === true) facts.push({ i: "doc", chip: "Insurance Claim Help", t: "We Help With Insurance Claims", d: "We document roof damage so you can file your claim." });
  if (T.emergency247 === true) facts.push({ i: "clock", chip: "24/7 Emergency", t: "24/7 Emergency Service", d: "Leak or storm damage? Call any time, day or night." });
  if (T.financing === true) facts.push({ i: "dollar", chip: "Financing Available", t: "Financing Available", d: "Ask about payment options for your new roof." });
  if (T.familyOwned === true) facts.push({ i: "home", chip: "Family-Owned", t: "Family-Owned & Local", d: "A local family business, not a call center." });
  list(S.whyUs).forEach(function (w) { if (has(w.title)) facts.push({ i: "check", t: w.title, d: w.text || "" }); });

  function chips(max) {
    var c = facts.filter(function (f) { return f.chip; }).slice(0, max || 4);
    if (!c.length) return "";
    return '<ul class="chips">' + c.map(function (f) { return "<li>" + ic(f.i) + esc(f.chip) + "</li>"; }).join("") + "</ul>";
  }
  function ctaButtons(dark) {
    var h = "";
    if (has(B.phone)) h += '<a class="btn btn-call btn-lg" href="' + tel(B.phone) + '">' + ic("phone") + "Call " + esc(B.phone) + "</a>";
    if (page !== "inspection") h += '<a class="btn btn-ghost btn-lg' + (dark ? " on-dark" : "") + '" href="inspection.html">' + inspLabel + ic("arrow") + "</a>";
    return h ? '<div class="btn-row">' + h + "</div>" : "";
  }
  function areasLine() {
    if (!areas.length) return "";
    return '<p class="areas-line">' + ic("pin") + "<span><strong>Serving:</strong> " + areas.map(esc).join(" · ") + "</span></p>";
  }
  function ctaBand(title) {
    if (!has(B.phone) && page === "inspection") return "";
    return '<section class="cta-band"><div class="wrap cta-inner"><div><h2>' + (title || "Worried about your roof?") + "</h2>" +
      "<p>" + "Tell us what's going on and we'll get back to you." + "</p></div>" +
      ctaButtons(true) + "</div></section>";
  }

  var houseSvg =
    '<svg class="house" viewBox="0 0 420 320" aria-hidden="true">' +
    '<defs><pattern id="sh" width="28" height="16" patternUnits="userSpaceOnUse"><path d="M0 15.5h28M14 0v16" stroke="rgba(255,255,255,.18)" stroke-width="1.2"/></pattern></defs>' +
    '<rect x="78" y="168" width="264" height="140" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.35)" stroke-width="2"/>' +
    '<rect x="282" y="60" width="30" height="70" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.35)" stroke-width="2"/>' +
    '<path d="M40 178 210 48l170 130z" fill="url(#sh)" stroke="var(--accent)" stroke-width="5" stroke-linejoin="round"/>' +
    '<path d="M30 186 210 48l180 138" fill="none" stroke="var(--accent)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<rect x="186" y="228" width="48" height="80" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.35)" stroke-width="2"/>' +
    '<rect x="106" y="206" width="52" height="44" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.35)" stroke-width="2"/>' +
    '<rect x="262" y="206" width="52" height="44" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.35)" stroke-width="2"/>' +
    '<path d="M20 308h380" stroke="rgba(255,255,255,.35)" stroke-width="2"/></svg>';

  // ---------- page header (inner pages) ----------
  function pageHead(kicker, title, sub) {
    return '<section class="page-head"><div class="wrap"><p class="kicker">' + esc(kicker) + "</p><h1>" + title + "</h1>" +
      (sub ? '<p class="lead">' + sub + "</p>" : "") + "</div></section>";
  }

  // ---------- sections ----------
  function hero() {
    var h1 = has(B.tagline) ? esc(B.tagline) : "Roofing Contractor" + (where ? " in <span>" + esc(where) + "</span>" : "");
    var bg = has(B.heroImage) ? ' style="--hero-img:url(\'' + esc(B.heroImage) + '\')"' : "";
    return '<section class="hero' + (has(B.heroImage) ? " has-img" : "") + '"' + bg + '><div class="wrap hero-grid"><div class="hero-copy">' +
      (has(B.name) ? '<p class="kicker">' + esc(B.name) + "</p>" : "") +
      "<h1>" + h1 + "</h1>" +
      '<p class="lead">' + (services.length
        ? services.slice(0, 3).map(function (s) { return esc(s.title); }).join(", ").replace(/, ([^,]*)$/, " & $1") + "."
        : "Talk directly to a local roofer. Call or request a roof inspection online.") + "</p>" +
      ctaButtons(true) + chips(4) + areasLine() +
      "</div>" + (has(B.heroImage) ? "" : '<div class="hero-art">' + houseSvg + "</div>") + "</div></section>";
  }

  function servicesSec() {
    if (!services.length) return "";
    return '<section class="sec"><div class="wrap"><p class="kicker">What we do</p><h2>Roofing Services</h2><div class="grid cards">' +
      services.map(function (s) {
        return '<article class="card svc">' + ic(serviceIcon(s.title + " " + (s.text || "")), "big") + "<h3>" + esc(s.title) + "</h3>" + (has(s.text) ? "<p>" + esc(s.text) + "</p>" : "") + "</article>";
      }).join("") + "</div></div></section>";
  }

  function whySec() {
    if (!facts.length) return "";
    return '<section class="sec alt"><div class="wrap"><p class="kicker">Why homeowners call us</p><h2>Why You Can Trust ' + (has(B.name) ? esc(B.name) : "Us") + '</h2><div class="grid why">' +
      facts.map(function (f) { return '<div class="why-item">' + ic(f.i, "big") + "<div><h3>" + esc(f.t) + "</h3>" + (f.d ? "<p>" + esc(f.d) + "</p>" : "") + "</div></div>"; }).join("") +
      "</div></div></section>";
  }

  function reviewsSec() {
    if (!reviews.length && !has(T.googleRating)) return "";
    var head = has(T.googleRating)
      ? '<div class="rating-big"><strong>' + esc(T.googleRating) + "</strong>" + stars(T.googleRating) + "<span>" + (has(T.googleReviewCount) ? esc(T.googleReviewCount) + " Google reviews" : "Google rating") + "</span></div>"
      : "";
    return '<section class="sec"><div class="wrap"><div class="sec-top"><div><p class="kicker">Reviews</p><h2>What Customers Say</h2></div>' + head + "</div>" +
      (reviews.length ? '<div class="grid reviews">' + reviews.map(function (r) {
        return '<figure class="card review">' + (has(r.stars) ? stars(r.stars) : "") + "<blockquote>“" + esc(r.text || "") + "”</blockquote><figcaption><strong>" + esc(r.name || "") + "</strong>" + (has(r.source) ? " · " + esc(r.source) : "") + "</figcaption></figure>";
      }).join("") + "</div>" : "") +
      (has(B.googleReviewsUrl) ? '<p class="more"><a href="' + esc(B.googleReviewsUrl) + '" target="_blank" rel="noopener">Read all reviews on Google ' + ic("arrow") + "</a></p>" : "") +
      "</div></section>";
  }

  function projectCard(p, i) {
    var media;
    if (has(p.before) && has(p.after)) {
      media = '<div class="ba" style="--pos:50%"><img src="' + esc(p.after) + '" alt="After: ' + esc(p.title || "roof") + '" loading="lazy">' +
        '<img class="ba-before" src="' + esc(p.before) + '" alt="Before: ' + esc(p.title || "roof") + '" loading="lazy">' +
        '<span class="ba-tag l">Before</span><span class="ba-tag r">After</span><span class="ba-line"><span class="ba-knob">‹ ›</span></span>' +
        '<input type="range" min="0" max="100" value="50" aria-label="Drag to compare before and after"></div>';
    } else {
      var src = p.photo || p.after || p.before;
      if (!has(src)) return "";
      media = '<div class="ph"><img src="' + esc(src) + '" alt="' + esc(p.title || "Roofing project") + '" loading="lazy"></div>';
    }
    return '<figure class="card project">' + media + ((has(p.title) || has(p.city) || has(p.text)) ? "<figcaption>" + (has(p.title) ? "<strong>" + esc(p.title) + "</strong>" : "") + (has(p.city) ? '<span class="city">' + ic("pin") + esc(p.city) + "</span>" : "") + (has(p.text) ? "<p>" + esc(p.text) + "</p>" : "") + "</figcaption>" : "") + "</figure>";
  }
  function projectsGrid(arr) { return '<div class="grid projects">' + arr.map(projectCard).join("") + "</div>"; }

  // Пустые рамки для фото: только в демо и только пока фото не добавлены
  function placeholders(n) {
    var h = "";
    for (var i = 0; i < n; i++) {
      var ba = i % 2 === 0;
      h += '<figure class="card project ph-empty"><div class="ph-box' + (ba ? " split" : "") + '">' +
        (ba ? '<span class="ba-tag l">Before</span><span class="ba-tag r">After</span>' : "") +
        '<div class="ph-msg">' + ic("layers", "big") + "<strong>" + "Your work will be shown here</strong></div></div></figure>";
    }
    return '<div class="grid projects">' + h + "</div>";
  }
  var showPh = S.demo && !projects.length;

  function workTeaser() {
    if (showPh) return '<section class="sec alt"><div class="wrap"><div class="sec-top"><div><p class="kicker">Recent projects</p><h2>Our Work</h2></div><a class="btn btn-ghost" href="work.html">See all projects ' + ic("arrow") + "</a></div>" + placeholders(3).replace('class="grid projects"', 'class="grid projects teaser"') + "</div></section>";
    if (!projects.length) return "";
    return '<section class="sec alt"><div class="wrap"><div class="sec-top"><div><p class="kicker">Recent projects</p><h2>Our Work</h2></div><a class="btn btn-ghost" href="work.html">See all projects ' + ic("arrow") + "</a></div>" +
      projectsGrid(projects.slice(0, 3)) + "</div></section>";
  }

  function areasSec(withMap) {
    var q = has(B.address) ? B.address : where;
    var map = withMap && S.showMap !== false && has(q)
      ? '<iframe class="map" title="Map" loading="lazy" src="https://www.google.com/maps?q=' + encodeURIComponent(q) + '&output=embed"></iframe>' : "";
    if (!areas.length && !map) return "";
    return '<section class="sec' + (withMap ? "" : " alt") + '"><div class="wrap areas-grid"><div><p class="kicker">Where we work</p><h2>Service Areas</h2>' +
      (areas.length ? '<ul class="area-list">' + areas.map(function (a) { return "<li>" + ic("pin") + esc(a) + "</li>"; }).join("") + "</ul>" : "") +
      (has(B.phone) ? '<p class="muted">Not sure if we cover your area? Call <a href="' + tel(B.phone) + '">' + esc(B.phone) + "</a>.</p>" : "") +
      "</div>" + map + "</div></section>";
  }

  function faqSec() {
    if (!faq.length) return "";
    return '<section class="sec alt"><div class="wrap narrow"><p class="kicker">Questions</p><h2>Frequently Asked Questions</h2><div class="faq">' +
      faq.map(function (f, i) { return "<details" + (i === 0 ? " open" : "") + "><summary>" + esc(f.q) + "</summary><p>" + esc(f.a) + "</p></details>"; }).join("") +
      "</div></div></section>";
  }

  function contactCard() {
    var rows = "";
    if (has(B.phone)) rows += '<li>' + ic("phone") + '<a href="' + tel(B.phone) + '"><strong>' + esc(B.phone) + "</strong></a></li>";
    if (has(B.email)) rows += "<li>" + ic("mail") + '<a href="mailto:' + esc(B.email) + '">' + esc(B.email) + "</a></li>";
    if (has(B.address)) rows += "<li>" + ic("pin") + "<span>" + esc(B.address) + "</span></li>";
    else if (where) rows += "<li>" + ic("pin") + "<span>" + esc(where) + "</span></li>";
    if (list(B.hours).length) rows += "<li>" + ic("clock") + "<span>" + list(B.hours).map(esc).join("<br>") + "</span></li>";
    if (T.emergency247 === true) rows += "<li>" + ic("storm") + "<span><strong>24/7 emergency service</strong></span></li>";
    if (!rows) return "";
    return '<aside class="card contact"><h3>Talk to us directly</h3><ul>' + rows + "</ul>" + (has(B.phone) ? '<a class="btn btn-call btn-block" href="' + tel(B.phone) + '">' + ic("phone") + "Call now</a>" : "") + "</aside>";
  }

  function formSec() {
    var canSend = S.demo || has(S.form && S.form.endpoint) || has(B.email);
    var form = canSend ?
      '<form class="card lead-form" id="leadForm" novalidate><h3>' + inspLabel + '</h3><p class="muted">Takes 30 seconds. We\'ll call you back.</p>' +
      '<label>Your name<input name="name" autocomplete="name" required></label>' +
      '<label>Phone<input name="phone" type="tel" autocomplete="tel" required></label>' +
      '<label>Property address or ZIP<input name="address" autocomplete="street-address"></label>' +
      '<label>What do you need?<select name="need"><option>Roof inspection</option><option>Leak / repair</option><option>Storm damage</option><option>Roof replacement</option><option>Other</option></select></label>' +
      '<label>Anything else? <span class="opt">(optional)</span><textarea name="message" rows="3"></textarea></label>' +
      '<input type="text" name="_gotcha" class="hp" tabindex="-1" autocomplete="off">' +
      '<button class="btn btn-call btn-block btn-lg" type="submit">Send Request</button><p class="form-msg" id="formMsg" role="status"></p></form>' : "";
    var cc = contactCard();
    if (!form && !cc) return "";
    return '<section class="sec"><div class="wrap form-grid' + (form && cc ? "" : " single") + '">' + form + cc + "</div></section>";
  }

  function footer() {
    var cols = '<div><a class="brand" href="index.html">' + brand + "</a>" + (where ? '<p class="muted">Roofing contractor · ' + esc(where) + "</p>" : "") + (has(T.license) ? '<p class="muted">License #' + esc(T.license) + "</p>" : "") + "</div>";
    var c = "";
    if (has(B.phone)) c += '<li><a href="' + tel(B.phone) + '">' + esc(B.phone) + "</a></li>";
    if (has(B.email)) c += '<li><a href="mailto:' + esc(B.email) + '">' + esc(B.email) + "</a></li>";
    if (has(B.address)) c += "<li>" + esc(B.address) + "</li>";
    if (has(B.facebookUrl)) c += '<li><a href="' + esc(B.facebookUrl) + '" target="_blank" rel="noopener">Facebook</a></li>';
    if (c) cols += "<div><h4>Contact</h4><ul>" + c + "</ul></div>";
    if (areas.length) cols += "<div><h4>Service areas</h4><p class=\"muted\">" + areas.map(esc).join(", ") + "</p></div>";
    cols += '<div><h4>Pages</h4><ul><li><a href="index.html">Home</a></li><li><a href="work.html">Our Work</a></li><li><a href="inspection.html">' + inspShort + "</a></li></ul></div>";
    put("footer", '<div class="wrap foot-grid">' + cols + '</div><div class="wrap foot-bottom">© ' + new Date().getFullYear() + " " + esc(B.name || "") + "</div>");
  }

  function mobileBar() {
    if (!has(B.phone)) return;
    put("mobilebar", '<a class="mb-call" href="' + tel(B.phone) + '">' + ic("phone") + "Call Now</a>" + (page !== "inspection" ? '<a class="mb-insp" href="inspection.html">' + inspShort + "</a>" : ""));
    document.body.classList.add("has-mobilebar");
  }

  // ---------- render page ----------
  var html = "";
  if (page === "home") {
    html = hero() + servicesSec() + whySec() + reviewsSec() + workTeaser() + areasSec(false) + ctaBand();
  } else if (page === "work") {
    html = pageHead("Our Work", "Recent Roofing Projects" + (where ? " in " + esc(where) : ""),
      showPh ? "Before &amp; after photos of your jobs will appear here." : projects.some(function (p) { return has(p.before) && has(p.after); }) ? "Drag the slider on each photo to compare before and after." : "") +
      (showPh ? '<section class="sec"><div class="wrap">' + placeholders(6) + "</div></section>" :
       projects.length ? '<section class="sec"><div class="wrap">' + projectsGrid(projects) + "</div></section>"
        : '<section class="sec"><div class="wrap narrow center"><p class="lead">Project photos coming soon.' + (has(B.phone) ? " Call us to see examples of our work." : "") + "</p></div></section>") +
      reviewsSec() + ctaBand("Want results like these?");
  } else if (page === "inspection") {
    html = pageHead(inspLabel, "Request a <span>Roof Inspection</span>",
      (has(B.phone) ? 'Fill out the short form or call <a href="' + tel(B.phone) + '">' + esc(B.phone) + "</a>." : "Fill out the short form and we'll get back to you.")) +
      formSec() + areasSec(true) + faqSec();
  }
  put("main", html);
  footer();
  mobileBar();

  // ---------- before/after sliders ----------
  Array.prototype.forEach.call(document.querySelectorAll(".ba input"), function (r) {
    r.addEventListener("input", function () { r.parentNode.style.setProperty("--pos", r.value + "%"); });
  });

  // ---------- form ----------
  var f = $("leadForm");
  if (f) f.addEventListener("submit", function (e) {
    e.preventDefault();
    var msg = $("formMsg");
    var data = {}; new FormData(f).forEach(function (v, k) { data[k] = String(v).trim(); });
    if (!data.name || !data.phone) { msg.className = "form-msg err"; msg.textContent = "Please enter your name and phone number."; return; }
    if (data._gotcha) return;
    if (S.demo) { msg.className = "form-msg ok"; msg.textContent = "Demo: on the live website, this request goes straight to your email/phone."; return; }
    var endpoint = S.form && S.form.endpoint;
    if (has(endpoint)) {
      msg.className = "form-msg"; msg.textContent = "Sending…";
      fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw 0; f.reset(); msg.className = "form-msg ok"; msg.textContent = "Thank you! We'll call you back shortly."; })
        .catch(function () { msg.className = "form-msg err"; msg.textContent = "Something went wrong." + (has(B.phone) ? " Please call " + B.phone + "." : ""); });
    } else if (has(B.email)) {
      var body = "Name: " + data.name + "\nPhone: " + data.phone + "\nAddress: " + data.address + "\nNeed: " + data.need + "\n\n" + data.message;
      location.href = "mailto:" + B.email + "?subject=" + encodeURIComponent(inspLabel + " request") + "&body=" + encodeURIComponent(body);
    }
  });

  // ---------- Google structured data (live sites only) ----------
  if (!S.demo && has(B.name)) {
    var ld = { "@context": "https://schema.org", "@type": "RoofingContractor", name: B.name };
    if (has(B.phone)) ld.telephone = B.phone;
    if (has(B.email)) ld.email = B.email;
    if (has(B.address)) ld.address = B.address;
    if (areas.length) ld.areaServed = areas;
    if (has(T.googleRating) && has(T.googleReviewCount)) ld.aggregateRating = { "@type": "AggregateRating", ratingValue: T.googleRating, reviewCount: T.googleReviewCount };
    var s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(ld); document.head.appendChild(s);
  }
})();
