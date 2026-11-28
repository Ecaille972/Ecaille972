/* ÉCAILLE · Saison 1 « L'appel du large » — version officielle (le serveur décide de tout) */
(function(){
/* ---------- Configuration (en production : table « territoires » modifiable sans toucher au code) ---------- */
const TERR=[
 {id:'large',n:'Grand Large',lv:1,d:'Les poissons du large'},
 {id:'douce',n:'Eaux douces',lv:1,d:'Rivières, lacs et grands fleuves'},
 {id:'recif',n:'Récifs exotiques',lv:1,d:'Les poissons de récif'},
 {id:'requins',n:'Requins & Raies',lv:25,d:'Les grands prédateurs'},
 {id:'crust',n:'Crustacés & Mollusques',lv:40,d:'Crabes, homards, coquillages'},
 {id:'abysses',n:'Abysses',lv:50,d:'Lueurs et crocs sous 200 m'}];
window.S1_CFG={TERR};
const T=id=>TERR.find(t=>t.id===id);
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* rangs : paliers du cahier des charges + rangs après le niveau 50 */
TITLES.splice(0,TITLES.length,[1,'Pêcheur débutant'],[10,'Pêcheur initié'],[20,'Pêcheur confirmé'],[30,'Explorateur marin'],[40,'Expert des océans'],[50,'Maître des océans'],[65,'Gardien des abysses'],[80,'Légende des océans'],[100,'Roi des profondeurs']);

/* ---------- État ---------- */
let busy=false;
const DEF={un:{large:1},ch:{},q:[],intro:0,founder:0};
function st(){return S.s1||DEF}
const isPub=z=>true;
const isUn=z=>!!st().un[z];
const unl=()=>TERR.filter(t=>isUn(t.id)).map(t=>t.id);
const lvl=()=>lvInfo().L;
const stock=z=>(S.bs&&S.bs[z])||0;
const total=()=>TERR.reduce((a,t)=>a+stock(t.id),0);
function add(z,n){S.bs=S.bs||{};S.bs[z]=(S.bs[z]||0)+n}
function norm(){}
/* ---------- Branchements dans le jeu ---------- */
window.S1={
  unl,
  canOpen(){const th=S.theme||'large';if(isUn(th)&&stock(th)>0)return true;const z=unl().find(x=>stock(x)>0);if(z){S.theme=z;return true}return false},
  take(){},total,add(){}};
const _ra=renderAll;renderAll=function(){_ra();deco()};
const _ru=renderUI;renderUI=function(){_ru();deco()};
const _rb=renderUBoosters;renderUBoosters=function(){_rb();deco()};
function nextGoal(){const n=TERR.find(t=>!isUn(t.id));return n||null}
function deco(){try{
  if(!S)return;
  const bv=$('u-bv');if(bv)bv.textContent=total();
  const rail=$('u-rail');
  if(rail)rail.querySelectorAll('.pk').forEach(b=>{
    const z=b.dataset.theme,lock=!isUn(z),pr=b.querySelector('.pr');
    if(pr)pr.innerHTML='<b class="s1n">×'+stock(z)+'</b>';
    b.classList.toggle('s1lk',lock);
    let l=b.querySelector('.s1l');if(!l){l=document.createElement('span');l.className='s1l';b.appendChild(l)}
    l.textContent=lock?(isPub(z)?'🔒 Niv. '+T(z).lv:'Bientôt'):'';l.hidden=!lock});
  const th=S.theme||'large',op=$('u-open');
  if(op){const lock=!isUn(th),n=stock(th);
    op.disabled=lock||n<1;
    const svg=op.querySelector('svg');
    op.innerHTML=(svg?svg.outerHTML:'')+(lock?(isPub(th)?'Verrouillé · niveau '+T(th).lv:'Bientôt disponible'):(n<1?'Stock vide':'Ouvrir · '+n+' en stock'))}
  const nt=$('s1b'),pk=document.querySelector('.u-pick .u-ph');
  if(pk){let b=nt;if(!b){b=document.createElement('button');b.id='s1b';b.type='button';pk.insertAdjacentElement('afterend',b)}
    const g=nextGoal(),L=lvl();
    b.innerHTML='<span class="s1ic">🗺</span><span class="s1tx"><b>Carte des territoires</b><small>'+(g?(isPub(g.id)?'Prochain : '+esc(g.n)+' · niveau '+g.lv+' (encore '+Math.max(0,g.lv-L)+')':'Prochain : '+esc(g.n)+' · bientôt disponible'):'Tous les territoires sont débloqués')+'</small></span><span class="s1go">›</span>'}
  const un=$('u-name');if(un&&st().founder&&!un.dataset.f){un.dataset.f='1';un.textContent=titleOf(lvl())}
  if(un&&st().founder){const t=titleOf(lvl());if(!un.textContent.includes('fondateur'))un.textContent=t+' · Explorateur fondateur'}
}catch(e){console.error(e)}}
/* ---------- Styles ---------- */
const css=document.createElement('style');css.textContent=`
#s1b{display:flex;align-items:center;gap:12px;width:100%;margin:10px 0 0;padding:12px 14px;border-radius:14px;border:1px solid rgba(255,184,31,.45);background:linear-gradient(135deg,rgba(255,184,31,.14),rgba(255,184,31,.04));color:#fff;font-family:inherit;text-align:left;cursor:pointer}
#s1b .s1ic{font-size:24px}#s1b .s1tx{flex:1;min-width:0}#s1b b{display:block;font-size:15px}#s1b small{display:block;font-size:12.5px;color:#c9d3ea;margin-top:2px}#s1b .s1go{font-size:24px;color:#ffb81f}
#u-rail .pk{position:relative}#u-rail .pk .s1n{font-size:15px;color:#fff;font-weight:800}
#u-rail .pk.s1lk .im{filter:grayscale(.75) brightness(.55)}
#u-rail .pk .s1l{position:absolute;left:50%;top:38%;transform:translate(-50%,-50%);background:rgba(5,7,13,.86);border:1px solid rgba(255,255,255,.25);color:#fff;border-radius:10px;padding:4px 8px;font-size:11.5px;font-weight:700;white-space:nowrap}
#s1m,#s1u,#s1i{position:fixed;inset:0;display:none;background:#05070d;color:#fff;font-family:inherit}
#s1m.on,#s1u.on,#s1i.on{display:block}
#s1m{z-index:80;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:max(14px,env(safe-area-inset-top)) 14px 150px}
#s1m .hd{display:flex;align-items:center;gap:10px;margin-bottom:12px}
#s1m .x{width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.06);color:#fff;font-size:18px;cursor:pointer;flex:none}
#s1m h2{margin:0;font-size:22px;font-style:italic;font-weight:800;text-transform:uppercase;flex:1;text-align:center;padding-right:38px}
#s1m .rk{display:flex;align-items:center;gap:12px;padding:12px 14px;border:1px solid rgba(255,255,255,.12);border-radius:14px;background:#0b1224;margin-bottom:14px}
#s1m .rk .lv{width:46px;height:46px;border-radius:50%;border:2px solid #ffb81f;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:18px;color:#ffb81f;flex:none}
#s1m .rk b{display:block;font-size:16px}#s1m .rk .bar{height:7px;border-radius:4px;background:rgba(255,255,255,.1);margin-top:6px;overflow:hidden}#s1m .rk .bar i{display:block;height:100%;background:linear-gradient(90deg,#ffb81f,#ffd45e)}
#s1m .rk small{display:block;color:#9fb0d0;font-size:12px;margin-top:4px}
#s1m .path{position:relative;display:flex;flex-direction:column;gap:0}
#s1m .stg{position:relative;margin:0 0 26px 0}
#s1m .stg:not(:last-child)::after{content:"";position:absolute;left:50%;top:100%;width:4px;height:26px;margin-left:-2px;background:rgba(255,255,255,.14)}
#s1m .stg.pass:not(:last-child)::after{background:linear-gradient(#ffb81f,#ffb81f)}
#s1m .cd{display:flex;gap:14px;align-items:center;padding:12px;border-radius:16px;border:1px solid rgba(255,255,255,.12);background:#0b1224;cursor:pointer;width:100%;color:#fff;text-align:left;font-family:inherit}
#s1m .stg.cur .cd{border:2px solid #ffb81f;box-shadow:0 0 22px -6px #ffb81f;background:linear-gradient(135deg,#142041,#0b1224)}
#s1m .stg.lk .cd{opacity:.78}
#s1m .stg.lk .im{filter:grayscale(.8) brightness(.55)}
#s1m .im{width:62px;height:96px;flex:none;background-size:contain;background-position:center;background-repeat:no-repeat;position:relative}
#s1m .im .pad{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:26px}
#s1m .tx{flex:1;min-width:0}#s1m .tx h3{margin:0 0 2px;font-size:17px;font-style:italic;font-weight:800}
#s1m .tx p{margin:0;font-size:12.5px;color:#9fb0d0}
#s1m .tag{display:inline-block;font-size:11px;font-weight:800;padding:3px 9px;border-radius:10px;margin-bottom:5px}
#s1m .tag.ok{background:rgba(255,184,31,.18);color:#ffb81f}#s1m .tag.hr{background:#ffb81f;color:#1a1200}#s1m .tag.lk{background:rgba(255,255,255,.1);color:#c9d3ea}#s1m .tag.nx{background:rgba(58,168,255,.2);color:#6fc8ff}
#s1m .pg{height:6px;border-radius:3px;background:rgba(255,255,255,.1);margin-top:8px;overflow:hidden}#s1m .pg i{display:block;height:100%;background:#ffb81f}
#s1m .dt{display:none;margin:-6px 6px 0;padding:14px;border:1px solid rgba(255,255,255,.12);border-top:0;border-radius:0 0 14px 14px;background:#08101f}
#s1m .stg.open .dt{display:block}
#s1m .dt h4{margin:0 0 8px;font-size:13px;color:#ffb81f;letter-spacing:.04em;text-transform:uppercase}
#s1m .ch{display:flex;align-items:center;gap:10px;padding:9px 0;border-top:1px solid rgba(255,255,255,.07);font-size:13.5px}
#s1m .ch .t{flex:1}#s1m .ch .t small{display:block;color:#9fb0d0;font-size:11.5px}
#s1m .ch button{border:0;border-radius:10px;padding:8px 11px;font-weight:800;font-size:12.5px;cursor:pointer;background:#ffb81f;color:#1a1200;font-family:inherit}
#s1m .ch button:disabled{background:rgba(255,255,255,.1);color:#8d9bbd;cursor:default}
#s1m .go{display:block;width:100%;margin-top:10px;border:0;border-radius:12px;padding:12px;font-weight:800;font-size:15px;background:#ffb81f;color:#1a1200;cursor:pointer;font-family:inherit}
#s1m .nxt{position:fixed;left:0;right:0;bottom:0;padding:12px 14px max(12px,env(safe-area-inset-bottom));background:linear-gradient(transparent,#05070d 28%);}
#s1m .nxt .bx{padding:12px 14px;border:1px solid rgba(255,184,31,.5);border-radius:14px;background:#0b1224}
#s1m .nxt b{font-size:14px}#s1m .nxt small{display:block;color:#c9d3ea;font-size:12.5px;margin:2px 0 7px}
#s1u{z-index:95;text-align:center;overflow:hidden;background:radial-gradient(ellipse at 50% 38%,#16264f,#05070d 70%)}
#s1u .s1in{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px}
#s1u .s1k{font-size:13px;letter-spacing:.2em;font-weight:800;color:#ffb81f;opacity:0;animation:s1f .6s .2s forwards}
#s1u h2{margin:8px 0 18px;text-align:center;font-size:30px;font-style:italic;font-weight:800;text-transform:uppercase;opacity:0;animation:s1f .6s .6s forwards}
#s1u .s1pk{width:150px;height:250px;background-size:contain;background-repeat:no-repeat;background-position:center;opacity:0;transform:scale(.4);animation:s1pop 1s 1.1s cubic-bezier(.2,1.4,.4,1) forwards,s1gl 2.4s 2.2s ease-in-out infinite}
#s1u .s1sub{margin:16px 0 4px;font-size:17px;opacity:0;animation:s1f .6s 2.1s forwards}#s1u .s1gf{font-size:13.5px;color:#ffb81f;font-weight:700;opacity:0;animation:s1f .6s 2.5s forwards}
#s1u button{margin-top:22px;width:100%;max-width:320px;border:0;border-radius:14px;padding:15px;font-weight:800;font-size:16px;background:#ffb81f;color:#1a1200;cursor:pointer;opacity:0;animation:s1f .6s 3s forwards;font-family:inherit}
#s1u button.s{background:none;color:#8d9bbd;margin-top:6px;font-weight:600}
@keyframes s1f{to{opacity:1}}@keyframes s1pop{to{opacity:1;transform:scale(1)}}@keyframes s1gl{50%{filter:drop-shadow(0 0 26px rgba(255,184,31,.8))}}
#s1i{z-index:96;overflow:hidden}
#s1i .bg{display:none}
#s1i .sh{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 30%,#16264f 0%,#0a1330 45%,#05070d 80%)}
#s1i .sl{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:58px 22px max(26px,env(safe-area-inset-bottom));text-align:center}
#s1i .vis{flex:1;display:flex;align-items:center;justify-content:center;min-height:0}
#s1i .vis .fan{position:relative;width:300px;height:370px}#s1i .vis .fan .fc{position:absolute;width:172px;top:30px}
#s1i .vis .fan .l{left:0;transform:rotate(-12deg)}#s1i .vis .fan .m{left:64px;top:0;z-index:2}#s1i .vis .fan .r{right:0;transform:rotate(12deg)}
#s1i .vis .six{display:grid;grid-template-columns:repeat(3,1fr);gap:22px 8px;width:100%;max-width:370px}
#s1i .vis .six div{text-align:center;font-size:13.5px;line-height:1.25;color:#e3e9f7}#s1i .vis .six i{display:block;height:138px;background-size:contain;background-repeat:no-repeat;background-position:center;margin-bottom:4px}
#s1i .vis .six b{display:block;color:#ffb81f;font-size:14.5px;margin-top:2px}
#s1i .vis .bigp{width:250px;height:440px;background-size:contain;background-repeat:no-repeat;background-position:center;animation:s1gl 2.4s ease-in-out infinite}
#s1i h2{margin:14px 0 10px;font-size:32px;font-style:italic;font-weight:800;text-transform:uppercase;line-height:1.1}
#s1i p{margin:0 0 18px;font-size:17px;line-height:1.45;color:#c9d3ea}
#s1i .dots{display:flex;gap:7px;justify-content:center;margin-bottom:14px}#s1i .dots i{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.2)}#s1i .dots i.on{background:#ffb81f;width:22px;border-radius:4px}
#s1i .nx{border:0;border-radius:14px;padding:17px;font-weight:800;font-size:17px;background:#ffb81f;color:#1a1200;cursor:pointer;width:100%;font-family:inherit}
#s1i .sk{position:absolute;top:max(14px,env(safe-area-inset-top));right:14px;border:1px solid rgba(255,255,255,.25);background:rgba(5,7,13,.5);color:#fff;border-radius:18px;padding:8px 14px;font-weight:700;font-size:13px;cursor:pointer;z-index:3;font-family:inherit}
#s1d-b{position:fixed;left:10px;bottom:84px;z-index:75;border:1px solid #ff3b4e;background:rgba(40,6,12,.92);color:#ff8d98;border-radius:16px;padding:7px 11px;font-weight:800;font-size:11px;letter-spacing:.08em;cursor:pointer;font-family:inherit}
#s1d{position:fixed;left:8px;right:8px;bottom:120px;max-width:380px;z-index:99;display:none;background:#0b1224;border:1px solid #ff3b4e;border-radius:14px;padding:14px;color:#fff;font-family:inherit;max-height:70vh;overflow-y:auto}
#s1d.on{display:block}#s1d h4{margin:0 0 4px;font-size:14px;color:#ff8d98}#s1d p{margin:0 0 10px;font-size:11.5px;color:#9fb0d0}
#s1d .rw{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 10px}#s1d button{border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.07);color:#fff;border-radius:9px;padding:7px 10px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit}
#s1d button.on{background:#ffb81f;color:#1a1200;border-color:#ffb81f}#s1m h2,#s1u h2,#s1i h2{font-family:inherit;display:block;transform:none!important;background:none!important;padding:0!important;border:0!important;box-shadow:none!important;clip-path:none!important;letter-spacing:.02em}
#s1m h2{margin:0;flex:1;text-align:center;padding-right:38px!important}
#s1d .sep{height:1px;background:rgba(255,255,255,.1);margin:8px 0}
`;document.head.appendChild(css);
/* ---------- Carte d'exploration ---------- */
const CHS=[
 {k:'sp10',t:'Découvrir 10 espèces',need:z=>10,get:z=>cnt(z).o,rew:{p:100}},
 {k:'rare',t:'Obtenir une carte rare',need:z=>1,get:z=>owned(z,'R'),rew:{x:100}},
 {k:'half',t:'Découvrir 50 % du territoire',need:z=>Math.ceil(cnt(z).n/2),get:z=>cnt(z).o,rew:{b:1}},
 {k:'epic',t:'Obtenir une carte épique',need:z=>1,get:z=>owned(z,'E'),rew:{p:150,x:150}},
 {k:'leg',t:'Obtenir une carte légendaire',need:z=>1,get:z=>owned(z,'L'),rew:{p:300,x:250}},
 {k:'full',t:'Compléter le territoire',need:z=>cnt(z).n,get:z=>cnt(z).o,rew:{b:3,p:500}}];
const cnt=z=>{const L=F.filter(f=>f.set===z);return{o:L.filter(f=>S.col[f.id]>0).length,n:L.length}};
const owned=(z,r)=>F.filter(f=>f.set===z&&f.r===r&&S.col[f.id]>0).length;
const rewTxt=r=>[r.p?'+'+r.p+' perles':'',r.x?'+'+r.x+' XP':'',r.b?'+'+r.b+' booster'+(r.b>1?'s':''):''].filter(Boolean).join(' · ');
let openZ=null;
function mapHTML(){
  const L=lvl(),v=lvInfo(),order=TERR.slice().reverse(),cur=unl().pop(),g=nextGoal();
  const stages=order.map(t=>{
    const un=isUn(t.id),pub=isPub(t.id),c=cnt(t.id),pct=Math.round(c.o/c.n*100);
    const isCur=t.id===cur,isNx=g&&g.id===t.id;
    const tag=un?(isCur?'<span class="tag hr">Tu es ici</span>':'<span class="tag ok">Débloqué</span>'):(pub?'<span class="tag '+(isNx?'nx':'lk')+'">🔒 Niveau '+t.lv+(isNx?' · prochain objectif':'')+'</span>':'<span class="tag lk">Bientôt disponible</span>');
    const passed=TERR.indexOf(t)<TERR.findIndex(x=>x.id===cur);
    let dt='';
    if(openZ===t.id){
      if(un){
        dt='<h4>Défis du territoire</h4>'+CHS.map(h=>{const k=t.id+':'+h.k,done=!!st().ch[k],need=h.need(t.id),got=Math.min(h.get(t.id),need),ok=got>=need;
          return '<div class="ch"><div class="t">'+h.t+'<small>'+got+' / '+need+' · '+rewTxt(h.rew)+'</small></div><button data-s1c="'+k+'" '+(done||!ok?'disabled':'')+'>'+(done?'Récupéré':ok?'Récupérer':'En cours')+'</button></div>'}).join('')+
          '<button class="go" data-s1x="'+t.id+'">Explorer ce territoire</button>';
      }else dt='<p style="margin:0;font-size:13.5px;color:#c9d3ea;line-height:1.5">'+(pub?'Atteins le <b>niveau '+t.lv+'</b> pour explorer ce territoire. Tu as déjà <b>'+stock(t.id)+'</b> booster'+(stock(t.id)>1?'s':'')+' en stock : ils s\'ouvriront dès le déblocage.':'Ce territoire n\'est pas encore ouvert. Tu pourras y acheter des boosters et les ouvrir dès sa sortie.')+'</p><button class="go" data-s1b="'+t.id+'">Voir le booster</button>';
    }
    return '<div class="stg '+(un?'':'lk ')+(isCur?'cur ':'')+(passed?'pass ':'')+(openZ===t.id?'open':'')+'"><button class="cd" data-s1z="'+t.id+'"><span class="im" style="background-image:url(pack-'+t.id+'.webp)">'+(un?'':'<span class="pad">🔒</span>')+'</span><span class="tx">'+tag+'<h3>'+esc(t.n)+'</h3><p>Niveau '+t.lv+' · '+c.o+' / '+c.n+' espèces</p><span class="pg"><i style="width:'+pct+'%"></i></span></span></button><div class="dt">'+dt+'</div></div>'}).join('');
  const goal=g?(isPub(g.id)?'<b>Prochain objectif : '+esc(g.n)+'</b><small>Niveau '+g.lv+' · encore '+Math.max(0,g.lv-L)+' niveau'+(g.lv-L>1?'x':'')+'</small>':'<b>Prochain territoire : '+esc(g.n)+'</b><small>Bientôt disponible</small>'):'<b>Tous les territoires sont débloqués !</b><small>Continue de compléter ta collection.</small>';
  const pb=g&&isPub(g.id)?Math.min(100,Math.round((L-1)/(g.lv-1)*100)):100;
  return '<div class="hd"><button class="x" data-s1close aria-label="Fermer">✕</button><h2>Territoires</h2></div>'+
   '<div class="rk"><div class="lv">'+L+'</div><div style="flex:1;min-width:0"><b>'+esc(titleOf(L))+(st().founder?' · Explorateur fondateur':'')+'</b><div class="bar"><i style="width:'+Math.round(v.into/v.need*100)+'%"></i></div><small>'+v.into+' / '+v.need+' XP</small></div></div>'+
   '<div class="path">'+stages+'</div>'+
   '<div class="nxt"><div class="bx">'+goal+'<div class="bar" style="height:7px;border-radius:4px;background:rgba(255,255,255,.1);overflow:hidden"><i style="display:block;height:100%;width:'+pb+'%;background:#ffb81f"></i></div></div></div>'}
function mapOpen(z){let e=$('s1m');if(!e){e=document.createElement('div');e.id='s1m';e.setAttribute('role','dialog');e.setAttribute('aria-modal','true');document.body.appendChild(e)}
  openZ=z===undefined?openZ:z;e.innerHTML=mapHTML();e.classList.add('on');
  if(z===undefined){const c=e.querySelector('.stg.cur');if(c)setTimeout(()=>c.scrollIntoView({block:'center'}),30)}}
const mapClose=()=>{const e=$('s1m');if(e)e.classList.remove('on')};
function claim(k){if(busy||st().ch[k])return;const[z,key]=k.split(':'),h=CHS.find(x=>x.k===key);if(!h||h.get(z)<h.need(z))return;busy=true;
  ecoCall('eco_s1_claim',{p_key:k}).then(r=>{busy=false;if(r.err)return toast(r.err);renderAll();toast(rewTxt(h.rew)+' !',2600);mapOpen(openZ)})}
function explore(z){if(!isUn(z))return;S.theme=z;save();mapClose();location.hash='#boosters';renderAll()}
document.addEventListener('click',e=>{
  const t=e.target.closest&&e.target.closest('#s1b,[data-s1close],[data-s1z],[data-s1c],[data-s1x],[data-s1b]');if(!t)return;
  if(t.id==='s1b')return mapOpen();
  if(t.hasAttribute('data-s1close'))return mapClose();
  if(t.dataset.s1z){const z=t.dataset.s1z;return mapOpen(openZ===z?null:z)}
  if(t.dataset.s1c)return claim(t.dataset.s1c);
  if(t.dataset.s1x)return explore(t.dataset.s1x);
  if(t.dataset.s1b){S.theme=t.dataset.s1b;save();mapClose();location.hash='#boosters';renderAll()}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const m=$('s1m');if(m&&m.classList.contains('on'))mapClose()}});
/* ---------- Animation de déblocage ---------- */
function showUnlock(q){const w=String(q).indexOf('w:')===0,z=w?q.slice(2):q,t=T(z);let e=$('s1u');if(!e){e=document.createElement('div');e.id='s1u';e.setAttribute('role','dialog');e.setAttribute('aria-modal','true');document.body.appendChild(e)}
  e.innerHTML='<div class="s1in"><div class="s1k">'+(w?'NOUVELLES ESPÈCES DÉBLOQUÉES':'NOUVEAU TERRITOIRE DÉBLOQUÉ')+'</div><h2>'+esc(t.n)+'</h2><div class="s1pk" style="background-image:url(pack-'+z+'.webp)"></div><div class="s1sub">'+(w?'De nouvelles espèces rejoignent '+esc(t.n)+' !':'De nouvelles espèces t\'attendent !')+'</div><div class="s1gf">+1 booster offert · '+esc(t.n)+'</div><button data-s1ux="'+z+'">'+(w?'Découvrir':'Explorer ce territoire')+'</button></div>';
  e.classList.add('on');try{buzz([30,60,30])}catch(_){}}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-s1ux]');if(!b)return;
  const z=b.dataset.s1ux;$('s1u').classList.remove('on');S.theme=z;if(S.s1&&S.s1.q)S.s1.q=S.s1.q.slice(1);ecoCall('eco_s1_ack').then(()=>{save();renderAll()});location.hash='#boosters';renderAll()});
/* ---------- Introduction ---------- */
const SL=[
 {bg:'art-large.webp',h:'ÉCAILLE',p:'Les océans renferment encore d\'innombrables secrets. Des rivières sauvages aux profondeurs les plus mystérieuses, des centaines de créatures peuplent un monde que l\'homme n\'a jamais totalement exploré.',vis:()=>'<div class="bigp" style="background-image:url(pack-large.webp);opacity:.95"></div>'},
 {bg:'art-recif.webp',h:'Une collection unique',p:'Deviens un explorateur aquatique : découvre des espèces extraordinaires, complète tes albums et rassemble les cartes les plus rares du monde.',vis:()=>'<div class="fan">'+[[58,'l'],[21,'r'],[59,'m']].map(([i,c])=>'<div class="fc '+c+'">'+cardHTML(F[i],{force:1,nac:0})+'</div>').join('')+'</div>'},
 {bg:'art-abysses.webp',h:'Explore de nouveaux territoires',p:'Tu pars avec trois territoires : le Grand Large, les Eaux douces et les Récifs exotiques. Gagne de l\'XP, monte de niveau et débloque les Requins au niveau 25, les Crustacés au niveau 40, puis les Abysses au niveau 50.',vis:()=>'<div class="six">'+TERR.map(t=>'<div><i style="background-image:url(pack-'+t.id+'.webp)"></i>'+esc(t.n)+'<b>Niveau '+t.lv+'</b></div>').join('')+'</div>'},
 {bg:'art-large.webp',h:'Ton premier booster',p:'L\'immensité des océans t\'attend. Jusqu\'où iras-tu ? Bienvenue dans ÉCAILLE.',vis:()=>'<div class="bigp" style="background-image:url(pack-large.webp)"></div>'}];
let si=0;
function showIntro(n){si=n===undefined?0:n;let e=$('s1i');if(!e){e=document.createElement('div');e.id='s1i';e.setAttribute('role','dialog');e.setAttribute('aria-modal','true');document.body.appendChild(e)}
  const s=SL[si],last=si===SL.length-1;
  e.innerHTML='<div class="bg" style="background-image:url('+s.bg+')"></div><div class="sh"></div>'+(last?'':'<button class="sk" data-s1sk>Passer</button>')+'<div class="sl"><div class="vis">'+s.vis()+'</div><h2>'+esc(s.h)+'</h2><p>'+s.p+'</p><div class="dots">'+SL.map((_,i)=>'<i class="'+(i===si?'on':'')+'"></i>').join('')+'</div><button class="nx" data-s1nx>'+(last?'Ouvrir mon premier booster':'Suivant')+'</button></div>';
  e.classList.add('on')}
function endIntro(open){const e=$('s1i');if(e)e.classList.remove('on');S.theme='large';if(S.s1)S.s1.intro=1;ecoCall('eco_s1_intro').then(()=>{renderAll();if(open)setTimeout(()=>{try{startOpen()}catch(_){}},250)})}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-s1sk],[data-s1nx]');if(!t)return;
  if(t.hasAttribute('data-s1sk'))return endIntro(false);
  if(si>=SL.length-1)return endIntro(true);showIntro(si+1)});
/* ---------- Démarrage ---------- */
function ready(){return typeof S!=='undefined'&&S&&$('u-rail')}
const iv=setInterval(()=>{if(!ready())return;clearInterval(iv);
  S.tuto=1;S.nw='1';renderAll();
  setInterval(()=>{try{
    if(!S.s1||!(typeof ecoOn==='function'&&ecoOn()))return;
    const v=$('veil');const veilOn=v&&!v.hidden&&getComputedStyle(v).display!=='none';
    if(veilOn||(typeof opening!=='undefined'&&opening))return;
    const i=$('s1i');
    if(!st().intro&&!(i&&i.classList.contains('on'))&&document.body.dataset.ui==='new'){showIntro(0);return}
    const u=$('s1u');
    if(st().q&&st().q.length&&!(u&&u.classList.contains('on'))&&!(i&&i.classList.contains('on')))showUnlock(st().q[0]);
  }catch(e){}},900);
},300);
})();
