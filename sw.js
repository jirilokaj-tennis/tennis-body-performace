const CACHE='tbp-v1-4-final1';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png','./exercises/unterarmst-tz-1.jpg','./exercises/unterarmst-tz-2.jpg','./exercises/seitst-tz-1.jpg','./exercises/seitst-tz-2.jpg','./exercises/dead-bug-1.jpg','./exercises/dead-bug-2.jpg','./exercises/bird-dog-1.jpg','./exercises/bird-dog-2.jpg','./exercises/glute-bridge-1.jpg','./exercises/glute-bridge-2.jpg','./exercises/reverse-crunch-1.jpg','./exercises/reverse-crunch-2.jpg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>(k.startsWith('tbp-')||k.startsWith('tennis-body-'))&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const req=event.request,u=new URL(req.url);if(req.method!=='GET'||u.origin!==self.location.origin||!u.pathname.startsWith(new URL(self.registration.scope).pathname))return;
if(req.mode==='navigate'||u.pathname.endsWith('/index.html')){event.respondWith(fetch(req).then(resp=>{if(resp.ok){let copy=resp.clone();caches.open(CACHE).then(c=>c.put(req,copy))}return resp}).catch(()=>caches.match(req).then(r=>r||caches.match('./index.html'))));return}
event.respondWith(caches.match(req).then(r=>r||fetch(req).then(resp=>{if(resp.ok){let copy=resp.clone();caches.open(CACHE).then(c=>c.put(req,copy))}return resp})))
});
