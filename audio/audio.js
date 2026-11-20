/* ==========================================================================
   audio/audio.js  —  الملف الوحيد اللي بتعدّل فيه لما تضيف صوت جديد
   --------------------------------------------------------------------------
   • ضع الملف الصوتي في مجلد audio (أو مجلد فرعي) وأضف سطره في القايمة تحت.
   • مفيش حاجة تتغيّر في index.html خالص.
   • للأوفلاين: لازم المسار './audio/audio.js' يكون ضمن ملفات الـ sw.js
     (راجع الشرح في الرد)، وكمان التطبيق بيحتفظ بنسخة احتياطية من القايمة
     في الجهاز بعد أول تحميل ناجح.
   ========================================================================== */
/* ==========================================================================
   ✏️  مكتبتي الصوتية: أضف ملفاتك هنا
   --------------------------------------------------------------------------
   1) ضع ملفات الصوت في مجلد audio بجانب هذا الملف، وداخله مجلد لكل قسم:
        audio/quran/      ← القرآن والكهف        type: 'quran' و 'kahf'
        audio/adhkar/     ← الأذكار والصباح والمساء  type: 'adhkar' و 'morning' و 'evening'
        audio/ibtihalat/  ← الابتهالات           type: 'ibtihalat'  ← زر «ابتهالات»
        audio/anasheed/   ← الأناشيد             type: 'anasheed'   ← زر «أناشيد»
        audio/adhan/      ← الأذان               type: 'adhan' و 'adhan_fajr'
   2) أضف سطرًا لكل ملف بهذا الشكل:
        { title: 'الاسم الذي يظهر على الشاشة', file: 'audio/اسم-الملف.mp3', type: 'النوع', desc: 'وصف صغير (اختياري)' },
         desc = وصف يظهر بخط صغير تحت الاسم ٣ ثوانٍ ثم يتلاشى. امسحه أو اتركه فاضي وما يظهرش وصف.

   3) عدد مرات التكرار (اختياري): أضف  repeat: رقم  للسطر، والمقطع يتكرر العدد ده من المرات قبل ما ينتقل للي بعده.
        مثال: { title: 'استغفار', file: 'audio/adhkar/istighfar_once.mp3', type: 'adhkar', repeat: 100 },
        - الملف لازم يكون مرة واحدة بس (مثلاً «أستغفر الله» مرة واحدة)، لأن التطبيق هو اللي بيكرره.
        - لو الملف نفسه مسجّل فيه التكرار (زي only_one_100.mp3) ما تحطش repeat وإلا هيتضاعف.
        - لو ما كتبتش desc بيظهر تلقائيًا «١٠٠ مرة»، ولو كتبت desc بيظهر كلامك.
        - تحت الزر بيظهر عدّاد «التكرار ٣ / ١٠٠»، والضغط على التالي أو السابق يلغي التكرار.

   الأنواع (type):
     'quran'      تلاوة أو سورة         ← تظهر في زر "قرآن" (بنفس ترتيبك)
     'adhkar'     أذكار وأدعية عامة     ← تظهر في زر "أذكار"
     'morning'    أذكار الصباح          ← تُشغَّل تلقائيًا من الفجر إلى الظهر
     'evening'    أذكار المساء          ← تُشغَّل تلقائيًا من العصر إلى العشاء
     'kahf'       سورة الكهف            ← تُشغَّل تلقائيًا من مغرب الخميس إلى مغرب الجمعة
     'adhan'      الأذان                ← يُشغَّل عند دخول كل وقت صلاة
     'adhan_fajr' أذان الفجر (اختياري)  ← لو أضفته يُستخدم للفجر بدل 'adhan'
      'ruqyah'     الرقية الشرعية       ← تظهر في خدمة «الرقية الشرعية» > استماع (لا توجد ملفات افتراضية؛ يصلح تسجيل واحد كامل؛ وإن لم تضف شيئًا يختفي تبويب «استماع» من الواجهة)

   ملاحظات:
   - أي نوع تضيف له ملفًا يحلّ محل الملفات الافتراضية من الإنترنت لهذا النوع.
   - لو لم تضف شيئًا لنوع معيّن يستخدم التطبيق الملفات الافتراضية.
   - يمكنك إضافة أكثر من ملف لنفس النوع، والأسماء العربية والمسافات مقبولة.
   ========================================================================== */
var MY_AUDIO = [
	// ابتهالات (مثال — شيل // وغيّر الاسم والملف):
	// { title: 'مولاي إني ببابك', file: 'audio/ibtihalat/mawlaya.mp3', type: 'ibtihalat' },
	// ذكر بملف مرة واحدة ويتكرر ١٠٠ مرة (شيل // وغيّر الاسم والملف):
	// { title: 'أستغفر الله', file: 'audio/adhkar/istighfar_once.mp3', type: 'adhkar', repeat: 100 },
	// أناشيد (مثال):
	// { title: 'طلع البدر علينا', file: 'audio/anasheed/tala3.mp3', type: 'anasheed' },

		// adhan

	{ title: 'الأذان',						file: 'audio/adhan/adhan.mp3',			type: 'adhan', desc: 'مشاري العفاسي' },
	{ title: 'اذان الفجر',					file: 'audio/adhan/adhan_fajr.mp3',		type: 'adhan_fajr' , desc: 'مشاري العفاسي' },
// quran
	{ title: 'سورة الكهف',					file: 'audio/quran/018.mp3',				type: 'kahf', desc: 'المنشاوي' },  
	{ title: 'سورة الكهف',					file: 'audio/quran/018.mp3',				type: 'quran', desc: 'المنشاوي' },  

	{ title: 'سورة هود',					file: 'audio/quran/011.mp3',				type: 'quran', desc: 'اسلام صبحي' },
	{ title: 'سورة يوسف',					file: 'audio/quran/012.mp3',				type: 'quran', desc: 'المنشاوي' },
	{ title: 'سورة يوسف',					file: 'audio/quran/012_1.mp3',				type: 'quran', desc: 'اسلام صبحي'},
	{ title: 'سورة ابراهيم',				file: 'audio/quran/014.mp3',				type: 'quran', desc: 'المنشاوي' },
	{ title: 'سورة الحجر',					file: 'audio/quran/015.mp3',				type: 'quran', desc: 'المنشاوي' },
	{ title: 'سورة النحل',					file: 'audio/quran/016.mp3',				type: 'quran', desc: 'الدوسري' },
	{ title: 'سورة طه',					file: 'audio/quran/020.mp3',				type: 'quran', desc: 'محمد ايوب' },
	{ title: 'سورة الحج',					file: 'audio/quran/022.mp3',				type: 'quran', desc: 'المنشاوي' },
	{ title: 'سورة المؤمنون',					file: 'audio/quran/023.mp3',				type: 'quran', desc: 'اسلام صبحي خواتيم السوره' },
	{ title: 'سورة النمل',					file: 'audio/quran/027.mp3',				type: 'quran', desc: 'الدوسري' },
	{ title: 'سورة فاطر',					file: 'audio/quran/035.mp3',				type: 'quran', desc: 'محمد ايوب' },
	{ title: 'سورة فصلت',					file: 'audio/quran/041.mp3',				type: 'quran', desc: 'اسلام صبحي' },
	{ title: 'سورة الزخرف',					file: 'audio/quran/043.mp3',				type: 'quran', desc: ' نوادر المنشاوي' },
	{ title: 'سورة الدخان',					file: 'audio/quran/044.mp3',				type: 'quran', desc: 'اسلام صبحي' },
	{ title: 'سورة ق',						file: 'audio/quran/050.mp3',				type: 'quran', desc: 'المنشاوي' },
	{ title: 'سورة النجم',					file: 'audio/quran/053.mp3',				type: 'quran', desc: 'المنشاوي' },
	{ title: 'سورة الرحمن',					file: 'audio/quran/055.mp3',				type: 'quran', desc: 'المنشاوي' },
	{ title: 'سورة الواقعه',				file: 'audio/quran/056.mp3',				type: 'quran', desc: 'المنشاوي' },
	{ title: 'سورة الملك',					file: 'audio/quran/067.mp3',				type: 'quran', desc: 'المنشاوي' },
	{ title: 'سورة الانسان',					file: 'audio/quran/076.mp3',				type: 'quran', desc: 'نوادر المنشاوي' },
	{ title: 'سورة الحاقه',					file: 'audio/quran/069.mp3',				type: 'quran', desc: 'المنشاوي' },
	{ title: 'سورة الأعلى',					file: 'audio/quran/087.mp3',				type: 'quran', desc: 'المنشاوي' },
	{ title: 'سورة البقره',			file: 'audio/quran/Quran_1.mp3',			type: 'quran', desc: ' نوادر المنشاوي' },
	{ title: 'سورة فاطر',			file: 'audio/quran/Quran_2.mp3', 			type: 'quran', desc: ' نوادر المنشاوي' },
   
   
   
// adhkar
	{ title: 'أذكار الصباح',				file: 'audio/adhkar/morning.mp3',			type: 'morning', desc: 'مشاري العفاسي' },
	{ title: 'أذكار المساء',				file: 'audio/adhkar/evening.mp3',			type: 'evening', desc: 'مشاري العفاسي' },
	{ title: 'دعاء دخول المنزل',			file: 'audio/adhkar/home-in.mp3',				type: 'adhkar', desc: 'مشاري العفاسي' },
	{ title: 'دعاء الخروج من المنزل',			file: 'audio/adhkar/home-out.mp3',				type: 'adhkar', desc: 'مشاري العفاسي' },
	{ title: 'دعاء السفر',					file: 'audio/adhkar/safar.mp3',			type: 'adhkar', desc: 'مشاري العفاسي' },
	{ title: 'الرقية الشرعية',		file: 'audio/ruqyah/ruqyah.mp3',			type: 'adhkar', desc: 'كامله' }, 
	{ title: 'الرقية الشرعية',		file: 'audio/ruqyah/ruqyah.mp3',			type: 'ruqyah', desc: 'كامله' }, //  ← اختياري: يُظهر تبويب «استماع» في الرقية الشرعية

	{ title: 'تسبيح',				file: 'audio/adhkar/tasbeh.mp3',			type: 'adhkar', desc: '١٠٠ مره' , repeat: 100  },
	{ title: 'استغفار',				file: 'audio/adhkar/istighfar1.mp3',		type: 'adhkar', desc: '١٠٠ مره' , repeat: 100 },
	{ title: 'استغفار',				file: 'audio/adhkar/istighfar2.mp3',		type: 'adhkar', desc: '١٠٠ مره' , repeat: 100 },
	{ title: 'لا اله الا الله',			file: 'audio/adhkar/only_one_1000.mp3',	type: 'adhkar', desc: '١٠٠ مره' , repeat: 100 },
	{ title: 'لا اله الا الله',			file: 'audio/adhkar/only_one_100.mp3',		type: 'adhkar', desc: '١٠٠ مره' },
	{ title: 'لا اله الا الله',			file: 'audio/adhkar/only_one_01.mp3',		type: 'adhkar', desc: '١٠٠ مره' , repeat: 100 },
	{ title: 'الباقيات الصالحات',			file: 'audio/adhkar/zkr001.mp3',		type: 'adhkar', desc: '١٠٠ مره' , repeat: 100 },
	{ title: 'الصلاة على النبي',			file: 'audio/adhkar/profetpray01.mp3',		type: 'adhkar', desc: '١٠٠ مره' , repeat: 100  , after: 'kahf' },
	{ title: 'تسبيح',				file: 'audio/adhkar/taspeeh001.mp3',			type: 'adhkar', desc: '١٠٠ مره' , repeat: 100  },
	{ title: 'لا اله الا الله',			file: 'audio/adhkar/only_one_02.mp3',		type: 'adhkar', desc: '١٠٠ مره' , repeat: 100 },
	{ title: 'لا اله الا الله',			file: 'audio/adhkar/only_one_04.mp3',		type: 'adhkar', desc: '١٠٠ مره' , repeat: 100 },
	{ title: 'لا حول ولا قوة الا بالله',			file: 'audio/adhkar/only_one_03.mp3',		type: 'adhkar', desc: '١٠٠ مره' , repeat: 100 },
	{ title: 'الله اكبر',			file: 'audio/adhkar/good_great.mp3',		type: 'adhkar', desc: '١٠٠ مره' , repeat: 100 },
	{ title: 'الحمد لله',			file: 'audio/adhkar/alhamdulellah_001.mp3',		type: 'adhkar', desc: '١٠٠ مره' , repeat: 100 },
	{ title: 'تسبيح',				file: 'audio/adhkar/taspeeh002.mp3',			type: 'adhkar', desc: '١٠٠ مره' , repeat: 100  },
	{ title: 'استغفار',				file: 'audio/adhkar/istghphar003.mp3',		type: 'adhkar', desc: '١٠٠ مره' , repeat: 100 },
	{ title: 'تسبيح',				file: 'audio/adhkar/taspeeh005.mp3',			type: 'adhkar', desc: '١٠٠ مره' , repeat: 100  },
	{ title: 'تسبيح',				file: 'audio/adhkar/taspeeh006.mp3',			type: 'adhkar', desc: '١٠٠ مره' , repeat: 100  },


// anasheed
	{ title: 'فيَّ حُبٌّ',			file: 'audio/anasheed/fiya-hubbun-repeated.mp3',	type: 'anasheed' , desc: 'مكرر'},
	{ title: 'سأقبل يا خالقي',			file: 'audio/anasheed/sa-oqbel-ya-khaleqy.mp3',	type: 'anasheed' , desc: 'اسلام صبحي' },
	{ title: 'أغيب',			file: 'audio/anasheed/mishary-aghib.mp3',	type: 'anasheed', desc: 'مشاري العفاسي' },
	{ title: 'الله يعلم',			file: 'audio/anasheed/allah-yalam.mp3',	type: 'anasheed' },
	{ title: 'إلهي',			file: 'audio/anasheed/abdulaziz-alrashed-ilahi.mp3',	type: 'anasheed', desc: 'عبدالعزيز الراشد' },
	{ title: 'إلهي',			file: 'audio/anasheed/mishary-ilahi.mp3',	type: 'anasheed' , desc: 'مشاري العفاسي'},
	{ title: 'إلى ربي',			file: 'audio/anasheed/ila-rabbi.mp3',	type: 'anasheed' },
	{ title: 'غبتُ دهراً',			file: 'audio/anasheed/athar-abdulrahman-ghibtu-dahran.mp3',	type: 'anasheed' },
	{ title: 'دع لذيذ الكرى',			file: 'audio/anasheed/da-ladhid-alkara.mp3',	type: 'anasheed' },
	{ title: 'يا نفس',			file: 'audio/anasheed/ya-nafs.mp3',	type: 'anasheed' },
	{ title: 'إلهي',			file: 'audio/anasheed/abdullah-aljarallah-ilahi.mp3',	type: 'anasheed', desc: 'عبدالله الجارلله'  },
	{ title: 'وقفت على القبور',			file: 'audio/anasheed/mali-waqft.mp3',	type: 'anasheed', desc: 'مشاري العفاسي'  },
	{ title: 'فيَّ حُبٌّ',			file: 'audio/anasheed/aljarallah-alnafees-fiya-hubbun.mp3',	type: 'anasheed', desc: 'الجارلله و النفيس'  },
	{ title: 'ليس الغريب',			file: 'audio/anasheed/laysa-alghareeb.mp3',	type: 'anasheed' },
	{ title: 'السور المسبحة',			file: 'audio/anasheed/almusabbihat.mp3',	type: 'anasheed' },
	{ title: 'خير الدرر',			file: 'audio/anasheed/khair-addurar.mp3',	type: 'anasheed' },
	{ title: 'غبتُ دهراً (ريمكس)',			file: 'audio/anasheed/ghibtu-dahran-remix.mp3',	type: 'anasheed' },
	{ title: 'السبع الطوال',			file: 'audio/anasheed/alsab-altiwal.mp3',	type: 'anasheed' },
	{ title: 'مولاي إني ببابك',			file: 'audio/anasheed/mawlay-inni-bibabik.mp3',	type: 'anasheed' },
	{ title: 'يا عباد الله جدوا', file: 'audio/anasheed/ya-ibad-allah-juddu.mp3', type: 'anasheed' },
	{ title: 'لسوف أعود يا أمي', file: 'audio/anasheed/Ommi.mp3', type: 'anasheed' },
	{ title: 'يا طيبه', file: 'audio/anasheed/YaTiba.mp3', type: 'anasheed' },
	{ title: 'هزتني', file: 'audio/anasheed/Hztny.mp3', type: 'anasheed' },
	{ title: 'فيما الركون', file: 'audio/anasheed/Rukoon_Salman_Mulla.mp3', type: 'anasheed', desc: 'سلمان الملا' },
	{ title: 'صلوا عليه', file: 'audio/anasheed/Sallu_Alayhi.mp3', type: 'anasheed', desc: 'صلوا عليه وسلموا تسليماً' },
	{ title: 'أسماء الله الحسنى', file: 'audio/anasheed/god_names.mp3', type: 'anasheed', desc: 'النقشبندي' },
	
	
	{ title: 'نونية القحطاني', file: 'audio/anasheed/Noniya_Al-Qahtani_Faris_Abbad.mp3', type: 'anasheed', desc: 'يا منزل الايات و الفرقان' },
	{ title: 'نونية ابن القيم ', file: 'audio/anasheed/Noniya_Ibn_Qayyim_Faris.mp3', type: 'anasheed', desc: 'في وصف الجنه' },
	{ title: 'الأرجوزة السنية', file: 'audio/anasheed/Urjoza_Saniyya.mp3', type: 'anasheed', desc: 'في سيرة ذكر أشرف البرية' },
	{ title: 'المنظومة البيضاء', file: 'audio/anasheed/Manzuma_Bayda.mp3', type: 'anasheed', desc: 'في عقيدة السلف' },
	{ title: 'تحفة الأطفال والغلمان', file: 'audio/anasheed/Tuhfah_Atfal.mp3', type: 'anasheed', desc: 'في تجويد القرآن' },
	{ title: 'منظومة القواعد الفقهية', file: 'audio/anasheed/Qawaid_Fiqhiyya.mp3', type: 'anasheed', desc: 'الفقه وأصوله' },
	{ title: 'منظومة عقيدة العوام', file: 'audio/anasheed/Aqida_Awwam.mp3', type: 'anasheed', desc: 'عقيدة العوام' },
	{ title: 'الروح والريحان', file: 'audio/anasheed/Ruh_Rayhan_Ajurri.mp3', type: 'anasheed', desc: 'في أخلاق حامل القرآن' },
	{ title: 'منظومة الحائية', file: 'audio/anasheed/Haiyya_Badr_Turki.mp3', type: 'anasheed', desc: 'في العقيدة' },
	{ title: 'منظومة مثلث قطرب', file: 'audio/anasheed/Muthallath_Qutrub_Okasha.mp3', type: 'anasheed', desc: 'في اللغة' },
	{ title: 'منظومة التوحيد والإيمان', file: 'audio/anasheed/Tawhid_Iman_Omar.mp3', type: 'anasheed', desc: 'في العقيدة' },


// ibtihalat
	{ title: 'هو الله رب الوجود', file: 'audio/ibtihalat/huwa-allah-rabb-alwujud.mp3', type: 'ibtihalat' },
	{ title: 'سبحان من بسط الأرض', file: 'audio/ibtihalat/subhan-man-basat-alard.mp3', type: 'ibtihalat' },
	{ title: 'الضحى من نور من ؟', file: 'audio/ibtihalat/aldoha-min-noor.mp3', type: 'ibtihalat' },
	{ title: 'جل المنادي', file: 'audio/ibtihalat/jalla-almunadi.mp3', type: 'ibtihalat' },
	{ title: 'قطرة من نداك', file: 'audio/ibtihalat/qatra-min-nadak.mp3', type: 'ibtihalat' },
	{ title: 'مجيب السائلين', file: 'audio/ibtihalat/mujib-alsaileen.mp3', type: 'ibtihalat' },
	{ title: 'وليل طويل', file: 'audio/ibtihalat/wa-layl-taweel.mp3', type: 'ibtihalat' },
	{ title: 'العلم يحلو كلما كررته', file: 'audio/ibtihalat/alilm-yahlu-kullama-karartuh.mp3', type: 'ibtihalat' },
	{ title: 'فكم لله من لطف خفي', file: 'audio/ibtihalat/fakam-lillah-min-lutf-khafi.mp3', type: 'ibtihalat' },

];

/* ========================= أصوات وضع السكون (الطبيعة) =========================
   وضع السكون يعرض الخلفية فقط، ويشغّل صوتًا طبيعيًا يتبع الوقت والطقس، ويكرره تلقائيًا
   طول ما الصفحة مفتوحة، ويبدّله لو تغيّر الجو أو دخل وقت جديد.

   الأنواع (type) وإمتى تُستخدم:
     'birds'      عصافير            ← الفجر والصباح والظهر والعصر والجو صافٍ أو غائم
     'crickets'   صراصير الحقل      ← المغرب، ومع الضفادع بالليل
     'frogs'      ضفادع             ← الليل والجو صافٍ أو غائم
     'wind'       رياح              ← الرياح النشطة (٣٠ كم/س فأكثر)، وتُضاف بصوت خفيف مع المطر
     'lightrain'  مطر خفيف / رذاذ   ← (لو غير موجود يُستخدم 'rain')
     'rain'       مطر               ← مطر متوسط
     'heavyrain'  مطر غزير          ← (لو غير موجود يُستخدم 'rain')
     'storm'      عاصفة رعدية       ← (لو غير موجود يُستخدم 'heavyrain' مع 'thunder')
     'thunder'    رعد (اختياري)     ← يُضاف فوق المطر الغزير في العاصفة لو لا يوجد 'storm'
     'snow'       ثلج (اختياري)     ← لو غير موجود يُستخدم 'wind'

   ملاحظات:
   - ضع الملفات في مجلد audio/ambient/ (أو غيّر المسار). يُفضَّل ملف مدته دقيقة أو أكثر.
   - يمكنك إضافة أكثر من ملف لنفس النوع، فيتبدّل بينها عشوائيًا مع كل دورة.
   - أي نوع بلا ملف يتخطّاه التطبيق بهدوء ويستخدم البديل المذكور أعلاه.
   ========================================================================== */
var AMBIENT_VOLUME = 0.8;   // مستوى الصوت العام لوضع السكون من 0 إلى 1
var MY_AMBIENT = [
	{ type: 'birds',     file: 'audio/ambient/birds1.mp3' },
	{ type: 'birds',     file: 'audio/ambient/birds2.mp3' },
	{ type: 'birds',     file: 'audio/ambient/birds3.mp3' },
	
	{ type: 'crickets',  file: 'audio/ambient/crickets1.mp3' },
	{ type: 'crickets',  file: 'audio/ambient/crickets2.mp3' },
	{ type: 'crickets',  file: 'audio/ambient/crickets3.mp3' },
	{ type: 'crickets',  file: 'audio/ambient/crickets4.mp3' },
	{ type: 'crickets',  file: 'audio/ambient/crickets5.mp3' },
	
	{ type: 'frogs',     file: 'audio/ambient/frogs1.mp3' },
	{ type: 'frogs',     file: 'audio/ambient/frogs2.mp3' },
	{ type: 'frogs',     file: 'audio/ambient/frogs3.mp3' },
	{ type: 'frogs',     file: 'audio/ambient/frogs4.mp3' },


	{ type: 'wind',      file: 'audio/ambient/wind1.mp3' },
	{ type: 'wind',      file: 'audio/ambient/wind2.mp3' },
	{ type: 'wind',      file: 'audio/ambient/wind3.mp3' },
	{ type: 'wind',      file: 'audio/ambient/wind4.mp3' },
	{ type: 'wind',      file: 'audio/ambient/wind5.mp3' },
	{ type: 'wind',      file: 'audio/ambient/wind6.mp3' },
	{ type: 'wind',      file: 'audio/ambient/wind7.mp3' },
	{ type: 'wind',      file: 'audio/ambient/wind8.mp3' },
	{ type: 'wind',      file: 'audio/ambient/wind9.mp3' },
	{ type: 'wind',      file: 'audio/ambient/wind10.mp3' },



	{ type: 'lightrain', file: 'audio/ambient/lightrain1.mp3' },
	{ type: 'lightrain', file: 'audio/ambient/lightrain2.mp3' },
	{ type: 'lightrain', file: 'audio/ambient/lightrain3.mp3' },
	{ type: 'lightrain', file: 'audio/ambient/lightrain4.mp3' },
	{ type: 'lightrain', file: 'audio/ambient/lightrain5.mp3' },
	{ type: 'lightrain', file: 'audio/ambient/lightrain6.mp3' },
	
	
	
	{ type: 'rain',      file: 'audio/ambient/rain1.mp3' },
	{ type: 'rain',      file: 'audio/ambient/rain2.mp3' },
	
	{ type: 'heavyrain', file: 'audio/ambient/heavyrain1.mp3' },
	{ type: 'heavyrain', file: 'audio/ambient/heavyrain2.mp3' },
	{ type: 'heavyrain', file: 'audio/ambient/heavyrain3.mp3' },
	{ type: 'heavyrain', file: 'audio/ambient/heavyrain4.mp3' },
	{ type: 'heavyrain', file: 'audio/ambient/heavyrain5.mp3' },
	{ type: 'heavyrain', file: 'audio/ambient/heavyrain6.mp3' },


	{ type: 'storm',     file: 'audio/ambient/storm1.mp3' },
	{ type: 'storm',     file: 'audio/ambient/storm2.mp3' },
	{ type: 'storm',     file: 'audio/ambient/storm3.mp3' },
	{ type: 'storm',     file: 'audio/ambient/storm4.mp3' },
	{ type: 'storm',     file: 'audio/ambient/storm5.mp3' },
	
	{ type: 'thunder', file: 'audio/ambient/thunder1.mp3' },
	{ type: 'thunder', file: 'audio/ambient/thunder2.mp3' },
	{ type: 'thunder', file: 'audio/ambient/thunder3.mp3' },
	{ type: 'thunder', file: 'audio/ambient/thunder4.mp3' },
	{ type: 'thunder', file: 'audio/ambient/thunder5.mp3' },
	{ type: 'thunder', file: 'audio/ambient/thunder6.mp3' },
	
	
	{ type: 'snow',    file: 'audio/ambient/snow1.mp3' },
	{ type: 'snow',    file: 'audio/ambient/snow2.mp3' },
	{ type: 'snow',    file: 'audio/ambient/snow3.mp3' },
];
/* ========================= نهاية منطقة التعديل ========================= */
