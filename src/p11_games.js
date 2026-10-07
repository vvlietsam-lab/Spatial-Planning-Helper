/* ================= Games: retrieval practice that feels like play ================= */
I.spark='<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>';
I.heart='<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>';
I.bolt='<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>';
S.games=S.games||{};
let GW="",G=null;
const isP=()=>course==="psc";
const NR=id=>{if(!isPSC(id))return R[id];const l=PSC.find(x=>x.id===id);return {id,title:"L"+l.n+" · "+l.title,concepts:l.man.concepts||[],quotes:l.man.quotes||[],one:l.man.one,wk:l.theme,cite:l.man.cite};};
const lab=id=>{if(isPSC(id)){const l=PSC.find(x=>x.id===id);return "L"+l.n+" · "+(l.man.cite.split(")")[0]+")");}const t=R[id].title.replace(/^Course framework \+ /,"");return t.length>58?t.slice(0,56)+"…":t;};
const surname=id=>{const t=isPSC(id)?PSC.find(x=>x.id===id).man.cite:R[id].title.replace(/^Course framework \+ /,"");return (t.match(/^[A-ZÀ-Ž][\wÀ-ž'’-]+/)||[""])[0];};
const mask=(txt,id)=>{const s=surname(id);return s&&s.length>2?txt.replace(new RegExp(s,"g"),"▇▇▇"):txt;};
function gIds(){if(isP())return PSC.filter(l=>!GW||l.theme===+GW.slice(1)).map(l=>l.id);
  return (GW?READINGS.filter(r=>r.wk===+GW.slice(1)):BR()).map(r=>r.id);}
const gTag=()=>isP()?(GW?"Theme "+GW.slice(1):"All lectures"):(GW?"Week "+GW.slice(1):(Date.now()<EXAM?"Midterm (W1–4)":"All weeks"));
function distract(id,pool,n){const wk=NR(id).wk;const same=shuffle(pool.filter(x=>x!==id&&NR(x).wk===wk)),other=shuffle(pool.filter(x=>x!==id&&NR(x).wk!==wk));
  let out=same.concat(other).slice(0,n);if(out.length<n){const all=isP()?PSC.map(l=>l.id):READINGS.map(r=>r.id);out=out.concat(shuffle(all.filter(x=>x!==id&&!out.includes(x))).slice(0,n-out.length));}return out;}
const cleanQ=q=>q.replace(/\s*\((?:[^()]*\d[^()]*)\)\s*$/,"").replace(/^["“'\s]+|["”'\s]+$/g,"");
const mcRound=(t,prompt,o,a,e,extra)=>Object.assign({k:"mc",t,prompt,o,a,e},extra||{});
function optsFor(id,ids){const ds=distract(id,ids,3);const o=shuffle([id,...ds]);return {o:o.map(lab),a:o.indexOf(id)};}
function whoRounds(ids,n){const items=[];
  ids.forEach(id=>{const r=NR(id);(r.quotes||[]).forEach(q=>{const c=cleanQ(q);if(c.length>25)items.push({id,kind:"quote",txt:"“"+mask(c,id)+"”"});});
    (r.concepts||[]).forEach(([a,b])=>{if(b&&b.length>30)items.push({id,kind:"idea",txt:mask(a+": "+b,id)});});});
  (typeof MG!=="undefined"?MG.WHO:[]).filter(x=>ids.includes(x.t)).forEach(x=>items.push({id:x.t,kind:x.kind,txt:x.kind==="quote"?"“"+mask(cleanQ(x.txt),x.t)+"”":mask(x.txt,x.t)}));
  items.forEach(x=>{x.t=x.id;x.k=gk("w",x.txt);});
  return gpick(items,n).map(x=>{const {o,a}=optsFor(x.id,ids);const r=NR(x.id);
    return mcRound(x.id,x.kind==="quote"?"Who wrote or said this?":"Whose idea is this?",o,a,`${lab(x.id)}: ${(r.one||"").slice(0,240)}${(r.one||"").length>240?"…":""}`,{quote:x.txt,w:.8,link:x.id});});}
const GQ=[...(typeof GQ_1!=="undefined"?[...GQ_1,...GQ_2,...GQ_3,...GQ_4]:[]),...(typeof MG!=="undefined"?MG.GQX:[])].map(q=>({...q,k:"g"+hash(q.q)}));
/* every game bank: least-seen first (shared memory S.gseen), options reshuffled every time */
const gk=(p,txt)=>p+hash(txt);
function gpick(pool,n){S.gseen=S.gseen||{};const out=fresh(pool,n);out.forEach(x=>S.gseen[x.k]=(S.gseen[x.k]||0)+1);return out;}
function shufMC(o,a){const perm=shuffle(o.map((_,i)=>i));return {o:perm.map(i=>o[i]),a:perm.indexOf(a)};}
const GTYPE={misread:"Spot the misreading",contrast:"Compare the authors",apply:"Mini-case",quote:"Read the quote",position:"Framework position",consequence:"What follows?",not:"Which is NOT"};
/* game-only bank: never the quiz questions; least-seen questions first so repeats are rare */
/* games: own bank + the hard bank, least-seen across quiz and games, answers reshuffled every time */
function gqRounds(ids,n){S.gseen=S.gseen||{};const pool=[...GQ,...HQS.filter(q=>q.lv===3)].filter(q=>ids.includes(q.t));
  const out=fresh(pool,n);out.forEach(q=>S.gseen[q.k]=(S.gseen[q.k]||0)+1);
  return out.map(q=>{const perm=shuffle([0,1,2,3]);return mcRound(q.t,q.q,perm.map(i=>q.o[i]),perm.indexOf(q.a),q.e,{w:1,d:q.lv?DLV[q.lv]:.6,qtype:GTYPE[q.type]||FMTL[q.fmt]||"",link:q.t});});}
function mcqRounds(ids,n){return fresh(QS.filter(q=>ids.includes(q.t)),n).map(permQ).map(q=>mcRound(q.t,q.q,q.o,q.a,q.e,{mcq:q}));}
function lensRounds(ids,n){let p=LENS.filter(x=>ids.includes(x.t));if(p.length<Math.min(n,4))p=LENS.filter(x=>BR().some(r=>r.id===x.t));p.forEach(x=>x.k=x.k||gk("l",x.s+x.q));return gpick(p,n).map(x=>{const m=shufMC(x.o,x.a);return mcRound(x.t,x.q,m.o,m.a,x.e,{scen:x.s,w:1.2,d:.6,link:x.t});});}
function oddRounds(n){const w=GW?+GW.slice(1):null,P=isP();const B=ODD.filter(x=>!!x.psc===P);let p=B.filter(x=>w?x.w===w:(P||Date.now()>=EXAM?true:x.w<=4));if(p.length<2)p=B.filter(x=>x.w===0||(w?Math.abs(x.w-w)<=1:true));
  p.forEach(x=>x.k=x.k||gk("o",x.items.join("|")));return gpick(p,n).map(x=>{const m=shufMC(x.items,x.odd);return mcRound(null,"Which one doesn't belong?",m.o,m.a,x.e,{odd:1});});}
function seqRounds(ids,n){let p=SEQ.filter(x=>ids.includes(x.t));if(!p.length)p=SEQ.filter(x=>BR().some(r=>r.id===x.t));p.forEach(x=>x.k=x.k||gk("s",x.title+x.steps.join("|")));return gpick(p,n).map(x=>({k:"seq",t:x.t,title:x.title,steps:x.steps,e:x.e,pool:shuffle(x.steps.map((s,i)=>i)),order:[],checked:false,link:x.t}));}

const GAMES=[
 {id:"boss",name:"Week Boss",tag:"Interleaved · cumulative",desc:"A boss fight across one week's readings: quiz, quotes, scenarios, sequences. Three hearts; land enough hits before you run out.",why:"Interleaving different question types and readings trains you to pick the right theory, the exact skill an exam tests (Rohrer & Taylor 2007).",hue:350,bpt:1,psc:0},
 {id:"lens",name:"Theorist's Lens",tag:"Transfer · application",desc:"A real-world planning case lands on your desk. Which theory reads it how? Built for the open questions.",why:"Applying ideas to new cases builds far transfer; practising with varied examples beats re-reading definitions (Barnett & Ceci 2002).",hue:210,bpt:1,psc:0},
 {id:"who",name:"Whose Line Is It?",tag:"Discrimination · quotes",desc:"A quote or an idea, author names blanked out. Whose is it? Streaks multiply your score.",why:"Telling similar authors apart (discrimination) is learned best by mixing them, not by studying one at a time (Kornell & Bjork 2008).",hue:270,bpt:1,psc:1},
 {id:"bets",name:"Confidence Bets",tag:"Metacognition",desc:"Answer, then stake 1–3 chips on how sure you are. Find out where you're overconfident before the exam does.",why:"Confident errors that get corrected stick unusually well (hypercorrection, Butterfield & Metcalfe 2001); calibration tells you what to restudy.",hue:40,bpt:1,psc:0},
 {id:"blurt",name:"Brain Dump",tag:"Free recall",desc:"Pick a reading, write everything you remember in 3 minutes, then see which key concepts you hit and which you missed.",why:"Free recall is the strongest form of retrieval practice, stronger than recognising answers (Karpicke & Roediger 2008).",hue:160,bpt:1,psc:1},
 {id:"compass",name:"Theory Compass",tag:"The course framework",desc:"Place a theory on the five framework sliders yourself, then compare with the key. The course's own lens, made physical.",why:"Generating an answer before seeing it (generation effect) and explaining why (elaborative interrogation) deepen understanding (Dunlosky et al. 2013).",hue:190,bpt:1,psc:0},
 {id:"pairs",name:"Concept Pairs",tag:"Speed · fluency",desc:"Six concepts, six definitions, from mixed readings. Match them against the clock without slipping.",why:"Quick cued recall across readings builds fluent access to the vocabulary you need under time pressure.",hue:120,bpt:1,psc:1},
 {id:"chain",name:"Chain Reaction",tag:"Causal sequences",desc:"Rebuild an argument or a history step by step: Hayek's slide to dictatorship, Sorensen's critical juncture, Hall's eras.",why:"Ordering causes and stages forces you to rebuild the argument's logic rather than recognise fragments.",hue:20,bpt:1,psc:0},
 {id:"odd",name:"Odd One Out",tag:"Categories",desc:"Four authors, concepts or claims. One doesn't belong. Spot it, then say why before you look.",why:"Comparing items within and across categories sharpens the boundaries between theories (category learning by contrast).",hue:300,bpt:1,psc:0}
];
const BOSS={w1:"The Definition Sphinx",w2:"The Leviathan of Structure",w3:"The Rational Planner",w4:"The Path-Dependent Golem",w6:"The Entrepreneurial City",w7:"The Panopticon",m:"The Midterm"};

function startGame(id,opt,noGo){const ids=gIds();if(!ids.length){toast("Nothing in this selection");return;}
  G={id,ids,i:0,picked:null,res:[],score:0,streak:0,best:0,started:Date.now(),done:false};
  if(id==="who")G.rounds=whoRounds(ids,10);
  if(id==="lens")G.rounds=lensRounds(ids,8);
  if(id==="bets"){G.rounds=gqRounds(ids,10);G.stake=0;G.bets=[];}
  if(id==="odd")G.rounds=oddRounds(8);
  if(id==="chain")G.rounds=seqRounds(ids,4);
  if(id==="boss"){const r=[...gqRounds(ids,5),...whoRounds(ids,3),...lensRounds(ids,2),...oddRounds(1),...seqRounds(ids,1)];G.rounds=shuffle(r);G.hearts=3;G.hp=100;G.dmg=100/Math.ceil(G.rounds.length*.7);G.boss=BOSS[GW||"m"]||"The Final Boss";}
  if(id==="pairs"){const all=[...ids.flatMap(t=>(NR(t).concepts||[]).filter(x=>x[1]).map(c=>({t,c}))),...(typeof MG!=="undefined"?MG.PAIRS:[]).filter(p=>ids.includes(p.t)).map(p=>({t:p.t,c:[p.term,p.def]}))];
    all.forEach(x=>x.k=gk("p",x.c[0]));const seenT=new Set();S.gseen=S.gseen||{};let pick=fresh(all,60).filter(x=>{const key=x.c[0].toLowerCase();if(seenT.has(key))return false;seenT.add(key);return true;}).slice(0,6);pick.forEach(x=>S.gseen[x.k]=(S.gseen[x.k]||0)+1);
    G.pairs=pick.map((x,i)=>({i,t:x.t,term:x.c[0],def:mask(x.c[1].length>150?x.c[1].slice(0,148)+"…":x.c[1],x.t),done:false,miss:0}));G.left=shuffle(G.pairs.map(p=>p.i));G.right=shuffle(G.pairs.map(p=>p.i));G.sel=null;G.flash=null;}
  if(id==="blurt"){const w=ids.map(t=>({t,m:topicStats(t).m})).sort((a,b)=>a.m-b.m);G.t=opt||w[0].t;G.phase="pick";G.text="";}
  if(id==="compass"){let p=ids.filter(t=>!isPSC(t)&&R[t].dims&&R[t].dims.sa!=null);if(p.length<3)p=READINGS.filter(r=>r.dims&&r.dims.sa!=null&&r.wk<=4).map(r=>r.id);G.list=shuffle(p).slice(0,5);G.i=0;G.vals={};G.rev=false;G.scores=[];}
  if(G.rounds&&!G.rounds.length){toast("No questions for this selection yet");G=null;return;}
  if(!noGo)go(isP()?"psc-game":"game",id);}

/* ---------- shared bits ---------- */
const hud=()=>{const n=G.rounds?G.rounds.length:0;
  return `<div class="ghud"><div class="gprog">${G.rounds?G.rounds.map((_,j)=>`<i class="${j<G.res.length?(G.res[j]>=.99?'r':G.res[j]>0?'p':'w'):j===G.i?'on':''}"></i>`).join(''):''}</div>
  <div class="row" style="gap:14px">${G.id==="boss"?`<span class="hearts">${[0,1,2].map(j=>`<i class="${j<G.hearts?'on':''}">${ic('heart')}</i>`).join('')}</span>`:''}${G.streak>1?`<span class="combo">${ic('bolt')} ${G.streak} streak</span>`:''}<span class="gscore">${Math.round(G.score)}<small> pts</small></span></div></div>`;};
const gHead=(title,sub)=>`<div class="row between" style="margin-bottom:6px"><button class="back" data-go="${isP()?'psc-games':'games'}" style="margin:0">${ic('left')} Games</button><span class="eyebrow">${esc(gTag())}</span></div><h2 class="serif" style="margin:4px 0 2px">${title}</h2>${sub?`<p class="small mut" style="margin:0 0 12px">${sub}</p>`:''}`;
function record(rd,x){if(rd.mcq)recordQ(rd.mcq,x>=.99,G.id==="boss"?1.2:1);else if(rd.t)ev(rd.t,x,rd.w||1,rd.d??0);logAct();}
function finishGame(){G.done=true;const acc=G.res.length?G.res.reduce((a,b)=>a+b,0)/G.res.length:0;G.acc=acc;
  const s=S.games[G.id]||{best:0,plays:0};s.plays++;s.best=Math.max(s.best,Math.round(G.score));s.last=Date.now();S.games[G.id]=s;persist();
  if(acc>=.8||(G.id==="boss"&&G.hp<=0))setTimeout(()=>typeof confetti==="function"&&confetti(),250);}
function endScreen(extra){const acc=G.acc||0,by={};(G.rounds||[]).forEach((r,j)=>{if(!r.t||j>=G.res.length)return;(by[r.t]=by[r.t]||[]).push(G.res[j]);});
  const weak=Object.entries(by).map(([t,a])=>[t,a.reduce((x,y)=>x+y,0)/a.length]).sort((a,b)=>a[1]-b[1]);
  const best=(S.games[G.id]||{}).best||0;
  return `<div class="gend"><div class="eyebrow">${G.id==="boss"?(G.hp<=0?"Victory":"Defeated"):"Round complete"}</div>
   <div class="gbig">${Math.round(G.score)}<small> pts</small></div><p class="mut" style="margin:4px 0 14px">${Math.round(acc*100)}% correct · best ${best} pts</p>${extra||''}
   ${weak.length?`<h4 style="text-align:left">Per reading</h4><div class="list" style="text-align:left">${weak.map(([t,a])=>`<div class="item" data-go="${isPSC(t)?'psc-lecture':'readings'}" data-sub="${t}">${ring(a,'sm')}<div style="min-width:0"><div class="t">${esc(lab(t))}</div><div class="s">${a<.6?'Review this one':a<1?'Almost':'Solid'}</div></div><span class="mut">→</span></div>`).join('')}</div>`:''}
   <div class="row" style="justify-content:center;margin-top:16px"><button class="btn primary" data-game="${G.id}">${ic('spark')} Play again</button><button class="btn" data-go="${isP()?'psc-games':'games'}">All games</button></div>
   <p class="small mut" style="margin-top:12px">Every answer has updated your knowledge scores.</p></div>`;}

/* ---------- multiple-choice round ---------- */
function mcView(title,sub){const rd=G.rounds[G.i];const p=G.picked;const bets=G.id==="bets";
  const stakeRow=bets?`<div class="stakes"><span class="small mut">How sure are you?</span>${[[1,"Guessing"],[2,"Fairly sure"],[3,"Certain"]].map(([v,l])=>`<button class="stake ${G.stake===v?'on':''}" data-stake="${v}" ${p!=null?'disabled':''}>${v} chip${v>1?'s':''}<small>${l}</small></button>`).join('')}</div>`:'';
  const opts=rd.o.map((o,j)=>{let cls='';if(p!=null){if(j===rd.a)cls='right';else if(j===p)cls='wrong';}
    return `<button class="opt ${cls}" data-gp="${j}" ${p!=null||(bets&&!G.stake)?'disabled':''}><span class="k">${String.fromCharCode(65+j)}</span><span>${esc(o)}</span></button>`;}).join('');
  const ok=p===rd.a;
  return `<div class="fade game">${gHead(title,sub)}${hud()}${G.id==="boss"?bossBar():''}
   <div class="qcard gq">${rd.scen?`<div class="case"><span class="eyebrow">Case file</span><p>${esc(rd.scen)}</p></div>`:''}${rd.quote?`<blockquote class="gquote">${esc(rd.quote)}</blockquote>`:''}
   ${rd.qtype?`<span class="gtag" style="--h:210">${esc(rd.qtype)}</span>`:""}<p class="qq">${esc(rd.prompt)}</p>${stakeRow}${opts}
   ${p!=null?`<div class="expl"><b>${ok?(G.streak>2?'On fire. ':'Correct. '):'Not quite. '}${bets?(ok?`+${G.stake}`:`−${G.stake}`)+' chips. ':''}</b>${esc(rd.e)}${rd.link?` <button class="linkbtn" data-go="${isPSC(rd.link)?'psc-lecture':'readings'}" data-sub="${rd.link}">Open the reading →</button>`:''}</div>
   <div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn primary" id="gnext">${G.i+1<G.rounds.length&&!(G.id==="boss"&&(G.hearts<=0||G.hp<=0))?'Next':'Finish'} <kbd>Enter</kbd></button></div>`:`<p class="small mut" style="margin-top:8px">${bets&&!G.stake?'Pick your stake first · ':''}<kbd>1</kbd>–<kbd>4</kbd> to answer</p>`}</div></div>`;}
function gPick(j){const rd=G.rounds[G.i];if(G.picked!=null)return;if(G.id==="bets"&&!G.stake)return;G.picked=j;const ok=j===rd.a;
  if(G.id==="bets"){G.score+=ok?G.stake:-G.stake;G.bets.push({st:G.stake,ok,rd});}
  else{G.streak=ok?G.streak+1:0;G.score+=ok?10*(1+Math.min(G.streak-1,4)*.25):0;}
  if(G.id==="boss"){if(ok)G.hp=Math.max(0,G.hp-G.dmg);else G.hearts--;}
  G.res.push(ok?1:0);record(rd,ok?1:0);render();}
function gNext(){G.i++;G.picked=null;G.stake=0;
  if(G.i>=G.rounds.length||(G.id==="boss"&&(G.hearts<=0||G.hp<=0)))finishGame();
  render();scrollTo({top:0,behavior:"smooth"});}
const bossBar=()=>`<div class="boss"><div class="row between"><b>${esc(G.boss)}</b><span class="small mut">${Math.round(G.hp)} HP</span></div><div class="hpbar"><i style="width:${G.hp}%"></i></div></div>`;

/* ---------- sequence round ---------- */
function seqView(title,sub){const rd=G.rounds[G.i];
  const placed=rd.order.map((si,j)=>{let cls='';if(rd.checked)cls=si===j?'ok':'no';return `<button class="seqi ${cls}" data-sq-rm="${j}" ${rd.checked?'disabled':''}><span class="n">${j+1}</span>${esc(rd.steps[si])}</button>`;}).join('');
  const left=rd.pool.filter(si=>!rd.order.includes(si)).map(si=>`<button class="chip seqc" data-sq="${si}">${esc(rd.steps[si])}</button>`).join('');
  return `<div class="fade game">${gHead(title,sub)}${hud()}${G.id==="boss"?bossBar():''}<div class="qcard gq"><p class="qq">${esc(rd.title)}</p><p class="small mut">Tap the steps in the right order. Tap a placed step to take it back.</p>
   <div class="seqlist">${placed||'<div class="small mut seqempty">Your order appears here</div>'}</div><div class="seqpool">${left}</div>
   ${rd.checked?`<div class="expl"><b>${Math.round(G.res[G.i]*100)}% in the right place.</b> ${esc(rd.e)}<ol class="small" style="margin:8px 0 0">${rd.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol></div><div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn primary" id="gnext">${G.i+1<G.rounds.length?'Next':'Finish'}</button></div>`:
   `<div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn primary" id="sqcheck" ${rd.order.length<rd.steps.length?'disabled':''}>Check order</button></div>`}</div></div>`;}
function seqCheck(){const rd=G.rounds[G.i];rd.checked=true;const f=rd.order.filter((si,j)=>si===j).length/rd.steps.length;G.res.push(f);
  G.score+=Math.round(f*20);G.streak=f>=.99?G.streak+1:0;if(G.id==="boss"){if(f>=.6)G.hp=Math.max(0,G.hp-G.dmg);else G.hearts--;}record(rd,f);render();}

/* ---------- game views ---------- */
function vGame(){if(!G||G.id!==sub){const g=GAMES.find(x=>x.id===sub);if(g){startGame(sub,null,true);return G?vGame():vGames();}return vGames();}
  const g=GAMES.find(x=>x.id===G.id);
  if(G.done){let extra='';if(G.id==="bets")extra=calib();return `<div class="fade game">${gHead(g.name)}${endScreen(extra)}</div>`;}
  if(G.id==="pairs")return pairsView(g);
  if(G.id==="blurt")return blurtView(g);
  if(G.id==="compass")return compassView(g);
  const rd=G.rounds[G.i];const sub2=G.id==="boss"?`${G.rounds.length} rounds · lose all three hearts and the boss wins`:g.tag;
  return rd.k==="seq"?seqView(g.name,sub2):mcView(g.name,sub2);}
function calib(){const lv=[1,2,3].map(v=>{const b=G.bets.filter(x=>x.st===v);return {v,n:b.length,acc:b.length?b.filter(x=>x.ok).length/b.length:null};});
  const hc=G.bets.filter(x=>x.st===3&&!x.ok);const ideal={1:"~33–50%",2:"~70%",3:"~95%"};
  return `<div class="calib">${lv.map(l=>`<div><div class="eyebrow">${l.v} chip${l.v>1?'s':''}</div><div class="cbar"><i style="height:${l.acc==null?0:Math.round(l.acc*100)}%"></i></div><b>${l.acc==null?'–':Math.round(l.acc*100)+'%'}</b><small>${l.n} bet${l.n===1?'':'s'} · ideal ${ideal[l.v]}</small></div>`).join('')}</div>
   <p class="small" style="text-align:left">${lv[2].acc!=null&&lv[2].acc<.85?'You are <b>overconfident</b> when certain: slow down on questions that feel easy.':lv[0].acc!=null&&lv[0].acc>.7?'You know more than you think: your guesses are mostly right.':'Your confidence tracks your accuracy reasonably well.'}</p>
   ${hc.length?`<h4 style="text-align:left">Confident mistakes: review these now (they stick best)</h4><div class="list" style="text-align:left">${hc.map(x=>`<div class="item" data-go="readings" data-sub="${x.rd.t}"><span class="chip missing">3 chips</span><div style="min-width:0"><div class="t">${esc(x.rd.prompt)}</div><div class="s">Answer: ${esc(x.rd.o[x.rd.a])}</div></div></div>`).join('')}</div>`:''}`;}
function pairsView(g){const done=G.pairs.filter(p=>p.done).length;const secs=Math.round(((G.end||Date.now())-G.started)/1000);
  if(done===G.pairs.length&&!G.done){G.end=G.end||Date.now();}
  const L=G.left.map(i=>{const p=G.pairs[i];return `<button class="pt ${p.done?'done':''} ${G.sel===i?'sel':''} ${G.flash&&G.flash.l===i?'bad':''}" data-pl="${i}" ${p.done?'disabled':''}>${esc(p.term)}</button>`;}).join('');
  const Rr=G.right.map(i=>{const p=G.pairs[i];return `<button class="pt def ${p.done?'done':''} ${G.flash&&G.flash.r===i?'bad':''}" data-pr="${i}" ${p.done?'disabled':''}>${esc(p.def)}</button>`;}).join('');
  return `<div class="fade game">${gHead(g.name,"Tap a concept, then its definition. Author names are blanked out.")}
   <div class="ghud"><div class="gprog">${G.pairs.map(p=>`<i class="${p.done?(p.miss?'p':'r'):''}"></i>`).join('')}</div><div class="row" style="gap:14px"><span class="gscore" id="ptimer">${secs}<small> s</small></span><span class="gscore">${G.pairs.reduce((a,p)=>a+p.miss,0)}<small> slips</small></span></div></div>
   ${done===G.pairs.length?`<div class="gend"><div class="eyebrow">All matched</div><div class="gbig">${secs}<small> s</small></div><p class="mut">${G.pairs.filter(p=>!p.miss).length} of ${G.pairs.length} on the first try</p>
   <div class="list" style="text-align:left;margin-top:10px">${G.pairs.map(p=>`<div class="item" data-go="${isPSC(p.t)?'psc-lecture':'readings'}" data-sub="${p.t}"><span class="chip ${p.miss?'missing':'full'}">${p.miss?'slipped':'clean'}</span><div style="min-width:0"><div class="t">${esc(p.term)}</div><div class="s">${esc(lab(p.t))}</div></div></div>`).join('')}</div>
   <div class="row" style="justify-content:center;margin-top:16px"><button class="btn primary" data-game="pairs">${ic('spark')} New set</button><button class="btn" data-go="${isP()?'psc-games':'games'}">All games</button></div></div>`:
   `<div class="pairs"><div class="pcol">${L}</div><div class="pcol">${Rr}</div></div>`}</div>`;}
function pairTap(side,i){if(side==="l"){G.sel=G.sel===i?null:i;G.flash=null;render();return;}
  if(G.sel==null){toast("Pick a concept first");return;}
  const p=G.pairs[G.sel];if(G.sel===i){p.done=true;ev(p.t,p.miss?0:1,.5);G.sel=null;G.flash=null;
    if(G.pairs.every(x=>x.done)){G.end=Date.now();const s=S.games.pairs||{best:0,plays:0};s.plays++;const secs=Math.round((G.end-G.started)/1000);s.best=s.best?Math.min(s.best,secs):secs;S.games.pairs=s;persist();if(G.pairs.every(x=>!x.miss))setTimeout(()=>typeof confetti==="function"&&confetti(),200);}
  }else{p.miss++;G.flash={l:G.sel,r:i};setTimeout(()=>{if(G&&G.flash){G.flash=null;render();}},450);}
  logAct();render();}
/* free recall */
const STOP=new Set("about after also and approach based being between both cannot could does each from have into more most only other over planning planners planner rather same should some such than that their them then theory there these they this those through under very what when where which while with within would your theory's".split(" "));
function keyw(term){return term.toLowerCase().replace(/[^a-zà-ž0-9\s-]/g," ").split(/[\s-]+/).filter(w=>w.length>3&&!STOP.has(w)).map(w=>w.slice(0,Math.max(4,Math.min(6,w.length-1))));}
function blurtView(g){const ids=G.ids;const r=NR(G.t);
  if(G.phase==="pick")return `<div class="fade game">${gHead(g.name,"Write everything you remember about one reading. No peeking.")}
   <div class="qcard gq"><label class="eyebrow" for="bsel">Reading (your weakest is preselected)</label><select id="bsel" class="gsel">${ids.map(t=>`<option value="${t}" ${t===G.t?'selected':''}>${esc(lab(t))} · ${Math.round(topicStats(t).m*100)}%</option>`).join('')}</select>
   <p class="small mut" style="margin-top:12px">You get 3 minutes. Write the argument, concepts, examples, quotes, who it argues against, where it sits on the framework. Fragments are fine: the point is to retrieve, not to write well.</p>
   <button class="btn primary" id="bgo" style="margin-top:6px">${ic('spark')} Start the clock</button></div></div>`;
  if(G.phase==="write"){const left=Math.max(0,G.until-Date.now());
    return `<div class="fade game">${gHead(g.name,esc(lab(G.t)))}<div class="ghud"><div class="gprog"><i class="on" style="flex:1"></i></div><span class="gscore" id="btimer">${Math.floor(left/60e3)}:${String(Math.floor(left/1e3)%60).padStart(2,'0')}</span></div>
     <div class="qcard gq"><textarea id="btext" class="btext" placeholder="Start typing everything you remember…">${esc(G.text)}</textarea><div class="row between" style="margin-top:10px"><span class="small mut" id="bwc">${(G.text.trim().match(/\S+/g)||[]).length} words</span><button class="btn primary" id="bdone">I'm done</button></div></div></div>`;}
  const cs=r.concepts||[];const tl=" "+G.text.toLowerCase()+" ";
  if(!G.hit){G.hit=cs.map(([a])=>{const k=keyw(a);if(!k.length)return false;const n=k.filter(w=>tl.includes(w)).length;return n/k.length>=.5;});}
  const n=G.hit.filter(Boolean).length,f=cs.length?n/cs.length:0;
  return `<div class="fade game">${gHead(g.name,esc(lab(G.t)))}<div class="gend" style="padding-top:6px"><div class="eyebrow">Recall score</div><div class="gbig">${n}<small> / ${cs.length} concepts</small></div>
   <p class="small mut">Auto-detected from your words. Tap a concept to correct it if you described it in other words, or if the match is wrong.</p></div>
   <div class="blurtc">${cs.map(([a,b],j)=>`<button class="bc ${G.hit[j]?'hit':''}" data-bh="${j}"><b>${G.hit[j]?'✓':'○'} ${esc(a)}</b><span>${esc(b)}</span></button>`).join('')}</div>
   <h4>What you wrote</h4><div class="flat small" style="white-space:pre-wrap">${esc(G.text)||'<span class="mut">(nothing)</span>'}</div>
   <h4>The one-line argument</h4><div class="note">${esc(r.one||'')}</div>
   <div class="row" style="justify-content:center;margin-top:16px">${G.saved?`<span class="chip full">Saved · ${Math.round(f*100)}%</span><button class="btn primary" data-game="blurt">Another reading</button><button class="btn" data-go="${isPSC(G.t)?'psc-lecture':'readings'}" data-sub="${G.t}">Open the reading</button>`:`<button class="btn primary" id="bsave">Save score (${Math.round(f*100)}%)</button>`}</div></div>`;}
/* compass */
const DL=[["sa","Structure","Agency"],["rt","Reproduction","Transformation"],["de","Deliberate","Emergent"],["us","Universal","Situated"],["mp","Monist","Pluralist"]];
function compassView(g){if(G.i>=G.list.length){if(!G.done){G.res=G.scores;G.score=Math.round(G.scores.reduce((a,b)=>a+b,0)*20);finishGame();}return vGame();}
  const t=G.list[G.i],r=R[t],d=r.dims;const v=G.vals[t]=G.vals[t]||{};const dims=DL.filter(([k])=>d[k]!=null);
  const sc=G.rev?G.scores[G.i]:null;
  return `<div class="fade game">${gHead(g.name,"Where does this theory sit? Drag each slider, then reveal.")}
   <div class="ghud"><div class="gprog">${G.list.map((_,j)=>`<i class="${j<G.scores.length?(G.scores[j]>=.8?'r':G.scores[j]>=.5?'p':'w'):j===G.i?'on':''}"></i>`).join('')}</div><span class="gscore">${Math.round(G.scores.reduce((a,b)=>a+b,0)*20)}<small> pts</small></span></div>
   <div class="qcard gq"><p class="eyebrow">${esc(r.theory)}</p><p class="qq">${esc(lab(t))}</p>
   ${dims.map(([k,a,b])=>{const val=v[k]??50;return `<div class="cdim"><div class="lab"><span>${a}</span><span>${b}</span></div><div class="ctrack">${G.rev?`<span class="key" style="left:${d[k]}%" title="Key"></span>`:''}<input type="range" min="0" max="100" step="5" value="${val}" data-cd="${k}" ${G.rev?'disabled':''} aria-label="${a} to ${b}"></div>${G.rev?`<div class="small ${Math.abs(val-d[k])<=15?'okc':'mut'}">${Math.abs(val-d[k])<=15?'✓ within range':'key: '+(d[k]<35?a.toLowerCase():d[k]>65?b.toLowerCase():'in the middle')}</div>`:''}</div>`;}).join('')}
   ${G.rev?`<div class="expl"><b>${Math.round(sc*100)}% match.</b> Normative commitments: ${esc(d.norm||'')}<br><span class="small mut">${esc((r.exam||'').slice(0,260))}${(r.exam||'').length>260?'…':''}</span></div><div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn primary" id="cnext">${G.i+1<G.list.length?'Next theory':'Finish'}</button></div>`
   :`<div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn primary" id="crev">Reveal the key</button></div>`}
   <p class="small mut" style="margin-top:10px">Positions are the course framework's approximations; within 15 points counts as right.</p></div></div>`;}
function compassReveal(){const t=G.list[G.i],d=R[t].dims,v=G.vals[t]||{};const ks=DL.filter(([k])=>d[k]!=null).map(([k])=>k);
  const sc=ks.reduce((a,k)=>a+Math.max(0,1-Math.max(0,Math.abs((v[k]??50)-d[k])-10)/40),0)/ks.length;G.scores.push(sc);G.rev=true;ev(t,sc,.8);logAct();render();}

/* ---------- hub ---------- */
function vGames(){const P=isP();const segs=P?[["","All"],["w1","Theme 1"],["w2","Theme 2"],["w3","Theme 3"]]:[["",Date.now()<EXAM?"Midterm":"All"],["w1","W1"],["w2","W2"],["w3","W3"],["w4","W4"],["w6","W6"],["w7","W7"]];
  const list=GAMES.filter(g=>P?g.psc:g.bpt);
  return `<div class="fade"><p class="eyebrow">Retrieval practice, disguised</p><h2 class="serif">Games</h2>
  <p class="lede">Every game is a form of testing that research shows works, and every answer feeds your knowledge score. Pick the readings, then a game.</p>
  <div class="row between" style="margin:14px 0 18px;gap:10px"><div class="seg">${segs.map(([v,l])=>`<button data-gw="${v}" aria-pressed="${GW===v}">${l}</button>`).join('')}</div><span class="small mut">${gIds().length} readings in play</span></div>
  <div class="ggrid">${list.map((g,j)=>{const st=S.games[g.id];return `<button class="gcard" data-game="${g.id}" style="--h:${g.hue}"><div class="gart"><span class="gnum">${String(j+1).padStart(2,'0')}</span>${g.id==="boss"&&!P?`<span class="gboss">${esc(BOSS[GW||"m"])}</span>`:''}</div>
   <div class="gbody"><div class="row between"><b class="gname">${g.name}</b>${st?`<span class="small mut">${g.id==="pairs"?'best '+st.best+' s':'best '+st.best}</span>`:''}</div><span class="gtag">${g.tag}</span><p>${g.desc}</p><p class="gwhy"><span>Why it works</span>${g.why}</p></div></button>`;}).join('')}
   ${P?'':`<button class="gcard classic" data-go="quiz" style="--h:0"><div class="gbody"><b class="gname">Classic quiz</b><span class="gtag">Exam format</span><p>Plain multiple choice in the Remindo format, 10 at a time, with weak-spot mode.</p></div></button>`}</div></div>`;}

/* ---------- events ---------- */
document.addEventListener("click",e=>{const t=e.target.closest("button,[data-bh]");if(!t)return;
  if(t.dataset.gw!=null){GW=t.dataset.gw;render();return;}
  if(t.dataset.game){startGame(t.dataset.game);return;}
  if(t.dataset.boss){GW=t.dataset.boss;startGame("boss");return;}
  if(t.dataset.blurt){const id=t.dataset.blurt;GW="w"+NR(id).wk;startGame("blurt",id);return;}
  if(!G)return;
  if(t.dataset.gp!=null){gPick(+t.dataset.gp);return;}
  if(t.dataset.stake){G.stake=+t.dataset.stake;render();return;}
  if(t.id==="gnext"){gNext();return;}
  if(t.dataset.sq!=null){const rd=G.rounds[G.i];rd.order.push(+t.dataset.sq);render();return;}
  if(t.dataset.sqRm!=null){const rd=G.rounds[G.i];rd.order.splice(+t.dataset.sqRm,1);render();return;}
  if(t.id==="sqcheck"){seqCheck();return;}
  if(t.dataset.pl!=null){pairTap("l",+t.dataset.pl);return;}
  if(t.dataset.pr!=null){pairTap("r",+t.dataset.pr);return;}
  if(t.id==="bgo"){G.t=$("#bsel").value;G.phase="write";G.until=Date.now()+180e3;G.text="";render();setTimeout(()=>$("#btext")&&$("#btext").focus(),50);return;}
  if(t.id==="bdone"){G.phase="score";G.hit=null;render();return;}
  if(t.dataset.bh!=null){G.hit[+t.dataset.bh]=!G.hit[+t.dataset.bh];render();return;}
  if(t.id==="bsave"){const cs=NR(G.t).concepts||[];const f=cs.length?G.hit.filter(Boolean).length/cs.length:0;ev(G.t,f,1.2);G.saved=true;const s=S.games.blurt||{best:0,plays:0};s.plays++;s.best=Math.max(s.best,Math.round(f*100));S.games.blurt=s;logAct();persist();if(f>=.8&&typeof confetti==="function")confetti();render();return;}
  if(t.id==="crev"){compassReveal();return;}
  if(t.id==="cnext"){G.i++;G.rev=false;render();scrollTo({top:0,behavior:"smooth"});return;}
});
document.addEventListener("input",e=>{if(!G)return;const t=e.target;
  if(t.id==="btext"){G.text=t.value;const w=$("#bwc");if(w)w.textContent=(t.value.trim().match(/\S+/g)||[]).length+" words";}
  if(t.dataset&&t.dataset.cd){const id=G.list[G.i];(G.vals[id]=G.vals[id]||{})[t.dataset.cd]=+t.value;}});
document.addEventListener("keydown",e=>{if(!(view==="game"||view==="psc-game")||!G||G.done)return;if(e.target.matches("textarea,input,select"))return;
  const rd=G.rounds&&G.rounds[G.i];
  if(rd&&rd.k==="mc"){const m={a:0,b:1,c:2,d:3,"1":0,"2":1,"3":2,"4":3}[e.key.toLowerCase()];
    if(G.picked==null&&m!=null&&m<rd.o.length){e.preventDefault();e.stopImmediatePropagation();gPick(m);return;}
    if(G.picked!=null&&e.key==="Enter"){e.preventDefault();e.stopImmediatePropagation();gNext();return;}}
  if(rd&&rd.k==="seq"&&rd.checked&&e.key==="Enter"){e.stopImmediatePropagation();gNext();return;}
  if("rq".includes(e.key.toLowerCase()))e.stopImmediatePropagation();},true);
setInterval(()=>{if(!G)return;
  if(G.id==="blurt"&&G.phase==="write"&&(view==="game"||view==="psc-game")){const l=Math.max(0,G.until-Date.now());const el=$("#btimer");if(el)el.textContent=`${Math.floor(l/60e3)}:${String(Math.floor(l/1e3)%60).padStart(2,'0')}`;if(l===0){G.phase="score";G.hit=null;toast("Time! Let's see what you recalled");render();}}
  if(G.id==="pairs"&&!G.end){const el=$("#ptimer");if(el)el.innerHTML=Math.round((Date.now()-G.started)/1000)+"<small> s</small>";}},500);
