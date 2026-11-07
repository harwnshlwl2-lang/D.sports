// ============================================================
//  ملف التحكم الوحيد لموقع دكتور سبورت — جاهز بالكامل
// ============================================================
window.CONFIG = {
  SITE_NAME: "دكتور سبورت",

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
    image: "2.jpg",
    title: "المباراة الكبرى",
    subtitle: "تابع أثارة كرة القدم مباشرة وبأعلى جودة",
    matchId: "",
    kickoff: "2026-12-31T18:00:00Z",
    link: "",
    buttonText: "شاهد الآن"
  },

  // روابط البث الخاصة بالمباريات
  STREAMS: {
    // "123456": "https://badboy.shootsimo.com/splayer/Live1.php",
  },

  // الرابط الافتراضي للمشغل
  DEFAULT_STREAM: "https://badboy.shootsimo.com/splayer/Live1.php",
  DEFAULT_NOTE: "نعتذر، رابط بث هذه المباراة غير متوفر حالياً. نعرض لك المشغل العام.",

  PLAYER_TEMPLATE: "{URL}",

  // أماكن الإعلانات (تم وضع كود البانر الخاص بك تحت المشغل)
  ADS: {
    top:         { html: "", height: 90  },   
    list:        { html: "", height: 250 },   
    belowPlayer: { 
      html: `<script>atOptions = { 'key' : '68d50ebe2c64bbda953172e8c93644d', 'format' : 'iframe', 'height' : 300, 'width' : 160, 'params' : {} };</script><script src="https://czernik.org/22/68d50ebe2c64bbda953172e8c93644d.js"></script>`, 
      height: 300 
    },   
    bottom:      { html: "", height: 90  }    
  },

  REFRESH_SECONDS: 90
};
