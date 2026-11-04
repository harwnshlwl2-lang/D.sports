// ============================================================
//  ملف التحكم الوحيد لموقع سرمد سبورت — عدّل هنا فقط
// ============================================================
window.CONFIG = {
  SITE_NAME: "دكتور سبورت",

  // ارفع صورة الشعار في نفس مجلد الموقع باسم logo.png (PNG شفاف)
  LOGO: "logo.png",

  // ----- حسابات التواصل (الأيقونات الثلاثة الأخيرة روابط مؤقتة، بدّلها بروابطك) -----
  // اترك الرابط فارغاً "" لإخفاء الأيقونة
  SOCIAL: {
    whatsapp:  "https://wa.me/967775393823",
    telegram:  "https://t.me/CHANGE_ME",
    instagram: "https://instagram.com/iy_b0",
    facebook:  "https://facebook.com/CHANGE_ME"
  },

  // ----- الصورة الكبرى تحت الشريط العلوي -----
  // matchId: رقم مباراة من وضع المشرف (?admin=1) فيُحسب العدّاد ويُفتح البث تلقائياً
  // أو اتركه فارغاً وضع kickoff (وقت UTC) و link يدوياً
  HERO: {
    enabled: true,
    image: "1793675298033.jpg",   // مؤقتة: بدّلها برابط تصميمك
    title: "المباراة الكبرى",                                                   // مؤقت
    subtitle: "",                                  // مؤقت
    matchId: "",
    kickoff: "2026-12-31T18:00:00Z",                                           // مؤقت
    link: "",
    buttonText: "شاهد الآن"
  },

  // ----- روابط البث: "رقم المباراة": "رابط البث.html" -----
  // الأرقام تراها بفتح الموقع هكذا:  https://موقعك/?admin=1
  STREAMS: {
    // "123456": "",
  },

  // الرابط التلقائي عند عدم وجود رابط للمباراة + رسالة الاعتذار
  DEFAULT_STREAM: "DEFAULT_STREAM: "https://budgetezy.org/4/6df18f7c444ef507d04bcc60ed4a589e",
",
  DEFAULT_NOTE: "نعتذر، رابط بث هذه المباراة غير متوفر حالياً. نعرض لك تحليلات beIN SPORTS إلى حين توفره.",

  // طريقة تمرير الرابط للمشغل:
  // "{URL}" = يفتح رابط البث مباشرة داخل المشغل (الافتراضي)
  PLAYER_TEMPLATE: "{URL}",

  // ----- أماكن الإعلانات: ألصق كود الإعلان في html، والمكان الفارغ يختفي تلقائياً -----
  ADS: {
    top: { 
      html: `<script type="text/javascript">
        atOptions = {
          'key' : '521f379863251627581a63740f022ad5',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      </script>
      <script type="text/javascript" src="https://www.highperformanceformat.com/521f379863251627581a63740f022ad5/invoke.js"></script>`, 
      height: 90 
    },
    
    list: { 
      html: `<script type="text/javascript">
        atOptions = {
          'key' : '521f379863251627581a63740f022ad5',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      </script>
      <script type="text/javascript" src="https://www.highperformanceformat.com/521f379863251627581a63740f022ad5/invoke.js"></script>`, 
      height: 250 
    },

    belowPlayer: { html: "", height: 250 },   // تحت المشغل
    bottom:      { html: "", height: 90  }    // أسفل الصفحة
  },

  REFRESH_SECONDS: 90
};
