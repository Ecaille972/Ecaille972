
/* ===== Trouve les différences ===== */
const TDLV={easy:{n:'Facile',k:3,t:90,xp:10,ids:[130,20,77]},normal:{n:'Normal',k:5,t:60,xp:20,ids:[111,95,70]},hard:{n:'Difficile',k:7,t:45,xp:30,ids:[58,92,22]}};
const TDCAP=300,TDPEN=2,TDHINTS=2,TDW=464,TDH=272;
const TDD={"130":{"lv":"easy","d":[[53,164,18],[215,141,22],[136,211,21]]},"20":{"lv":"easy","d":[[68,46,19],[366,114,18],[281,82,22]]},"77":{"lv":"easy","d":[[102,83,24],[47,223,20],[245,185,23]]},"111":{"lv":"normal","d":[[406,124,20],[154,147,24],[82,202,18],[212,74,20],[62,102,19]]},"95":{"lv":"normal","d":[[106,46,24],[325,48,19],[410,218,19],[199,118,22],[220,208,20]]},"70":{"lv":"normal","d":[[394,119,21],[226,171,21],[298,53,22],[121,128,22],[135,224,20]]},"58":{"lv":"hard","d":[[121,182,24],[313,65,20],[66,87,24],[225,92,17],[386,142,17],[290,172,19],[412,47,19]]},"92":{"lv":"hard","d":[[377,59,22],[272,164,18],[48,140,23],[226,62,17],[116,77,20],[406,209,22],[94,220,19]]},"22":{"lv":"hard","d":[[160,83,24],[159,230,19],[253,139,23],[58,207,19],[326,58,18],[345,211,24],[397,135,17]]}};
function mgUsed(g){return S&&S.mg&&S.mg.d===todayStr()&&S.mg.g?(S.mg.g[g]||0):0}
const tdXP=()=>mgUsed('td');let TDBUSY=false;
let TD=null,tdTk=null,tdLast={};
const TDRAR={C:'Commune',R:'Rare',E:'Épique',L:'Légendaire'};
(function(){const st=document.createElement('style');st.textContent=`
#tdgame{position:fixed;inset:0;z-index:99999;display:flex;flex-direction:column;box-sizing:border-box;padding:max(10px,env(safe-area-inset-top)) 12px max(10px,env(safe-area-inset-bottom));background:radial-gradient(120% 80% at 50% 0%,#0d2a66 0%,#06122e 55%,#030a1c 100%);color:#fff;font-family:'Barlow Condensed',-apple-system,sans-serif;overflow:hidden;touch-action:manipulation;-webkit-user-select:none;user-select:none}
#tdgame .tdh{display:grid;grid-template-columns:44px 1fr 44px;align-items:center;flex:none}
#tdgame .tdback{all:unset;box-sizing:border-box;width:42px;height:42px;border-radius:50%;border:1.5px solid #2c4d8f;background:#081a44;display:grid;place-items:center;cursor:pointer}
#tdgame .tdback svg{width:20px;height:20px}
#tdgame .tdt{text-align:center;white-space:nowrap;font:italic 800 clamp(19px,5.6vw,27px)/1.05 'Barlow Condensed',sans-serif;color:#fff;border:1.5px solid #e5b13c;border-radius:999px;padding:7px 10px;background:linear-gradient(180deg,#0c2150,#060f2a);box-shadow:0 0 14px rgba(255,190,50,.25)}
#tdgame .tds{text-align:center;color:#c7d6f5;font-size:clamp(14px,3.9vw,17px);margin:6px 0 8px;flex:none}
#tdgame .tds b{color:#ffd45e}
#tdgame .tdp{display:grid;grid-template-columns:1fr 1fr;gap:8px;flex:none;margin-bottom:8px}
#tdgame .tdp>*{all:unset;box-sizing:border-box;display:flex;align-items:center;justify-content:center;gap:6px;padding:8px 6px;border:1.5px solid #2c4d8f;border-radius:999px;background:linear-gradient(180deg,#0c2150,#060f2a);white-space:nowrap;font:800 clamp(15px,4.2vw,20px)/1 'Barlow Condensed',sans-serif;color:#fff}
#tdgame .tdp b{color:#ffd45e}
#tdgame .tdp .hint{cursor:pointer;border-color:#e5b13c}
#tdgame .tdp .hint[disabled]{opacity:.4;cursor:default}
#tdgame .tdp .low{color:#ff7b7b;border-color:#ff7b7b}
#tdgame .tdbox{flex:1;min-height:0;display:flex;flex-direction:column;gap:6px;justify-content:center;align-items:center}
#tdgame .tdi{position:relative;aspect-ratio:${TDW}/${TDH};height:auto;flex:none;width:min(100%,calc((100dvh - 260px)/2*${TDW}/${TDH}));border-radius:12px;overflow:hidden;border:2px solid #2d8fd6;box-shadow:0 0 14px rgba(45,143,214,.35);cursor:pointer;-webkit-tap-highlight-color:transparent}
#tdgame .tdim{position:absolute;inset:0;pointer-events:none}
#tdgame .tdi.shake{animation:tdsh .35s}
#tdgame .tdi.bad{border-color:#ff5d5d;box-shadow:0 0 16px rgba(255,93,93,.6)}
@keyframes tdsh{0%,100%{transform:translateX(0)}20%{transform:translateX(-7px)}40%{transform:translateX(7px)}60%{transform:translateX(-5px)}80%{transform:translateX(4px)}}
#tdgame .tdc{position:absolute;box-sizing:border-box;border-radius:50%;border:3px solid #ffd21e;box-shadow:0 0 10px #ffd21e,0 0 20px rgba(255,210,30,.7),inset 0 0 8px rgba(255,210,30,.6);pointer-events:none;animation:tdpop .4s ease-out}
#tdgame .tdc.h{border:3px dashed #5fe7ff;box-shadow:0 0 12px #5fe7ff;animation:tdhint 1.6s ease-out forwards}
@keyframes tdpop{0%{transform:scale(.3);opacity:0}70%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
@keyframes tdhint{0%,40%,80%{opacity:1}20%,60%{opacity:.25}100%{opacity:0}}
#tdgame .tdl{flex:none;display:grid;gap:10px;margin:auto 0}
#tdgame .tdlv{all:unset;box-sizing:border-box;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:10px;padding:16px 18px;border:1.5px solid #2c4d8f;border-radius:20px;background:linear-gradient(180deg,#0c2150,#060f2a);font:700 clamp(15px,4.2vw,18px)/1.2 'Barlow Condensed',sans-serif;color:#c7d6f5}
#tdgame .tdlv b{display:block;font:italic 800 clamp(24px,7vw,30px)/1.05 'Barlow Condensed',sans-serif;color:#fff}
#tdgame .tdlv span.x{flex:none;padding:8px 14px;border-radius:999px;background:linear-gradient(180deg,#ffd43a,#ffb000);color:#1b1300;font:800 18px 'Barlow Condensed',sans-serif}
#tdgame .tdr{margin:auto 0;text-align:center}
#tdgame .tdr h3{font:italic 800 38px/1.1 'Barlow Condensed',sans-serif;margin:0 0 6px}
#tdgame .tdr p{margin:4px 0;color:#c7d6f5;font-size:19px}
#tdgame .tdr .xp{font:800 44px/1.1 'Barlow Condensed',sans-serif;color:#ffd45e;margin:12px 0}
#tdgame .tdb{all:unset;box-sizing:border-box;cursor:pointer;display:block;width:100%;margin-top:12px;text-align:center;padding:14px;border-radius:26px;background:linear-gradient(180deg,#ffd43a,#ffb000);color:#1b1300;font:800 20px 'Barlow Condensed',sans-serif;text-transform:uppercase}
#tdgame .tdb.g{background:#0e1730;color:#fff;border:1px solid #243566}
`;document.head.appendChild(st)})();
function tdCard(){const v=window.__V||'',cap=tdXP()>=TDCAP;
  return `<button ${cap?'disabled':'id="td-go"'} aria-label="Jouer à Trouve les différences" style="all:unset;box-sizing:border-box;position:relative;display:grid;grid-template-columns:34% 1fr;align-items:center;gap:10px;width:100%;padding:16px 16px 16px 10px;min-height:clamp(150px,41vw,165px);cursor:${cap?'default':'pointer'};border-radius:22px;border:2px solid #e5b13c;background:radial-gradient(120% 140% at 0% 0%,#10306e,#071533 60%,#050c22);box-shadow:0 0 26px rgba(255,190,50,.30);${cap?'filter:grayscale(.7) brightness(.55)':''}"><svg viewBox="0 0 120 110" style="width:100%;height:auto;display:block" aria-hidden="true"><defs><linearGradient id="tdg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe27a"/><stop offset="1" stop-color="#e59a00"/></linearGradient></defs><rect x="8" y="18" width="44" height="64" rx="7" fill="#0a1c4a" stroke="#2d8fd6" stroke-width="2.5"/><rect x="62" y="18" width="44" height="64" rx="7" fill="#0a1c4a" stroke="#2d8fd6" stroke-width="2.5"/><path d="M16 60c8-14 20-14 28 0-8 14-20 14-28 0z" fill="#1d6fc0"/><path d="M70 60c8-14 20-14 28 0-8 14-20 14-28 0z" fill="#1d6fc0"/><circle cx="92" cy="40" r="5" fill="#ffd21e"/><circle cx="62" cy="66" r="19" fill="rgba(20,60,130,.55)" stroke="url(#tdg)" stroke-width="6"/><path d="M76 80l16 18" stroke="url(#tdg)" stroke-width="8" stroke-linecap="round"/></svg><span style="display:block;min-width:0"><em style="display:block;padding-right:34px;font-style:normal;font:800 11px sans-serif;color:#ffc61a;letter-spacing:.03em">3 NIVEAUX · JUSQU’À 30 XP</em><b style="display:block;margin:4px 0 6px;font:italic 800 clamp(18px,4.8vw,23px)/1.05 'Barlow Condensed',sans-serif;color:#fff">Trouve les différences</b><span style="display:block;margin-bottom:30px;color:#a9bbe0;font:400 clamp(13px,3.6vw,16px)/1.35 -apple-system,sans-serif">Repère les différences entre deux illustrations.</span>${cap?'':'<span style="position:absolute;right:4%;bottom:16px;box-sizing:border-box;width:28%;height:clamp(32px,9.2vw,37px);display:flex;align-items:center;justify-content:center;gap:5px;border-radius:999px;background:linear-gradient(180deg,#ffd43a,#ffb000);color:#1b1300;font:800 clamp(14px,4.4vw,18px)/1 sans-serif">JOUER <small style="font-size:.75em">&#9654;&#xFE0E;</small></span>'}</span>${cap?'<span style="position:absolute;inset:0;display:grid;place-content:center;text-align:center;color:#fff;font:italic 800 clamp(22px,6vw,34px)/1.1 \'Barlow Condensed\',sans-serif;text-transform:uppercase">Reviens demain<small style="display:block;margin-top:6px;font:600 15px sans-serif;text-transform:none;color:#ffd45e">300 XP gagnés aujourd’hui</small></span>':''}</button>`}
const TDBACK='<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 5l-7 7 7 7"/></svg>';
const tdFmt=s=>{s=Math.max(0,Math.ceil(s));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};
function tdRoot(){let el=document.getElementById('tdgame');if(!el){el=document.createElement('div');el.id='tdgame';document.body.appendChild(el)}return el}
function tdClose(){clearInterval(tdTk);TD=null;const el=document.getElementById('tdgame');if(el)el.remove();try{mmRender()}catch(_){}}
function tdLevels(){clearInterval(tdTk);TD=null;const el=tdRoot(),used=tdXP();
  el.innerHTML=`<div class="tdh"><button class="tdback" id="td-x" aria-label="Retour">${TDBACK}</button><div class="tdt">Trouve les différences</div><span></span></div><div class="tds">Choisis ton niveau · <b>XP du jour : ${used} / ${TDCAP}</b></div><div class="tdl">${Object.entries(TDLV).map(([k,l])=>`<button class="tdlv" data-lv="${k}"><span><b>${l.n}</b>${l.k} différences · ${l.t} secondes</span><span class="x">+${l.xp} XP</span></button>`).join('')}</div>`}
function tdStart(lv){
  if(tdXP()>=TDCAP){try{toast('Reviens demain !')}catch(_){}return tdClose()}
  if(TDBUSY)return;TDBUSY=true;
  ecoCall('mg_td_new',{p_lv:lv}).then(r=>{TDBUSY=false;if(r.err){try{toast(r.err)}catch(_){}return tdClose()}tdGo(lv,r.j.sid)})}
function tdGo(lv,sid){
  const L=TDLV[lv];let ids=L.ids.filter(i=>i!==tdLast[lv]);const id=ids[Math.floor(Math.random()*ids.length)];tdLast[lv]=id;
  const f=F.find(x=>x.id===id)||{n:'',r:'C'},d=TDD[id].d.slice(0,L.k);
  TD={sid,lv,id,f,d,found:new Set(),t0:Date.now(),pen:0,hints:TDHINTS,done:false,lost:false,left:L.t,xp:0,cur:null};
  tdDraw();
  clearInterval(tdTk);tdTk=setInterval(tdTick,200)}
function tdLeft(){return TDLV[TD.lv].t-(Date.now()-TD.t0)/1000-TD.pen}
function tdTick(){const m=TD;if(!m||m.done){clearInterval(tdTk);return}const s=tdLeft(),e=document.getElementById('td-time');
  if(s<=0){m.done=true;m.lost=true;m.left=0;clearInterval(tdTk);return tdDraw()}
  if(e){e.textContent=tdFmt(s);e.parentNode.classList.toggle('low',s<=10)}}
function tdRing(d,cls){return `<span class="tdc ${cls||''}" style="left:${(d[0]-d[2]-6)/TDW*100}%;top:${(d[1]-d[2]-6)/TDH*100}%;width:${(d[2]*2+12)/TDW*100}%;height:${(d[2]*2+12)/TDH*100}%"></span>`}
function tdDraw(){const m=TD;if(!m)return;const el=tdRoot(),L=TDLV[m.lv],v=window.__V||'';
  if(m.done){
    if(m.lost)el.innerHTML=`<div class="tdh"><button class="tdback" id="td-x" aria-label="Fermer">${TDBACK}</button><div class="tdt">Trouve les différences</div><span></span></div><div class="tdr"><h3>Temps écoulé !</h3><p>${m.found.size} différence${m.found.size>1?'s':''} sur ${m.d.length} trouvée${m.found.size>1?'s':''}</p><p>Pas d’XP cette fois. Réessaie !</p><button class="tdb" data-lv="${m.lv}">Rejouer</button><button class="tdb g" id="td-lv">Changer de niveau</button></div>`;
    else el.innerHTML=`<div class="tdh"><button class="tdback" id="td-x" aria-label="Fermer">${TDBACK}</button><div class="tdt">Trouve les différences</div><span></span></div><div class="tdr"><h3>Bravo !</h3><p>${m.f.n} · ${L.n}</p><p>Différences trouvées : <b style="color:#ffd45e">${m.found.size} / ${m.d.length}</b></p><p>Temps restant : <b style="color:#ffd45e">${tdFmt(m.left)}</b></p><div class="xp">${m.xp>0?'+'+m.xp+' XP':(m.err||'Plafond du jour atteint')}</div><p style="font-size:16px">XP du jour : ${tdXP()} / ${TDCAP}</p><button class="tdb" data-lv="${m.lv}">Rejouer</button><button class="tdb g" id="td-lv">Changer de niveau</button></div>`;
    return}
  const rings=[...m.found].map(i=>tdRing(m.d[i])).join('');
  const ci=L.ids.indexOf(m.id),box=src=>`<div class="tdi" data-w="${src}" role="img" aria-label="${src==='o'?'Illustration originale':'Illustration modifiée'}"><div class="tdim" style="background:url(td-${m.lv}.webp?v=${v}) 0 ${(2*ci+(src==='m'?1:0))*20}%/100% 600% no-repeat"></div>${rings}</div>`;
  el.innerHTML=`<div class="tdh"><button class="tdback" id="td-x" aria-label="Retour">${TDBACK}</button><div class="tdt">Trouve les différences</div><span></span></div><div class="tds">Repère les <b>${m.d.length} différences</b> · ${m.f.n} (${TDRAR[m.f.r]||''})</div><div class="tdp"><div>${MMI.clock}<b id="td-time">${tdFmt(tdLeft())}</b></div><div><b id="td-cnt">${m.found.size} / ${m.d.length}</b></div></div><div class="tdbox">${box('o')}${box('m')}</div>`}
function tdTap(box,e){const m=TD;if(!m||m.done)return;const r=box.getBoundingClientRect(),s=r.width/TDW;
  const x=(e.clientX-r.left)/s,y=(e.clientY-r.top)/(r.height/TDH);let hit=-1,best=1e9;
  m.d.forEach((d,i)=>{if(m.found.has(i))return;const dist=Math.hypot(x-d[0],y-d[1]);if(dist<=Math.max(d[2]+14,28/s)&&dist<best){best=dist;hit=i}});
  if(hit>=0){m.found.add(hit);const d=m.d[hit];document.querySelectorAll('#tdgame .tdi').forEach(b=>b.insertAdjacentHTML('beforeend',tdRing(d)));const c=document.getElementById('td-cnt');if(c)c.textContent=m.found.size+' / '+m.d.length;try{navigator.vibrate&&navigator.vibrate(15)}catch(_){}
    if(m.found.size===m.d.length)tdWin();return}
  m.pen+=TDPEN;box.classList.remove('shake');void box.offsetWidth;box.classList.add('shake','bad');setTimeout(()=>box.classList.remove('bad'),350);try{navigator.vibrate&&navigator.vibrate(30)}catch(_){}}
function tdWin(){const m=TD;m.done=true;m.left=Math.max(0,tdLeft());clearInterval(tdTk);m.xp=0;const lv0=S.lvR||1;
  Promise.all([ecoCall('mg_td_finish',{p_sid:m.sid,p_found:m.d.length}),new Promise(r=>setTimeout(r,700))]).then(([r])=>{
    if(r.err)m.err=r.err;else{m.xp=r.j.gain||0;try{mjLv(lv0);renderAll()}catch(_){}}
    if(TD===m)tdDraw()})}
function tdHint(){const m=TD;if(!m||m.done||m.hints<1)return;const i=m.d.findIndex((_,k)=>!m.found.has(k));if(i<0)return;m.hints--;
  const mb=document.querySelector('#tdgame .tdi[data-w="m"]');if(mb)mb.insertAdjacentHTML('beforeend',tdRing(m.d[i],'h'));
  const b=document.getElementById('td-hint');if(b){b.textContent='Indice ('+m.hints+')';if(m.hints<1)b.disabled=true}}
document.addEventListener('click',e=>{
  const t=e.target.closest&&e.target.closest('#td-go,#tdgame button');if(!t)return;
  if(t.id==='td-go')return tdLevels();
  if(t.id==='td-x')return tdClose();
  if(t.id==='td-lv')return tdLevels();
  if(t.id==='td-hint')return tdHint();
  if(t.dataset&&t.dataset.lv)return tdStart(t.dataset.lv)});
document.addEventListener('pointerdown',e=>{const b=e.target.closest&&e.target.closest('#tdgame .tdi');if(b){e.preventDefault();tdTap(b,e)}},{passive:false});
