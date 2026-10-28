/* حصن — Service Worker (دمج: كاش الصفحة القديم + حفظ المقاطع الصوتية للتشغيل بدون نت) */
const C='index';            // كاش الصفحة والملفات (زي ما كان)
const AUDIO='hisn-audio';   // كاش المقاطع الصوتية: ما بيتمسحش مع التحديث
const AUDIO_RE=/\.(mp3|m4a|aac|ogg|oga|opus|wav|flac)$/i;
const inflight=new Set();

const VERSION='2026.1';     // غيّره مع كل إصدار: المتصفح بيكتشف التحديث لما الملف ده يتغيّر، وبيظهر للمستخدم «في تحديث جديد»

/* ما بنعملش skipWaiting تلقائي: النسخة الجديدة بتستنى لحد ما المستخدم يضغط «تحديث الآن» (الصفحة بتبعت SKIP_WAITING) */
self.addEventListener('install',e=>{});
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!==AUDIO).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));

const isAudio=r=>{
  if(r.destination==='audio'||r.destination==='video')return true;
  try{return AUDIO_RE.test(new URL(r.url).pathname)}catch(_){return false}
};

self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET')return;
  if(r.headers.get('X-Hisn-Save')){e.respondWith(saveReq(r));return}   // طلب «حمّل للتشغيل بدون نت» من الصفحة
  if(isAudio(r)&&/^https?:$/.test(new URL(r.url).protocol)){e.respondWith(audio(e));return}
  if(new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>{});return res}).catch(()=>caches.match(r).then(m=>m||caches.match('./'))))
});

/* ===== حفظ مقطع بطلب من الصفحة (زرار التحميل): تحميلة واحدة، وبترد 204 لما يتحفظ ===== */
async function saveReq(r){
  const key=r.url.split('#')[0];
  try{
    const cache=await caches.open(AUDIO);
    if(await cache.match(key))return new Response(null,{status:204});
    const same=new URL(key).origin===location.origin;
    const res=await fetch(key,{mode:same?'same-origin':'cors',credentials:'omit'});   // بدون الهيدر المخصص، فمفيش preflight للمواقع الخارجية
    if(res.ok&&res.status===200){await cache.put(key,res);return new Response(null,{status:204})}
    return new Response(null,{status:res.status||502});
  }catch(_){return new Response(null,{status:502})}
}

/* ===== الصوت: من المحفوظ لو موجود (مع دعم Range)، وإلا من النت مع حفظه في الخلفية ===== */
async function audio(e){
  const r=e.request,key=r.url.split('#')[0];
  const cache=await caches.open(AUDIO);
  const hit=await cache.match(key);
  if(hit)return ranged(r,hit);
  if(!inflight.has(key))e.waitUntil(fill(cache,key));
  return fetch(r);
}
async function fill(cache,key){
  inflight.add(key);
  try{
    const same=new URL(key).origin===location.origin;
    const res=await fetch(key,{mode:same?'same-origin':'cors',credentials:'omit'});
    if(res.ok&&res.status===200)await cache.put(key,res);
  }catch(_){/* موقع خارجي بدون CORS أو النت قطع: ما نحفظش */}
  finally{inflight.delete(key)}
}
async function ranged(r,resp){
  const h=r.headers.get('range');
  if(!h)return resp;
  const m=/^bytes=(\d*)-(\d*)$/.exec(h.trim());
  if(!m||(m[1]===''&&m[2]===''))return resp;
  const blob=await resp.blob(),size=blob.size,type=resp.headers.get('content-type')||'audio/mpeg';
  let s,en;
  if(m[1]===''){s=Math.max(0,size-parseInt(m[2],10));en=size-1}
  else{s=parseInt(m[1],10);en=m[2]===''?size-1:Math.min(parseInt(m[2],10),size-1)}
  if(s>=size||s>en)return new Response(null,{status:416,headers:{'Content-Range':'bytes */'+size}});
  return new Response(blob.slice(s,en+1),{status:206,headers:{'Content-Type':type,'Content-Length':String(en-s+1),'Content-Range':`bytes ${s}-${en}/${size}`,'Accept-Ranges':'bytes'}});
}

self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>l.length?l[0].focus():self.clients.openWindow('./')))});
