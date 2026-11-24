/* ===== Puzzle ÉCAILLE ===== */
const PZLV={easy:{n:'Facile',N:3,xp:10,par:45},normal:{n:'Normal',N:4,xp:20,par:120},hard:{n:'Difficile',N:5,xp:30,par:300}};
const PZCAP=300,PZDAILY=15,PZBONUS=5,PZSW=384,PZSH=256,PZSY=90,PZX0=28,PZX1=492,PZMISS=[219,257];
const pzXP=()=>mgUsed('pz');let PZBUSY=false;
let PZ=null,pzTk=null,pzLast=0;
const pzFmt=s=>{s=Math.max(0,Math.floor(s));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};
const PZRAR={C:'Commune',R:'Rare',E:'Épique',L:'Légendaire'};
function pzDailyInfo(){const d=todayStr();let h=0;for(const ch of d)h=(h*31+ch.charCodeAt(0))>>>0;
  const ids=F.map(f=>f.id).filter(i=>!PZMISS.includes(i));const lv=['normal','easy','normal','hard','normal','easy','hard'][new Date().getDay()];
  return {id:ids[h%ids.length],lv}}
(function(){const st=document.createElement('style');st.textContent=`
#pzgame{position:fixed;inset:0;z-index:99999;display:flex;flex-direction:column;box-sizing:border-box;padding:max(10px,env(safe-area-inset-top)) 12px max(10px,env(safe-area-inset-bottom));background:radial-gradient(120% 80% at 50% 0%,#0d2a66 0%,#06122e 55%,#030a1c 100%);color:#fff;font-family:'Barlow Condensed',-apple-system,sans-serif;overflow:hidden;touch-action:manipulation;-webkit-user-select:none;user-select:none}
#pzgame .pzh{display:grid;grid-template-columns:44px 1fr 44px;align-items:center;flex:none;gap:6px}
#pzgame .pzback{all:unset;box-sizing:border-box;width:42px;height:42px;border-radius:50%;border:1.5px solid #2c4d8f;background:#081a44;display:grid;place-items:center;cursor:pointer}
#pzgame .pzback svg{width:20px;height:20px}
#pzgame .pzt{white-space:nowrap;text-align:center;font:italic 800 clamp(20px,6vw,28px)/1.05 'Barlow Condensed',sans-serif;color:#fff;border:1.5px solid #e5b13c;border-radius:999px;padding:7px 10px;background:linear-gradient(180deg,#0c2150,#060f2a);box-shadow:0 0 14px rgba(255,190,50,.25)}
#pzgame .pzs{text-align:center;color:#c7d6f5;font:italic 600 clamp(14px,4vw,18px)/1.2 'Barlow Condensed',sans-serif;margin:6px 0 8px;flex:none}
#pzgame .pzs b{color:#ffd45e}
#pzgame .pzp{display:grid;grid-template-columns:1fr 1.15fr 64px;gap:8px;flex:none;margin-bottom:10px;align-items:stretch}
#pzgame .pzp>div{box-sizing:border-box;display:flex;align-items:center;justify-content:center;gap:6px;padding:8px 6px;border:1.5px solid #2c4d8f;border-radius:999px;background:linear-gradient(180deg,#0c2150,#060f2a);white-space:nowrap;font:800 clamp(15px,4.4vw,20px)/1 'Barlow Condensed',sans-serif}
#pzgame .pzp b{color:#ffd45e}
#pzgame .pzth{all:unset;box-sizing:border-box;cursor:pointer;border:2px solid #e5b13c;border-radius:10px;box-shadow:0 0 10px rgba(255,190,50,.35);background-repeat:no-repeat}
#pzgame .pzw{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
#pzgame .pzb{position:relative;box-sizing:border-box;width:min(100%,calc((100dvh - 290px)/.667));aspect-ratio:3/2;padding:6px;border-radius:16px;border:2px solid #e5b13c;background:linear-gradient(180deg,#0a1c44,#050d24);box-shadow:0 0 0 1px #6a4d10,0 0 26px rgba(255,190,50,.28),inset 0 0 22px rgba(30,120,220,.25)}
#pzgame .pzg{position:relative;width:100%;height:100%}
#pzgame .pzc{position:absolute;left:0;top:0;transition:transform .15s ease-out;box-sizing:border-box;padding:2px;will-change:transform}
#pzgame .pzt2{all:unset;position:absolute;left:0;top:0;transition:transform .15s ease-out;box-sizing:border-box;padding:2px;cursor:pointer;-webkit-tap-highlight-color:transparent;will-change:transform}
#pzgame .pzt2 i{display:block;width:100%;height:100%;border-radius:8px;background-repeat:no-repeat;box-shadow:inset 0 0 0 1px rgba(255,255,255,.18),0 1px 4px rgba(0,0,0,.45)}
#pzgame .pzt2.ok i{animation:pzok .5s ease-out}
@keyframes pzok{0%{box-shadow:inset 0 0 0 2px #ffd21e,0 0 16px 3px rgba(255,210,30,.9)}100%{box-shadow:inset 0 0 0 1px rgba(255,255,255,.18),0 1px 4px rgba(0,0,0,.45)}}
#pzgame .pzbl{position:absolute;left:0;top:0;transition:transform .15s ease-out;box-sizing:border-box;padding:2px;pointer-events:none}
#pzgame .pzbl i{display:grid;place-items:center;width:100%;height:100%;border-radius:8px;background:#06142f;box-shadow:inset 0 0 10px rgba(0,0,0,.6)}
#pzgame .pzbl svg{width:46%;opacity:.35}
#pzgame .pzpv{position:absolute;inset:6px;border-radius:10px;background-repeat:no-repeat;box-shadow:0 0 0 2px #e5b13c;z-index:5}
#pzgame .pzfin{position:absolute;left:0;top:0;box-sizing:border-box;padding:2px;animation:pzin .6s ease-out}
#pzgame .pzfin i{display:block;width:100%;height:100%;border-radius:8px;background-repeat:no-repeat}
@keyframes pzin{from{opacity:0;transform:scale(.6)}to{opacity:1}}
#pzgame .pzb.win{animation:pzwin 1s ease-out}
@keyframes pzwin{0%{box-shadow:0 0 0 1px #6a4d10,0 0 26px rgba(255,190,50,.28)}40%{box-shadow:0 0 0 2px #ffd21e,0 0 50px 10px rgba(255,210,30,.8)}100%{box-shadow:0 0 0 1px #6a4d10,0 0 26px rgba(255,190,50,.28)}}
#pzgame .pzbt{flex:none;display:grid;grid-template-columns:1fr;gap:8px;margin-top:10px}
#pzgame .pzb2{all:unset;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;padding:12px;border:1.5px solid #2c4d8f;border-radius:999px;background:linear-gradient(180deg,#0c2150,#060f2a);font:italic 800 clamp(19px,5.4vw,24px)/1 'Barlow Condensed',sans-serif;color:#fff}
#pzgame .pzl{flex:none;display:grid;gap:10px;margin:auto 0}
#pzgame .pzlv{all:unset;box-sizing:border-box;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:10px;padding:14px 18px;border:1.5px solid #2c4d8f;border-radius:20px;background:linear-gradient(180deg,#0c2150,#060f2a);font:700 clamp(15px,4.2vw,18px)/1.2 'Barlow Condensed',sans-serif;color:#c7d6f5}
#pzgame .pzlv b{display:block;font:italic 800 clamp(24px,7vw,30px)/1.05 'Barlow Condensed',sans-serif;color:#fff}
#pzgame .pzlv.day{border-color:#e5b13c;box-shadow:0 0 18px rgba(255,190,50,.3)}
#pzgame .pzlv .x{flex:none;padding:8px 14px;border-radius:999px;background:linear-gradient(180deg,#ffd43a,#ffb000);color:#1b1300;font:800 18px 'Barlow Condensed',sans-serif}
#pzgame .pzr{margin:auto 0;text-align:center;display:flex;flex-direction:column;align-items:center;min-height:0}
#pzgame .pzr h3{font:italic 800 36px/1.1 'Barlow Condensed',sans-serif;margin:0 0 6px}
#pzgame .pzr p{margin:3px 0;color:#c7d6f5;font-size:19px}
#pzgame .pzr .xp{font:800 40px/1.1 'Barlow Condensed',sans-serif;color:#ffd45e;margin:8px 0}
#pzgame .pzcard{aspect-ratio:5/7;height:min(36dvh,300px);border-radius:14px;background-size:100% 100%;box-shadow:0 0 0 2px #e5b13c,0 0 30px rgba(255,190,50,.55);animation:pzcd .8s cubic-bezier(.2,.9,.2,1.1);margin:6px 0}
@keyframes pzcd{from{opacity:0;transform:scale(.5) rotate(-8deg)}to{opacity:1}}
#pzgame .pzbt3{all:unset;box-sizing:border-box;cursor:pointer;display:block;width:100%;margin-top:10px;text-align:center;padding:13px;border-radius:26px;background:linear-gradient(180deg,#ffd43a,#ffb000);color:#1b1300;font:800 20px 'Barlow Condensed',sans-serif;text-transform:uppercase}
#pzgame .pzbt3.g{background:#0e1730;color:#fff;border:1px solid #243566}
`;document.head.appendChild(st)})();
function pzCard(){const cap=pzXP()>=PZCAP;
  return `<button ${cap?'disabled':'id="pz-go"'} aria-label="Jouer à Puzzle ÉCAILLE" style="all:unset;box-sizing:border-box;position:relative;display:grid;grid-template-columns:34% 1fr;align-items:center;gap:10px;width:100%;padding:16px 16px 16px 10px;min-height:clamp(150px,41vw,165px);cursor:${cap?'default':'pointer'};border-radius:22px;border:2px solid #e5b13c;background:radial-gradient(120% 140% at 0% 0%,#10306e,#071533 60%,#050c22);box-shadow:0 0 26px rgba(255,190,50,.30);${cap?'filter:grayscale(.7) brightness(.55)':''}"><svg viewBox="0 0 120 110" style="width:100%;height:auto;display:block" aria-hidden="true"><defs><linearGradient id="pzg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe27a"/><stop offset="1" stop-color="#e59a00"/></linearGradient></defs><rect x="14" y="14" width="92" height="82" rx="10" fill="#0a1c4a" stroke="#2d8fd6" stroke-width="2.5"/><path d="M14 55h92M45 14v82M76 14v82" stroke="#2d8fd6" stroke-width="2" opacity=".6"/><rect x="47" y="57" width="27" height="37" rx="5" fill="#06142f"/><path d="M20 38c9-12 18-12 22 0-4 10-13 10-22 0z" fill="#1d6fc0"/><path d="M80 24c7-8 15-8 20 0-5 8-13 8-20 0z" fill="url(#pzg)"/><path d="M52 70h20M62 62v16" stroke="url(#pzg)" stroke-width="5" stroke-linecap="round"/></svg><span style="display:block;min-width:0"><em style="display:block;padding-right:34px;font-style:normal;font:800 11px sans-serif;color:#ffc61a;letter-spacing:.03em">3 NIVEAUX · PUZZLE DU JOUR</em><b style="display:block;margin:4px 0 6px;font:italic 800 clamp(18px,4.8vw,23px)/1.05 'Barlow Condensed',sans-serif;color:#fff">Puzzle ÉCAILLE</b><span style="display:block;margin-bottom:30px;color:#a9bbe0;font:400 clamp(13px,3.6vw,16px)/1.35 -apple-system,sans-serif">Reconstitue les illustrations de tes poissons préférés.</span>${cap?'':'<span style="position:absolute;right:4%;bottom:16px;box-sizing:border-box;width:28%;height:clamp(32px,9.2vw,37px);display:flex;align-items:center;justify-content:center;gap:5px;border-radius:999px;background:linear-gradient(180deg,#ffd43a,#ffb000);color:#1b1300;font:800 clamp(14px,4.4vw,18px)/1 sans-serif">JOUER <small style="font-size:.75em">&#9654;&#xFE0E;</small></span>'}</span>${cap?'<span style="position:absolute;inset:0;display:grid;place-content:center;text-align:center;color:#fff;font:italic 800 clamp(22px,6vw,34px)/1.1 \'Barlow Condensed\',sans-serif;text-transform:uppercase">Reviens demain<small style="display:block;margin-top:6px;font:600 15px sans-serif;text-transform:none;color:#ffd45e">300 XP gagnés aujourd’hui</small></span>':''}</button>`}
const PZBACK='<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 5l-7 7 7 7"/></svg>';
const PZFISH='<svg viewBox="0 0 64 36" fill="#2d8fd6"><path d="M2 18c8-12 22-16 36-10l12-6-3 14 3 14-12-6C24 34 10 30 2 18z"/></svg>';
function pzRoot(){let el=document.getElementById('pzgame');if(!el){el=document.createElement('div');el.id='pzgame';document.body.appendChild(el)}return el}
function pzClose(){clearInterval(pzTk);PZ=null;const el=document.getElementById('pzgame');if(el)el.remove();try{mmRender()}catch(_){}}
const pzHead=()=>`<div class="pzh"><button class="pzback" id="pz-x" aria-label="Retour">${PZBACK}</button><div class="pzt">Puzzle ÉCAILLE</div><span></span></div>`;
function pzLevels(){clearInterval(pzTk);PZ=null;const el=pzRoot(),used=pzXP(),dd=pzDailyInfo(),df=F.find(f=>f.id===dd.id)||{n:''},dn=S.pzd===todayStr()?{done:true,best:(S.pzdb&&S.pzdb.d===todayStr()?S.pzdb.t:0)}:null,b=S.pzb||{};
  el.innerHTML=pzHead()+`<div class="pzs">Reconstitue l’illustration de la carte ! · <b>XP du jour : ${used} / ${PZCAP}</b></div><div class="pzl"><button class="pzlv day" data-daily="1"><span><b>Puzzle du jour</b>${PZLV[dd.lv].n} · ${PZLV[dd.lv].N}×${PZLV[dd.lv].N}${dn&&dn.best?' · meilleur : '+pzFmt(dn.best):''}</span><span class="x">${dn&&dn.done?'Obtenu ✓':'+'+PZDAILY+' XP'}</span></button>${Object.entries(PZLV).map(([k,l])=>`<button class="pzlv" data-lv="${k}"><span><b>${l.n}</b>${l.N}×${l.N} · ${l.N*l.N-1} pièces${b[k]?' · record : '+pzFmt(b[k]):''}</span><span class="x">+${l.xp} XP</span></button>`).join('')}</div>`}
function pzCenter(img){try{const cw=PZX1-PZX0,ch=256,c=document.createElement('canvas');c.width=58;c.height=32;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(img,PZX0,PZSY,cw,ch,0,0,58,32);const d=g.getImageData(0,0,58,32).data;let mr=0,mg=0,mb=0;for(let i=0;i<d.length;i+=4){mr+=d[i];mg+=d[i+1];mb+=d[i+2]}const n=d.length/4;mr/=n;mg/=n;mb/=n;let sw=0,sx=0;for(let y=0;y<32;y++)for(let x=0;x<58;x++){const i=(y*58+x)*4,w=Math.pow(Math.abs(d[i]-mr)+Math.abs(d[i+1]-mg)+Math.abs(d[i+2]-mb),2);sw+=w;sx+=w*x}
    const cx=PZX0+(sw?sx/sw:29)/58*cw;return Math.max(PZX0,Math.min(PZX1-PZSW,Math.round(cx-PZSW/2)))}catch(_){return Math.round((PZX0+PZX1-PZSW)/2)}}
const PZMOD={easy:[0,130,20],normal:[95,77,70],hard:[111,58,92]},pzLastLv={};
function pzPick(lv){const l=PZMOD[lv].filter(i=>i!==pzLastLv[lv]);const id=l[Math.floor(Math.random()*l.length)];pzLastLv[lv]=id;return id}
function pzShuffle(N){const n=N*N;let a=[...Array(n).keys()],b=n-1,prev=-1;for(let k=0;k<N*N*40;k++){const r=Math.floor(b/N),c=b%N,nb=[];if(r>0)nb.push(b-N);if(r<N-1)nb.push(b+N);if(c>0)nb.push(b-1);if(c<N-1)nb.push(b+1);const cand=nb.filter(x=>x!==prev),t=cand[Math.floor(Math.random()*cand.length)];[a[b],a[t]]=[a[t],a[b]];prev=b;b=t}
  if(a.every((v,i)=>v===i))return pzShuffle(N);return a}
function pzStart(lv,daily){
  if(pzXP()>=PZCAP){try{toast('Reviens demain !')}catch(_){}return pzClose()}
  if(PZBUSY)return;PZBUSY=true;const d0=daily?pzDailyInfo():null;
  ecoCall('mg_pz_new',{p_lv:d0?d0.lv:lv,p_daily:!!daily}).then(r=>{PZBUSY=false;if(r.err){try{toast(r.err)}catch(_){}return pzLevels()}pzStart2(lv,daily,r.j.sid)})}
function pzStart2(lv,daily,sid){
  const dd=daily?pzDailyInfo():null,L=PZLV[dd?dd.lv:lv],id=dd?dd.id:pzPick(lv);pzLast=id;
  const im=new Image();let started=false;const go=()=>{if(started)return;started=true;
    const f=F.find(x=>x.id===id)||{n:'',r:'C'},N=L.N;
    PZ={sid,lv:dd?dd.lv:lv,daily:!!daily,id,f,N,sx:pzCenter(im),a:pzShuffle(N),moves:0,t0:0,done:false,xp:0,bonus:0,prev:false};
    pzDraw();};
  im.onload=go;im.onerror=go;im.src='full-'+id+'.webp?v='+(window.__V||'');if(im.complete&&im.naturalWidth)go()}
function pzBg(m,p){const N=m.N,r=Math.floor(p/N),c=p%N,tw=PZSW/N,th=PZSH/N,sx=m.sx+c*tw,sy=PZSY+r*th,v=window.__V||'';
  return `background-image:url(full-${m.id}.webp?v=${v});background-size:${520*N/PZSW*100}% ${728*N/PZSH*100}%;background-position:${sx/(520-tw)*100}% ${sy/(728-th)*100}%`}
function pzFull(m){const v=window.__V||'';return `background-image:url(full-${m.id}.webp?v=${v});background-size:${520/PZSW*100}% ${728/PZSH*100}%;background-position:${m.sx/(520-PZSW)*100}% ${PZSY/(728-PZSH)*100}%`}
const pzPos=(m,i)=>`transform:translate(${(i%m.N)*100}%,${Math.floor(i/m.N)*100}%);width:${100/m.N}%;height:${100/m.N}%`;
function pzDraw(){const m=PZ;if(!m)return;const el=pzRoot(),N=m.N,n=N*N,L=PZLV[m.lv];
  if(m.done)return pzVictory();
  let tiles='';m.a.forEach((p,i)=>{if(p===n-1)return;tiles+=`<button class="pzt2" data-p="${p}" style="${pzPos(m,i)}" aria-label="Pièce"><i style="${pzBg(m,p)}"></i></button>`});
  const bi=m.a.indexOf(n-1);
  el.innerHTML=pzHead()+`<div class="pzs">${m.daily?'<b>Puzzle du jour</b> · ':''}Reconstitue l’illustration de la carte ! · <b>${L.n}</b></div><div class="pzp"><div>${typeof MMI!=='undefined'?MMI.clock:'⏱'}<b id="pz-time">${pzFmt(m.t0?(Date.now()-m.t0)/1000:0)}</b></div><div>Mouvements : <b id="pz-mv">${m.moves}</b></div><button class="pzth" id="pz-view" aria-label="Voir l’image" style="${pzFull(m)}"></button></div><div class="pzw"><div class="pzb" id="pz-board"><div class="pzg" id="pz-grid">${tiles}<div class="pzbl" id="pz-bl" style="${pzPos(m,bi)}"><i>${PZFISH}</i></div></div></div></div><div class="pzbt"><button class="pzb2" id="pz-re"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffc21e" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/></svg>Recommencer</button></div>`;
  clearInterval(pzTk);pzTk=setInterval(()=>{const e=document.getElementById('pz-time');if(!e||PZ!==m||m.done){clearInterval(pzTk);return}if(m.t0)e.textContent=pzFmt((Date.now()-m.t0)/1000)},250)}
function pzMove(p){const m=PZ;if(!m||m.done)return;const N=m.N,n=N*N,i=m.a.indexOf(p),b=m.a.indexOf(n-1),ri=Math.floor(i/N),ci=i%N,rb=Math.floor(b/N),cb=b%N;
  if(ri!==rb&&ci!==cb)return;
  const step=ri===rb?(ci<cb?1:-1):(ri<rb?N:-N);const chain=[];for(let k=b-step;;k-=step){chain.push(k);if(k===i)break}
  // chain: positions from nearest blank to tapped tile; shift each toward blank
  let to=b;for(const k of chain){const piece=m.a[k];m.a[to]=piece;const t=document.querySelector(`#pzgame .pzt2[data-p="${piece}"]`);if(t){t.style.cssText=pzPos(m,to);if(piece===to){t.classList.remove('ok');void t.offsetWidth;t.classList.add('ok')}}to=k}
  m.a[to]=n-1;const bl=document.getElementById('pz-bl');if(bl)bl.style.cssText=pzPos(m,to);
  if(!m.t0)m.t0=Date.now();m.moves++;const e=document.getElementById('pz-mv');if(e)e.textContent=m.moves;try{navigator.vibrate&&navigator.vibrate(8)}catch(_){}
  if(m.a.every((v,k)=>v===k))pzWin()}
function pzWin(){const m=PZ;m.done=true;clearInterval(pzTk);m.time=Math.max(1,Math.round((Date.now()-m.t0)/1000));const L=PZLV[m.lv],n=m.N*m.N;
  m.xp=0;m.first=false;const d=todayStr(),lv0=S.lvR||1;
  try{const b=S.pzb||(S.pzb={});if(!b[m.lv]||m.time<b[m.lv])b[m.lv]=m.time;if(m.daily&&(!S.pzdb||S.pzdb.d!==d||m.time<S.pzdb.t))S.pzdb={d,t:m.time}}catch(_){}
  m.srv=ecoCall('mg_pz_finish',{p_sid:m.sid,p_moves:m.moves}).then(r=>{
    if(r.err)m.err=r.err;else{const j=r.j,base=m.daily?PZDAILY:L.xp;m.xp=j.gain||0;m.first=m.daily&&j.want>0;m.bonus=j.want>base?j.want-base:0;try{mjLv(lv0);renderAll()}catch(_){}}});
  const g=document.getElementById('pz-grid'),bd=document.getElementById('pz-board');if(g){const bi=n-1;g.insertAdjacentHTML('beforeend',`<div class="pzfin" style="${pzPos(m,bi)}"><i style="${pzBg(m,bi)}"></i></div>`);const bl=document.getElementById('pz-bl');if(bl)bl.style.display='none'}
  if(bd)bd.classList.add('win');try{navigator.vibrate&&navigator.vibrate([20,40,20])}catch(_){}
  Promise.all([m.srv,new Promise(r=>setTimeout(r,1100))]).then(()=>{if(PZ===m)pzVictory()})}
function pzVictory(){const m=PZ,el=pzRoot(),L=PZLV[m.lv],v=window.__V||'',rec=S.pzb&&S.pzb[m.lv];
  el.innerHTML=pzHead()+`<div class="pzr"><h3>Bravo !</h3><p>${m.f.n} · ${PZRAR[m.f.r]||''}</p><div class="pzcard" style="background-image:url(full-${m.id}.webp?v=${v})"></div><p>Temps : <b style="color:#ffd45e">${pzFmt(m.time)}</b> · Mouvements : <b style="color:#ffd45e">${m.moves}</b></p>${rec&&m.time<=rec?'<p style="color:#5fe7ff;font-size:16px">Nouveau record !</p>':''}<div class="xp">${m.xp>0?'+'+m.xp+' XP':(m.daily&&!m.first?'Récompense du jour déjà obtenue':(m.err||'Plafond du jour atteint'))}</div>${m.bonus&&m.xp>0?'<p style="font-size:15px">dont bonus rapidité +'+m.bonus+'</p>':''}<div style="width:100%"><button class="pzbt3" data-again="1">Rejouer</button><button class="pzbt3 g" id="pz-lv">Changer de niveau</button></div></div>`}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('#pz-go,#pzgame button');if(!t)return;
  if(t.id==='pz-go')return pzLevels();
  if(t.id==='pz-x')return pzClose();
  if(t.id==='pz-lv')return pzLevels();
  if(t.id==='pz-re'){if(PZ)return pzStart(PZ.daily?null:PZ.lv,PZ.daily)}
  if(t.id==='pz-view'){const m=PZ;if(!m||m.done)return;const b=document.getElementById('pz-board'),o=b.querySelector('.pzpv');if(o)return o.remove();b.insertAdjacentHTML('beforeend',`<div class="pzpv" id="pz-pv" style="${pzFull(m)}"></div>`);return}
  if(t.dataset){if(t.dataset.again){if(PZ)return pzStart(PZ.daily?null:PZ.lv,false)}
    if(t.dataset.daily)return pzStart(null,true);
    if(t.dataset.lv)return pzStart(t.dataset.lv,false)}});
document.addEventListener('pointerdown',e=>{const pv=e.target.closest&&e.target.closest('#pz-pv');if(pv){pv.remove();return}
  const t=e.target.closest&&e.target.closest('#pzgame .pzt2');if(t){e.preventDefault();pzMove(+t.dataset.p)}},{passive:false});
/* ===== Ampoules d'aide (menu Mini-jeux) ===== */
const GHELP={
 qz:{t:'Qui est ce poisson ?',l:['Observe l’illustration et choisis le bon nom parmi 4.','10 questions. Facile 30 s, Normal 20 s, Expert 10 s par question.','5 à 30 XP selon tes bonnes réponses, 30 XP pour un 10/10.']},
 mm:{t:'Mémoire des cartes',l:['Retourne 2 cartes à la fois et retrouve les 6 paires.','Tu as 30 secondes seulement.','Victoire : +15 XP.']},
 td:{t:'Trouve les différences',l:['Compare les deux illustrations et touche les différences.','Facile 3, Normal 5, Difficile 7. Une erreur fait perdre 2 secondes.','Victoire : +10, +20 ou +30 XP.']},
 pz:{t:'Puzzle ÉCAILLE',l:['Touche une case à côté du vide pour la glisser.','Remets l’illustration en ordre : 3×3, 4×4 ou 5×5.','+10, +20 ou +30 XP, +5 si tu es rapide. Puzzle du jour : +15 XP.']}};
(function(){const st=document.createElement('style');st.textContent=`
.gbw{position:relative}
.gbulb{all:unset;position:absolute;top:8px;right:8px;z-index:3;width:38px;height:38px;box-sizing:border-box;border-radius:50%;border:1.5px solid #e5b13c;background:rgba(6,16,40,.88);display:grid;place-items:center;cursor:pointer;box-shadow:0 0 10px rgba(255,190,50,.45);-webkit-tap-highlight-color:transparent}
.gbulb svg{width:22px;height:22px}
#ghelp{position:fixed;inset:0;z-index:100000;display:grid;place-items:center;padding:20px;background:rgba(2,8,22,.72)}
#ghelp .bx{width:min(100%,360px);box-sizing:border-box;padding:20px 18px 16px;border-radius:20px;border:2px solid #e5b13c;background:linear-gradient(180deg,#0c2150,#060f2a);color:#fff;box-shadow:0 0 30px rgba(255,190,50,.35);font-family:-apple-system,sans-serif}
#ghelp h3{margin:0 0 10px;font:italic 800 26px/1.1 'Barlow Condensed',sans-serif}
#ghelp ul{margin:0 0 14px;padding-left:20px;color:#c7d6f5;font-size:16px;line-height:1.4}
#ghelp li{margin:5px 0}
#ghelp button{all:unset;box-sizing:border-box;display:block;width:100%;text-align:center;cursor:pointer;padding:12px;border-radius:999px;background:linear-gradient(180deg,#ffd43a,#ffb000);color:#1b1300;font:800 19px 'Barlow Condensed',sans-serif;text-transform:uppercase}
`;document.head.appendChild(st)})();
const GBULB='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5a6.5 6.5 0 0 0-3.6 11.9c.7.5 1.1 1.2 1.1 2v.6h5v-.6c0-.8.4-1.5 1.1-2A6.5 6.5 0 0 0 12 2.5z" fill="#ffd45e"/><path d="M9.8 19h4.4M10.5 21.2h3" stroke="#ffd45e" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>';

(function(){const o=window.mmRender||mmRender;window.mmRender=mmRender=function(){const r=o.apply(this,arguments);gBulbs();return r}})();
document.addEventListener('click',e=>{const h=e.target.closest&&e.target.closest('.gbulb');
  if(h){e.preventDefault();e.stopImmediatePropagation();const g=GHELP[h.dataset.help],d=document.createElement('div');d.id='ghelp';d.innerHTML=`<div class="bx" role="dialog" aria-label="${g.t}"><h3>${g.t}</h3><ul>${g.l.map(x=>'<li>'+x+'</li>').join('')}</ul><button id="gh-ok">Compris</button></div>`;document.body.appendChild(d);return}
  if(e.target.closest&&e.target.closest('#gh-ok')||e.target.id==='ghelp'){const d=document.getElementById('ghelp');if(d)d.remove()}},true);
try{gBulbs()}catch(_){}
/* ===== Qui est ce poisson ? ===== */
const QZLV={easy:{n:'Facile',t:30},normal:{n:'Normal',t:20},hard:{n:'Expert',t:10}};
const QZREW=[5,5,5,5,10,10,10,20,20,20,30],QZCAP=300,QZN=10;
const QZFAM={recif:'Récifs',large:'Grand large',requins:'Requins & Raies',abysses:'Abysses',douce:'Eau douce',crust:'Crustacés'};
const QZFAMOUS=[0,21,89,80,82,86,87,50,56,59,54,23,130,30,17,43,42,88,34,97,57,83,16,26,29,61,85,1,25,11,32,40];
const qzXP=()=>mgUsed('quiz');let QZBUSY=false;
let QZ=null,qzTk=null,qzNx=null;
const qzShuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const k=Math.floor(Math.random()*(i+1));[a[i],a[k]]=[a[k],a[i]]}return a};
(function(){const st=document.createElement('style');st.textContent=`
#qzgame{position:fixed;inset:0;z-index:99999;display:flex;flex-direction:column;box-sizing:border-box;padding:max(10px,env(safe-area-inset-top)) 12px max(10px,env(safe-area-inset-bottom));background:radial-gradient(120% 80% at 50% 0%,#0d2a66 0%,#06122e 55%,#030a1c 100%);color:#fff;font-family:'Barlow Condensed',-apple-system,sans-serif;overflow:hidden;touch-action:manipulation;-webkit-user-select:none;user-select:none}
#qzgame .qh{display:grid;grid-template-columns:44px 1fr 44px;align-items:center;flex:none;gap:6px}
#qzgame .qback{all:unset;box-sizing:border-box;width:42px;height:42px;border-radius:50%;border:1.5px solid #2c4d8f;background:#081a44;display:grid;place-items:center;cursor:pointer}
#qzgame .qback svg{width:20px;height:20px}
#qzgame .qt{white-space:nowrap;text-align:center;font:italic 800 clamp(20px,6vw,28px)/1.05 'Barlow Condensed',sans-serif;border:1.5px solid #e5b13c;border-radius:999px;padding:7px 10px;background:linear-gradient(180deg,#0c2150,#060f2a);box-shadow:0 0 14px rgba(255,190,50,.25)}
#qzgame .qs{text-align:center;color:#c7d6f5;font:italic 600 clamp(14px,4vw,18px)/1.2 'Barlow Condensed',sans-serif;margin:6px 0 8px;flex:none}
#qzgame .qs b{color:#ffd45e}
#qzgame .qp{display:grid;grid-template-columns:1.1fr 1fr .9fr 1fr;gap:6px;flex:none;margin-bottom:10px}
#qzgame .qp>div{box-sizing:border-box;display:flex;align-items:center;justify-content:center;gap:4px;padding:8px 4px;border:1.5px solid #2c4d8f;border-radius:999px;background:linear-gradient(180deg,#0c2150,#060f2a);white-space:nowrap;font:800 clamp(13px,3.9vw,18px)/1 'Barlow Condensed',sans-serif}
#qzgame .qp b{color:#ffd45e}
#qzgame .qp .low{color:#ff7b7b;border-color:#ff7b7b}
#qzgame .qbox{position:relative;flex:none;box-sizing:border-box;width:100%;aspect-ratio:464/256;border-radius:18px;border:2.5px solid #e5b13c;box-shadow:0 0 0 1px #6a4d10,0 0 22px rgba(255,190,50,.3);overflow:hidden;background-repeat:no-repeat;animation:qin .45s ease-out}
@keyframes qin{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:none}}
#qzgame .qbg{position:absolute;inset:-12px;background-repeat:no-repeat;filter:blur(16px) brightness(.5) saturate(1.2)}
#qzgame .qimg{position:absolute;left:9%;width:82%;top:50%;transform:translateY(-50%);aspect-ratio:464/256;border-radius:12px;background-repeat:no-repeat;box-shadow:0 0 0 1.5px rgba(255,255,255,.22),0 6px 18px rgba(0,0,0,.5)}
#qzgame .qfam{z-index:2;position:absolute;left:8px;top:6px;padding:5px 12px;border-radius:999px;background:rgba(5,14,36,.82);border:1px solid #2c4d8f;font:italic 700 15px/1 'Barlow Condensed',sans-serif}
#qzgame .qbar{flex:none;height:7px;margin:8px 4px 10px;border-radius:99px;background:#0a1c44;overflow:hidden}
#qzgame .qbar i{display:block;height:100%;width:100%;background:linear-gradient(90deg,#2d8fd6,#5fe7ff);transform-origin:left;transition:width .1s linear}
#qzgame .qbar.low i{background:#ff7b7b}
#qzgame .qa{flex:1;min-height:0;display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:minmax(54px,1fr);gap:10px;align-content:start;max-height:230px}
#qzgame .qb{all:unset;box-sizing:border-box;cursor:pointer;display:grid;place-items:center;text-align:center;padding:6px 10px;border:1.5px solid #2d8fd6;border-radius:18px;background:linear-gradient(180deg,#0c2150,#050f28);box-shadow:0 0 10px rgba(45,143,214,.35);font:italic 800 clamp(18px,5.2vw,24px)/1.1 'Barlow Condensed',sans-serif;color:#fff;-webkit-tap-highlight-color:transparent;transition:transform .08s}
#qzgame .qb:active{transform:scale(.97)}
#qzgame .qb.ok{background:linear-gradient(180deg,#14a03a,#0a5d1f);border-color:#6dff8f;box-shadow:0 0 18px rgba(80,255,130,.7);animation:qok .45s}
#qzgame .qb.bad{background:linear-gradient(180deg,#8a1620,#4a0a10);border-color:#ff5d5d;box-shadow:0 0 14px rgba(255,93,93,.6);animation:qsh .35s}
#qzgame .qb.dim{opacity:.45}
@keyframes qok{0%{transform:scale(1)}40%{transform:scale(1.05)}100%{transform:scale(1)}}
@keyframes qsh{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}50%{transform:translateX(6px)}75%{transform:translateX(-4px)}}
#qzgame .qpts{position:absolute;right:10px;bottom:6px;z-index:2;font:800 24px/1 'Barlow Condensed',sans-serif;color:#6dff8f;text-shadow:0 0 8px #000;animation:qin .3s}
#qzgame .ql{flex:none;display:grid;gap:10px;margin:auto 0}
#qzgame .qlv{all:unset;box-sizing:border-box;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:10px;padding:14px 18px;border:1.5px solid #2c4d8f;border-radius:20px;background:linear-gradient(180deg,#0c2150,#060f2a);font:700 clamp(15px,4.2vw,18px)/1.2 'Barlow Condensed',sans-serif;color:#c7d6f5}
#qzgame .qlv b{display:block;font:italic 800 clamp(24px,7vw,30px)/1.05 'Barlow Condensed',sans-serif;color:#fff}
#qzgame .qlv .x{flex:none;padding:8px 14px;border-radius:999px;background:linear-gradient(180deg,#ffd43a,#ffb000);color:#1b1300;font:800 18px 'Barlow Condensed',sans-serif}
#qzgame .qr{margin:auto 0;text-align:center;display:flex;flex-direction:column;align-items:center;position:relative}
#qzgame .qr h3{font:italic 800 34px/1.1 'Barlow Condensed',sans-serif;margin:0 0 6px}
#qzgame .qr .big{font:800 44px/1.1 'Barlow Condensed',sans-serif;color:#fff;margin:4px 0}
#qzgame .qr p{margin:3px 0;color:#c7d6f5;font-size:19px}
#qzgame .qr .xp{font:800 44px/1.1 'Barlow Condensed',sans-serif;color:#ffd45e;margin:10px 0;animation:qpop .7s cubic-bezier(.2,.9,.2,1.3)}
@keyframes qpop{from{transform:scale(.3);opacity:0}to{transform:none;opacity:1}}
#qzgame .qr.perfect h3{color:#ffd45e;text-shadow:0 0 18px #ffb000;animation:qglow 1s infinite alternate}
@keyframes qglow{from{text-shadow:0 0 8px #ffb000}to{text-shadow:0 0 28px #ffd45e}}
#qzgame .qst{position:absolute;top:0;font-size:22px;opacity:0;animation:qfloat 2.4s ease-out infinite}
@keyframes qfloat{0%{transform:translateY(40px) scale(.5);opacity:0}20%{opacity:1}100%{transform:translateY(-120px) scale(1.2) rotate(40deg);opacity:0}}
#qzgame .qbt{all:unset;box-sizing:border-box;cursor:pointer;display:block;width:100%;margin-top:10px;text-align:center;padding:13px;border-radius:26px;background:linear-gradient(180deg,#ffd43a,#ffb000);color:#1b1300;font:800 20px 'Barlow Condensed',sans-serif;text-transform:uppercase}
#qzgame .qbt.g{background:#0e1730;color:#fff;border:1px solid #243566}
`;document.head.appendChild(st)})();
function qzCard(){const cap=qzXP()>=QZCAP;
  return `<button ${cap?'disabled':'id="qz-go"'} aria-label="Jouer à Qui est ce poisson ?" style="all:unset;box-sizing:border-box;position:relative;display:grid;grid-template-columns:34% 1fr;align-items:center;gap:10px;width:100%;padding:16px 16px 16px 10px;min-height:clamp(150px,41vw,165px);cursor:${cap?'default':'pointer'};border-radius:22px;border:2px solid #e5b13c;background:radial-gradient(120% 140% at 0% 0%,#10306e,#071533 60%,#050c22);box-shadow:0 0 26px rgba(255,190,50,.30);${cap?'filter:grayscale(.7) brightness(.55)':''}"><svg viewBox="0 0 120 110" style="width:100%;height:auto;display:block" aria-hidden="true"><defs><linearGradient id="qzg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe27a"/><stop offset="1" stop-color="#e59a00"/></linearGradient></defs><rect x="8" y="22" width="104" height="66" rx="10" fill="#0a1c4a" stroke="#2d8fd6" stroke-width="2.5"/><path d="M24 56c14-20 34-22 52-6l18-12-6 18 6 18-18-12c-18 16-38 12-52-6z" fill="url(#qzg)"/><circle cx="36" cy="52" r="3.2" fill="#06142f"/><text x="96" y="30" font-size="26" font-weight="800" fill="#fff" font-family="sans-serif">?</text></svg><span style="display:block;min-width:0"><em style="display:block;padding-right:34px;font-style:normal;font:800 11px sans-serif;color:#ffc61a;letter-spacing:.03em">10 QUESTIONS · 3 NIVEAUX</em><b style="display:block;margin:4px 0 6px;font:italic 800 clamp(18px,4.8vw,23px)/1.05 'Barlow Condensed',sans-serif;color:#fff">Qui est ce poisson ?</b><span style="display:block;margin-bottom:30px;color:#a9bbe0;font:400 clamp(13px,3.6vw,16px)/1.35 -apple-system,sans-serif">Reconnais le poisson à partir de son illustration.</span>${cap?'':'<span style="position:absolute;right:4%;bottom:16px;box-sizing:border-box;width:28%;height:clamp(32px,9.2vw,37px);display:flex;align-items:center;justify-content:center;gap:5px;border-radius:999px;background:linear-gradient(180deg,#ffd43a,#ffb000);color:#1b1300;font:800 clamp(14px,4.4vw,18px)/1 sans-serif">JOUER <small style="font-size:.75em">&#9654;&#xFE0E;</small></span>'}</span>${cap?'<span style="position:absolute;inset:0;display:grid;place-content:center;text-align:center;color:#fff;font:italic 800 clamp(22px,6vw,34px)/1.1 \'Barlow Condensed\',sans-serif;text-transform:uppercase">Reviens demain<small style="display:block;margin-top:6px;font:600 15px sans-serif;text-transform:none;color:#ffd45e">300 XP gagnés aujourd’hui</small></span>':''}</button>`}
const qzHead=()=>`<div class="qh"><button class="qback" id="qz-x" aria-label="Retour">${PZBACK}</button><div class="qt">Qui est ce poisson ?</div><span></span></div>`;
function qzClose(){clearInterval(qzTk);clearTimeout(qzNx);QZ=null;const el=document.getElementById('qzgame');if(el)el.remove();try{mmRender()}catch(_){}}
function qzRoot(){let el=document.getElementById('qzgame');if(!el){el=document.createElement('div');el.id='qzgame';document.body.appendChild(el)}return el}
function qzLevels(){clearInterval(qzTk);clearTimeout(qzNx);QZ=null;const el=qzRoot(),b=S.qzb||{};
  el.innerHTML=qzHead()+`<div class="qs">Observe l’illustration et choisis le bon nom ! · <b>XP du jour : ${qzXP()} / ${QZCAP}</b></div><div class="ql">${Object.entries(QZLV).map(([k,l])=>`<button class="qlv" data-qlv="${k}"><span><b>${l.n}</b>${l.t} s par question${b[k]?' · record : '+b[k]+' pts':''}</span><span class="x">Jouer</span></button>`).join('')}</div>`}
function qzStart(lv){
  if(qzXP()>=QZCAP){try{toast('Reviens demain !')}catch(_){}return qzClose()}
  if(QZBUSY)return;QZBUSY=true;
  ecoCall('mg_quiz_new',{p_lv:lv}).then(r=>{QZBUSY=false;if(r.err){try{toast(r.err)}catch(_){}return qzLevels()}
    const qs=r.j.qs.map(q=>({f:F[q.c],opts:q.o.map(id=>F[id])}));
    QZ={sid:r.j.sid,lv,qs,i:0,score:0,right:0,streak:0,lock:false,t0:Date.now(),paid:false,pts:0,done:false};qzDraw()})}
const qzImg=id=>`background-image:url(full-${id}.webp?v=${window.__V||''});background-size:${520/464*100}% ${728/256*100}%;background-position:${28/(520-464)*100}% ${90/(728-256)*100}%`;
function qzDraw(){const m=QZ;if(!m)return;if(m.done)return qzEnd();const q=m.qs[m.i],L=QZLV[m.lv],el=qzRoot();m.lock=false;m.t0=Date.now();
  el.innerHTML=qzHead()+`<div class="qs">Observe l’illustration et choisis le bon nom !</div><div class="qp"><div>Niveau : <b>${L.n}</b></div><div>${typeof MMI!=='undefined'?MMI.clock:''}<b id="qz-time">${L.t}</b></div><div><b>${m.i+1} / ${QZN}</b></div><div>Score <b id="qz-sc">${m.score}</b></div></div><div class="qbox"><div class="qbg" style="${qzImg(q.f.id)}"></div><div class="qimg" style="${qzImg(q.f.id)}"></div><span class="qfam">${QZFAM[q.f.set]||''}</span></div><div class="qbar" id="qz-bar"><i id="qz-bi"></i></div><div class="qa">${q.opts.map((o,k)=>`<button class="qb" data-qa="${k}">${o.n}</button>`).join('')}</div>`;
  clearInterval(qzTk);qzTk=setInterval(()=>{if(QZ!==m||m.lock||m.done){return}const left=L.t-(Date.now()-m.t0)/1000;if(left<=0){qzAnswer(-1)}else{const t=document.getElementById('qz-time'),bi=document.getElementById('qz-bi'),bar=document.getElementById('qz-bar');if(t){t.textContent=Math.ceil(left);t.parentNode.classList.toggle('low',left<=5)}if(bi)bi.style.width=(left/L.t*100)+'%';if(bar)bar.classList.toggle('low',left<=5)}},100)}
function qzAnswer(k){const m=QZ;if(!m||m.lock||m.done)return;m.lock=true;const q=m.qs[m.i],left=Math.max(0,QZLV[m.lv].t-(Date.now()-m.t0)/1000);
  ecoCall('mg_quiz_answer',{p_sid:m.sid,p_q:m.i,p_choice:k<0?-1:q.opts[k].id}).then(r=>{if(QZ!==m)return;if(r.err){try{toast(r.err)}catch(_){}return qzClose()}if(r.j.done)m.srv=r.j;qzApply(m,k,r.j,left)})}
function qzApply(m,k,j,left){const q=m.qs[m.i],L=QZLV[m.lv],ci=q.opts.findIndex(o=>o.id===j.answer),good=!!j.good;
  let pts=0;if(good){m.right++;m.streak++;pts=100+Math.round(50*left/L.t);if(m.streak%3===0)pts+=50;m.score+=pts}else m.streak=0;
  const bs=document.querySelectorAll('#qzgame .qb');bs.forEach((b,i)=>{if(i===ci)b.classList.add('ok');else if(i===k)b.classList.add('bad');else b.classList.add('dim')});
  const sc=document.getElementById('qz-sc');if(sc)sc.textContent=m.score;const bx=document.querySelector('#qzgame .qbox');if(bx&&good)bx.insertAdjacentHTML('beforeend',`<span class="qpts">+${pts}${m.streak%3===0?' · Série !':''}</span>`);
  try{navigator.vibrate&&navigator.vibrate(good?10:[30,30,30])}catch(_){}
  clearTimeout(qzNx);qzNx=setTimeout(()=>{if(QZ!==m)return;m.i++;if(m.i>=QZN){m.done=true;qzFinish()}else qzDraw()},good?1100:1600)}
function qzFinish(){const m=QZ;if(m.paid)return qzEnd();m.paid=true;const j=m.srv||{},lv0=S.lvR||1;
  m.xp=j.gain||0;const b=S.qzb||(S.qzb={});m.rec=!b[m.lv]||m.score>b[m.lv];if(m.rec)b[m.lv]=m.score;m.best=b[m.lv];
  try{mjLv(lv0);renderAll()}catch(_){}
  qzEnd()}
function qzEnd(){const m=QZ,el=qzRoot(),perfect=m.right===QZN;
  const stars=perfect?Array.from({length:14},(_,i)=>`<span class="qst" style="left:${5+i*7}%;animation-delay:${(i%7)*.3}s">${i%2?'✨':'⭐'}</span>`).join(''):'';
  el.innerHTML=qzHead()+`<div class="qr${perfect?' perfect':''}">${stars}<h3>${perfect?'PARFAIT !':'Partie terminée !'}</h3><div class="big">${m.right} / ${QZN}</div><p>bonnes réponses</p><p>Score : <b style="color:#ffd45e">${m.score}</b> · Meilleur : <b style="color:#ffd45e">${m.best}</b>${m.rec?' · Record !':''}</p><div class="xp">${m.xp>0?'+'+m.xp+' XP':(m.err||'Plafond du jour atteint')}</div><div style="width:100%"><button class="qbt" data-qlv="${m.lv}">Rejouer</button><button class="qbt g" id="qz-lv">Changer de niveau</button></div></div>`}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('#qz-go,#qzgame button');if(!t)return;
  if(t.id==='qz-go')return qzLevels();
  if(t.id==='qz-x')return qzClose();
  if(t.id==='qz-lv')return qzLevels();
  if(t.dataset&&t.dataset.qlv)return qzStart(t.dataset.qlv);
  if(t.dataset&&t.dataset.qa!=null)return qzAnswer(+t.dataset.qa)});

/* ===== Style unifié des cartes Mini-jeux ===== */
const GCFG={
 qz:{l:'10 QUESTIONS • 3 NIVEAUX',t:'Qui est ce poisson ?',d:'Reconnais le poisson à partir de son illustration.',i:"<svg class=\"gsv\" viewBox=\"0 0 120 110\"  aria-hidden=\"true\"><defs><linearGradient id=\"qzg\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#ffe27a\"/><stop offset=\"1\" stop-color=\"#e59a00\"/></linearGradient></defs><rect x=\"8\" y=\"22\" width=\"104\" height=\"66\" rx=\"10\" fill=\"#0a1c4a\" stroke=\"#2d8fd6\" stroke-width=\"2.5\"/><path d=\"M24 56c14-20 34-22 52-6l18-12-6 18 6 18-18-12c-18 16-38 12-52-6z\" fill=\"url(#qzg)\"/><circle cx=\"36\" cy=\"52\" r=\"3.2\" fill=\"#06142f\"/><text x=\"96\" y=\"30\" font-size=\"26\" font-weight=\"800\" fill=\"#fff\" font-family=\"sans-serif\">?</text></svg>"},
 mm:{l:'6 PAIRES • 30 SECONDES',t:'Mémoire des cartes',d:'Retourne les cartes et retrouve les paires de poissons.',i:'<span class="gmem"><img src="mem-back.webp" alt=""><img src="mem-back.webp" alt=""></span>'},
 td:{l:'3 NIVEAUX • JUSQU’À 30 XP',t:'Trouve les différences',d:'Repère les différences entre deux illustrations.',i:"<svg class=\"gsv\" viewBox=\"0 0 120 110\"  aria-hidden=\"true\"><defs><linearGradient id=\"tdg\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#ffe27a\"/><stop offset=\"1\" stop-color=\"#e59a00\"/></linearGradient></defs><rect x=\"8\" y=\"18\" width=\"44\" height=\"64\" rx=\"7\" fill=\"#0a1c4a\" stroke=\"#2d8fd6\" stroke-width=\"2.5\"/><rect x=\"62\" y=\"18\" width=\"44\" height=\"64\" rx=\"7\" fill=\"#0a1c4a\" stroke=\"#2d8fd6\" stroke-width=\"2.5\"/><path d=\"M16 60c8-14 20-14 28 0-8 14-20 14-28 0z\" fill=\"#1d6fc0\"/><path d=\"M70 60c8-14 20-14 28 0-8 14-20 14-28 0z\" fill=\"#1d6fc0\"/><circle cx=\"92\" cy=\"40\" r=\"5\" fill=\"#ffd21e\"/><circle cx=\"62\" cy=\"66\" r=\"19\" fill=\"rgba(20,60,130,.55)\" stroke=\"url(#tdg)\" stroke-width=\"6\"/><path d=\"M76 80l16 18\" stroke=\"url(#tdg)\" stroke-width=\"8\" stroke-linecap=\"round\"/></svg>"},
 pz:{l:'3 NIVEAUX • PUZZLE DU JOUR',t:'Puzzle ÉCAILLE',d:'Reconstitue les illustrations de tes poissons préférés.',i:"<svg class=\"gsv\" viewBox=\"0 0 120 110\"  aria-hidden=\"true\"><defs><linearGradient id=\"pzg\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#ffe27a\"/><stop offset=\"1\" stop-color=\"#e59a00\"/></linearGradient></defs><rect x=\"14\" y=\"14\" width=\"92\" height=\"82\" rx=\"10\" fill=\"#0a1c4a\" stroke=\"#2d8fd6\" stroke-width=\"2.5\"/><path d=\"M14 55h92M45 14v82M76 14v82\" stroke=\"#2d8fd6\" stroke-width=\"2\" opacity=\".6\"/><rect x=\"47\" y=\"57\" width=\"27\" height=\"37\" rx=\"5\" fill=\"#06142f\"/><path d=\"M20 38c9-12 18-12 22 0-4 10-13 10-22 0z\" fill=\"#1d6fc0\"/><path d=\"M80 24c7-8 15-8 20 0-5 8-13 8-20 0z\" fill=\"url(#pzg)\"/><path d=\"M52 70h20M62 62v16\" stroke=\"url(#pzg)\" stroke-width=\"5\" stroke-linecap=\"round\"/></svg>"}};
(function(){const st=document.createElement('style');st.textContent=`
.gc{all:unset;box-sizing:border-box;position:relative;display:grid;grid-template-columns:76px 1fr;align-items:center;gap:12px;width:100%;min-height:clamp(150px,41vw,165px);padding:16px 14px 16px 12px;cursor:pointer;border-radius:22px;border:1.5px solid #e5b13c;background:radial-gradient(90% 160% at 100% 100%,rgba(40,130,255,.22),transparent 60%),linear-gradient(180deg,#0b1f4d,#050d26);box-shadow:0 0 0 1px rgba(255,190,50,.18),0 0 26px rgba(255,190,50,.28),inset 0 0 22px rgba(30,110,230,.18);-webkit-tap-highlight-color:transparent;overflow:hidden}
.gc:active{transform:scale(.99)}
.gc .gi{display:grid;place-items:center;width:100%}
.gc .gsv{width:100%;height:auto;display:block}
.gc .gmem{position:relative;display:block;width:100%;aspect-ratio:1/1}
.gc .gmem img{position:absolute;width:56%;top:12%;filter:drop-shadow(0 0 6px rgba(255,190,50,.6));border-radius:8%}
.gc .gmem img:first-child{left:0;transform:rotate(-9deg)}.gc .gmem img:last-child{right:0;transform:rotate(7deg)}
.gc .gd{display:none}
.gc .gt{display:block;min-width:0;padding-right:4px;margin-bottom:34px}
.gc .gt em{display:block;padding-right:38px;font:800 11px/1.2 sans-serif;font-style:normal;color:#ffc61a;letter-spacing:.04em}
.gc .gt b{display:block;margin:4px 0 5px;font:italic 800 clamp(18px,4.8vw,23px)/1.05 'Barlow Condensed',sans-serif;color:#fff}
.gc .gt span{display:block;color:#a9bbe0;font:400 clamp(13px,3.6vw,16px)/1.35 -apple-system,sans-serif}
.gc .gp{position:absolute;right:4%;bottom:16px;box-sizing:border-box;width:28%;height:clamp(32px,9.2vw,37px);display:flex;align-items:center;justify-content:center;gap:5px;border-radius:999px;background:linear-gradient(180deg,#ffd43a,#ffb000);color:#1b1300;font:800 clamp(14px,4.4vw,18px)/1 sans-serif}
.gc .gp small{font-size:.75em}
.gc.cap{cursor:default;filter:grayscale(.7) brightness(.55)}
.gc .gcap{position:absolute;inset:0;display:grid;place-content:center;text-align:center;color:#fff;font:italic 800 clamp(22px,6vw,34px)/1.1 'Barlow Condensed',sans-serif;text-transform:uppercase}
.gc .gcap small{display:block;margin-top:6px;font:600 15px sans-serif;text-transform:none;color:#ffd45e}
@media(min-width:600px){
 .gc{grid-template-columns:120px 1px 1fr 170px;gap:22px;min-height:120px;padding:14px 24px 14px 20px}
 .gc .gd{display:block;width:1px;height:72px;background:linear-gradient(180deg,transparent,rgba(255,255,255,.28),transparent)}
 .gc .gt{margin-bottom:0}.gc .gt em{padding-right:0;font-size:13px}
 .gc .gt b{font-size:30px;margin:5px 0 6px}.gc .gt span{font-size:17px}
 .gc .gp{position:static;width:100%;height:50px;font-size:21px;box-shadow:0 0 16px rgba(255,190,50,.45)}
 .gbulb{top:10px;right:10px}
}`;document.head.appendChild(st)})();
function gcHTML(k,cap,id){const c=GCFG[k];return `<button class="gc${cap?' cap':''}" ${cap?'disabled':'id="'+id+'"'} aria-label="Jouer à ${c.t}"><span class="gi">${c.i}</span><span class="gd"></span><span class="gt"><em>${c.l}</em><b>${c.t}</b><span>${c.d}</span></span>${cap?'<span class="gcap">Reviens demain<small>300 XP gagnés aujourd’hui</small></span>':'<span class="gp">JOUER <small>&#9654;&#xFE0E;</small></span>'}</button>`}
function gBulbs(){try{[['qz-go','qz'],['mm-go','mm'],['td-go','td'],['pz-go','pz']].forEach(([id,k])=>{let b=document.getElementById(id);if(!b){b=document.querySelector('#memgame button[disabled][aria-label*="'+({qz:'Qui est',mm:'Mémoire',td:'différences',pz:'Puzzle'})[k]+'"]')}
  if(!b||b.parentNode.classList.contains('gbw'))return;const cap=!!b.disabled,w=document.createElement('div');w.className='gbw';w.innerHTML=gcHTML(k,cap,id);b.parentNode.insertBefore(w,b);b.remove();
  const h=document.createElement('button');h.className='gbulb';h.dataset.help=k;h.setAttribute('aria-label','Comment jouer : '+GHELP[k].t);h.innerHTML=GBULB;w.appendChild(h)})}catch(_){}}
try{gBulbs()}catch(_){}

function gcMenu(){return [['qz','quiz','qz-go'],['mm','mem','mm-go'],['td','td','td-go'],['pz','pz','pz-go']].map(([k,g,id])=>`<div class="gbw">${gcHTML(k,mgUsed(g)>=300,id)}<button class="gbulb" data-help="${k}" aria-label="Comment jouer : ${GHELP[k].t}">${GBULB}</button></div>`).join('')}
try{if(location.hash==='#minijeux')renderMJ()}catch(_){}
(function(){const st=document.createElement('style');st.textContent='#tdgame .tdp svg,#pzgame .pzp svg,#qzgame .qp svg{width:24px;height:24px;flex:none}';document.head.appendChild(st)})();
