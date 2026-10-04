/* ---------- utils ---------- */
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const hash=s=>{let h=5381;for(const c of s)h=((h<<5)+h+c.charCodeAt(0))|0;return (h>>>0).toString(36)};
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const DAY=864e5;
const dkey=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const today0=()=>{const d=new Date();d.setHours(0,0,0,0);return d};
const R=Object.fromEntries([...READINGS,...PSC.map(l=>({id:l.id,title:"L"+l.n+" · "+l.title,theory:l.man.cite,cite:l.man.cite,wk:l.theme,psc:1}))].map(r=>[r.id,r]));
const CARDS=FC.map(([t,f,b])=>({t,f,b,k:"c"+hash(f)}));
const QS=MCQ.map(q=>({...q,k:"q"+hash(q.q)}));
const OQ=OPEN.map(q=>({...q,k:"o"+hash(q.q)}));
const isPSC=t=>/^p\d+$/.test(t);
const MIDR=()=>READINGS.filter(r=>r.wk<=4);
const BR=()=>Date.now()<EXAM?MIDR():READINGS;
const scopeIds=()=>course==="psc"?PSC.map(l=>l.id):BR().map(r=>r.id);
const STATUS={full:"Full text",partial:"Partial",slides:"Slides only",missing:"Not on file"};
const short=r=>r.title.replace(/^Course framework \+ /,'').split(/[:(]/)[0].trim();
const I={
 home:'<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
 cal:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
 book:'<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/>',
 grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
 cards:'<rect x="6" y="3" width="14" height="16" rx="2"/><path d="M4 7v12a2 2 0 0 0 2 2h10"/>',
 quiz:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01"/>',
 pen:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 src:'<path d="M9 12l2 2 4-4"/><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
 menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
 left:'<path d="M15 18l-6-6 6-6"/>',
 flame:'<path d="M12 22c4 0 7-3 7-7 0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-2 2-5 5-5 8 0 4 3 7 7 7z"/>'
};
const ic=(n,c='ico')=>`<svg class="${c}" viewBox="0 0 24 24" aria-hidden="true">${I[n]}</svg>`;

/* ---------- state ---------- */
let S={read:{},recall:{},cards:{},quiz:{},open:{},plan:{},mocks:[],notes:{},act:{}};
let dbRef=null,saveTimer=null,saveState="local";
try{const l=localStorage.getItem("bpt-state");if(l)S=Object.assign(S,JSON.parse(l))}catch(e){}
S.act=S.act||{};
function persist(){
  try{localStorage.setItem("bpt-state",JSON.stringify(S));localStorage.setItem("bpt-ts",Date.now())}catch(e){}
  clearTimeout(saveTimer);
  saveTimer=setTimeout(async()=>{if(!dbRef)return;try{await dbRef.set({state:JSON.stringify(S),updated:Date.now()});saveState="synced";}catch(e){saveState="local";}},800);
}
(async()=>{try{if(!window.claude||!window.claude.use)return;const db=await window.claude.use("db");if(!db)return;
 const user=await window.claude.use("user");const uid=user?await user.id():null;if(!uid)return;
 const mine=db.doc("data/users/"+uid+"/progress");let snap=await mine.get();
 /* one-time move of the owner's old shared progress into their private per-viewer doc */
 if(!snap.exists&&await user.isOwner()){try{const old=db.doc("progress/main"),os=await old.get();if(os.exists){await mine.set(os.data());await old.delete();snap=await mine.get();}}catch(e){}}
 dbRef=mine;
 if(snap.exists){const d=snap.data();const remote=JSON.parse(d.state||"{}");let lt=0;try{lt=+localStorage.getItem("bpt-ts")||0}catch(e){}
  if(!lt||d.updated>=lt){S=Object.assign(S,remote);S.act=S.act||{};try{localStorage.setItem("bpt-state",JSON.stringify(S))}catch(e){}}}
 await mine.set({state:JSON.stringify(S),updated:Date.now()});saveState="synced";render();}catch(e){}})();
function logAct(n=1){const k=dkey(new Date());S.act[k]=(S.act[k]||0)+n;}
function streak(){let n=0;const d=today0();if(!S.act[dkey(d)])d.setDate(d.getDate()-1);while(S.act[dkey(d)]){n++;d.setDate(d.getDate()-1);}return n;}
function toast(t){const el=$("#toast");el.innerHTML=`<div class="toast fade" role="status">${esc(t)}</div>`;clearTimeout(toast.t);toast.t=setTimeout(()=>el.innerHTML="",1800);}

/* ---------- mastery ---------- */
/* Mastery v2: a live estimate of how well you know a reading NOW.
   Knowledge K = recency-weighted accuracy over every graded attempt (cards, quiz, mock, games),
   fading with time since you last practised (forgetting curve; slower once you have more practice).
   Coverage C = share of the reading's cards + quiz questions you have attempted at least once.
   Mastery = K x (0.7 + 0.3 C). Green when Mastery >= 80% and Coverage >= 50%. */
function stab(st){return 5*(1+Math.log2(1+st.n));}
function retention(st){if(!st||!st.t)return 1;const d=(Date.now()-st.t)/DAY;return Math.exp(-Math.max(0,d-0.5)/stab(st));}
function migrateK(){if(S.kv===2&&S.k)return;S.k=S.k||{};
  for(const t in R){if(S.k[t])continue;const cs=CARDS.filter(c=>c.t===t),qs=QS.filter(q=>q.t===t);
    const sc=cs.filter(c=>S.cards[c.k]?.seen),sq=qs.filter(q=>S.quiz[q.k]);const n=sc.length+sq.length;if(!n)continue;
    const ok=sc.filter(c=>(S.cards[c.k].box||0)>=2).length+sq.filter(q=>S.quiz[q.k].last).length;
    S.k[t]={k:ok/n,n:Math.min(n,12),t:Date.now(),h:[]};}
  S.kv=2;}
function ev(t,x,w){if(!R[t])return;migrateK();w=w||1;const st=S.k[t]||{k:0,n:0,t:0,h:[]};
  const k0=st.t?st.k*retention(st):0;const a=Math.min(.9,Math.max(w/(st.n+w),.15*w));
  st.k=k0+(x-k0)*a;st.n+=w;st.t=Date.now();st.h=(st.h||[]).concat([Math.round(x*100)/100]).slice(-12);S.k[t]=st;}
function topicStats(t){migrateK();const cs=CARDS.filter(c=>c.t===t),qs=QS.filter(q=>q.t===t);
  const seen=cs.filter(c=>S.cards[c.k]?.seen).length+qs.filter(q=>S.quiz[q.k]).length,tot=cs.length+qs.length;
  const cov=tot?seen/tot:0,st=S.k[t],ret=retention(st),K=st?st.k*ret:0;
  const m=K*(0.7+0.3*cov);
  return {m,k:K,cov,ret,n:st?st.n:0,t:st?st.t:0,h:st?st.h||[]:[],nc:cs.length,nq:qs.length,mastered:m>=.8&&cov>=.5};}
function agoTxt(ts){if(!ts)return "never";const d=(Date.now()-ts)/DAY;return d<1/24?"just now":d<1?Math.round(d*24)+" h ago":Math.round(d)+" d ago";}
function masteryCard(s){const spark=s.h.length?`<div class="spark" title="Last ${s.h.length} attempts">${s.h.map(x=>`<i style="--v:${x}" class="${x>=.75?'g':x>=.4?'m':'b'}"></i>`).join('')}</div>`:'';
  return `<div class="row" style="gap:14px;flex-wrap:nowrap">${ring(s.m)}<div style="min-width:0"><div class="eyebrow">Mastery</div>
  <div class="small">Knowledge <b>${Math.round(s.k*100)}%</b>${s.t&&s.ret<.95?` <span class="mut">(fading, ${Math.round(s.ret*100)}% kept)</span>`:''}</div>
  <div class="small">Coverage <b>${Math.round(s.cov*100)}%</b> <span class="mut">of ${s.nc+s.nq} items tried</span></div>
  <div class="small mut">Last practised ${agoTxt(s.t)}</div></div></div>${spark}`;}
const overall=()=>BR().reduce((a,r)=>a+topicStats(r.id).m,0)/BR().length;
const dueCards=f=>{f=f||scopeIds();const now=Date.now();return CARDS.filter(c=>(!f||f.includes(c.t))&&((S.cards[c.k]?.due||0)<=now))};
const ring=(m,cls='')=>`<div class="ring ${cls} ${m>=.8?'done':''}" style="--p:${Math.round(m*100)}"><b>${Math.round(m*100)}${cls.includes('lg')?'<span style="font-size:.9rem">%</span>':''}</b></div>`;
const bar=m=>`<div class="bar ${m>=.8?'done':''}"><i style="width:${Math.round(m*100)}%"></i></div>`;
const daysLeft=()=>Math.max(0,Math.ceil((EXAM-Date.now())/DAY));
function curWeek(){const w=Math.floor((today0()-COURSE_START)/(7*DAY))+1;return Math.max(1,Math.min(9,w));}

/* ---------- routing ---------- */
const NAV=[["Study",[["today","Today","home"],["weeks","Weeks & plan","cal"],["readings","Readings","book"],["framework","Framework","grid"]]],["Practice",[["flash","Flashcards","cards"],["quiz","Quiz","quiz"],["games","Games","spark"],["open","Open questions","pen"],["mock","Mock exam","clock"]]],["About",[["sources","Sources","src"],["method","How this works","info"]]]];
const TABS=[["today","Today","home"],["readings","Readings","book"],["flash","Cards","cards"],["games","Play","spark"],["menu","More","menu"]];
let view="today",sub=null;

function go(v,s){view=v;sub=s??null;render();window.scrollTo(0,0);}
function chromeBPT(){
  const due=dueCards().length;
  $("#side").innerHTML=`<div class="brand"><div class="logo">BPT</div><div><b>Midterm Prep</b><small>GEO4-3115 · UU</small></div></div>
  <button class="kbtn" data-pal="1">${ic('search')} Search or jump to… <span><kbd>⌘K</kbd></span></button>
  <nav class="nav" aria-label="Main">${NAV.map(([g,items])=>`<div class="grp">${g}</div>`+items.map(([k,l,i])=>`<button data-go="${k}" ${view===k?'aria-current="page"':''}>${ic(i)}${l}${k==='flash'&&due?`<span class="n">${due}</span>`:''}${k==='readings'?`<span class="n">${BR().filter(r=>topicStats(r.id).mastered).length}/${BR().length}</span>`:''}</button>`).join('')).join('')}</nav>
  <div class="sidefoot"><div class="lbl">Midterm · Thu 8 Oct</div><div class="row between" style="margin-top:6px"><div><span class="big">${daysLeft()}</span> <span class="mut small">days</span></div>${ring(overall(),'sm')}</div><div class="small mut" style="margin-top:4px">${ic('flame')} ${streak()}-day streak</div></div>`;
  $("#tabbar").innerHTML=TABS.map(([k,l,i])=>`<button data-go="${k}" ${view===k||(k==='menu'&&!TABS.some(t=>t[0]===view))?'aria-current="page"':''}>${ic(i)}${l}</button>`).join('');
  $("#cdm").textContent=`${daysLeft()} days left`;
}
document.addEventListener("click",e=>{const g=e.target.closest("[data-go]");if(g&&!e.target.closest(".palbox")){go(g.dataset.go,g.dataset.sub);}});

/* ---------- views ---------- */
function greet(){const h=new Date().getHours();return h<6?"Late night":h<12?"Good morning":h<18?"Good afternoon":"Good evening";}
function heatmap(){const cells=[];const start=new Date(COURSE_START);const tk=dkey(new Date());const ek=dkey(EXAM);
  for(let i=0;i<42;i++){const d=new Date(start);d.setDate(d.getDate()+i);const k=dkey(d);const n=S.act[k]||0;const l=n===0?'':n<15?'l1':n<40?'l2':'l3';cells.push(`<i class="${l} ${k===tk?'today':''} ${k===ek?'exam':''}" title="${k}: ${n} reviews"></i>`);}
  return `<div class="heat" aria-label="Study activity since 7 September">${cells.join('')}</div><div class="row between small mut" style="margin-top:6px;font-family:var(--mono);font-size:.68rem"><span>7 Sep</span><span>▢ = today · red = midterm</span><span>18 Oct</span></div>`;}
function vToday(){
  const ov=overall(),due=dueCards().length,k=dkey(new Date());
  const plan=PLAN.find(p=>p[0]===k)||PLAN.find(p=>p[0]>k)||PLAN[PLAN.length-1];
  const weak=BR().map(r=>({r,s:topicStats(r.id)})).filter(x=>!x.s.mastered).sort((a,b)=>a.s.m-b.s.m).slice(0,4);
  const done=plan[2].filter((_,i)=>S.plan[plan[0]+"#"+i]).length;
  return `<div class="fade"><p class="eyebrow">Week ${curWeek()} of 9 · ${new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})}</p>
  <h1 class="hero">${greet()}. <em>${daysLeft()} days</em> to the midterm.</h1>
  <p class="lede">Today: ${due} flashcards due, and ${plan[2].length-done} plan task${plan[2].length-done===1?'':'s'} left.</p>
  <div class="row" style="margin:16px 0 24px"><button class="btn primary" data-startdue="1">Review ${due} due cards <kbd>R</kbd></button><button class="btn" data-quizmix="1">Interleaved quiz <kbd>Q</kbd></button><button class="btn" data-boss="w${Math.min(4,curWeek())}">${ic("spark")} Week ${Math.min(4,curWeek())} boss</button><button class="btn" data-go="games">All games</button></div>
  <div class="grid g3">
   <div class="card row" style="gap:18px;flex-wrap:nowrap">${ring(ov,'lg')}<div><div class="eyebrow">Overall mastery</div><p class="small mut" style="margin-top:6px">${BR().filter(r=>topicStats(r.id).mastered).length} of ${BR().length} ${Date.now()<EXAM?'midterm ':''}readings green. Green = 80%+ on cards and quiz.</p></div></div>
   <div class="card"><div class="row between"><div class="eyebrow">Study streak</div><span class="small mut">${ic('flame')} ${streak()} days</span></div>${heatmap()}</div>
  </div>
  <h3>Today's plan · ${plan[1]} ${plan[0].slice(8)}/${plan[0].slice(5,7)}</h3>
  <div class="flat">${plan[2].map((it,i)=>{const kk=plan[0]+"#"+i;return `<label class="check ${S.plan[kk]?'done':''}"><input type="checkbox" data-plan="${kk}" ${S.plan[kk]?'checked':''}><span>${esc(it)}</span></label>`}).join('')}</div>
  ${weak.length?`<h3>Focus next: your weakest readings</h3><div class="list">${weak.map(({r,s})=>item(r,s)).join('')}</div>`:''}
  </div>`;
}
function item(r,s){s=s||topicStats(r.id);return `<div class="item ${s.mastered?'mastered':''}" data-go="readings" data-sub="${r.id}" tabindex="0" role="button">${ring(s.m,'sm')}<div style="min-width:0"><div class="t">${esc(short(r))}</div><div class="s">${esc(r.theory)} · knowledge ${Math.round(s.k*100)}% · coverage ${Math.round(s.cov*100)}%</div></div><div class="r"><span class="chip ${r.status}">${STATUS[r.status]}</span></div></div>`;}

function vWeeks(){const cw=curWeek(),k=dkey(new Date());
  return `<div class="fade"><p class="eyebrow">Timeline</p><h2 class="serif">Nine weeks, two exams</h2><p class="lede">The midterm covers weeks 1–4 (lectures, slides, readings). The final exam, a written commentary, is on 5 Nov.</p>
  <div class="weeks" style="margin-top:16px">${WEEKS.map(w=>{const cls=w.n<cw?'past':w.n===cw?'now':'';const ms=w.topics.map(id=>topicStats(id).m);const avg=ms.length?ms.reduce((a,b)=>a+b,0)/ms.length:null;
   return `<div class="wk ${cls}"><div class="n">W${w.n}<div class="eyebrow" style="margin-top:6px">wk ${w.cw}</div></div><div><div class="row between"><div><b>${esc(w.title)}</b> <span class="small mut">· ${w.dates}</span></div>${w.n===cw?'<span class="chip missing">Now</span>':w.n<cw?'<span class="chip plain">Done</span>':''}</div><ul>${w.items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>${avg!==null?`<div class="row">${w.topics.map(id=>`<button class="chip ${topicStats(id).mastered?'full':topicStats(id).m>0?'slides':''}" data-go="readings" data-sub="${id}" style="cursor:pointer">${esc(short(R[id]).slice(0,26))}</button>`).join('')}</div><div style="margin-top:10px">${bar(avg)}</div><div class="row" style="margin-top:10px"><button class="btn sm" data-boss="w${w.n}">${ic('spark')} Fight the week ${w.n} boss</button></div>`:''}</div></div>`}).join('')}</div>
  <h3>Day-by-day plan</h3><p class="lede small">Every topic comes back at least three times, with two timed mocks.</p>
  <div class="flat plan">${PLAN.map(([d,dn,items])=>`<div class="day ${d===k?'today':''} ${d==='2026-10-08'?'exam':''}"><div class="d">${dn} ${d.slice(8)}/${d.slice(5,7)}${d===k?' · today':''}</div><div>${items.map((it,i)=>{const kk=d+"#"+i;return `<label class="check ${S.plan[kk]?'done':''}"><input type="checkbox" data-plan="${kk}" ${S.plan[kk]?'checked':''}><span>${esc(it)}</span></label>`}).join('')}</div></div>`).join('')}</div></div>`;}

function vReadings(){if(sub&&R[sub])return vReading(R[sub]);
  return `<div class="fade"><p class="eyebrow">${READINGS.length} readings · weeks 1–4 midterm, 6–7 final</p><h2 class="serif">Readings</h2><p class="lede">Summary, concepts, figure, example, framework position and exam angle for each. The chip shows what the page is built from.</p>
  ${[1,2,3,4,6,7].map(w=>`${w===6?'<div class="divider"></div><p class="eyebrow" style="margin-top:18px">After the midterm · final exam material</p>':''}<div class="wkhead"><b>Week ${w}</b><span class="eyebrow">${esc(WEEKS[w-1].title)}</span></div><div class="list">${READINGS.filter(r=>r.wk===w).map(r=>item(r)).join('')}</div>`).join('')}</div>`;}
let SM="short";try{SM=localStorage.getItem("sp-sm")||"short"}catch(e){}
function sumBlock(short,ext,H){const has=ext&&ext.length,mode=has?SM:"short";
  const words=has?ext.flatMap(x=>x.p).join(" ").split(/\s+/).length:0,mins=Math.max(1,Math.round(words/230));
  const tog=has?`<div class="seg sumtog" role="tablist"><button data-sm="short" aria-pressed="${mode==="short"}">Summary</button><button data-sm="ext" aria-pressed="${mode==="ext"}">Extended · ${mins} min</button></div>`:"";
  const head=`<div class="row between sumhead"><${H} style="margin:0">${mode==="ext"?"Extended summary":"Summary"}</${H}>${tog}</div>`;
  if(mode!=="ext")return head+short.map(p=>`<p>${esc(p)}</p>`).join("");
  return head+`<div class="extwrap"><p class="small mut">${words.toLocaleString("en-GB")} words · about ${mins} minutes. Follows the text section by section; page numbers in brackets. The last section is a synthesis linking it to the course, not the author's claim.</p>
   <nav class="toc">${ext.map((x,i)=>`<a href="#" data-toc="${i}">${esc(x.h)}</a>`).join("")}</nav>
   ${ext.map((x,i)=>`<section class="exts" id="ext${i}"><h4><span class="extn">${String(i+1).padStart(2,"0")}</span>${esc(x.h)}</h4>${x.p.map(p=>`<p>${esc(p)}</p>`).join("")}</section>`).join("")}
   <div class="row" style="margin-top:14px"><button class="btn sm" data-sm="short">${ic('left')} Back to the short summary</button></div></div>`;}
document.addEventListener("click",e=>{const b=e.target.closest("[data-sm]");if(b){SM=b.dataset.sm;try{localStorage.setItem("sp-sm",SM)}catch(_){}
  const h=document.querySelector(".sumhead");const y=h?h.getBoundingClientRect().top+scrollY-80:null;render();if(y!=null&&b.closest(".extwrap"))scrollTo({top:y,behavior:"smooth"});return;}
  const t=e.target.closest("[data-toc]");if(t){e.preventDefault();const el=document.getElementById("ext"+t.dataset.toc);if(el)scrollTo({top:el.getBoundingClientRect().top+scrollY-70,behavior:"smooth"});}});
function exList(a){if(!a||!a.length)return "";const lab={text:"In the text",slides:"From the slides",similar:"Similar case · not in the text"},cls={text:"full",slides:"slides",similar:"plain"};
  return `<div class="exl">${a.map(e=>`<div class="exi"><div class="row between"><b>${esc(e.t)}</b><span class="chip ${cls[e.src]||"plain"}">${lab[e.src]||""}${e.p?" · "+esc(e.p):""}</span></div><p>${esc(e.d)}</p></div>`).join("")}</div>`;}
function dimRows(d){if(!d||[d.sa,d.rt,d.de,d.us,d.mp].every(x=>x==null))return '<p class="small mut">Framework or overview reading, so no single position.</p>';
  const L=[["sa","Structure","Agency"],["rt","Reproduction","Transformation"],["de","Deliberate","Emergent"],["us","Universal","Situated"],["mp","Monist","Pluralist"]];
  return `<div class="dims">${L.map(([k,a,b])=>d[k]==null?'':`<div class="dim"><div class="lab"><span>${a}</span><span>${b}</span></div><div class="scale"><span style="left:${d[k]}%"></span></div></div>`).join('')}</div><p class="small" style="margin-top:12px"><b>Normative:</b> ${esc(d.norm||'')}</p>`;}
function vReading(r){const s=topicStats(r.id),nq=QS.filter(q=>q.t===r.id).length;
  const idx=READINGS.indexOf(r),prev=READINGS[idx-1],next=READINGS[idx+1];
  return `<div class="fade"><button class="back" data-go="readings">${ic('left')} All readings</button>
  <div class="row"><span class="eyebrow">Week ${r.wk}</span><span class="chip ${r.status}">${STATUS[r.status]}</span><span class="chip plain">${esc(r.theory)}</span></div>
  <h2 style="font-size:1.8rem;margin-top:10px">${esc(r.title)}</h2><p class="small mut">${esc(r.cite)}</p>
  <div class="rgrid"><div style="min-width:0">
   <p class="oneliner">${esc(r.one)}</p>
   <div class="flat" style="margin-bottom:6px"><div class="row between"><b>Recall first</b><span class="small mut">write, then read on</span></div><p class="small mut" style="margin:4px 0 8px">Argument in one sentence, three concepts, and where it sits on the framework.</p><textarea data-note="${r.id}" placeholder="What do you remember about ${esc(short(r))}?">${esc(S.notes[r.id]||'')}</textarea><div class="row" style="margin-top:6px"><label class="check"><input type="checkbox" data-recall="${r.id}" ${S.recall[r.id]?'checked':''}><span>Recall done</span></label><label class="check"><input type="checkbox" data-read="${r.id}" ${S.read[r.id]?'checked':''}><span>Read the text itself</span></label></div></div>
   ${sumBlock(r.summary,r.ext,"h3")}
   ${r.fig?`<figure class="fig">${r.fig}<figcaption>${esc(r.cap)}</figcaption></figure>`:''}
   <h3>Key concepts</h3><dl class="concepts">${r.concepts.map(([a,b])=>`<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl>
   ${r.table?`<h3>Table</h3><div class="tbl"><table><thead><tr>${r.table.head.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${r.table.rows.map(row=>`<tr>${row.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:''}
   <h3>Example${r.examples&&r.examples.length?"s":""}</h3><p>${esc(r.example)}</p>${exList(r.examples)}
   ${r.quotes.length?`<h3>Quotes to know</h3>${r.quotes.map(q=>`<blockquote>${esc(q)}</blockquote>`).join('')}`:''}
   <h3>Exam angle</h3><div class="note">${esc(r.exam)}</div>
   <div class="row between" style="margin-top:28px">${prev?`<button class="btn sm" data-go="readings" data-sub="${prev.id}">${ic('left')} ${esc(short(prev).slice(0,28))}</button>`:'<span></span>'}${next?`<button class="btn sm" data-go="readings" data-sub="${next.id}">${esc(short(next).slice(0,28))} →</button>`:''}</div>
  </div>
  <aside class="rside"><div class="card">${masteryCard(s)}
   <div class="stack" style="margin-top:14px"><button class="btn primary" data-flashtopic="${r.id}">${ic('cards')} Flashcards · ${s.nc}</button>${nq?`<button class="btn" data-quiztopic="${r.id}">${ic('quiz')} Quiz · ${nq}</button>`:''}<button class="btn" data-blurt="${r.id}">${ic('spark')} Brain dump (3 min)</button></div></div>
   <div class="card"><div class="eyebrow" style="margin-bottom:10px">On the framework</div>${dimRows(r.dims)}</div>
   <div class="note ${r.status==='full'?'ok':r.status==='missing'?'bad':''}">${esc(r.statusNote)}</div></aside></div></div>`;}

function vFramework(){const rows=READINGS.filter(r=>r.dims&&r.dims.sa!=null);const lab=(v,a,b)=>v==null?'–':`<span class="pos">${v<35?a:v>65?b:'middle'}</span>`;
  return `<div class="fade"><p class="eyebrow">The course's core tool</p><h2 class="serif">Framework matrix</h2><p class="lede">This is what the open questions test: place an author, then contrast. Cover a column, recall it, then check.</p>
  <div class="tbl" style="margin-top:14px"><table class="matrix"><thead><tr><th>Author / theory</th><th>Structure ↔ agency</th><th>Reproduction ↔ change</th><th>Deliberate ↔ emergent</th><th>Universal ↔ situated</th><th>Monist ↔ pluralist</th><th>Normative</th></tr></thead><tbody>
  ${rows.map(r=>{const d=r.dims;return `<tr><td>${esc(short(r))}<div class="small mut" style="font-weight:400">${esc(r.theory)}</div></td><td>${lab(d.sa,'structure','agency')}</td><td>${lab(d.rt,'reproduction','change')}</td><td>${lab(d.de,'deliberate','emergent')}</td><td>${lab(d.us,'universal','situated')}</td><td>${lab(d.mp,'monist','pluralist')}</td><td class="small">${esc(d.norm)}</td></tr>`}).join('')}</tbody></table></div>
  <h3>Rational-comprehensive planning vs rational choice theory</h3>
  <div class="tbl"><table><thead><tr><th></th><th>Rational-comprehensive (Rydin 2021)</th><th>Rational choice (HC6)</th></tr></thead><tbody>
  <tr><td>Status</td><td>Normative ideal for planners' decisions</td><td>Analytical framework of how planning works</td></tr><tr><td>Who is rational?</td><td>The planner (expert)</td><td>All actors, including the state</td></tr><tr><td>Failure</td><td>Market failure</td><td>Market and state failure</td></tr><tr><td>Public interest</td><td>Greatest net benefit, set politically</td><td>Aggregate of private interests</td></tr><tr><td>Knowledge</td><td>Positivist: evidence, models, MKBA</td><td>Positivist: models, game theory, CBA</td></tr></tbody></table></div>
  <h3>Four institutionalisms</h3>${R.ni.table?`<div class="tbl"><table><thead><tr>${R.ni.table.head.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${R.ni.table.rows.map(row=>`<tr>${row.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:''}
  <h3>Where knowledge claims sit (Rydin 2007)</h3><figure class="fig">${R.know.fig}</figure></div>`;}

/* flashcards */
let F={deck:[],i:0,flip:false,sel:""};const INT=[0,1,2,3,5,8];
function sel(v){if(!v)return null;if(v[0]==='w'&&course==='psc')return PSC.filter(l=>l.theme===+v.slice(1)).map(l=>l.id);if(v[0]==='w')return READINGS.filter(r=>r.wk===+v.slice(1)).map(r=>r.id);return [v];}
function startFlash(filter,all,label){const fl=filter||scopeIds();const base=all?CARDS.filter(c=>fl.includes(c.t)):dueCards(fl);F={deck:shuffle(base),i:0,flip:false,sel:F.sel,done:0};go(course==="psc"?"psc-flash":"flash");}
function topicSeg(cur,attr){const opts=course==="psc"?[["","All"],["w1","Theme 1"],["w2","Theme 2"],["w3","Theme 3"]]:[["",Date.now()<EXAM?"Midterm":"All"],["w1","W1"],["w2","W2"],["w3","W3"],["w4","W4"],["w6","W6"],["w7","W7"]];return `<div class="seg">${opts.map(([v,l])=>`<button ${attr}="${v}" aria-pressed="${cur===v}">${l}</button>`).join('')}</div>`;}
function vFlash(){const sc=scopeIds();const counts=[0,1,2,3,4,5].map(b=>CARDS.filter(c=>sc.includes(c.t)&&(S.cards[c.k]?.box||0)===b).length);
  const head=`<p class="eyebrow">Spaced repetition · Leitner</p><h2 class="serif">Flashcards</h2>
  <div class="boxes" style="margin:14px 0">${counts.map((n,b)=>`<div class="${b>=3?'ok':''}"><strong>${n}</strong><span>box ${b}${b>=3?' ✓':''}</span></div>`).join('')}</div>
  <div class="row between" style="margin-bottom:6px">${topicSeg(F.sel,'data-fsel')}<div class="row"><button class="btn primary sm" id="fdue">Due · ${dueCards(sel(F.sel)).length}</button><button class="btn sm" id="fall">Cram all</button></div></div>`;
  if(!F.deck.length||F.i>=F.deck.length)return `<div class="fade">${head}<div class="card" style="text-align:center;padding:40px 20px"><div class="stat">${F.deck.length?'Done':dueCards().length}</div><p class="mut" style="margin:8px auto 0">${F.deck.length?`${F.deck.length} reviews finished. Cards return when due: box 1 tomorrow, box 2 in 2 days, box 3 in 3.`:'cards due now. Pick a week or All, then press Due.'}</p></div></div>`;
  const c=F.deck[F.i],box=S.cards[c.k]?.box||0;
  return `<div class="fade">${head}<div style="margin-top:14px">${F.deck.length<=40?`<div class="pbar">${F.deck.map((_,i)=>`<i class="${i<F.i?'on':''}"></i>`).join('')}</div>`:`<div class="bar"><i style="width:${F.i/F.deck.length*100}%;background:var(--ink)"></i></div>`}</div>
  <div class="stage"><div class="fc ${F.flip?'flip':''}" id="fcard" tabindex="0" role="button" aria-label="Flip card">
   <div class="face"><div class="tag"><span class="eyebrow">${esc(short(R[c.t]).slice(0,40))}</span><span class="eyebrow">box ${box} · ${F.i+1}/${F.deck.length}</span></div><div class="q">${esc(c.f)}</div><div class="small mut">Say it out loud, then flip · <kbd>Space</kbd></div></div>
   <div class="face back"><div class="tag"><span class="eyebrow">Answer</span><span class="eyebrow">${esc(short(R[c.t]).slice(0,40))}</span></div><div class="a">${esc(c.b)}</div></div></div></div>
  ${F.flip?`<div class="rate"><button class="again" data-rate="0">Again<small>1 · box 0</small></button><button data-rate="1">Hard<small>2 · stay</small></button><button class="good" data-rate="2">Good<small>3 · +1</small></button><button data-rate="3">Easy<small>4 · +2</small></button></div>`:`<div class="row" style="justify-content:center"><button class="btn primary" id="flipbtn">Show answer <kbd>Space</kbd></button></div>`}</div>`;}
function rate(r){const c=F.deck[F.i];const cur=S.cards[c.k]||{box:0};let box=cur.box||0;
  if(r===0)box=0;else if(r===2)box=Math.min(5,box+1);else if(r===3)box=Math.min(5,box+2);
  S.cards[c.k]={box,due:r===0?Date.now():Date.now()+INT[box]*DAY-3600e3,seen:(cur.seen||0)+1};ev(c.t,[0,.5,1,1][r],.6);if(r===0)F.deck.push(c);
  logAct();F.i++;F.flip=false;persist();render();}

/* quiz */
let Q={list:[],i:0,picked:null,score:0,res:[],sel:""};
function startQuiz(filter,mode){const fl=filter||scopeIds();let pool=QS.filter(q=>fl.includes(q.t));if(mode==="weak")pool=pool.filter(q=>!S.quiz[q.k]?.last);
  Q={list:shuffle(pool).slice(0,10),i:0,picked:null,score:0,res:[],sel:Q.sel};go("quiz");}
function qBlock(q,picked,meta,mockIdx){const mock=mockIdx!=null;
  return `<div class="qcard"><div class="row between"><span class="eyebrow">${meta}</span></div><p class="qq">${esc(q.q)}</p>${q.o.map((o,j)=>{let cls='';if(!mock&&picked!==null&&picked!==undefined){if(j===q.a)cls='right';else if(j===picked)cls='wrong';}else if(mock&&picked===j)cls='sel';
   return `<button class="opt ${cls}" ${mock?`data-mq="${mockIdx}" data-mk="${j}"`:`data-pick="${j}"`} ${!mock&&picked!=null?'disabled':''}><span class="k">${String.fromCharCode(65+j)}</span><span>${esc(o)}</span></button>`}).join('')}
   ${!mock&&picked!=null?`<div class="expl"><b>${picked===q.a?'Correct.':'Not quite. Answer '+String.fromCharCode(65+q.a)+'.'}</b> ${esc(q.e)}</div>`:''}</div>`;}
function vQuiz(){const head=`<p class="eyebrow">Retrieval practice · exam-style MCQ</p><h2 class="serif">Quiz</h2>
  <div class="row between" style="margin:14px 0">${topicSeg(Q.sel,'data-qsel')}<div class="row"><button class="btn primary sm" id="qgo">Start 10</button><button class="btn sm" id="qweak">Weak spots</button></div></div>`;
  if(!Q.list.length){const right=QS.filter(q=>S.quiz[q.k]?.last).length;return `<div class="fade">${head}<div class="card" style="text-align:center;padding:40px 20px"><div class="stat">${right}<span class="mut" style="font-size:1.2rem"> / ${QS.length}</span></div><p class="mut" style="margin:8px auto 0">questions currently answered correctly. Mixing topics (All) is harder but sticks better. The real exam has no negative marking.</p></div></div>`;}
  if(Q.i>=Q.list.length)return `<div class="fade">${head}<div class="card" style="text-align:center;padding:40px 20px"><div class="stat">${Q.score} / ${Q.list.length}</div><div class="pbar" style="max-width:320px;margin:14px auto">${Q.res.map(r=>`<i class="${r?'r':'w'}"></i>`).join('')}</div><p class="mut" style="margin:0 auto 14px">${Q.score/Q.list.length>=.8?'Strong round.':'Wrong answers stay in Weak spots until you get them right.'}</p><button class="btn primary" id="qagain">Another round</button></div></div>`;
  const q=Q.list[Q.i];
  return `<div class="fade">${head}<div class="pbar" style="margin-bottom:12px">${Q.list.map((_,i)=>`<i class="${i<Q.res.length?(Q.res[i]?'r':'w'):i===Q.i?'on':''}"></i>`).join('')}</div>${qBlock(q,Q.picked,`${Q.i+1} / ${Q.list.length} · ${esc(short(R[q.t]))}`)}
  ${Q.picked!==null?`<div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn primary" id="qnext">${Q.i+1<Q.list.length?'Next':'Finish'} <kbd>Enter</kbd></button></div>`:'<p class="small mut" style="margin-top:10px">Press <kbd>A</kbd>–<kbd>D</kbd> or <kbd>1</kbd>–<kbd>4</kbd></p>'}</div>`;}
function recordQ(q,ok,w){const cur=S.quiz[q.k]||{n:0,c:0};S.quiz[q.k]={n:cur.n+1,c:cur.c+(ok?1:0),last:ok};ev(q.t,ok?1:0,w||1);logAct();}

/* open */
function vOpen(){const ps=course==='psc',sc=ps?scopeIds():READINGS.map(r=>r.id),L=OQ.filter(o=>sc.includes(o.t)).sort((x,y)=>(R[x.t].wk>=6)-(R[y.t].wk>=6)),i=sub&&L[+sub]?+sub:0,q=L[i],st=S.open[q.k]||{};
  return `<div class="fade">${ps?`<p class="eyebrow">Written exam · answer 2 of 6</p><h2 class="serif">Essay practice</h2><p class="lede">Each exam question has a short comprehension part and an essay part. Write (a) in a few sentences, then argue (b) with authors, concepts and cases from the lectures. Reveal the model answer and score yourself.</p>`:`<p class="eyebrow">Part B · ~35 points</p><h2 class="serif">Open questions</h2><p class="lede">Write it as you would in Remindo. Name the theory, argue, support with a concept or quote. Then reveal the model answer and score yourself.</p>`}
  <div class="row" style="margin:14px 0">${L.map((o,j)=>{const s=S.open[o.k];return `<button class="chip ${s&&s.score!=null?(s.score>=.7?'full':'slides'):'plain'}" data-go="${ps?'psc-essay':'open'}" data-sub="${j}" style="cursor:pointer;${j===i?'border-color:var(--ink);color:var(--ink)':''}">${!ps&&R[o.t].wk>=6?'Final · ':''}Q${j+1}</button>`}).join('')}</div>
  <div class="qcard"><div class="row between"><span class="eyebrow">${ps?'':q.pts+' points · '}${esc(short(R[q.t]))}</span><span class="small mut">${(st.ans||'').trim().split(/\s+/).filter(Boolean).length} words</span></div><p class="qq" style="white-space:pre-wrap">${esc(q.q)}</p>
  <textarea data-oans="${q.k}" placeholder="Your answer…">${esc(st.ans||'')}</textarea>
  <div class="row" style="margin-top:10px"><button class="btn primary" id="oreveal" data-k="${q.k}">${st.revealed?'Hide':'Reveal'} model answer</button></div>
  ${st.revealed?`<h4>Model answer</h4><div class="expl" style="white-space:pre-wrap">${esc(q.model)}</div><h4>Score yourself</h4>${q.rubric.map((r,j)=>`<label class="check"><input type="checkbox" data-rub="${q.k}|${j}" ${(st.rub||[])[j]?'checked':''}><span>${esc(r)}</span></label>`).join('')}<p class="eyebrow" style="margin-top:8px">${ps?`Score ${Math.round((st.score||0)*100)}%`:`Score ${Math.round((st.score||0)*q.pts)} / ${q.pts}`}</p>`:''}</div></div>`;}

/* mock */
let M=null;
function startMock(){const mid=MIDR().map(r=>r.id);const by={},pool=shuffle(QS.filter(q=>mid.includes(q.t))),pick=[];for(const q of pool){by[q.t]=by[q.t]||0;if(by[q.t]<3&&pick.length<25){pick.push(q);by[q.t]++;}}for(const q of pool){if(pick.length>=25)break;if(!pick.includes(q))pick.push(q);}
  M={qs:pick,ans:{},open:shuffle(OQ.filter(o=>mid.includes(o.t))).slice(0,3),oans:["","",""],end:Date.now()+120*60e3,done:false,rub:[[],[],[]]};go("mock");}
function vMock(){
  if(!M)return `<div class="fade"><p class="eyebrow">Full simulation</p><h2 class="serif">Mock exam</h2><p class="lede">Same format as 8 October: 25 MCQ (3 points each, no negative marking) + 3 open questions (~35 points), 2 hours, closed book.</p>
  <div class="card" style="margin-top:14px"><div class="row between"><div><b>2-hour mock</b><div class="small mut">25 MCQ from all topics + 3 open questions</div></div><button class="btn primary" id="mstart">Start mock</button></div>
  ${S.mocks.length?`<div class="divider"></div><div class="tbl"><table><thead><tr><th>Date</th><th>MCQ</th><th>Open</th><th>Total</th></tr></thead><tbody>${S.mocks.map(m=>`<tr><td>${m.date}</td><td>${m.mcq}/75</td><td>${m.open}/35</td><td>${m.mcq+m.open}/110 · ${Math.round((m.mcq+m.open)/110*100)}%</td></tr>`).join('')}</tbody></table></div>`:''}</div></div>`;
  const l=Math.max(0,M.end-Date.now());
  if(!M.done)return `<div class="row between" style="position:sticky;top:env(safe-area-inset-top,0px);background:var(--bg);padding:8px 0;z-index:5"><h2 class="serif" style="margin:0">Mock exam</h2><span class="chip missing" id="mtimer" style="font-size:.85rem">${Math.floor(l/60e3)}:${String(Math.floor(l/1e3)%60).padStart(2,'0')}</span></div>
   <h3>Part A · 25 × 3 points</h3><div class="stack">${M.qs.map((q,i)=>qBlock(q,M.ans[i],`Question ${i+1}`,i)).join('')}</div>
   <h3>Part B · open</h3><div class="stack">${M.open.map((q,i)=>`<div class="qcard"><span class="eyebrow">Question ${26+i} · ${q.pts} pts</span><p class="qq" style="white-space:pre-wrap">${esc(q.q)}</p><textarea data-moans="${i}">${esc(M.oans[i])}</textarea></div>`).join('')}</div>
   <div class="row" style="margin-top:16px"><button class="btn primary" id="msubmit">Hand in</button><span class="small mut">${Object.keys(M.ans).length}/25 answered</span></div>`;
  const mcq=M.qs.reduce((a,q,i)=>a+(M.ans[i]===q.a?3:0),0),tot=M.open.reduce((a,q)=>a+q.pts,0);
  const op=Math.round(M.open.reduce((a,q,i)=>a+M.rub[i].filter(Boolean).length/q.rubric.length*q.pts,0)*35/tot);
  return `<div class="fade"><h2 class="serif">Mock results</h2><div class="grid g3" style="margin:14px 0"><div class="card"><div class="eyebrow">Part A</div><div class="stat">${mcq}<span class="mut" style="font-size:1rem">/75</span></div></div><div class="card"><div class="eyebrow">Part B (self-scored)</div><div class="stat">${op}<span class="mut" style="font-size:1rem">/35</span></div></div><div class="card"><div class="eyebrow">Total</div><div class="stat">${Math.round((mcq+op)/110*100)}%</div></div></div>
  <h3>Score your open answers</h3><div class="stack">${M.open.map((q,i)=>`<div class="qcard"><p class="qq" style="white-space:pre-wrap">${esc(q.q)}</p><div class="expl"><b>You wrote:</b><br>${esc(M.oans[i]||'(empty)')}</div><h4>Model answer</h4><div class="expl" style="white-space:pre-wrap">${esc(q.model)}</div>${q.rubric.map((r,j)=>`<label class="check"><input type="checkbox" data-mrub="${i}|${j}" ${M.rub[i][j]?'checked':''}><span>${esc(r)}</span></label>`).join('')}</div>`).join('')}</div>
  <h3>Review your MCQ mistakes</h3><div class="stack">${M.qs.map((q,i)=>M.ans[i]===q.a?'':qBlock(q,M.ans[i]??-1,`Question ${i+1}`)).join('')||'<p>No mistakes.</p>'}</div>
  <div class="row" style="margin-top:16px"><button class="btn primary" id="msave">Save result</button><button class="btn" id="mreset">Close</button></div></div>`;}

function vSources(){return `<div class="fade"><p class="eyebrow">Honesty check</p><h2 class="serif">What this site is built from</h2><p class="lede">"Slides only" readings rely on lecture slides plus general knowledge of the text. Upload the PDFs and they get rebuilt from the real text.</p>
  <h3>Status per reading</h3><div class="list">${READINGS.map(r=>`<div class="item" data-go="readings" data-sub="${r.id}"><span class="chip ${r.status}">${STATUS[r.status]}</span><div style="min-width:0"><div class="t">${esc(r.title)}</div><div class="s">${esc(r.statusNote)}</div></div><span></span></div>`).join('')}</div>
  <h3>Still needed</h3><div class="tbl"><table><thead><tr><th>Reference</th><th>DOI</th><th>Note</th></tr></thead><tbody>${MISSING.map(m=>`<tr><td>${esc(m.r)}</td><td style="font-family:var(--mono);font-size:.78rem;word-break:break-all">${esc(m.doi)}</td><td>${esc(m.note)}</td></tr>`).join('')}</tbody></table></div>
  <h3>On file</h3><ul>${ON_FILE.map(o=>`<li class="small">${esc(o)}</li>`).join('')}</ul></div>`;}
function vMethod(){const M2=[["Practice testing (retrieval)","High utility (Dunlosky et al. 2013); testing effect (Roediger & Karpicke 2006).","Quiz, flashcards, recall boxes, open questions"],["Distributed practice (spacing)","High utility; the same hours spread over days beat cramming (Cepeda et al. 2006).","Leitner boxes (0–8 days); plan revisits every topic 3+ times"],["Interleaving","Moderate utility: trains you to recognise WHICH theory applies.","'All' mode in quiz, cards, mock"],["Elaboration & self-explanation","Moderate utility: asking why/how, linking to what you know.","Framework matrix, examples, exam angles, open questions"],["Exam simulation","Practising in the real format lowers anxiety and shows real readiness.","2-hour mock, same point weights"],["Rereading, highlighting, summarising","Low utility: feel productive, retain little.","Summaries are for understanding; spend most time on retrieval"],["Sleep","Consolidation happens in sleep; skip the all-nighter.","Plan ends light on 7 Oct"]];
  return `<div class="fade"><p class="eyebrow">Evidence-based studying</p><h2 class="serif">How this works</h2>
  <div class="tbl" style="margin-top:14px"><table><thead><tr><th>Technique</th><th>Evidence</th><th>Where</th></tr></thead><tbody>${M2.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
  <h3>How mastery is measured</h3><p><b>Knowledge</b> is a live estimate of how well you know a reading right now: every graded attempt (flashcards, quiz, mock exam, games) moves it, recent attempts count most, and it slowly fades when you stop practising (a forgetting curve that flattens the more you have practised). Mock-exam answers count 1.5×, scenario games 1.2×, self-rated flashcards 0.6×. <b>Coverage</b> is the share of the reading's cards and quiz questions you have tried at least once. <b>Mastery = Knowledge × (0.7 + 0.3 × Coverage)</b>. A reading turns green at 80% mastery with at least 50% coverage, and drops again when you start getting it wrong.</p>
  <h3>Keyboard</h3><p class="small"><kbd>⌘K</kbd> search · <kbd>R</kbd> review due cards · <kbd>Q</kbd> interleaved quiz · <kbd>Space</kbd> flip · <kbd>1</kbd>–<kbd>4</kbd> rate / answer · <kbd>Enter</kbd> next</p>
  <h3>Sources</h3><ul class="small"><li><a href="https://journals.sagepub.com/doi/abs/10.1177/1529100612453266" target="_blank" rel="noopener">Dunlosky et al. (2013)</a></li><li><a href="https://doi.org/10.1111/j.1467-9280.2006.01693.x" target="_blank" rel="noopener">Roediger & Karpicke (2006)</a></li><li><a href="https://doi.org/10.1037/0033-2909.132.3.354" target="_blank" rel="noopener">Cepeda et al. (2006)</a></li></ul>
  <div class="divider"></div><p class="small mut">${saveState==="synced"?"Your progress is saved privately to your account.":"Your progress is saved in this browser only."}</p><button class="btn sm" id="reset">Reset all progress</button><span id="resetc"></span></div>`;}
function vMenu(){return `<div class="fade"><h2 class="serif">More</h2><div class="list" style="margin-top:14px">${NAV.flatMap(g=>g[1]).map(([k,l,i])=>`<div class="item" data-go="${k}">${ic(i)}<div class="t">${l}</div><span class="mut">→</span></div>`).join('')}</div><div class="card" style="margin-top:14px"><div class="eyebrow">Study streak</div>${heatmap()}</div></div>`;}

/* palette */
let P={open:false,q:"",i:0};
function palItems(){const q=P.q.toLowerCase().trim();const acts=[["Review due flashcards","startdue","",`${dueCards().length} due`],["Interleaved quiz (10)","quizmix","","Q"],["Weak-spots quiz","quizweak","",""],["Start mock exam","mock","",""],...NAV.flatMap(g=>g[1]).map(([k,l])=>["Go to "+l,"go",k,""])];
  const reads=READINGS.map(r=>[r.title,"read",r.id,`W${r.wk}`]);
  const cards=q.length>2?CARDS.filter(c=>scopeIds().includes(c.t)&&(c.f+" "+c.b).toLowerCase().includes(q)).slice(0,6).map(c=>[c.f,"read",c.t,"card"]):[];
  const f=a=>!q||a[0].toLowerCase().includes(q)||(a[1]==="read"&&R[a[2]]&&(R[a[2]].theory+" "+R[a[2]].cite).toLowerCase().includes(q));
  return [["Actions",acts.filter(f)],["Readings",reads.filter(f)],["Flashcards",cards]].filter(g=>g[1].length);}
function renderPal(){if(!P.open){$("#palette").innerHTML="";return;}const groups=palItems();let n=0;
  $("#palette").innerHTML=`<div class="pal" id="palbg"><div class="palbox" role="dialog" aria-label="Search"><input id="palin" type="text" placeholder="Search readings, concepts, actions…" value="${esc(P.q)}" autocomplete="off"><div class="palres">${groups.map(([h,items])=>`<div class="h">${h}</div>`+items.map(it=>{const idx=n++;return `<button class="${idx===P.i?'on':''}" data-pi="${idx}" data-pa="${it[1]}" data-pv="${it[2]}">${esc(it[0].length>90?it[0].slice(0,90)+'…':it[0])}<span class="k">${esc(it[3])}</span></button>`}).join('')).join('')||'<p class="small mut" style="padding:12px">No results</p>'}</div></div></div>`;
  const inp=$("#palin");inp.focus();inp.setSelectionRange(inp.value.length,inp.value.length);}
function palRun(a,v){P.open=false;renderPal();
  if(a==="startdue")startFlash(null,false);else if(a==="quizmix")startQuiz(null);else if(a==="quizweak")startQuiz(null,"weak");else if(a==="mock")go("mock");else if(a==="go")go(v);else if(a==="read")go(isPSC(v)?"psc-lecture":"readings",v);}
function openPal(){P={open:true,q:"",i:0};renderPal();}

/* render + events */
function renderBPT(){chromeBPT();
  const V={today:vToday,weeks:vWeeks,readings:vReadings,framework:vFramework,flash:vFlash,quiz:vQuiz,games:vGames,game:vGame,open:vOpen,mock:vMock,sources:vSources,method:vMethod,menu:vMenu};
  $("#app").innerHTML=(V[view]||vToday)();}
document.addEventListener("change",e=>{const t=e.target;
  if(t.dataset.plan){S.plan[t.dataset.plan]=t.checked;persist();render();if(t.checked)toast("Task done");}
  if(t.dataset.read){S.read[t.dataset.read]=t.checked;persist();}
  if(t.dataset.recall){S.recall[t.dataset.recall]=t.checked;if(t.checked)logAct(3);persist();}
  if(t.dataset.rub){const [k,j]=t.dataset.rub.split("|");const q=OQ.find(o=>o.k===k);const st=S.open[k]||{};st.rub=st.rub||[];st.rub[+j]=t.checked;st.score=st.rub.filter(Boolean).length/q.rubric.length;S.open[k]=st;persist();render();}
  if(t.dataset.mrub){const [i,j]=t.dataset.mrub.split("|");M.rub[+i][+j]=t.checked;const y=scrollY;render();scrollTo(0,y);}
});
document.addEventListener("input",e=>{const t=e.target;
  if(t.dataset.note){S.notes[t.dataset.note]=t.value;persist();}
  if(t.dataset.oans){const st=S.open[t.dataset.oans]||{};st.ans=t.value;S.open[t.dataset.oans]=st;persist();}
  if(t.dataset.moans){M.oans[+t.dataset.moans]=t.value;}
  if(t.id==="palin"){P.q=t.value;P.i=0;renderPal();}
});
document.addEventListener("click",e=>{
  if(e.target.id==="palbg"){P.open=false;renderPal();return;}
  const t=e.target.closest("button,[id=fcard]");if(!t)return;
  if(t.dataset.pal||t.id==="kbm"){openPal();return;}
  if(t.dataset.pa){palRun(t.dataset.pa,t.dataset.pv);return;}
  if(t.id==="fcard"||t.id==="flipbtn"){F.flip=!F.flip;render();return;}
  if(t.dataset.rate){rate(+t.dataset.rate);return;}
  if(t.dataset.fsel!=null){F.sel=t.dataset.fsel;render();return;}
  if(t.dataset.qsel!=null){Q.sel=t.dataset.qsel;render();return;}
  if(t.dataset.startdue)startFlash(null,false);
  if(t.dataset.quizmix)startQuiz(null);
  if(t.id==="fdue")startFlash(sel(F.sel),false);
  if(t.id==="fall")startFlash(sel(F.sel),true);
  if(t.dataset.flashtopic)startFlash([t.dataset.flashtopic],true);
  if(t.dataset.quiztopic)startQuiz([t.dataset.quiztopic]);
  if(t.id==="qgo")startQuiz(sel(Q.sel));
  if(t.id==="qweak")startQuiz(sel(Q.sel),"weak");
  if(t.id==="qagain"){Q.list=[];render();}
  if(t.dataset.pick!=null&&Q.picked===null)pick(+t.dataset.pick);
  if(t.id==="qnext"){Q.i++;Q.picked=null;render();}
  if(t.id==="oreveal"){const q=OQ.find(o=>o.k===t.dataset.k);const st=S.open[q.k]||{};st.revealed=!st.revealed;S.open[q.k]=st;persist();render();}
  if(t.id==="mstart")startMock();
  if(t.dataset.mq!=null){M.ans[+t.dataset.mq]=+t.dataset.mk;const y=scrollY;render();scrollTo(0,y);}
  if(t.id==="msubmit"){M.done=true;M.qs.forEach((q,i)=>recordQ(q,M.ans[i]===q.a,1.5));persist();render();scrollTo(0,0);}
  if(t.id==="msave"){const mcq=M.qs.reduce((a,q,i)=>a+(M.ans[i]===q.a?3:0),0);const op=M.open.reduce((a,q,i)=>a+M.rub[i].filter(Boolean).length/q.rubric.length*q.pts,0)*35/M.open.reduce((a,q)=>a+q.pts,0);S.mocks.push({date:new Date().toLocaleDateString('en-GB'),mcq,open:Math.round(op)});persist();M=null;render();toast("Mock saved");}
  if(t.id==="mreset"){M=null;render();}
  if(t.id==="reset"){$("#resetc").innerHTML=' <button class="btn sm" id="reset2" style="border-color:var(--accent);color:var(--accent)">Yes, erase everything</button>';}
  if(t.id==="reset2"){S={read:{},recall:{},cards:{},quiz:{},open:{},plan:{},mocks:[],notes:{},act:{},games:{},k:{},kv:2};persist();render();}
});
function pick(j){const q=Q.list[Q.i];Q.picked=j;const ok=j===q.a;if(ok)Q.score++;Q.res.push(ok);recordQ(q,ok);persist();render();}
document.addEventListener("keydown",e=>{
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();P.open?(P.open=false,renderPal()):openPal();return;}
  if(P.open){const btns=[...document.querySelectorAll(".palres button")];
    if(e.key==="Escape"){P.open=false;renderPal();}
    else if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();P.i=Math.max(0,Math.min(btns.length-1,P.i+(e.key==="ArrowDown"?1:-1)));renderPal();document.querySelector(".palres button.on")?.scrollIntoView({block:"nearest"});}
    else if(e.key==="Enter"){const b=btns[P.i];if(b)palRun(b.dataset.pa,b.dataset.pv);}
    return;}
  if(e.target.matches("textarea,input,select"))return;
  if(e.key==="Enter"&&e.target.matches(".item")){e.target.click();return;}
  if((view==="flash"||view==="psc-flash")&&F.deck.length&&F.i<F.deck.length){if(e.key===" "){e.preventDefault();F.flip=!F.flip;render();return;}if(F.flip&&"1234".includes(e.key)){rate(+e.key-1);return;}}
  if(view==="quiz"&&Q.list.length&&Q.i<Q.list.length){const m={a:0,b:1,c:2,d:3,"1":0,"2":1,"3":2,"4":3}[e.key.toLowerCase()];
    if(Q.picked===null&&m!=null&&m<Q.list[Q.i].o.length){pick(m);return;}if(Q.picked!==null&&e.key==="Enter"){Q.i++;Q.picked=null;render();return;}}
  if(e.key==="r"&&view!=="flash")startFlash(null,false);
  if(e.key==="q"&&view!=="quiz")startQuiz(null);
});
setInterval(()=>{if(M&&!M.done&&view==="mock"){const el=$("#mtimer");if(el){const l=Math.max(0,M.end-Date.now());el.textContent=`${Math.floor(l/60e3)}:${String(Math.floor(l/1e3)%60).padStart(2,'0')}`;if(l===0){M.done=true;render();}}}},1000);
