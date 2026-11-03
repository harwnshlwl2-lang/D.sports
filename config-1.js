// ============================================================
//  ملف التحكم الوحيد لموقع سرمد سبورت — عدّل هنا فقط
// ============================================================
window.CONFIG = {
  SITE_NAME: "سرمد سبورت",

  // ارفع صورة الشعار في نفس مجلد الموقع باسم logo.png (PNG شفاف)
  LOGO: "logo.png",

  // ----- حسابات التواصل (الأيقونات الثلاثة الأخيرة روابط مؤقتة، بدّلها بروابطك) -----
  // اترك الرابط فارغاً "" لإخفاء الأيقونة
  SOCIAL: {
    whatsapp:  "https://wa.me/967775393823",
    telegram:  "https://t.me/CHANGE_ME",
    instagram: "https://instagram.com/CHANGE_ME",
    facebook:  "https://facebook.com/CHANGE_ME"
  },

  // ----- الصورة الكبرى تحت الشريط العلوي -----
  // matchId: رقم مباراة من وضع المشرف (?admin=1) فيُحسب العدّاد ويُفتح البث تلقائياً
  // أو اتركه فارغاً وضع kickoff (وقت UTC) و link يدوياً
  HERO: {
    enabled: true,
    image: "https://placehold.co/1600x900/050505/06F26A?text=SARMAD+SPORT",   // مؤقتة: بدّلها برابط تصميمك
    title: "المباراة الكبرى",                                                   // مؤقت
    subtitle: "عدّل هذا النص من ملف config.js",                                  // مؤقت
    matchId: "",
    kickoff: "2026-12-31T18:00:00Z",                                           // مؤقت
    link: "",
    buttonText: "شاهد الآن"
  },

  // ----- روابط البث: "رقم المباراة": "رابط البث.html" -----
  // الأرقام تراها بفتح الموقع هكذا:  https://موقعك/?admin=1
  STREAMS: {
    // "123456": "https://example.com/stream.html",
  },

  // الرابط التلقائي عند عدم وجود رابط للمباراة + رسالة الاعتذار
  DEFAULT_STREAM: "https://tv1.dzmatch.site/p/elbarca.html",
  DEFAULT_NOTE: "نعتذر، رابط بث هذه المباراة غير متوفر حالياً. نعرض لك تحليلات beIN SPORTS إلى حين توفره.",

  // طريقة تمرير الرابط للمشغل:
  // "{URL}" = يفتح رابط البث مباشرة داخل المشغل (الافتراضي)
  // مثال لمشغل يستقبل الرابط كمعامل:  "https://badboy.shootsimo.com/splayer/Live2.php?url={URL}"
  PLAYER_TEMPLATE: "{URL}",

  // ----- أماكن الإعلانات: ألصق كود الإعلان في html، والمكان الفارغ يختفي تلقائياً -----
  ADS: {
    top:         { html: "", height: 90  },   // بعد الصورة الكبرى
    list:        { html: "", height: 250 },   // بين مجموعات الدوريات
    belowPlayer: { html: "", height: 250 },   // تحت المشغل
    bottom:      { html: "", height: 90  }    // أسفل الصفحة
  },

  REFRESH_SECONDS: 90
};
