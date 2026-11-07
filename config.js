// ============================================================
//  ملف التحكم الوحيد لموقع سرمد سبورت — محدث
// ============================================================
window.CONFIG = {
  SITE_NAME: "سرمد سبورت",

  // شعار الموقع
  LOGO: "logo.png",

  // حسابات التواصل الاجتماعي
  SOCIAL: {
    whatsapp:  "https://wa.me/967775393823",
    telegram:  "https://t.me/CHANGE_ME",
    instagram: "https://instagram.com/CHANGE_ME",
    facebook:  "https://facebook.com/CHANGE_ME"
  },

  // الصورة الكبرى (Hero Banner) بمقاس 16:9 ومتجاوبة
  HERO: {
    enabled: true,
    image: "https://placehold.co/1600x900/050505/06F26A?text=SARMAD+SPORT",
    title: "المباراة الكبرى",
    subtitle: "تابع أثارة كرة القدم مباشرة وبأعلى جودة",
    matchId: "",
    kickoff: "2026-12-31T18:00:00Z",
    link: "",
    buttonText: "شاهد الآن"
  },

  // روابط البث الخاصة بالمباريات (ضع رقم المباراة من وضع المشرف كـ مفتاح، والرابط كقيمة)
  STREAMS: {
    // مثال: "123456": "https://badboy.shootsimo.com/splayer/Live1.php",
  },

  // الرابط الافتراضي للمشغل (الذي أرسلته)
  DEFAULT_STREAM: "https://badboy.shootsimo.com/splayer/Live1.php",
  DEFAULT_NOTE: "نعتذر، رابط بث هذه المباراة غير متوفر حالياً. نعرض لك المشغل العام.",

  PLAYER_TEMPLATE: "{URL}",

    // ----- أماكن الإعلانات: ألصق كود الإعلان في html، والمكان الفارغ يختفي تلقائياً -----
    // ----- أماكن الإعلانات: ألصق كود الإعلان في html، والمكان الفارغ يختفي تلقائياً -----
  ADS: {
    top:         { html: "", height: 90  },   // بعد الصورة الكبرى
    
    list:        { html: "", height: 250 },   // بين مجموعات الدوريات
    
    // ضع كود إعلانك الجديد (الخاص برقم التعريف 32134613 بعد الضغط على "احصل على الرمز") داخل علامتي التنزيل ` ` أدناه:
    belowPlayer: { 
      html: `ضع_كود_الإعلان_الكامل_هنا`, 
      height: 300 
    },   
    
    bottom:      { html: "", height: 90  }    // أسفل الصفحة
  },
  REFRESH_SECONDS: 90
};
