/* Écaille : service worker minimal. Page en réseau d'abord (toujours à jour), images en cache. */
const C='ecaille-img-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==location.origin)return;
  if(/\.(webp|png|jpg)$/.test(u.pathname)){
    e.respondWith(caches.open(C).then(c=>c.match(r).then(m=>m||fetch(r).then(n=>{if(n.ok)c.put(r,n.clone());return n}))));
  }
});
