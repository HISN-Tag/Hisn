/* إذاعات القرآن الكريم: بث مباشر. عليها علامة 🌐، وتعمل فقط عند وجود إنترنت (تتعطّل وتتعتّم بدون نت). */
(function(){
  var d=document,svc=d.getElementById('svcg'),tabs=d.getElementById('stabs');
  if(!svc||!tabs||d.getElementById('qrad'))return;
  var API='https://www.mp3quran.net/api/v3/radios?language=ar';
  var FB=[{n:'إذاعة القرآن الكريم من القاهرة',u:'https://stream.radiojar.com/8s5u5tpdtwzuv'}];
  function ld(k){try{return localStorage.getItem(k)}catch(e){return null}}
  function sv(k,v){try{localStorage.setItem(k,v)}catch(e){}}
  function toast(m){try{window.apToast&&apToast(m)}catch(e){}}
  function esc(t){return String(t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function an(s){return String(s).replace(/[0-9]/g,function(c){return '٠١٢٣٤٥٦٧٨٩'.charAt(+c)})}
  function nz(t){return String(t).replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g,'').replace(/[إأآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').toLowerCase().trim()}
  function off(){return navigator.onLine===false}

  var css=d.createElement('style');
  css.textContent=
  '#qrad{position:relative}'
  +'#qrad .rdb{position:absolute;top:4px;inset-inline-end:4px;width:18px;height:18px;border-radius:50%;display:grid;place-items:center;font-size:.62rem;font-style:normal;line-height:1;background:rgba(0,0,0,.42);border:1px solid var(--line);pointer-events:none}'
  +'#qrad.cl .rdb{top:2px;inset-inline-end:2px;width:16px;height:16px;font-size:.55rem}'
  +'#qrad.rdoff{opacity:.45;filter:grayscale(1);cursor:not-allowed!important}'
  +'#qrad.rdoff .rdb{background:rgba(180,40,40,.75)}'
  +'#qrad .rdn{display:flex;align-items:center;gap:8px;margin:10px 0;padding:10px 12px;border-radius:16px;border:1.5px solid var(--line);background:rgba(255,255,255,.07)}'
  +'#qrad .rdn[hidden]{display:none}'
  +'#qrad .rdn b{flex:1;font-size:.92rem;line-height:1.5}'
  +'#qrad .rdn small{display:block;font-weight:400;color:var(--mut);font-size:.74rem}'
  +'#qrad .rdq{width:100%;box-sizing:border-box;border-radius:16px;border:1.5px solid var(--line);background:rgba(0,0,0,.18);color:inherit;padding:10px 12px;font:inherit;margin-bottom:8px}'
  +'#qrad .rdl{display:flex;flex-direction:column;gap:6px;max-height:52vh;overflow:auto;-webkit-overflow-scrolling:touch}'
  +'#qrad .rdl button{display:flex;align-items:center;gap:8px;text-align:start;padding:10px 12px;border-radius:14px;border:1.5px solid var(--line);background:rgba(255,255,255,.05);color:inherit;font:inherit;cursor:pointer}'
  +'#qrad .rdl button.on{background:rgba(232,204,142,.32);border-color:rgba(232,204,142,.7)}'
  +'#qrad.rdoff .rdl button{pointer-events:none}'
  +'#qrad .rdnt{font-size:.8rem;color:var(--mut);text-align:center;margin:8px 0 0}'
  +'nav.cat button[data-m="quran"]::after{content:none!important;display:none!important;animation:none!important}'
  +'nav.cat .rdh{display:grid;place-items:center;padding:0;color:var(--ink);cursor:pointer;background:none;border:0;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;touch-action:manipulation}'
  +'nav.cat .rdh .rdt{pointer-events:none}'
  +'nav.cat .rdh::after{content:"";position:absolute;top:calc(50% - 4px);inset-inline-end:calc(50% - 33px);width:8px;height:8px;border-radius:50%;background:#3ddc84;border:1.5px solid var(--card)}'
  +'#rpk{position:fixed;inset:0;z-index:95;display:flex;align-items:flex-end;justify-content:center;background:rgba(0,0,0,.6);animation:pkFade .25s ease both}'
  +'#rpk[hidden]{display:none}#rpk [hidden]{display:none!important}'
  +'#rpk.out{animation:pkFadeOut .22s ease both}'
  +'#rpk .pkc{box-sizing:border-box;width:100%;max-width:460px;max-height:86vh;display:flex;flex-direction:column;gap:8px;padding:14px 14px calc(14px + env(safe-area-inset-bottom,0px));border-radius:22px 22px 0 0;background:rgba(8,14,28,.98);border:1.5px solid var(--ac);border-bottom:0;color:var(--ink);text-align:start;animation:pkUp .38s cubic-bezier(.2,.9,.3,1) both}'
  +'#rpk.out .pkc{animation:pkDown .22s ease-in both}'
  +'#rpk .pkh{display:flex;justify-content:space-between;align-items:center;gap:8px}'
  +'#rpk .pkh b{font-size:1.02rem}'
  +'#rpk .pkh button{background:none;border:0;color:var(--ink);font-size:1.2rem;padding:4px 8px;cursor:pointer;min-width:44px;min-height:44px}'
  +'#rpk input{width:100%;box-sizing:border-box;padding:9px 12px;border-radius:12px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.07);color:var(--ink);font:inherit}'
  +'#rpk .rpm{font-size:.85rem;color:var(--mut);text-align:center;margin:0}#rpk .rpm:empty{display:none}'
  +'#rpk .pkl{overflow:auto;display:grid;gap:5px;padding:2px;min-height:120px;-webkit-overflow-scrolling:touch}'
  +'#rpk .pkr{display:flex;align-items:center;gap:10px;padding:9px 12px;min-height:44px;border-radius:12px;border:1px solid transparent;background:rgba(255,255,255,.06);color:var(--ink);font:inherit;text-align:start;cursor:pointer;transition:background .2s,border-color .2s,transform .15s}'
  +'#rpk .pkr:active{transform:scale(.97)}'
  +'#rpk .pkr.on{border-color:var(--ac);background:rgba(255,255,255,.14)}'
  +'#rpk .pkk{flex:none;width:22px;text-align:center;font-style:normal}'
  +'#rpk .pkg{padding:12px;border-radius:14px;border:0;background:var(--ac);color:#0b1220;font:inherit;font-weight:700;cursor:pointer}'
  +'nav.cat .rdh.off .rdt{text-decoration:line-through}'
  +'nav.cat .rdh.rdon{color:#1a1408}'
  +'nav.cat .rdh.rdon::after{border-color:var(--ac)}'
  +'nav.cat .rdh.off{opacity:.45;filter:grayscale(1)}'
  +'nav.cat .rdh.off::after{display:none}'
  +'#qrad .rdw{display:flex;gap:6px;align-items:stretch}'
  +'#qrad .rdw>button:first-child{flex:1;min-width:0}'
  +'#qrad .rdl button.rdf{flex:none;width:44px;justify-content:center;padding:0;font-size:1.1rem;line-height:1}'
  +'#rpk .pkw{display:flex;gap:5px;align-items:stretch}'
  +'#rpk .pkw>.pkr{flex:1;min-width:0}'
  +'#rpk .pkf{flex:none;width:44px;min-height:44px;border-radius:12px;border:1px solid transparent;background:rgba(255,255,255,.06);color:var(--mut);font:inherit;font-size:1.1rem;line-height:1;cursor:pointer}'
  +'#qrad .rdl button.rdf.fv,#rpk .pkf.fv{color:#f5c542}'
  ;
  d.head.appendChild(css);

  var card=d.createElement('section');
  card.className='sc cl';card.id='qrad';card.dataset.p='qur';card.dataset.g='إذاعات القرآن الكريم';
  card.dataset.kw='إذاعات القرآن الكريم راديو اذاعة بث مباشر إنترنت اذاعات';
  card.innerHTML='<h3><span class="ic" aria-hidden="true">📻</span><span>إذاعات القرآن</span><i class="rdb" id="rdBadge" aria-hidden="true">🌐</i></h3>'
  +'<p class="mutp">بث مباشر لإذاعات القرآن الكريم على مدار الساعة. 🌐 تحتاج اتصالًا بالإنترنت ولا تعمل بدونه.</p>'
  +'<div class="rdn" id="rdNow" hidden><span aria-hidden="true">📻</span><b id="rdNm"></b><button class="chip" type="button" id="rdStop">⏹ إيقاف</button></div>'
  +'<input class="rdq" id="rdQ" type="search" placeholder="ابحث عن إذاعة" aria-label="بحث عن إذاعة" autocomplete="off">'
  +'<div class="rdl" id="rdL" role="list"></div>'
  +'<p class="rdnt" id="rdMsg"></p>';
  svc.appendChild(card);
  /* زر الإذاعة في الشاشة الرئيسية: ضغطة تشغّل آخر إذاعة وضغطة ثانية توقفها، وزر ☰ يفتح قائمة الإذاعات */
  function g0(id){return d.getElementById(id)}
  var home=d.createElement('button');home.type='button';home.className='rdh';home.id='rdHome';
  home.setAttribute('aria-label','راديو: إذاعة القرآن الكريم. اضغط للتشغيل أو الإيقاف المؤقت، واضغط مطوّلًا لاختيار إذاعة');
  home.innerHTML='<span class="rdt">راديو</span>';
  var cat=g0('cat');
  try{
    var sb0=g0('svc');
    if(cat&&sb0&&sb0.parentNode===cat)cat.insertBefore(home,sb0);
    else if(cat)cat.appendChild(home);
    else{var info=d.querySelector('section.info');if(info)info.appendChild(home)}
  }catch(e){}
  try{
    tabs.querySelectorAll('button').forEach(function(b){
      var n=[].filter.call(svc.children,function(x){return x.classList.contains('sc')&&x.dataset.p===b.dataset.t}).length,m=b.querySelector('small');
      if(m)m.textContent=n===1?'خدمة واحدة':an(n)+(n<=10?' خدمات':' خدمة');
    });
  }catch(e){}

  var A=new Audio();A.preload='none';
  var ST=[],cur=-1,q='';
  function g(id){return d.getElementById(id)}
  function normList(a){
    var seen={},o=[];
    (a||[]).forEach(function(r){
      var n=(r.n||r.name||'').trim(),u=(r.u||r.url||'').trim();
      if(!n||!/^https?:\/\//.test(u)||seen[u])return;
      seen[u]=1;o.push({n:n,u:u});
    });
    return o;
  }
  try{var c0=JSON.parse(ld('qrad_list')||'null');ST=normList(c0)}catch(e){}
  if(!ST.length)ST=normList(FB);

  /* الإذاعات المفضّلة: نجمة على الإذاعة وتظهر في أول القائمة */
  var FAV=[];try{FAV=JSON.parse(ld('qrad_fav')||'[]');if(!Array.isArray(FAV))FAV=[]}catch(e){FAV=[]}
  function isFav(u){return FAV.indexOf(u)>=0}
  function order(k){var f=[],o=[];ST.forEach(function(s,i){if(k&&nz(s.n).indexOf(k)<0)return;(isFav(s.u)?f:o).push(i)});return f.concat(o)}
  function favBtn(cls,i,s){var f=isFav(s.u);return '<button type="button" class="'+cls+(f?' fv':'')+'" data-f="'+i+'" aria-pressed="'+f+'" aria-label="'+(f?'إزالة من المفضلة: ':'إضافة إلى المفضلة: ')+esc(s.n)+'">'+(f?'★':'☆')+'</button>'}
  function toggleFav(i){var s=ST[i];if(!s)return;var k=FAV.indexOf(s.u);if(k>=0)FAV.splice(k,1);else FAV.push(s.u);sv('qrad_fav',JSON.stringify(FAV));render()}
  function render(){
    var L=g('rdL'),k=nz(q),h='';
    order(k).forEach(function(i){
      var s=ST[i];
      h+='<div class="rdw" role="listitem"><button type="button" data-i="'+i+'"'+(i===cur?' class="on"':'')+'><span aria-hidden="true">'+(i===cur&&!A.paused?'🔊':'📻')+'</span><span>'+esc(s.n)+'</span></button>'+favBtn('rdf',i,s)+'</div>';
    });
    L.innerHTML=h||'<p class="rdnt">لا توجد نتائج</p>';
    if(rp&&!rp.hidden)rpDraw();
  }
  function msg(t){g('rdMsg').textContent=t||''}
  var saved=null,rpz=false,catS=null,rIdx=-1,seq=0,lastTap=0,tries=0,mainSrc0='',intentT=0,hops=0,pend=null;
  function navOn(){
    if(!cat||catS||home.parentNode!==cat)return;
    rIdx=[].indexOf.call(cat.children,home);
    var sb=g0('sub');
    catS={i:cat.style.getPropertyValue('--i'),on:[].slice.call(cat.querySelectorAll(':scope > button.on')),sh:sb?sb.hidden:true};
    cat.style.setProperty('--i',String(rIdx));
    if(sb)sb.hidden=true; /* أزرار أذكار/ابتهالات/أناشيد تختفي أثناء الراديو */
    catS.on.forEach(function(b){b.classList.remove('on')});
  }
  function navOff(){
    if(!catS)return;
    var o=catS;catS=null;
    /* لو المشغّل الرئيسي حرّك الإبراز بنفسه (mark) نسيب اللي حطّه، وإلا نرجّع القديم */
    if(cat&&cat.style.getPropertyValue('--i')===String(rIdx)){
      cat.style.setProperty('--i',o.i);
      o.on.forEach(function(b){b.classList.add('on')});
      var sb=g0('sub');if(sb)sb.hidden=o.sh;
    }
  }
  /* الإذاعة تحل محل المقطع في المشغّل الرئيسي: الاسم والزر والحلقة والتلميح، وعند الإيقاف يرجع المقطع كما كان */
  function mainUi(){
    var T=g('title'),H=g('hint'),W=g('why'),D=g('desc'),M=g('time'),R=g('ring'),b=d.body;
    if(!T||!H||!M)return;
    var has=cur>=0&&ST[cur],on=has&&!A.paused;
    if(has){
      if(!saved)saved={t:T.textContent,w:W?W.textContent:'',wd:W?W.style.display:'',d:D?D.textContent:'',dh:D?D.hidden:true,tm:M.textContent,h:H.textContent,r:R?R.style.strokeDashoffset:'',p:b.classList.contains('playing')};
      var nm=ST[cur].n;
      if(T.textContent!==nm){T.textContent=nm;T.classList.remove('swap');void T.offsetWidth;T.classList.add('swap')}
      if(D){D.classList.remove('go');D.hidden=true;D.textContent=''}
      if(W){W.textContent='📻 بث مباشر';W.style.display=''}
      M.textContent='بث مباشر';
      if(R)R.style.strokeDashoffset='0';
      var ht=on?'بث مباشر':(rpz?'متوقف مؤقتًا':'جارٍ الاتصال…');
      H.textContent=ht;H.classList.toggle('long',ht.length>22);
      b.classList.toggle('playing',!!on);
    }else if(saved){
      var o=saved;saved=null;
      T.textContent=o.t;
      if(W){W.textContent=o.w;W.style.display=o.wd}
      if(D){D.textContent=o.d;D.hidden=o.dh}
      M.textContent=o.tm;
      if(R)R.style.strokeDashoffset=o.r;
      var h2=o.p?'متوقف مؤقتًا':o.h;
      H.textContent=h2;H.classList.toggle('long',h2.length>22);
      b.classList.remove('playing');
      try{if('mediaSession' in navigator)navigator.mediaSession.metadata=new MediaMetadata({title:o.t,artist:'حصن'})}catch(e){}
    }
    if(has)navOn();else navOff();
  }
  function hp(){
    var h=g('rdHome');
    if(h){var has=cur>=0&&ST[cur];
      h.classList.toggle('rdon',!!has);
      h.setAttribute('aria-pressed',has?'true':'false');
      h.title=has?'إيقاف مؤقت / استئناف الإذاعة':'إذاعة القرآن الكريم (اضغط مطوّلًا لاختيار إذاعة)';
    }
    mainUi();
  }
  function now(){
    var box=g('rdNow'),on=cur>=0&&ST[cur]&&!A.paused;hp();
    box.hidden=!(cur>=0&&ST[cur]);
    if(cur>=0&&ST[cur])g('rdNm').innerHTML=esc(ST[cur].n)+'<small>'+(on?'بث مباشر':'جارٍ الاتصال…')+'</small>';
  }
  function mediaRestore(){
    try{if('mediaSession' in navigator){
      var ms=navigator.mediaSession,click=function(id){var b=g(id);b&&b.click()};
      ms.setActionHandler('play',function(){var m=g('audio');if(m&&m.paused)click('b-play')});
      ms.setActionHandler('pause',function(){var m=g('audio');if(m&&!m.paused)click('b-play')});
      ms.setActionHandler('stop',null);
      ms.setActionHandler('nexttrack',function(){click('b-next')});
      ms.setActionHandler('previoustrack',function(){click('b-prev')});
    }}catch(e){}
  }
  function stop(keep){
    seq++;rpz=false;
    try{A.pause();A.removeAttribute('src');A.load()}catch(e){}
    cur=-1;
    if(keep===true)saved=null; /* المشغّل الرئيسي بدأ مقطعًا جديدًا: لا نرجّع القديم فوقه */
    now();render();mediaRestore();
  }
  function pauseR(){
    if(cur<0)return;
    seq++;rpz=true;
    try{A.pause();A.removeAttribute('src');A.load()}catch(e){}
    now();render();
  }
  function fail(){
    if(cur<0||rpz)return;
    var i=cur;
    if(off()){toast('انقطع الإنترنت، توقفت الإذاعة');pauseR();return}
    if(tries<1){tries++;setTimeout(function(){if(cur===i&&!rpz&&!off())play(i,true)},1200);return}
    /* بعد محاولتين: نجرّب الإذاعة اللي بعدها بدل ما نقف عند رسالة الخطأ (حتى ٤ إذاعات) */
    var od=order(''),p=od.indexOf(i),nx=(od.length>1&&hops<Math.min(4,od.length-1))?od[(p+1)%od.length]:-1;
    if(nx>=0&&nx!==i&&ST[nx]){hops++;tries=0;toast('تعذّر تشغيل «'+ST[i].n+'»، جارٍ تجربة «'+ST[nx].n+'»');play(nx,true,true);return}
    toast('تعذّر تشغيل الإذاعات المتاحة. اضغط للمحاولة مرة أخرى أو اختر إذاعة أخرى');
    pauseR();
  }
  function resumeR(){if(cur>=0&&ST[cur])play(cur)}
  function stepR(dir){var od=order('');if(!od.length)return;var p=od.indexOf(cur);play(od[p<0?0:(p+dir+od.length)%od.length])}
  function play(i,retry,hop){
    if(off()){toast('إذاعات القرآن تحتاج إنترنت');return}
    var s=ST[i];if(!s)return;
    if(!retry){tries=0;hops=0}pend=null;
    try{var m=g('audio');if(m){mainSrc0=m.currentSrc||m.src||'';if(!m.paused)m.pause()}}catch(e){}
    var my=++seq;
    rpz=false;cur=i;if(!hop)sv('qrad_last',s.u);try{A.volume=1}catch(e){}A.src=s.u;now();render();
    var p=A.play();if(p&&p.catch)p.catch(function(e){
      if(my!==seq||cur!==i)return;                       /* طلب قديم اتلغى بضغطة أحدث */
      if(e&&e.name==='AbortError')return;                /* تم إلغاؤه بإيقاف/تبديل، مش خطأ حقيقي */
      fail()});
    try{if('mediaSession' in navigator){navigator.mediaSession.metadata=new MediaMetadata({title:s.n,artist:'إذاعات القرآن الكريم'});var ms=navigator.mediaSession;ms.setActionHandler('play',resumeR);ms.setActionHandler('pause',pauseR);ms.setActionHandler('stop',stop);ms.setActionHandler('nexttrack',function(){stepR(1)});ms.setActionHandler('previoustrack',function(){stepR(-1)})}}catch(e){}
  }
  A.addEventListener('playing',function(){tries=0;hops=0;now();render()});
  A.addEventListener('error',function(){if(cur<0||rpz||!A.getAttribute('src'))return;fail()});
  var mainA=g('audio');
  if(mainA)mainA.addEventListener('play',function(){
    if(cur<0)return;
    var src=mainA.currentSrc||mainA.src||'';
    /* نفس المقطع القديم اشتغل متأخرًا من غير ما المستخدم يختار قسمًا (تشغيل تلقائي عند أول فتح): نوقفه ونكمل الراديو */
    if(src===mainSrc0&&Date.now()-intentT>1500&&Date.now()-(window.__adhanAt||0)>=5000){
      try{mainA.pause()}catch(e){}
      setTimeout(now,60);setTimeout(now,400);
      return;
    }
    if(!rpz&&!A.paused&&ST[cur]&&Date.now()-(window.__adhanAt||0)<5000)pend={u:ST[cur].u,t:Date.now()}; /* الأذان قاطع الراديو: نرجّعه بعد انتهاء الأذان */
    stop(true);
  });

  g('rdL').addEventListener('click',function(e){
    var fb=e.target.closest('button[data-f]');if(fb){toggleFav(+fb.dataset.f);return}
    var b=e.target.closest('button[data-i]');if(!b)return;
    var i=+b.dataset.i;if(i===cur&&!A.paused){stop();return}
    play(i);
  });
  g('rdStop').addEventListener('click',stop);
  /* قائمة اختيار الإذاعة: نفس شكل قائمة القرآن والأذكار، تتفتح مباشرة فوق الشاشة الرئيسية */
  var rp=null;
  function rpDraw(){
    if(!rp)return;
    var k=nz(rp.querySelector('input').value),h='';
    order(k).forEach(function(i){
      var s=ST[i],on=i===cur;
      h+='<div class="pkw" role="listitem"><button type="button" class="pkr'+(on?' on':'')+'" data-i="'+i+'"><i class="pkk" aria-hidden="true">'+(on?(A.paused?'⏳':'🔊'):'📻')+'</i><span>'+esc(s.n)+'</span></button>'+favBtn('pkf',i,s)+'</div>';
    });
    rp.querySelector('.pkl').innerHTML=h||'<p class="rpm">لا نتائج مطابقة.</p>';
    rp.querySelector('.rpm.top').textContent=off()?'لا يوجد اتصال بالإنترنت. الإذاعات تعمل فقط عند توفّر الإنترنت.':'';
    rp.querySelector('.pkg').hidden=!(cur>=0);
  }
  function rpClose(){
    if(!rp||rp.hidden)return;
    rp.classList.add('out');
    setTimeout(function(){rp.hidden=true;rp.classList.remove('out')},230);
  }
  function openRP(){
    sv('qrad_used','1');
    if(!rp){
      rp=d.createElement('div');rp.id='rpk';rp.hidden=true;
      rp.innerHTML='<div class="pkc" role="dialog" aria-modal="true"><div class="pkh"><b>إذاعات القرآن الكريم — اختر إذاعة</b><button type="button" class="rpx" aria-label="إغلاق">✕</button></div>'
      +'<input type="search" placeholder="ابحث عن إذاعة" aria-label="بحث عن إذاعة" autocomplete="off"><p class="rpm top"></p>'
      +'<div class="pkl" role="list"></div><button type="button" class="pkg">⏹ إيقاف الإذاعة</button></div>';
      d.body.appendChild(rp);
      rp.addEventListener('click',function(e){
        if(e.target===rp||e.target.closest('.rpx')){rpClose();return}
        if(e.target.closest('.pkg')){stop();rpClose();return}
        var fb=e.target.closest('.pkf');if(fb){toggleFav(+fb.dataset.f);return}
        var b=e.target.closest('.pkr');if(!b)return;
        var i=+b.dataset.i;
        if(i===cur&&!A.paused){rpClose();return}
        if(off()){toast('إذاعات القرآن تحتاج إنترنت');return}
        play(i);rpClose();
      });
      rp.querySelector('input').addEventListener('input',rpDraw);
      d.addEventListener('keydown',function(e){if(e.key==='Escape'&&rp&&!rp.hidden)rpClose()});
    }
    rp.querySelector('input').value='';
    rp.classList.remove('out');rp.hidden=false;rpDraw();
    if(!off())loadList();
  }
  /* تلميح مرة واحدة (حتى ٣ مرات، ويتوقف لو فتح المستخدم القائمة): الضغط المطوّل على «راديو» */
  function rdHint(){
    if(ld('qrad_used'))return;
    var n=+ld('qrad_hint')||0;if(n>=3)return;
    sv('qrad_hint',String(n+1));
    setTimeout(function(){toast('اضغط مطوّلًا على «راديو» لاختيار إذاعة أو إضافتها للمفضلة')},1500);
  }
  var lpT=0,lpDone=false;
  home.addEventListener('pointerdown',function(){
    lpDone=false;clearTimeout(lpT);
    lpT=setTimeout(function(){lpDone=true;try{navigator.vibrate&&navigator.vibrate(20)}catch(e){}openRP()},550);
  });
  ['pointerup','pointerleave','pointercancel'].forEach(function(ev){home.addEventListener(ev,function(){clearTimeout(lpT)})});
  home.addEventListener('contextmenu',function(e){e.preventDefault()});
  home.addEventListener('click',function(){
    if(lpDone){lpDone=false;return}
    var tn=Date.now();if(tn-lastTap<400)return;lastTap=tn;   /* الضغطة المزدوجة السريعة تُحسب ضغطة واحدة */
    /* الراديو شغّال: الضغطة تعمل إيقاف مؤقت/استئناف وتبقى العلامة مختارة، ولا نرجع للزر السابق */
    if(cur>=0){if(rpz||A.paused)resumeR();else pauseR();return}
    if(off()){toast('إذاعات القرآن تحتاج إنترنت');return}
    var u=ld('qrad_last')||(normList(FB)[0]||{}).u,i=-1,k;
    for(k=0;k<ST.length;k++)if(ST[k].u===u){i=k;break}
    if(i<0)i=0;
    play(i);rdHint();
  });
  /* أثناء تشغيل الإذاعة: أزرار المشغّل الرئيسي تتحكم فيها (تشغيل/إيقاف مؤقت، التالي والسابق = تبديل الإذاعة) */
  d.addEventListener('click',function(e){
    var t0=e.target;
    if(t0&&t0.closest&&t0.closest('#cat button[data-m],#sub button,#pk'))intentT=Date.now();
    if(pend&&t0&&t0.closest&&t0.closest('#b-play,#b-next,#b-prev,#b-back,#b-fwd,#cat button[data-m],#sub button,#pk'))pend=null; /* المستخدم تدخّل: لا نرجّع الراديو تلقائيًا */
    if(cur<0)return;
    var t=e.target,b=t&&t.closest&&t.closest('#b-play,#b-next,#b-prev,#b-back,#b-fwd');
    if(!b)return;
    e.stopImmediatePropagation();e.preventDefault();
    if(b.id==='b-play'){if(rpz||A.paused)resumeR();else pauseR()}
    else if(b.id==='b-next')stepR(1);
    else if(b.id==='b-prev')stepR(-1);
  },true);
  var qb=g('quietB');if(qb)qb.addEventListener('click',function(){if(cur>=0)stop()});
  g('rdQ').addEventListener('input',function(){q=this.value;render()});

  var loading=false;
  function loadList(){
    if(off()||loading)return;loading=true;
    var done=function(){loading=false};
    try{
      fetch(API).then(function(r){return r.json()}).then(function(j){
        var l=normList((j&&j.radios||[]).map(function(r){return{n:r.name,u:r.url}}));
        if(l.length){
          var fbu=normList(FB)[0];
          if(fbu&&!l.some(function(x){return x.u===fbu.u}))l.unshift(fbu);
          var curU=cur>=0&&ST[cur]?ST[cur].u:null;
          ST=l;sv('qrad_list',JSON.stringify(l));
          cur=curU?ST.map(function(x){return x.u}).indexOf(curU):-1;
          render();
        }
        done();
      }).catch(function(){done()});
    }catch(e){done()}
  }

  function upd(){
    var o=off();
    card.classList.toggle('rdoff',o);
    var hh=g('rdHome');if(hh)hh.classList.toggle('off',o);
    card.setAttribute('aria-disabled',o?'true':'false');
    g('rdBadge').title=o?'تحتاج إنترنت':'تعمل بالإنترنت';
    if(o){if(cur>=0){stop();toast('انقطع الإنترنت، توقفت الإذاعة')}msg('لا يوجد اتصال بالإنترنت. الإذاعات تعمل فقط عند توفّر الإنترنت.')}
    else{msg('');loadList()}
  }
  /* عند عدم وجود إنترنت: امنع فتح البطاقة أو تشغيل أي إذاعة واعرض تنبيهًا */
  d.addEventListener('click',function(e){
    if(!off())return;
    var t=e.target,c=t&&t.closest&&t.closest('#qrad');
    if(!c)return;
    if(c.classList.contains('cl')||t.closest('.rdl button')){
      e.stopImmediatePropagation();e.preventDefault();
      toast('إذاعات القرآن تحتاج إنترنت');
    }
  },true);
  addEventListener('offline',upd);addEventListener('online',upd);
  /* واجهة للمشغّل الرئيسي: مؤقت النوم (r بالمللي ثانية، 0 = انتهى، سالب = إلغاء) وانتهاء الأذان */
  window.__rdSleep=function(r){
    try{
      if(r<0){A.volume=1;return}
      if(cur<0)return;
      if(r===0){stop();A.volume=1;return}
      if(r<=3e4)A.volume=Math.max(.02,r/3e4);
    }catch(e){}
  };
  window.__rdAfterAdhan=function(){
    var p=pend;pend=null;
    if(!p||Date.now()-p.t>20*6e4||off())return false;
    var i=-1,k;for(k=0;k<ST.length;k++)if(ST[k].u===p.u){i=k;break}
    if(i<0)return false;
    play(i);toast('رجعت الإذاعة بعد الأذان');
    return true;
  };
  render();upd();
})();
