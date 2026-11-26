
/* ===== Récompenses de connexion : calendrier de 7 jours + fidélité 30 jours =====
   Les récompenses, la date (jour de Paris) et la progression sont gérées par le serveur
   (eco_login_info / eco_login_claim, table login_rewards). Ici : affichage uniquement. */
const LGSAMPLE={C:1,R:51,E:86,L:80},LGRN={C:'commune',R:'rare',E:'épique',L:'légendaire'};
let LG=null,LGBUSY=false;
(function(){const st=document.createElement('style');st.textContent=`
#u-cal{position:relative;display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:#0c1325;border:1px solid #1a2440;cursor:pointer;flex:0 0 auto;padding:0;color:#ffc61a}
#u-cal svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
#u-cal .dot{position:absolute;top:-1px;right:-1px;width:10px;height:10px;border-radius:50%;background:#ff3b4e;border:2px solid #05070d;box-sizing:content-box;display:none}
#u-cal.has .dot{display:block;animation:lgdot 1.6s ease-in-out infinite}
@keyframes lgdot{50%{transform:scale(1.25)}}
body.authon #u-cal,body.vopen #u-cal{display:none!important}
@media(max-width:700px){#u-cal{width:36px;height:36px}#u-cal svg{width:19px;height:19px}}
#lg{position:fixed;inset:0;z-index:60;display:none;overflow-y:auto;-webkit-overflow-scrolling:touch;background:#05070d;padding:max(14px,env(safe-area-inset-top)) 12px max(18px,env(safe-area-inset-bottom))}
#lg.on{display:block}
#lg .lgw{max-width:540px;margin:0 auto;color:#e8eefc}
#lg .lgh{display:grid;grid-template-columns:42px 1fr 42px;align-items:center;gap:6px;margin-bottom:4px}
#lg .lgx{all:unset;box-sizing:border-box;width:40px;height:40px;border-radius:50%;border:1px solid #1f2c4f;background:#0c1325;display:grid;place-items:center;cursor:pointer;color:#fff}
#lg .lgx svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round}
#lg h2{margin:0;padding:0;background:none!important;border:0!important;box-shadow:none!important;transform:none!important;text-shadow:none;text-align:center;font:italic 800 clamp(24px,7vw,32px)/1.05 'Barlow Condensed',sans-serif;color:#fff;letter-spacing:.01em}
#lg h2 b{color:#ffc61a}
#lg .lgs{text-align:center;color:#9fb0d2;font-size:14.5px;margin:2px 0 14px}
#lg .lgg{display:grid;grid-template-columns:repeat(12,1fr);gap:9px}
#lg .lgc{grid-column:span 3;position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 4px 10px;border-radius:14px;background:#0a1122;border:1px solid #1c2849;min-height:150px;text-align:center}
#lg .lgc:nth-child(n+5){grid-column:span 4;min-height:162px}
#lg .lgc .dn{padding-right:0;font:italic 800 16px/1 'Barlow Condensed',sans-serif;color:#fff;letter-spacing:.02em}
#lg .lgc .im{flex:1;display:grid;place-items:center;width:100%;min-height:68px}
#lg .lgc .tx{font-weight:700;font-size:13.5px;color:#dbe5fb;line-height:1.15}
#lg .lgc .tx i{font-style:normal;display:inline-block;margin-left:4px;padding:1px 7px;border-radius:9px;font-size:11px;font-weight:800;color:#fff}
#lg .lgc .tx i.R{background:#1d6fd6}#lg .lgc .tx i.E{background:#8a46dc}#lg .lgc .tx i.L{background:#e08a14}#lg .lgc .tx i.C{background:#4b5a7a}
#lg .lgc.d7{border-color:#8a46dc;box-shadow:0 0 0 1px #8a46dc66,0 0 22px -6px #a45cf0aa}
#lg .lgc.now{border:1.5px solid #ffc61a;box-shadow:0 0 0 1px #ffc61a55,0 0 22px -6px #ffc61acc;background:#0e1527}
#lg .lgc.done{border-color:#1f6b45}
#lg .lgc.done .im,#lg .lgc.done .tx,#lg .lgc.done .dn{opacity:.45}
#lg .lgc .ck{position:absolute;top:-7px;right:-7px;width:22px;height:22px;border-radius:50%;background:#2fbf71;border:2px solid #05070d;box-sizing:border-box;display:grid;place-items:center}
#lg .lgc .ck svg{width:11px;height:11px;fill:none;stroke:#fff;stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round}
#lg .lgc .lk{position:absolute;top:-7px;right:-7px;width:22px;height:22px;border-radius:50%;background:#0c1325;border:1.5px solid #243258;box-sizing:border-box;padding:4px;color:#8fa0c4}
#lg .lgc .lk svg{width:100%;height:100%;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
#lg .lgb{all:unset;box-sizing:border-box;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px;height:32px;width:calc(100% - 10px);padding:0 4px;border-radius:16px;background:linear-gradient(180deg,#ffd43a,#ffb000);color:#1b1300;font-weight:800;font-size:12px;letter-spacing:-.01em;box-shadow:0 5px 16px rgba(255,176,0,.28)}
#lg .lgb[disabled]{opacity:.6;cursor:default}
#lg .pr3{position:relative;width:64px;height:48px}
#lg .pr3 .pearl{position:absolute;width:28px;height:28px}
#lg .pr3 .pearl:nth-child(1){left:18px;top:2px}#lg .pr3 .pearl:nth-child(2){left:3px;top:20px}#lg .pr3 .pearl:nth-child(3){left:33px;top:20px}
#lg .pr3.n4 .pearl{width:24px;height:24px}
#lg .im img.pk{height:72px;width:auto;filter:drop-shadow(0 4px 8px rgba(0,0,0,.5))}
#lg .im .xp{width:60px;height:66px}
#lg .mq{--c:#1d6fd6;position:relative;width:54px;aspect-ratio:5/7;border-radius:7px;display:grid;place-items:center;border:2px solid var(--c);background:radial-gradient(circle at 50% 35%,#16244a,#070d1f 75%);box-shadow:0 0 14px -2px var(--c),inset 0 0 14px -6px var(--c)}
#lg .mq b{font:italic 800 34px/1 'Barlow Condensed',sans-serif;color:var(--c);text-shadow:0 0 12px var(--c)}
#lg .mq.pk{--c:#38b6ff;width:46px;aspect-ratio:3/4.6;border-radius:4px;clip-path:polygon(0 4%,8% 0,16% 4%,24% 0,32% 4%,40% 0,48% 4%,56% 0,64% 4%,72% 0,80% 4%,88% 0,100% 4%,100% 96%,92% 100%,84% 96%,76% 100%,68% 96%,60% 100%,52% 96%,44% 100%,36% 96%,28% 100%,20% 96%,12% 100%,4% 96%,0 96%);border:0;background:linear-gradient(160deg,#17315c,#08122b 70%);box-shadow:inset 0 0 0 2px #38b6ff,inset 0 0 14px -4px #38b6ff}
#lg .mq.E{--c:#a45cf0}#lg .mq.L{--c:#ffb81f}#lg .mq.C{--c:#6b7da6}
#lg .lgf{margin-top:12px;display:grid;grid-template-columns:1fr auto;gap:10px;align-items:center;padding:13px 14px;border-radius:14px;background:#0a1122;border:1px solid #1c2849}
#lg .lgf .t{font-size:14px;color:#c6d3ee}
#lg .lgf .t b{display:block;font:italic 800 22px/1.1 'Barlow Condensed',sans-serif;color:#ffc61a}
#lg .lgf .bar{height:9px;border-radius:5px;background:#14203d;margin-top:9px;overflow:hidden}
#lg .lgf .bar u{display:block;height:100%;background:linear-gradient(90deg,#ffb000,#ffd43a);border-radius:5px;transition:width .6s}
#lg .lgf .sp{font-size:12.5px;color:#9fb0d2;margin-top:7px}
#lg .lgf .sp b{display:inline;font:800 13px/1 sans-serif;color:#ffd45e}
#lg .lgf .mc{width:62px;position:relative}
#lg .lgf .mc .mq{width:100%}
#lg .lgf .mc.dim .card{opacity:.8}
#lg .lgn{margin:12px 0 0;text-align:center;color:#6f7fa3;font-size:12.5px}
#lg .pop{animation:lgpop .9s cubic-bezier(.2,1.3,.4,1)}
@keyframes lgpop{0%{transform:scale(1)}35%{transform:scale(1.12);box-shadow:0 0 38px #ffc61a}100%{transform:scale(1)}}
#lg .fly{position:absolute;left:50%;top:38%;transform:translateX(-50%);pointer-events:none;font:800 22px/1 'Barlow Condensed',sans-serif;color:#ffd45e;text-shadow:0 2px 8px #000;animation:lgfly 1.3s ease-out forwards;white-space:nowrap;z-index:3}
@keyframes lgfly{0%{opacity:0;transform:translate(-50%,10px) scale(.7)}25%{opacity:1}100%{opacity:0;transform:translate(-50%,-48px) scale(1.15)}}
@media(prefers-reduced-motion:reduce){#lg .pop,#lg .fly,#u-cal.has .dot{animation:none}}
`;document.head.appendChild(st);
const hr=document.getElementById('uhr');
if(hr&&!document.getElementById('u-cal')){const b=document.createElement('button');b.id='u-cal';b.type='button';b.setAttribute('aria-label','Récompenses de connexion');
 b.innerHTML='<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/><path d="M9 15l2 2 4-4"/></svg><i class="dot"></i>';hr.insertBefore(b,hr.firstChild)}
const d=document.createElement('div');d.id='lg';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.setAttribute('aria-label','Récompenses de connexion');document.body.appendChild(d)})();

const lgToday=()=>S&&S.lg&&S.lg.d===todayStr();
function lgDot(){const b=document.getElementById('u-cal');if(!b)return;let on=false;try{on=!!(typeof S!=='undefined'&&S&&ecoOn()&&!lgToday())}catch(e){}b.classList.toggle('has',on)}
const NK='ecl_lgnews1';
(function(){const st=document.createElement('style');st.textContent='#lgn{position:fixed;inset:0;z-index:70;display:none;align-items:center;justify-content:center;background:rgba(3,5,10,.82);padding:20px}#lgn.on{display:flex}#lgn .bx{max-width:340px;width:100%;background:#0b1224;border:2px solid #ffb81f;border-radius:18px;padding:22px 18px;text-align:center;color:#e8eefc;box-shadow:0 0 30px -6px #ffb81f}#lgn h3{margin:0 0 8px;font-size:20px;font-style:italic;font-weight:800;color:#ffb81f}#lgn p{margin:0 0 16px;font-size:14px;line-height:1.45;color:#b9c4de}#lgn button{display:block;width:100%;border:0;border-radius:12px;padding:12px;font-weight:800;font-size:15px;cursor:pointer;background:#ffb81f;color:#1a1200}#lgn button.s{background:none;color:#8d9bbd;margin-top:6px;font-weight:600}';document.head.appendChild(st);
const d=document.createElement('div');d.id='lgn';d.innerHTML='<div class="bx"><h3>Nouveau : récompenses de connexion !</h3><p>Connecte-toi chaque jour pour gagner des perles, de l\'XP, des boosters et des cartes mystère. Au bout de 30 jours, une carte légendaire t\'attend !</p><button id="lgn-go">Voir mes récompenses</button><button class="s" id="lgn-x">Plus tard</button></div>';document.body.appendChild(d);
d.addEventListener('click',e=>{const t=e.target;if(t.id==='lgn-go'){d.classList.remove('on');lgOpen()}else if(t.id==='lgn-x'||t===d)d.classList.remove('on')})})();
function lgNews(){try{if(localStorage.getItem(NK))return;if(!(typeof S!=='undefined'&&S&&ecoOn()))return;window.__lgT=window.__lgT||Date.now();if(Date.now()-window.__lgT<7000)return;if(document.querySelector('#lg.on,#tuto.on,#nwn.on,#whmsg'))return;localStorage.setItem(NK,'1');document.getElementById('lgn').classList.add('on')}catch(e){}}
setInterval(()=>{lgDot();setTimeout(lgNews,0)},2500);document.addEventListener('ecaille:me',()=>setTimeout(lgDot,1500));

function lgLabel(r){
  if(r.kind==='p')return r.val+' perle'+(r.val>1?'s':'');
  if(r.kind==='xp')return r.val+' XP';
  if(r.kind==='b')return r.val+' booster'+(r.val>1?'s':'');
  return (r.val>1?r.val+' cartes ':'1 carte ')+'<i class="'+(r.rar||'R')+'">'+({C:'Commune',R:'Rare',E:'Épique',L:'Légendaire'}[r.rar||'R'])+'</i>'}
function lgMys(rar){return '<div class="mq '+rar+'"><b>?</b></div>'}
function lgImg(r){
  if(r.kind==='p'){const k=r.val>=40?'n4':'';return '<div class="pr3 '+k+'"><i class="pearl"></i><i class="pearl"></i><i class="pearl"></i></div>'}
  if(r.kind==='xp')return '<svg class="xp" viewBox="0 0 60 66"><path d="M30 3l25 14.500v31L30 63 5 48.500v-31z" fill="#1a1405" stroke="#ffc61a" stroke-width="3.500" stroke-linejoin="round"/><text x="30" y="40" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-style="italic" font-weight="800" font-size="25" fill="#ffc61a">XP</text></svg>';
  if(r.kind==='b')return '<div class="mq pk"><b>?</b></div>';
  return lgMys(r.rar||'R')}
const lgIc={ck:'<svg viewBox="0 0 24 24"><path d="M5 12.500l4.500 4.500L19 7.500"/></svg>',lk:'<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9.500" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>'};

function lgRender(pop){
  const el=document.getElementById('lg');if(!el||!LG)return;
  const cur=LG.day,cl=LG.claimed,n=LG.n,ld=LG.loyalty||{need:30,kind:'card',val:1,rar:'L'};
  const cells=LG.rewards.map(r=>{
    const st=r.day<cur||(r.day===cur&&cl)?'done':r.day===cur?'now':'fut';
    const ck=st==='done'?'<span class="ck">'+lgIc.ck+'</span>':st==='fut'?'<span class="lk">'+lgIc.lk+'</span>':'';
    const btn=st==='now'?'<button class="lgb" id="lg-go"'+(LGBUSY?' disabled':'')+'>Récupérer</button>':'';
    return '<div class="lgc '+st+(r.day===7?' d7':'')+(pop===r.day?' pop':'')+'" data-d="'+r.day+'"><div class="dn">Jour '+r.day+'</div><div class="im">'+lgImg(r)+'</div><div class="tx">'+lgLabel(r)+'</div>'+btn+ck+'</div>'}).join('');
  const prog=Math.min(n,ld.need),done=LG.legend>0,pc=Math.round(prog/ld.need*100);
  const lid=LGSAMPLE[ld.rar||'L'];
  el.innerHTML='<div class="lgw"><div class="lgh"><button class="lgx" id="lg-x" aria-label="Fermer"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button><h2>Récompenses <b>de connexion</b></h2><span></span></div>'
   +'<div class="lgs">Connecte-toi chaque jour pour récupérer ta récompense !</div>'
   +'<div class="lgg">'+cells+'</div>'
   +'<div class="lgf"><div class="t">Progression fidélité<b>Jour '+prog+' / '+ld.need+'</b><div class="bar"><u style="width:'+pc+'%"></u></div><div class="sp">'+(done?'Récompense spéciale obtenue ✓':'Récompense spéciale <b>Jour '+ld.need+'</b> : 1 carte '+LGRN[ld.rar||'L'])+'</div></div><div class="mc'+(done?'':' dim')+'">'+lgMys(ld.rar||'L')+'</div></div>'
   +'<p class="lgn">Une récompense par jour. Si tu manques un jour, ta progression est conservée.</p></div>'}

async function lgOpen(){
  if(!ecoOn()){toast('Connecte-toi pour récupérer tes récompenses');return}
  const el=document.getElementById('lg');el.classList.add('on');
  if(!LG)el.innerHTML='<div class="lgw"><div class="lgs" style="margin-top:40vh">Chargement…</div></div>';
  const r=await ecoCall('eco_login_info');
  if(r.err){toast(r.err);el.classList.remove('on');return}
  LG=r.j;lgRender();lgDot()}
function lgClose(){document.getElementById('lg').classList.remove('on')}

async function lgClaim(){
  if(LGBUSY||!LG||LG.claimed)return;LGBUSY=true;lgRender();
  const lv0=S.lvR||1,alb0=Object.assign({},S.alb||{});
  const r=await ecoCall('eco_login_claim');LGBUSY=false;
  if(r.err){toast(r.err);const i=await ecoCall('eco_login_info');if(!i.err)LG=i.j;lgRender();lgDot();return}
  const j=r.j,rw=LG.rewards.find(x=>x.day===j.day)||{kind:j.kind,val:j.val};
  LG.claimed=true;LG.day=j.day;LG.n=(S.lg&&S.lg.n)||LG.n+1;if(j.legend)LG.legend=1;
  lgRender(j.day);
  const cell=document.querySelector('#lg .lgc[data-d="'+j.day+'"]');
  if(cell){const f=document.createElement('div');f.className='fly';f.textContent=j.kind==='card'?'Nouvelle carte !':'+ '+lgLabel(rw).replace(/<[^>]*>/g,'');cell.appendChild(f);setTimeout(()=>f.remove(),1400)}
  try{navigator.vibrate&&navigator.vibrate([20,30,20])}catch(e){}
  lgDot();try{renderAll()}catch(e){}
  setTimeout(()=>{
    mjLv(lv0);SETS.forEach(x=>{if(S.alb&&S.alb[x.id]&&!alb0[x.id])toast('Album « '+x.n+' » complété ! +'+ALBUM_R.p+' perles +'+ALBUM_R.b+' boosters',3200)});
    const show=j.legend&&j.legend.card!=null?j.legend.card:j.card;
    if(j.legend)toast('Fidélité '+(LG.loyalty?LG.loyalty.need:30)+' jours : carte légendaire !',3200);
    if(show!=null&&F[show]){lgClose();setTimeout(()=>showDetail(F[show]),250)}
  },1100)}

document.addEventListener('click',e=>{
  const t=e.target.closest&&e.target.closest('#u-cal,#lg-x,#lg-go,#lg');if(!t)return;
  if(t.id==='u-cal')return lgOpen();
  if(t.id==='lg-x')return lgClose();
  if(t.id==='lg-go')return lgClaim();
  if(t.id==='lg'&&e.target===t)lgClose()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.getElementById('lg').classList.contains('on'))lgClose()});
