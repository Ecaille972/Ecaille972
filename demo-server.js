/* ÉCAILLE · VERSION DÉMO
   Faux serveur local : reprend les règles des fonctions Supabase (eco_open, eco_buy, eco_sell,
   eco_claim, eco_wheel, eco_s1_*, mg_*, push_save…) pour faire tourner le jeu sans connexion.
   Rien n'est envoyé au vrai serveur. La partie reste dans ce navigateur. */
(function(){
'use strict';
var SUPA='https://uclukztrbfkdynfozqnh.supabase.co';
window.ECAILLE_DEMO=true;

/* ---------- Données copiées de la base le 28/11/2026 ---------- */
// [id, famille, rareté, niveau mini, niveau de vague]
var CARDS=[[0,"recif","R",66,65],[1,"recif","C",65,65],[2,"recif","C",1,null],[3,"recif","C",65,65],[4,"recif","C",1,null],[5,"recif","C",1,null],[6,"recif","C",65,65],[7,"recif","C",65,65],[8,"recif","C",2,null],[9,"recif","C",65,65],[10,"recif","C",65,65],[11,"recif","C",66,65],[12,"recif","C",2,null],[13,"recif","C",2,null],[14,"recif","C",66,65],[15,"recif","C",3,null],[16,"recif","C",66,65],[17,"recif","C",66,65],[18,"recif","C",3,null],[19,"recif","C",66,65],[20,"recif","R",5,null],[21,"recif","C",4,null],[22,"recif","R",66,65],[23,"recif","R",67,65],[24,"recif","R",67,65],[25,"recif","R",8,null],[26,"recif","E",13,null],[27,"recif","E",67,65],[28,"recif","L",23,null],[29,"recif","L",30,null],[30,"large","C",1,null],[31,"large","C",1,null],[32,"large","C",55,55],[33,"large","C",1,null],[34,"large","C",55,55],[35,"large","C",55,55],[36,"large","C",2,null],[37,"large","C",55,55],[38,"large","C",2,null],[39,"large","C",2,null],[40,"large","C",55,55],[41,"large","R",5,null],[42,"large","C",55,55],[43,"large","C",3,null],[44,"large","C",56,55],[45,"large","C",56,55],[46,"large","C",3,null],[47,"large","C",56,55],[48,"large","C",56,55],[49,"large","C",56,55],[50,"large","C",56,55],[51,"large","R",56,55],[52,"large","R",57,55],[53,"large","R",8,null],[54,"large","C",4,null],[55,"large","C",4,null],[56,"large","E",13,null],[57,"large","E",17,null],[58,"large","E",57,55],[59,"large","L",23,null],[60,"requins","C",75,75],[61,"requins","C",25,null],[62,"requins","C",25,null],[63,"requins","C",25,null],[64,"requins","C",26,null],[65,"requins","C",26,null],[66,"requins","C",26,null],[67,"requins","C",75,75],[68,"requins","C",75,75],[69,"requins","C",27,null],[70,"requins","C",27,null],[71,"requins","C",28,null],[72,"requins","C",75,75],[73,"requins","C",75,75],[74,"requins","C",28,null],[75,"requins","C",28,null],[76,"requins","R",29,null],[77,"requins","C",76,75],[78,"requins","R",32,null],[79,"requins","R",76,75],[80,"requins","L",78,75],[81,"requins","R",76,75],[82,"requins","E",77,75],[83,"requins","R",35,null],[84,"requins","R",77,75],[85,"requins","R",77,75],[86,"requins","E",77,75],[87,"requins","E",78,75],[88,"requins","E",37,null],[89,"requins","L",47,null],[90,"abysses","C",50,null],[91,"abysses","C",50,null],[92,"abysses","C",95,95],[93,"abysses","C",95,95],[94,"abysses","C",50,null],[95,"abysses","C",51,null],[96,"abysses","C",51,null],[97,"abysses","C",95,95],[98,"abysses","C",95,95],[99,"abysses","C",95,95],[100,"abysses","C",96,95],[101,"abysses","C",51,null],[102,"abysses","C",52,null],[103,"abysses","C",52,null],[104,"abysses","C",96,95],[105,"abysses","C",53,null],[106,"abysses","C",53,null],[107,"abysses","C",53,null],[108,"abysses","C",96,95],[109,"abysses","C",54,null],[110,"abysses","R",54,null],[111,"abysses","R",96,95],[112,"abysses","R",96,95],[113,"abysses","R",57,null],[114,"abysses","E",97,95],[115,"abysses","E",98,95],[116,"abysses","E",99,95],[117,"abysses","L",98,95],[118,"abysses","L",72,null],[119,"abysses","L",79,null],[120,"douce","C",60,60],[121,"douce","C",60,60],[122,"douce","C",1,null],[123,"douce","C",1,null],[124,"douce","C",1,null],[125,"douce","C",60,60],[126,"douce","C",60,60],[127,"douce","C",61,60],[128,"douce","C",61,60],[129,"douce","C",2,null],[130,"douce","C",2,null],[131,"douce","C",2,null],[132,"douce","R",61,60],[133,"douce","C",3,null],[134,"douce","C",61,60],[135,"douce","C",61,60],[136,"douce","R",61,60],[137,"douce","R",5,null],[138,"douce","R",8,null],[139,"douce","R",11,null],[140,"douce","R",14,null],[141,"douce","E",62,60],[142,"douce","E",62,60],[143,"douce","E",63,60],[144,"douce","E",63,60],[145,"douce","E",64,60],[146,"douce","E",13,null],[147,"douce","L",63,60],[148,"douce","L",64,60],[149,"douce","L",23,null],[150,"recif","C",67,65],[151,"recif","C",4,null],[152,"recif","C",67,65],[153,"recif","C",67,65],[154,"recif","C",4,null],[155,"recif","C",5,null],[156,"recif","C",67,65],[157,"recif","C",5,null],[158,"recif","C",5,null],[159,"recif","C",6,null],[160,"recif","C",6,null],[161,"recif","C",67,65],[162,"recif","R",11,null],[163,"recif","R",68,65],[164,"recif","R",14,null],[165,"recif","E",17,null],[166,"recif","E",22,null],[167,"recif","E",68,65],[168,"recif","L",68,65],[169,"recif","L",69,65],[170,"large","C",57,55],[171,"large","C",4,null],[172,"large","C",5,null],[173,"large","C",57,55],[174,"large","C",57,55],[175,"large","C",5,null],[176,"large","C",5,null],[177,"large","C",57,55],[178,"large","C",6,null],[179,"large","C",6,null],[180,"large","C",57,55],[181,"large","C",57,55],[182,"large","R",11,null],[183,"large","R",58,55],[184,"large","R",14,null],[185,"large","E",58,55],[186,"large","E",59,55],[187,"large","E",22,null],[188,"large","L",30,null],[189,"large","L",58,55],[190,"requins","C",76,75],[191,"requins","C",76,75],[192,"requins","C",76,75],[193,"requins","C",29,null],[194,"requins","C",77,75],[195,"requins","C",29,null],[196,"requins","C",77,75],[197,"requins","C",29,null],[198,"requins","C",77,75],[199,"requins","C",30,null],[200,"requins","C",30,null],[201,"requins","C",77,75],[202,"requins","R",78,75],[203,"requins","R",38,null],[204,"requins","R",78,75],[205,"requins","E",41,null],[206,"requins","E",79,75],[207,"requins","E",46,null],[208,"requins","L",79,75],[209,"requins","L",54,null],[210,"abysses","C",96,95],[211,"abysses","C",54,null],[212,"abysses","C",96,95],[213,"abysses","C",97,95],[214,"abysses","C",54,null],[215,"abysses","C",55,null],[216,"abysses","C",97,95],[217,"abysses","C",97,95],[218,"abysses","C",55,null],[219,"abysses","C",97,95],[220,"abysses","R",60,null],[221,"abysses","R",63,null],[222,"abysses","R",97,95],[223,"abysses","R",97,95],[224,"abysses","R",98,95],[225,"abysses","E",62,null],[226,"abysses","E",66,null],[227,"abysses","E",71,null],[228,"abysses","L",99,95],[229,"abysses","L",100,95],[230,"douce","C",3,null],[231,"douce","C",62,60],[232,"douce","C",4,null],[233,"douce","C",4,null],[234,"douce","C",4,null],[235,"douce","C",62,60],[236,"douce","C",5,null],[237,"douce","C",62,60],[238,"douce","C",5,null],[239,"douce","C",5,null],[240,"douce","C",6,null],[241,"douce","C",6,null],[242,"douce","R",62,60],[243,"douce","R",62,60],[244,"douce","R",63,60],[245,"douce","E",17,null],[246,"douce","E",22,null],[247,"douce","E",64,60],[248,"douce","L",30,null],[249,"douce","L",65,60],[250,"crust","C",40,null],[251,"off_crust","C",85,null],[252,"crust","C",40,null],[253,"crust","C",40,null],[254,"crust","C",41,null],[255,"crust","C",41,null],[256,"crust","C",41,null],[257,"crust","C",42,null],[258,"crust","C",42,null],[259,"crust","C",43,null],[260,"crust","C",43,null],[261,"crust","C",43,null],[262,"crust","C",44,null],[263,"crust","C",44,null],[264,"crust","C",44,null],[265,"crust","C",45,null],[266,"crust","C",45,null],[267,"crust","R",44,null],[268,"off_crust","R",86,null],[269,"crust","R",47,null],[270,"off_crust","R",87,null],[271,"crust","R",50,null],[272,"crust","R",53,null],[273,"crust","E",52,null],[274,"crust","E",56,null],[275,"off_crust","E",87,null],[276,"crust","E",61,null],[277,"crust","L",62,null],[278,"crust","L",69,null],[279,"off_crust","L",88,null]]
  .map(function(c){return{id:c[0],set:c[1],r:c[2],min_l:c[3],w2:c[4]}});
var SETS=['recif','large','requins','abysses','douce','crust'];
var TERR=[['large','Grand Large',1],['douce','Eaux douces',1],['recif','Récifs exotiques',1],['requins','Requins & Raies',25],['crust','Crustacés & Mollusques',40],['abysses','Abysses',50]];
var OFFT={};try{OFFT=JSON.parse(localStorage.getItem('ecaille-demo-off')||'{}')||{}}catch(e){}
function PUBD(id){return !OFFT[id]}
var WAVES=[['large',55],['douce',60],['recif',65],['requins',75],['abysses',95]];
var PACK_PRICE=180;
var OFFERS=[{price:540,bonus:0,boosters:3},{price:900,bonus:90,boosters:5},{price:1530,bonus:270,boosters:10}];
var DQ=[[0,'o',3,0,1],[0,'r',1,30,0],[0,'n',5,40,0],[0,'s',1,20,0],[1,'o',2,25,0],[1,'n',3,30,0],[1,'d',2,25,0],[1,'r',2,0,1],[2,'o',4,0,1],[2,'n',6,50,0],[2,'s',2,30,0],[2,'d',3,30,0],[3,'o',3,35,0],[3,'r',1,35,0],[3,'n',4,0,1],[3,'d',2,25,0],[4,'o',5,0,1],[4,'r',2,55,0],[4,'s',1,20,0],[4,'n',5,40,0],[5,'o',4,35,0],[5,'r',3,0,1],[5,'n',6,60,0],[5,'s',3,40,0],[6,'o',5,50,0],[6,'n',8,70,0],[6,'d',4,40,0],[6,'r',2,0,1]]
  .map(function(q){return{day:q[0],kind:q[1],goal:q[2],pearls:q[3],boosters:q[4]}});
var WQ=[[0,0,'o',15,90,0],[0,1,'n',12,120,0],[0,2,'r',6,0,2],[1,0,'d',8,70,0],[1,1,'s',6,90,0],[1,2,'o',20,0,2],[2,0,'t',2,120,0],[2,1,'a',1,90,0],[2,2,'b',3,90,0],[2,3,'v',1,0,2]]
  .map(function(q){return{slot:q[0],variant:q[1],kind:q[2],goal:q[3],pearls:q[4],boosters:q[5]}});
var ACH=[[0,'owned',25,50,0],[1,'owned',50,100,0],[2,'owned',100,200,0],[3,'owned',280,0,5],[4,'albums',1,100,0],[5,'albums',3,0,2],[6,'albums',6,0,5],[7,'rare',1,30,0],[8,'epic',1,80,0],[9,'leg',1,0,1],[10,'nac',1,100,0],[11,'opened',10,30,0],[12,'opened',50,100,0],[13,'opened',100,0,1],[14,'opened',500,0,5],[15,'life:s',10,50,0],[16,'life:s',50,150,0],[17,'life:f',1,50,0],[18,'life:t',1,50,0],[19,'life:t',5,0,1],[20,'life:a',1,50,0],[21,'life:v',1,0,1],[22,'level',10,50,0],[23,'level',25,100,0],[24,'level',50,0,3]]
  .map(function(a){return{idx:a[0],kind:a[1],goal:a[2],pearls:a[3],boosters:a[4]}});
var LOGIN=[{day:1,kind:'p',val:10,rar:null},{day:2,kind:'xp',val:20,rar:null},{day:3,kind:'p',val:30,rar:null},{day:4,kind:'card',val:1,rar:'R'},{day:5,kind:'p',val:50,rar:null},{day:6,kind:'b',val:1,rar:null},{day:7,kind:'card',val:1,rar:'E'},{day:30,kind:'card',val:1,rar:'L'}];
var FAMOUS=[0,21,89,80,82,86,87,50,56,59,54,23,130,30,17,43,42,88,34,97,57,83,16,26,29,61,85,1,25,11,32,40];

/* ---------- Petits outils ---------- */
function N(o,k){var v=o&&o[k];return typeof v==='number'?Math.round(v):0}
function rnd(a){return a[Math.floor(Math.random()*a.length)]}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function clone(o){return JSON.parse(JSON.stringify(o))}
function ms(){return Date.now()}
function parisParts(){var f=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit',weekday:'short'}).formatToParts(new Date()),o={};f.forEach(function(p){o[p.type]=p.value});return o}
function DAY(){var p=parisParts();return p.year+'-'+p.month+'-'+p.day}
function DOW(){return ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].indexOf(parisParts().weekday)}
function mondayUTC(){var p=parisParts();return Date.UTC(+p.year,+p.month-1,+p.day)-DOW()*864e5}
function WK(){return new Date(mondayUTC()).toISOString().slice(0,10)}
function WEEKNUM(){return Math.round((mondayUTC()-3600e3)/6048e5)}
function LV(xp){var l=1,x=Math.max(xp||0,0);while(l<100&&x>=Math.round(50+l*30+l*l*1.2)){x-=Math.round(50+l*30+l*l*1.2);l++}return l}
function obj(v){return v&&typeof v==='object'&&!Array.isArray(v)}
function own(d,id){return N(d.col,String(id))>0}
function wave(c,lv){return c.w2==null||c.w2<=lv}

/* ---------- Règles du serveur ---------- */
function fresh(d){
  if(!obj(d.q)||d.q.day!==DAY())d.q={day:DAY(),o:0,r:0,n:0,s:0,d:0,c:{}};
  if(!obj(d.wk)||d.wk.k!==WK())d.wk={k:WK(),c:{}};
  ['life','ach','alb','nac'].forEach(function(k){if(!obj(d[k]))d[k]={}});
  return d}
function cnt(d,k,n){if(n<=0)return d;fresh(d);d.q[k]=N(d.q,k)+n;d.wk[k]=N(d.wk,k)+n;d.life[k]=N(d.life,k)+n;return d}
function addXp(d,n){if(n<=0)return d;d.xp=N(d,'xp')+n;var nl=LV(d.xp),fr=Math.max(N(d,'lvR'),1),p=N(d,'p'),b=N(d,'b');
  while(fr<nl){fr++;p+=20+(fr%5===0?30:0)+(fr%10===0?50:0);b+=fr%25===0?3:fr%5===0?1:0}
  d.p=p;d.b=b;d.lvR=Math.max(N(d,'lvR'),nl,1);return d}
function regen(d){var now=ms(),b=N(d,'b'),rg=obj(d.rg)?d.rg:{};if(rg.d!==DAY())rg={d:DAY(),n:0};var rn=N(rg,'n');
  var last=typeof d.last==='number'?d.last:null;if(last==null||last>now)last=now;
  if(b>=10||rn>=10)last=now;else{while(now-last>=3600000&&b<10&&rn<10){b++;rn++;last+=3600000}if(b>=10||rn>=10)last=now}
  d.b=b;d.last=last;d.rg={d:rg.d,n:rn};return d}
function unl(d){var un=(d.s1&&d.s1.un)||{};var r=TERR.filter(function(t){return PUBD(t[0])&&String(un[t[0]])==='1'}).map(function(t){return t[0]});return r.length?r:['large']}
function norm(d){
  var s1=obj(d.s1)?d.s1:{},un=obj(s1.un)?s1.un:{large:1},q=Array.isArray(s1.q)?s1.q:[],bs=obj(d.bs)?d.bs:{},lv=LV(N(d,'xp'));
  TERR.forEach(function(t){if(PUBD(t[0])&&String(un[t[0]]||'0')!=='1'&&lv>=t[2]){un[t[0]]=1;if(t[0]!=='large'){bs[t[0]]=N(bs,t[0])+1;if(t[2]>1)q.push(t[0])}}});
  WAVES.slice().sort(function(a,b){return a[1]-b[1]}).forEach(function(w){var ww=obj(s1.w)?s1.w:{};
    if(String(ww[w[0]]||'0')!=='1'&&lv>=w[1]&&String(un[w[0]]||'0')==='1'){ww[w[0]]=1;s1.w=ww;bs[w[0]]=N(bs,w[0])+1;q.push('w:'+w[0])}});
  s1.un=un;s1.q=q;d.s1=s1;var u=unl(d),b=N(d,'b');
  for(var i=0;i<b;i++){var z=rnd(u);bs[z]=N(bs,z)+1}
  d.b=0;d.bs=bs;return d}
function albums(d,lv){SETS.forEach(function(sid){
  if(N(d.alb,sid)===0&&!CARDS.some(function(c){return c.set===sid&&(lv==null||wave(c,lv))&&!own(d,c.id)})){
    d.alb[sid]=1;d.p=N(d,'p')+200;d.b=N(d,'b')+2;addXp(d,150)}})}
function takeCard(d,c){var cur=N(d.col,String(c.id)),isnew=cur===0;d.col[String(c.id)]=cur+1;
  if(isnew){cnt(d,'n',1);addXp(d,25)}else cnt(d,'d',1);
  if(c.r!=='C')cnt(d,'r',1);addXp(d,{R:15,E:40,L:100}[c.r]||0);return isnew}
function giveCard(d,rar){var lv=LV(N(d,'xp')),lvc=lv;if(typeof d.born==='number'&&ms()-d.born<864e5)lvc=Math.min(lv,4);
  var u=unl(d),pool=CARDS.filter(function(c){return c.r===rar&&c.min_l<=lvc&&u.indexOf(c.set)>=0&&wave(c,lv)});
  if(!pool.length)pool=CARDS.filter(function(c){return c.r===rar&&u.indexOf(c.set)>=0&&wave(c,lv)});
  if(!pool.length)pool=CARDS.filter(function(c){return c.min_l<=lvc&&u.indexOf(c.set)>=0&&wave(c,lv)});
  var c=rnd(pool),isnew=takeCard(d,c);albums(d,null);return{cid:c.id,isnew:isnew}}

/* ---------- Stockage local ---------- */
var DBK='ecaille-demo-db',DB=null;
try{DB=JSON.parse(localStorage.getItem(DBK)||'null')}catch(e){}
if(!DB)DB={save:null,rev:0};
function persist(){try{localStorage.setItem(DBK,JSON.stringify(DB))}catch(e){}}
function cur(){if(!DB.save)throw 'no_save';return fresh(regen(clone(DB.save)))}
function SAVE(d){norm(d);DB.save=d;DB.rev++;persist();return{ok:true,rev:DB.rev,data:clone(d)}}
function ext(a,b){for(var k in b)a[k]=b[k];return a}
function fail(e){return{ok:false,error:e}}
var PROT=['p','b','col','nac','xp','lvR','alb','ach','opened','last','rg','daily','born','q','mg','wh','pzd','lg','bs','s1'];
var SESS={};
function sid(){return 'demo-'+Math.random().toString(36).slice(2)}
function mgGrant(d,want,g){var day=DAY(),same=obj(d.mg)&&d.mg.d===day,gm=same&&obj(d.mg.g)?d.mg.g:{},used=same?N(gm,g):0,tot=same?N(d.mg,'xp'):0,gain=Math.max(0,Math.min(want,300-used));
  gm[g]=used+gain;d.mg={d:day,xp:tot+gain,g:gm};if(gain>0)addXp(d,gain);return gain}
function secs(s){return (ms()-s.created)/1000}

var RPC={
  get_me:function(){return{profile:{id:'demo',pseudo:'Démo'},inventory:[],config:{invite_required:false},server_time:new Date().toISOString()}},
  create_profile:function(){return{ok:true}},
  check_pseudo_available:function(){return true},
  load_save:function(){return DB.save?{found:true,rev:DB.rev,data:clone(DB.save)}:{found:false}},
  push_save:function(a){var p=a.p_data||{};
    if(!DB.save){var v=clone(p);PROT.concat(['wk','life','nw']).forEach(function(k){delete v[k]});
      ext(v,{p:100,b:0,col:{},nac:{},xp:0,lvR:1,alb:{},ach:{},opened:0,last:ms(),born:ms()-2*864e5,rg:{d:DAY(),n:0}});
      fresh(v);norm(v);DB.save=v;DB.rev=1;persist();return{ok:true,rev:1,data:clone(v)}}
    if(DB.rev!==(a.p_rev||0))return{ok:false,conflict:true,rev:DB.rev,data:clone(DB.save)};
    var s=DB.save,v2=clone(p);PROT.concat(['wk','life']).forEach(function(k){delete v2[k]});PROT.forEach(function(k){if(k in s)v2[k]=s[k]});
    if(obj(s.wk)){var sw=clone(s.wk),cw=p.wk;if(obj(cw)&&cw.k===sw.k)['t','a','b','v'].forEach(function(x){sw[x]=Math.min(Math.max(N(cw,x),N(sw,x)),50)});v2.wk=sw}
    var sl=obj(s.life)?clone(s.life):{},cl=p.life;if(obj(cl))['f','t','a','v'].forEach(function(x){sl[x]=Math.min(Math.max(N(cl,x),N(sl,x)),1000)});v2.life=sl;
    if('nw' in s&&!('nw' in p))v2.nw=s.nw;
    DB.save=v2;DB.rev++;persist();return{ok:true,rev:DB.rev,data:clone(v2)}},
  eco_regen:function(){return SAVE(cur())},
  eco_s1_info:function(){return ext(SAVE(cur()),{terr:TERR.map(function(t){return{id:t[0],n:t[1],lv:t[2],pub:PUBD(t[0])}})})},
  eco_daily:function(){var d=regen(clone(DB.save));if(d.daily===DAY())return fail('already_claimed');d.daily=DAY();d.b=N(d,'b')+1;return SAVE(fresh(d))},
  eco_open:function(a){var th=a.p_theme||'large';if(SETS.indexOf(th)<0)th='large';
    var d=norm(cur()),u=unl(d);if(u.indexOf(th)<0)return fail('locked');
    var b0=N(d.bs,th);if(b0<1)return fail('no_booster');
    var lvfrom=Math.max(N(d,'lvR'),1);d.bs[th]=b0-1;d.opened=N(d,'opened')+1;cnt(d,'o',1);addXp(d,10);
    var lv=LV(N(d,'xp'));if(typeof d.born==='number'&&ms()-d.born<864e5)lv=Math.min(lv,4);
    var others=u.filter(function(z){return z!==th}),zl=[],i,k;
    for(i=0;i<5;i++)zl.push(Math.random()<.55||!others.length?th:rnd(others));
    while(zl.filter(function(z){return z===th}).length<3){k=zl.findIndex(function(z){return z!==th});if(k<0)break;zl[k]=th}
    var rord=['L','E','R','C'],cards=[],bonus=0;
    zl.forEach(function(zone){var x=Math.random()*100,rr=x<87?'C':x<96.5?'R':x<99.5?'E':'L',c=null;
      for(var j=rord.indexOf(rr);j<4&&!c;j++){var pool=CARDS.filter(function(c0){return c0.set===zone&&c0.r===rord[j]&&c0.min_l<=lv});if(pool.length)c=rnd(pool)}
      if(!c){var p2=CARDS.filter(function(c0){return c0.set===zone&&c0.min_l<=lv});if(p2.length)c=rnd(p2)}
      if(!c){var p3=CARDS.filter(function(c0){return c0.set===zone&&wave(c0,lv)});c=rnd(p3)}
      var nac=Math.random()<1/30,isnew=takeCard(d,c);
      if(nac){d.nac[String(c.id)]=1;d.p=N(d,'p')+50;bonus+=50}
      cards.push({id:c.id,nac:nac,isNew:isnew})});
    albums(d,lv);
    return ext(SAVE(d),{cards:cards,bonus:bonus,lvfrom:lvfrom})},
  eco_buy:function(a){var d=cur(),p=N(d,'p');
    if(a.p_kind==='pack'){if(SETS.indexOf(a.p_key)<0)return fail('not_found');if(p<PACK_PRICE)return fail('not_enough_pearls');d.p=p-PACK_PRICE;d.bs=d.bs||{};d.bs[a.p_key]=N(d.bs,a.p_key)+1}
    else if(a.p_kind==='offer'){var o=OFFERS[parseInt(a.p_key,10)];if(!o)return fail('not_found');if(p<o.price)return fail('not_enough_pearls');d.p=p-o.price+o.bonus;d.b=N(d,'b')+o.boosters}
    else return fail('not_found');return SAVE(d)},
  eco_sell:function(a){var d=cur(),ids=a.p_ids||[],n=0,v=0;if(!ids.length||ids.length>200)return fail('invalid_card');
    ids.filter(function(x,i){return ids.indexOf(x)===i}).forEach(function(id){var c=CARDS[id];if(!c)return;var dup=N(d.col,String(id))-1;
      if(dup>0){n+=dup;v+=dup*({C:4,R:25,E:65,L:200}[c.r]);d.col[String(id)]=1}});
    if(!n)return fail('not_a_duplicate');d.p=N(d,'p')+v;cnt(d,'s',n);return ext(SAVE(d),{sold:n,gain:v})},
  eco_claim:function(a){var d=cur(),dow=DOW(),key=a.p_key,q;
    if(a.p_kind==='d'){
      if(key==='bonus'){if(d.q.c.bonus!=null)return fail('already_claimed');
        if(DQ.some(function(e){return e.day===dow&&d.q.c[e.kind]==null}))return fail('not_ready');
        d.q.c.bonus=1;d.b=N(d,'b')+(dow>=5?2:1);return SAVE(d)}
      q=DQ.find(function(e){return e.day===dow&&e.kind===key});if(!q)return fail('not_found');
      if(d.q.c[key]!=null)return fail('already_claimed');if(N(d.q,key)<q.goal)return fail('not_ready');
      d.q.c[key]=1;addXp(d,30);if(q.boosters>0)d.b=N(d,'b')+q.boosters;else d.p=N(d,'p')+q.pearls;return SAVE(d)}
    if(a.p_kind==='w'){
      if(key==='bonus'){if(d.wk.c.bonus!=null)return fail('already_claimed');if(!('0' in d.wk.c&&'1' in d.wk.c&&'2' in d.wk.c))return fail('not_ready');
        d.wk.c.bonus=1;d.b=N(d,'b')+3;return SAVE(d)}
      var sl=parseInt(key,10);if(!(sl>=0&&sl<=2))return fail('not_found');
      var vs=WQ.filter(function(w){return w.slot===sl}),w=vs.find(function(x){return x.variant===(WEEKNUM()+sl*2)%vs.length});
      if(!w)return fail('not_found');if(d.wk.c[String(sl)]!=null)return fail('already_claimed');if(N(d.wk,w.kind)<w.goal)return fail('not_ready');
      d.wk.c[String(sl)]=1;addXp(d,60);if(w.boosters>0)d.b=N(d,'b')+w.boosters;else d.p=N(d,'p')+w.pearls;return SAVE(d)}
    if(a.p_kind==='a'){var ac=ACH.find(function(x){return x.idx===parseInt(key,10)});if(!ac)return fail('not_found');
      if(d.ach[String(ac.idx)]!=null)return fail('already_claimed');
      var mine=CARDS.filter(function(c){return own(d,c.id)}),val=0;
      if(ac.kind==='owned')val=mine.length;else if(ac.kind==='albums')val=SETS.filter(function(s){return N(d.alb,s)>0}).length;
      else if(ac.kind==='rare'||ac.kind==='epic'||ac.kind==='leg'){var rr={rare:'R',epic:'E',leg:'L'}[ac.kind];val=mine.filter(function(c){return c.r===rr}).length}
      else if(ac.kind==='nac')val=Object.keys(d.nac).length;else if(ac.kind==='opened')val=N(d,'opened');else if(ac.kind==='level')val=LV(N(d,'xp'));
      else if(ac.kind.indexOf('life:')===0)val=N(d.life,ac.kind.slice(5));
      if(val<ac.goal)return fail('not_ready');d.ach[String(ac.idx)]=1;addXp(d,30);if(ac.boosters>0)d.b=N(d,'b')+ac.boosters;else d.p=N(d,'p')+ac.pearls;return SAVE(d)}
    return fail('not_found')},
  eco_login_info:function(){var d=DB.save;if(!d)throw 'no_save';var lg=obj(d.lg)?d.lg:{},n=N(lg,'n'),claimed=(lg.d||'')===DAY();
    return{ok:true,today:DAY(),claimed:claimed,n:n,day:claimed?(n-1)%7+1:n%7+1,rewards:LOGIN.filter(function(r){return r.day<=7}),
      loyalty:(function(r){return{need:r.day,kind:r.kind,val:r.val,rar:r.rar}})(LOGIN[7]),legend:N(lg,'l')}},
  eco_login_claim:function(){var d=cur(),lg=obj(d.lg)?d.lg:{};if(lg.d===DAY())return fail('already_claimed');
    var n=N(lg,'n')+1,dnum=(n-1)%7+1,rw=LOGIN.find(function(r){return r.day===dnum}),g={cid:null,isnew:false},leg=null;
    function apply(r){if(r.kind==='p')d.p=N(d,'p')+r.val;else if(r.kind==='b')d.b=N(d,'b')+r.val;else if(r.kind==='xp')addXp(d,r.val);
      else{var x;for(var i=0;i<Math.max(r.val,1);i++)x=giveCard(d,r.rar||'R');return x}return{cid:null,isnew:false}}
    g=apply(rw);var lw=LOGIN[7];if(n>=lw.day&&N(lg,'l')===0){var g2=apply(lw);leg={card:g2.cid,isNew:!!g2.isnew};lg.l=1}
    lg.d=DAY();lg.n=n;d.lg=lg;
    return ext(SAVE(d),{day:dnum,kind:rw.kind,val:rw.val,card:g.cid,isNew:!!g.isnew,legend:leg})},
  eco_wheel:function(){var d=cur();if(d.wh===DAY())return fail('already_claimed');
    var kinds=['card','p','xp','card','p','xp','card','p','card','xp','card','p','p','xp','p','p'],vals=[0,10,40,0,20,100,0,10,0,40,0,20,1000,100,500,30],
      rars=['L',null,null,'C',null,null,'R',null,'E',null,null,null,null,null,null,null],wts=[2,6,7,22,7,3,6,6,4,7,8,7,1,3,3,8];
    var tot=wts.reduce(function(a,b){return a+b},0),x=1+Math.floor(Math.random()*tot),acc=0,idx=0;
    for(var i=0;i<wts.length;i++){acc+=wts[i];idx=i;if(x<=acc)break}
    d.wh=DAY();var cid=null,isnew=false;
    if(kinds[idx]==='p')d.p=N(d,'p')+vals[idx];else if(kinds[idx]==='xp')addXp(d,vals[idx]);
    else{var lv=LV(N(d,'xp')),u=unl(d),pool=CARDS.filter(function(c){return (rars[idx]==null||c.r===rars[idx])&&u.indexOf(c.set)>=0&&wave(c,lv)});
      var c=rnd(pool);cid=c.id;isnew=takeCard(d,c);albums(d,null)}
    return ext(SAVE(d),{idx:idx,card:cid,isNew:isnew})},
  eco_s1_ack:function(){var d=cur();if(d.s1&&Array.isArray(d.s1.q)&&d.s1.q.length)d.s1.q=d.s1.q.slice(1);return SAVE(d)},
  eco_s1_intro:function(){var d=norm(cur());if(N(d.s1,'intro')===1)return fail('already_claimed');d.s1.intro=1;d.bs.large=N(d.bs,'large')+1;return SAVE(d)},
  eco_s1_claim:function(a){var parts=String(a.p_key||'').split(':'),z=parts[0],k=parts[1]||'',d=norm(cur());
    if(unl(d).indexOf(z)<0)return fail('locked');if(N(d.s1.ch||{},a.p_key)===1)return fail('already_claimed');
    var lv=LV(N(d,'xp')),inz=CARDS.filter(function(c){return c.set===z&&wave(c,lv)}),o=inz.filter(function(c){return own(d,c.id)}).length,need,got,rp=0,rx=0,rb=0;
    if(k==='sp10'){need=10;got=o;rp=100}else if(k==='half'){need=Math.ceil(inz.length/2);got=o;rb=1}else if(k==='full'){need=inz.length;got=o;rb=3;rp=500}
    else if(k==='rare'||k==='epic'||k==='leg'){need=1;var rr={rare:'R',epic:'E',leg:'L'}[k];got=inz.filter(function(c){return c.r===rr&&own(d,c.id)}).length;
      if(k==='rare')rx=100;else if(k==='epic'){rp=150;rx=150}else{rp=300;rx=250}}
    else return fail('not_found');
    if(got<need)return fail('not_ready');d.s1.ch=d.s1.ch||{};d.s1.ch[a.p_key]=1;if(rp)d.p=N(d,'p')+rp;if(rb)d.bs[z]=N(d.bs,z)+rb;if(rx)addXp(d,rx);return SAVE(d)},
  /* mini-jeux */
  mg_td_new:function(a){if(['easy','normal','hard'].indexOf(a.p_lv)<0)return fail('not_found');var id=sid();SESS[id]={g:'td',lv:a.p_lv,created:ms()};return{ok:true,sid:id}},
  mg_td_finish:function(a){var s=SESS[a.p_sid];if(!s||s.g!=='td'||s.done)return fail('not_found');s.done=1;
    var k={easy:3,normal:5,hard:7}[s.lv],lim={easy:90,normal:60,hard:45}[s.lv],want={easy:10,normal:20,hard:30}[s.lv],t=secs(s);
    if(a.p_found!==k||t<k*1.5||t>lim+20)return fail('invalid');var d=fresh(clone(DB.save)),gain=mgGrant(d,want,'td');return ext(SAVE(d),{gain:gain,want:want})},
  mg_pz_new:function(a){if(['easy','normal','hard'].indexOf(a.p_lv)<0)return fail('not_found');var id=sid();SESS[id]={g:'pz',lv:a.p_lv,daily:!!a.p_daily,created:ms()};return{ok:true,sid:id}},
  mg_pz_finish:function(a){var s=SESS[a.p_sid];if(!s||s.g!=='pz'||s.done)return fail('not_found');s.done=1;
    var n={easy:3,normal:4,hard:5}[s.lv],base={easy:10,normal:20,hard:30}[s.lv],par={easy:45,normal:120,hard:300}[s.lv],t=secs(s),want;
    if(a.p_moves==null||a.p_moves<3||a.p_moves>5000||t<n*n*0.8||t>7200)return fail('invalid');
    var d=fresh(clone(DB.save));if(s.daily){if(d.pzd===DAY())want=0;else{want=15;d.pzd=DAY()}}else want=base;
    if(want>0&&t<=par)want+=5;var gain=mgGrant(d,want,'pz');return ext(SAVE(d),{gain:gain,want:want,daily:s.daily})},
  mg_mem_new:function(a){if(a.p_pairs!==6)return fail('not_found');var ids=shuffle(CARDS.filter(function(c){return c.id!==227}).map(function(c){return c.id})).slice(0,6),id=sid();
    SESS[id]={g:'mem',pairs:6,created:ms()};return{ok:true,sid:id,cards:ids}},
  mg_mem_finish:function(a){var s=SESS[a.p_sid];if(!s||s.g!=='mem'||s.done)return fail('not_found');s.done=1;var t=secs(s);
    if(a.p_moves==null||a.p_moves<s.pairs||a.p_moves>200||t<s.pairs*1.5||t>45)return fail('invalid');
    var d=fresh(clone(DB.save)),gain=mgGrant(d,15,'mem');return ext(SAVE(d),{gain:gain,want:15})},
  mg_quiz_new:function(a){var lv=a.p_lv||'normal';if(['easy','normal','hard'].indexOf(lv)<0)return fail('not_found');
    var base=CARDS.filter(function(c){return c.id!==227&&(lv!=='easy'||FAMOUS.indexOf(c.id)>=0)});
    var qs=shuffle(base).slice(0,10).map(function(c){var rest=shuffle(base.filter(function(x){return x.id!==c.id}));
      if(lv==='hard')rest.sort(function(x,y){function sc(z){return z.set===c.set&&z.r===c.r?0:z.set===c.set?1:2}return sc(x)-sc(y)});
      return{c:c.id,o:shuffle([c.id].concat(rest.slice(0,3).map(function(x){return x.id})))}});
    var id=sid();SESS[id]={g:'quiz',qs:qs,n:0,ok:0,created:ms()};return{ok:true,sid:id,qs:qs.map(function(q){return{c:q.c,o:q.o}})}},
  mg_quiz_answer:function(a){var s=SESS[a.p_sid];if(!s||s.g!=='quiz'||s.done)return fail('not_found');
    if(a.p_q!==s.n||s.n>=10)return fail('not_found');var q=s.qs[s.n],right=q.c;
    if(a.p_choice==null||(a.p_choice!==-1&&q.o.indexOf(a.p_choice)<0))return fail('not_found');
    var good=a.p_choice===right;if(good)s.ok++;s.n++;if(s.n>=10)s.done=1;
    var res={ok:true,good:good,answer:right,n:s.n,right:s.ok,done:s.n>=10};
    if(s.n>=10){var want=[5,5,5,5,10,10,10,20,20,20,30][s.ok];if(secs(s)<12)want=0;var d=fresh(clone(DB.save)),gain=mgGrant(d,want,'quiz');ext(res,SAVE(d));ext(res,{gain:gain,want:want})}
    return res}
};
var DEMO_OFF=/^(mk_|fr_|tr_|get_leaderboard|report_stats|send_feedback)/;

/* ---------- Faux réseau : on intercepte les appels vers Supabase ---------- */
var realFetch=window.fetch?window.fetch.bind(window):null;
function reply(status,body){return new Promise(function(res){setTimeout(function(){
  res(new Response(body===undefined?'':JSON.stringify(body),{status:status,headers:{'Content-Type':'application/json'}}))},90)})}
window.fetch=function(url,opt){
  var u=typeof url==='string'?url:(url&&url.url)||'';
  if(u.indexOf(SUPA)!==0)return realFetch?realFetch(url,opt):Promise.reject(new Error('offline'));
  var path=u.slice(SUPA.length),args={};try{args=opt&&opt.body?JSON.parse(opt.body):{}}catch(e){}
  if(path.indexOf('/auth/v1/')===0)return reply(200,{access_token:'demo',refresh_token:'demo',expires_in:31536000,user:{email:'demo@ecaille.games'}});
  var m=path.match(/^\/rest\/v1\/rpc\/([a-z0-9_]+)/),fn=m&&m[1];
  if(fn&&DEMO_OFF.test(fn))return reply(200,{ok:false,error:'demo'});
  if(!fn||!RPC[fn])return reply(404,{message:'not_found'});
  try{return reply(200,RPC[fn](args||{}))}catch(e){return reply(400,{message:typeof e==='string'?e:'error'})}
};

/* session démo : le joueur est connecté d'office */
try{if(!localStorage.getItem('ecaille-auth'))localStorage.setItem('ecaille-auth',JSON.stringify({access_token:'demo',refresh_token:'demo',expires_at:Math.floor(Date.now()/1000)+31536000,email:'demo@ecaille.games'}))}catch(e){}

/* ---------- Panneau d'essai (comme la version d'essai #5) ---------- */
function refresh(){try{ecoCall('eco_regen').then(function(){try{renderAll()}catch(e){}})}catch(e){}}
function xpFor(L){var x=0;for(var l=1;l<L;l++)x+=Math.round(50+l*30+l*l*1.2);return x}
function tool(k,v){if(!DB.save)return;var d=clone(DB.save);d.s1=d.s1||{};
  if(k==='lv'){d.xp=xpFor(+v);d.lvR=+v}
  else if(k==='p')d.p=N(d,'p')+500;
  else if(k==='b')d.b=N(d,'b')+5;
  else if(k==='xp')addXp(d,500);
  else if(k==='pub'){OFFT[v]=!OFFT[v];if(v==='large')OFFT.large=false;try{localStorage.setItem('ecaille-demo-off',JSON.stringify(OFFT))}catch(e){}
    if(OFFT[v]&&d.s1.un){d.s1.un[v]=0;d.s1.q=(d.s1.q||[]).filter(function(q){return q!==v&&q!=='w:'+v})}}
  else if(k==='intro'){d.s1.intro=0}
  else if(k==='unl'){var u=unl(d).filter(function(z){return z!=='large'});d.s1.q=(d.s1.q||[]).concat([u.length?u[u.length-1]:'douce'])}
  else if(k==='fd'){d.s1.founder=N(d.s1,'founder')?0:1}
  SAVE(d);refresh();
  if(k==='intro'||k==='fd'||k==='unl'){setTimeout(function(){try{var un=document.getElementById('u-name');if(un)un.dataset.f=''}catch(e){}try{renderAll()}catch(e){}},400)}}
function reset(){if(!confirm('Tout remettre à zéro ?'))return;DB={save:null,rev:0};persist();try{['ecaille-v5','ecaille-v5-backup','ecaille-demo-off','s1-seen'].forEach(function(k){localStorage.removeItem(k)})}catch(e){}location.reload()}
function esc(x){return String(x).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function html(){var s1=(DB.save&&DB.save.s1)||{};
  return '<h4>Panneau d’essai</h4><p>Version d’essai : rien de tout ça n’existe dans le vrai jeu.</p>'+
  '<div class="rw">'+[1,9,10,19,20,25,30,40,50,55,60,65,75,95,100].map(function(l){return '<button data-d="lv:'+l+'">Niv. '+l+'</button>'}).join('')+'</div><div class="sep"></div>'+
  '<div class="rw"><button data-d="p">+500 perles</button><button data-d="b">+5 boosters offerts</button><button data-d="xp">+500 XP</button></div><div class="sep"></div>'+
  '<p>Territoires publiés (activer / désactiver). Désactiver le remet à « Bientôt disponible ».</p><div class="rw">'+
  TERR.map(function(t){return '<button data-d="pub:'+t[0]+'" class="'+(PUBD(t[0])?'on':'')+'">'+esc(t[1])+'</button>'}).join('')+'</div><div class="sep"></div>'+
  '<div class="rw"><button data-d="intro">Revoir l’intro</button><button data-d="unl">Rejouer un déblocage</button><button data-d="fd" class="'+(N(s1,'founder')?'on':'')+'">Titre fondateur</button><button data-d="rs">Tout remettre à zéro</button></div>'}
function panel(){
  var css=document.createElement('style');
  css.textContent='#s1d-b{position:fixed;left:12px;bottom:84px;z-index:2147483600;font:800 12px/1 system-ui,sans-serif;letter-spacing:.04em;background:#1a0d14;color:#ff6b81;border:1px solid #ff4d6d;border-radius:14px;padding:8px 12px;min-height:30px;cursor:pointer}#s1d{display:none;position:fixed;left:12px;bottom:124px;z-index:2147483600;width:min(370px,calc(100vw - 24px));max-height:calc(100vh - 150px);overflow:auto;background:#0d1626;color:#fff;border:1px solid #ff4d6d;border-radius:14px;padding:14px;font:500 13px/1.4 system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.55)}#s1d.on{display:block}#s1d h4{margin:0 0 4px;color:#ff6b81;font-size:15px}#s1d p{margin:0 0 10px;opacity:.85;font-size:12px}#s1d .rw{display:flex;flex-wrap:wrap;gap:6px}#s1d .sep{height:1px;background:rgba(255,255,255,.12);margin:12px 0}#s1d button{min-height:34px;padding:0 10px;border-radius:9px;border:1px solid rgba(255,255,255,.2);background:#16223a;color:#fff;font:700 12px system-ui,sans-serif;cursor:pointer}#s1d button.on{background:#ffb020;color:#111;border-color:#ffb020}';
  document.head.appendChild(css);
  var b=document.createElement('button');b.id='s1d-b';b.type='button';b.textContent='ESSAI';
  var d=document.createElement('div');d.id='s1d';
  b.onclick=function(){d.innerHTML=html();d.classList.toggle('on')};
  d.onclick=function(e){var x=e.target.closest&&e.target.closest('[data-d]');if(!x)return;var kv=x.dataset.d.split(':');
    if(kv[0]==='rs')return reset();tool(kv[0],kv[1]);setTimeout(function(){d.innerHTML=html()},150);if(kv[0]==='intro'||kv[0]==='unl')d.classList.remove('on')};
  document.body.appendChild(b);document.body.appendChild(d);
  try{MKERR.demo='Pas disponible dans la version d’essai (il faut le vrai serveur).'}catch(e){}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',panel);else panel();
})();
