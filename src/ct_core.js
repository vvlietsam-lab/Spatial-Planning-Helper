/* ===== Course template (period 2 onwards) =====
   One engine for every new course. A course is data: CT.add({id, code, title, lectures, readings, questions, open, ...}).
   Views are routed as "<id>", "<id>-lectures", "<id>-reading", ... and everything lives inside the CT namespace
   (no new globals besides CT), so courses cannot overwrite each other's functions.
   Progress is stored per course in S.ct[id]. Generated questions are built at runtime and marked as such. */
var CT=(()=>{
const C={};let cur=null;
const LV=["","Knowledge","Comprehension","Application","Analysis","Evaluation"];
const st=id=>{S.ct=S.ct||{};const s=S.ct[id]=S.ct[id]||{};s.q=s.q||{};s.cards=s.cards||{};s.rep=s.rep||{};s.open=s.open||{};s.teach=s.teach||{};s.check=s.check||{};s.notes=s.notes||{};return s;};
const save=()=>{try{persist();}catch(e){}};
const tick=n=>{try{if(typeof qTick==="function")qTick(n||1);}catch(e){}};
const day0=()=>{const d=new Date();d.setHours(0,0,0,0);return d;};
const dleft=d=>(typeof calDays==="function")?calDays(new Date(d)):Math.ceil((new Date(d)-day0())/864e5);
const fmt=(d,o)=>new Date(d).toLocaleDateString("en-GB",o||{weekday:"short",day:"numeric",month:"short"});
const pick=(a,n)=>shuffle(a).slice(0,n);
const hash=s=>{let h=0;for(const c of String(s))h=(h*31+c.charCodeAt(0))|0;return (h>>>0).toString(36);};

/* ---------- registration ---------- */
function add(c){c.questions=(c.questions||[]).map((q,i)=>Object.assign({k:c.id+"-"+(q.id||hash(q.q))},q));
  c.open=c.open||[];c.readings=c.readings||{};c.lectures=c.lectures||[];c.gens=c.gens||[];
  Object.entries(c.readings).forEach(([id,r])=>{r.id=id;});C[c.id]=c;}
const get=id=>C[id];
/* add readings, questions or open questions to a registered course (one data file per batch of readings) */
function extend(id,x){const c=C[id];if(!c)return;Object.entries(x.readings||{}).forEach(([k,r])=>{r.id=k;c.readings[k]=Object.assign(c.readings[k]||{},r);});(x.questions||[]).forEach(q=>c.questions.push(Object.assign({k:id+"-"+(q.id||hash(q.q))},q)));(x.open||[]).forEach(o=>c.open.push(o));Object.assign(c.teach=c.teach||{},x.teach||{});if(x.banner)c.banner=x.banner;}
const isCourseView=v=>!!C[String(v).split("-")[0]];
const courseOf=v=>String(v).split("-")[0];

/* ---------- question banks ---------- */
function concepts(c){return Object.values(c.readings).flatMap(r=>(r.concepts||[]).map(x=>({t:x[0],d:x[1],p:x[2],r:r.id})));}
function generated(c){const out=[];const cs=concepts(c);
  cs.forEach((x,i)=>{const others=cs.filter(y=>y.t!==x.t);if(others.length<3)return;
    out.push({k:c.id+"-gd-"+hash(x.t),gen:true,r:x.r,lv:1,q:"Which term matches this definition? “"+x.d+"”",o:[x.t,...pick(others,3).map(y=>y.t)],a:0,e:x.t+": "+x.d,src:x.p});});
  (c.gens||[]).forEach(g=>{for(let i=0;i<(g.n||6);i++){const q=g.make(i);if(q)out.push(Object.assign({gen:true,k:c.id+"-g"+g.id+"-"+i},q));}});
  return out;}
function bank(c,o){o=o||{};let a=c.questions.concat(o.noGen?[]:generated(c));
  if(o.lec)a=a.filter(q=>(c.readings[q.r]||{}).lec==o.lec||q.lec==o.lec);
  if(o.r)a=a.filter(q=>q.r===o.r);if(o.lv)a=a.filter(q=>q.lv==o.lv);
  if(o.exam)a=a.filter(q=>{const r=c.readings[q.r];return !r||r.exam!==false;});
  return a;}
const perm=q=>{const idx=shuffle(q.o.map((_,i)=>i));return Object.assign({},q,{o:idx.map(i=>q.o[i]),a:idx.indexOf(q.a)});};

/* ---------- small SVG library (diagrams for readings and teacher mode) ---------- */
const SV={
 kink:()=>`<svg viewBox="0 0 360 240" class="wbsvg" role="img" aria-label="Kinked long-run supply function of the space market"><g class="wb" style="--i:0"><path class="ln" d="M40 20 V210 H340"/></g>
  <text class="mut" x="8" y="20" font-size="11">Real rent</text><text class="mut" x="250" y="232" font-size="11">Quantity of space</text>
  <g class="wb" style="--i:1"><path class="ln" style="stroke:var(--info)" d="M70 40 L260 200"/><text x="262" y="196" font-size="11" fill="var(--info)">Demand</text></g>
  <g class="wb" style="--i:2"><path class="ln" style="stroke:var(--ink);stroke-width:2.4" d="M160 210 V120"/><text x="166" y="204" font-size="10" class="mut">existing stock</text></g>
  <g class="wb" style="--i:3"><circle cx="160" cy="120" r="4" fill="var(--accent)"/><text x="166" y="140" font-size="11" fill="var(--accent)">kink</text><path class="ln" style="stroke:var(--ink);stroke-width:2.4" d="M160 120 H330"/><text x="268" y="114" font-size="10" class="mut">level LRMC</text></g>
  <g class="wb" style="--i:4"><path class="ln" style="stroke-dasharray:4 3" d="M160 120 L330 70"/><text x="268" y="66" font-size="10" class="mut">rising</text><path class="ln" style="stroke-dasharray:4 3" d="M160 120 L330 165"/><text x="268" y="176" font-size="10" class="mut">falling</text></g>
  <g class="wb" style="--i:5"><path class="ln" style="stroke:var(--muted);stroke-dasharray:2 3" d="M40 120 H160"/><text x="46" y="114" font-size="10" fill="var(--accent)">replacement cost rent</text></g></svg>`,
 fourq:()=>`<svg viewBox="0 0 400 400" class="wbsvg" role="img" aria-label="DiPasquale-Wheaton four-quadrant diagram"><g class="wb" style="--i:0"><path class="ln" d="M20 200 H380 M200 20 V380"/></g>
  <text x="290" y="34" font-size="10" class="mut">NE · space market:</text><text x="290" y="46" font-size="10" class="mut">rent determination</text>
  <text x="24" y="34" font-size="10" class="mut">NW · asset market:</text><text x="24" y="46" font-size="10" class="mut">valuation (cap rate)</text>
  <text x="24" y="360" font-size="10" class="mut">SW · development:</text><text x="24" y="372" font-size="10" class="mut">construction</text>
  <text x="290" y="360" font-size="10" class="mut">SE · stock</text><text x="290" y="372" font-size="10" class="mut">adjustment</text>
  <text x="206" y="18" font-size="10" class="mut">Rent ($/SF)</text><text x="330" y="214" font-size="10" class="mut">Stock (SF)</text><text x="26" y="214" font-size="10" class="mut">Price ($/SF)</text><text x="206" y="392" font-size="10" class="mut">Construction (SF/yr)</text>
  <g class="wb" style="--i:1"><path class="ln" style="stroke:var(--info);stroke-width:2" d="M220 60 L370 190"/><text x="338" y="168" font-size="10" fill="var(--info)">demand</text></g>
  <g class="wb" style="--i:2"><path class="ln" style="stroke:var(--accent);stroke-width:2" d="M200 200 L40 70"/><text x="44" y="88" font-size="10" fill="var(--accent)">cap rate line</text></g>
  <g class="wb" style="--i:3"><path class="ln" style="stroke:var(--good);stroke-width:2" d="M160 200 L40 330"/><text x="40" y="318" font-size="10" fill="var(--good)">construction</text></g>
  <g class="wb" style="--i:4"><path class="ln" style="stroke:var(--warn);stroke-width:2" d="M200 200 L370 340"/><text x="300" y="300" font-size="10" fill="var(--warn)">replacement</text></g>
  <g class="wb" style="--i:5"><path class="ln" style="stroke:var(--ink);stroke-dasharray:5 4;stroke-width:1.6" d="M298 200 V115 H96 V287 H298 Z"/>
  <text x="300" y="196" font-size="11" fill="var(--ink)">Q*</text><text x="204" y="112" font-size="11" fill="var(--ink)">R*</text><text x="84" y="196" font-size="11" fill="var(--ink)">P*</text><text x="204" y="300" font-size="11" fill="var(--ink)">C*</text></g></svg>`,
 system:()=>`<svg viewBox="0 0 420 250" class="wbsvg" role="img" aria-label="The real estate system: space market, asset market and development industry">
  <g class="wb" style="--i:0"><rect class="bxi" x="10" y="14" width="190" height="80" rx="10"/><text x="22" y="34" font-size="12" font-weight="600" fill="var(--ink)">Space market</text><text x="22" y="54" font-size="10" class="mut">users (demand) × stock (supply)</text><text x="22" y="70" font-size="10" class="mut">→ rents and occupancy</text></g>
  <g class="wb" style="--i:1"><rect class="bxa" x="220" y="14" width="190" height="80" rx="10"/><text x="232" y="34" font-size="12" font-weight="600" fill="var(--ink)">Asset market</text><text x="232" y="54" font-size="10" class="mut">cash flow ÷ required cap rate</text><text x="232" y="70" font-size="10" class="mut">→ property market value</text></g>
  <g class="wb" style="--i:2"><rect class="bxg" x="115" y="156" width="190" height="80" rx="10"/><text x="127" y="176" font-size="12" font-weight="600" fill="var(--ink)">Development industry</text><text x="127" y="196" font-size="10" class="mut">is value ≥ construction cost</text><text x="127" y="212" font-size="10" class="mut">incl. land? → add new space</text></g>
  <g class="wb" style="--i:3"><path class="ln" d="M200 54 H218" marker-end="url(#ar)"/><text x="196" y="46" font-size="9" class="mut">cash flow</text></g>
  <g class="wb" style="--i:4"><path class="ln" d="M315 96 L250 154" marker-end="url(#ar)"/><text x="292" y="132" font-size="9" class="mut">values</text></g>
  <g class="wb" style="--i:5"><path class="ln" d="M160 154 L105 96" marker-end="url(#ar)"/><text x="62" y="132" font-size="9" class="mut">new supply</text></g>
  <defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs></svg>`,
 capmkt:()=>`<div class="tbl"><table><thead><tr><th></th><th>Public markets</th><th>Private markets</th></tr></thead><tbody><tr><th>Equity</th><td>Stocks, <b>REITs</b>, mutual funds</td><td><b>Real property</b>, private equity, hedge funds</td></tr><tr><th>Debt</th><td>Bonds, <b>MBS</b> (incl. CMBS), money instruments</td><td>Bank loans, <b>whole mortgages</b>, venture debt and LBOs</td></tr></tbody></table></div>`
};

/* ---------- chrome (sidebar, tabbar) ---------- */
function chrome(c,view){const nav=[["Course",[[c.id,"Overview","home"],[c.id+"-lectures","Lectures","book"]]],
   ["Practice",c.practice||[[c.id+"-quiz","Quiz","quiz"],[c.id+"-open","Open questions","pen"],[c.id+"-cards","Flashcards","cards"],[c.id+"-exam","Exam simulation","clock"]]],
   ["Extras",[[c.id+"-teach","Teacher mode","spark"],[c.id+"-missing","Readings to add","src"]].concat(c.extras||[])]];
  const ex=c.exam?`<div class="sidefoot"><div class="lbl">${esc(c.exam.label)} · ${fmt(c.exam.date,{day:"numeric",month:"short"})}</div><div class="row between" style="margin-top:6px"><div><span class="big">${Math.max(0,dleft(c.exam.date))}</span> <span class="mut small">days</span></div></div></div>`:"";
  $("#side").innerHTML=`<button class="brand homebtn" data-go="home"><div class="logo" style="background:${c.color}">${esc(c.short)}</div><div><b>${esc(c.title)}</b><small>${esc(c.code)} · ← all courses</small></div></button>
   <button class="kbtn" data-pal="1">${ic('search')} Search or jump to… <span><kbd>⌘K</kbd></span></button>
   <nav class="nav">${nav.map(([g,items])=>`<div class="grp">${g}</div>`+items.map(([k,l,i])=>`<button data-go="${k}" ${view===k?'aria-current="page"':''}>${ic(i)}${l}</button>`).join("")).join("")}</nav>${ex}`;
  const tabs=[[c.id,"Overview","home"],[c.id+"-lectures","Lectures","book"],[(c.practice?c.practice[0][0]:c.id+"-quiz"),"Practice","quiz"],[c.id+"-teach","Teacher","spark"],[c.id+"-menu","More","grid"]];
  $("#tabbar").innerHTML=tabs.map(([k,l,i])=>`<button data-go="${k}" ${view===k?'aria-current="page"':''}>${ic(i)}${l}</button>`).join("");
  $("#tabbar").style.gridTemplateColumns="repeat(5,1fr)";$("#cdm").textContent=c.exam?`${Math.max(0,dleft(c.exam.date))} days to ${c.exam.short||"exam"}`:"";
  const lg=document.querySelector(".topbar .logo"),nm=document.querySelector(".topbar b");if(lg&&nm){lg.textContent=c.short;nm.textContent=c.title;lg.style.background=c.color;lg.style.color="#fff";}
  c._nav=nav;}

/* ---------- views ---------- */
const lecOf=(c,n)=>c.lectures.find(l=>l.n==n);
const rdStatus=r=>r.status==="full"?`<span class="chip ok">${ic('book','ico')} Full text</span>`:`<span class="chip missing">Not uploaded yet</span>`;
function mastery(c){const s=st(c.id);const b=bank(c,{noGen:true});const ok=b.filter(q=>(s.q[q.k]||{}).last).length;return {ok,n:b.length,p:b.length?ok/b.length:0};}

function vOverview(c){const s=st(c.id),m=mastery(c),now=day0();const next=c.lectures.find(l=>new Date(l.d+"T23:59")>=now);
  const have=Object.values(c.readings).filter(r=>r.status==="full").length,tot=Object.values(c.readings).filter(r=>!r.optional).length;
  return `<div class="fade"><p class="eyebrow">${esc(c.code)} · ${esc(c.kind||"")}</p><h1 class="hero">${c.heroHtml||esc(c.title)}</h1><p class="lede">${esc(c.lede||"")}</p>
  ${c.banner?`<div class="note ok" style="margin:14px 0">${c.banner}</div>`:""}
  <div class="row" style="margin:14px 0">${(c.cta||[]).map(([k,l,i],j)=>`<button class="btn ${j?"":"primary"}" data-go="${k}">${ic(i)} ${l}</button>`).join("")}</div>
  <div class="grid g3">${(c.cards||[]).map(x=>`<div class="card"><div class="eyebrow">${esc(x[0])}</div><div class="stat">${x[1]}</div><p class="small mut" style="margin-top:6px">${x[2]}</p></div>`).join("")}
   <div class="card"><div class="eyebrow">Next session</div>${next?`<div style="font:400 1.3rem/1.2 var(--serif);margin-top:6px">${esc(next.title)}</div><p class="small mut" style="margin-top:6px">${next.n?"L"+next.n+" · ":""}${fmt(next.d+"T12:00")}${next.who?" · "+esc(next.who):""}</p>`:"<p>All sessions done.</p>"}</div>
   <div class="card"><div class="eyebrow">Your progress</div><div class="stat">${Math.round(m.p*100)}<span class="mut" style="font-size:1rem">%</span></div><p class="small mut" style="margin-top:6px">${m.ok} of ${m.n} checked questions answered right at least once · readings on file: ${have}/${tot}</p></div></div>
  ${(c.blocks||[]).map(b=>`<h3>${esc(b[0])}</h3>${b[1]}`).join("")}</div>`;}

function vLectures(c){const s=st(c.id);return `<div class="fade"><p class="eyebrow">${c.lectures.length} sessions</p><h2 class="serif">Lectures & readings</h2><p class="lede">Open a lecture to see its readings. Readings marked “not uploaded yet” only show the reference until the PDF is added.</p>
  <div class="list" style="margin-top:14px">${c.lectures.map(l=>{const rs=(l.readings||[]).map(id=>c.readings[id]).filter(Boolean);const open=s.notes["lec"+l.n];
   return `<div class="item" data-ctfold="${l.n}" style="--wk:${c.color}"><div class="lnum">${l.n?("L"+l.n):"·"}</div><div style="min-width:0"><div class="t">${esc(l.title)}</div><div class="s">${fmt(l.d+"T12:00")}${l.who?" · "+esc(l.who):""}${l.tag?" · "+esc(l.tag):""}</div></div><div class="r">${rs.length?`<span class="chip">${rs.filter(r=>r.status==="full").length}/${rs.length} readings</span>`:""}</div></div>
   <div class="ctfold" ${open?"":"hidden"} data-fold="${l.n}" style="padding:4px 16px 14px 64px">${l.note?`<p class="small mut">${l.note}</p>`:""}
    ${rs.map(r=>`<div class="row between" style="padding:8px 0;border-top:1px dashed var(--line);gap:10px"><div style="min-width:0"><div>${esc(r.ref)}</div><div class="small mut">${r.optional?"Optional · ":""}${r.exam===false?"Not exam material · ":""}${r.doi?`<a href="https://doi.org/${esc(r.doi)}" target="_blank" rel="noopener">${esc(r.doi)}</a>`:esc(r.where||"")}</div></div><div class="row" style="gap:6px">${rdStatus(r)}${r.status==="full"?`<button class="btn sm" data-go="${c.id}-reading" data-sub="${r.id}">Open</button>`:""}</div></div>`).join("")||'<p class="small mut">No readings for this session.</p>'}
    <div class="row" style="margin-top:8px;gap:6px">${bank(c,{lec:l.n,noGen:true}).length?`<button class="btn sm" data-ctquiz="lec|${l.n}">${ic('quiz')} Quiz this lecture (${bank(c,{lec:l.n}).length})</button>`:""}${(c.teach||{})[l.n]?`<button class="btn sm" data-go="${c.id}-teach" data-sub="${l.n}">${ic('spark')} Teacher mode</button>`:""}</div></div>`;}).join("")}</div></div>`;}

function vReading(c,id){const r=c.readings[id];if(!r)return vLectures(c);const l=lecOf(c,r.lec);const n=bank(c,{r:id}).length;
  return `<div class="fade"><button class="back" data-go="${c.id}-lectures">${ic('left')} Lectures</button>
  <div class="row" style="gap:6px;margin:6px 0">${l?`<span class="eyebrow">L${l.n} · ${esc(l.title)}</span>`:""}${rdStatus(r)}${r.exam===false?'<span class="chip">Not exam material</span>':""}</div>
  <h2 class="serif" style="margin-top:6px">${esc(r.title||r.ref)}</h2><p class="small mut">${esc(r.ref)}${r.pages?" · "+esc(r.pages):""}</p>
  ${n?`<div class="row" style="margin:12px 0;gap:6px"><button class="btn sm primary" data-ctquiz="r|${id}">${ic('quiz')} Quiz this reading (${n})</button>${[1,2,3,4,5].filter(v=>bank(c,{r:id,lv:v}).length).map(v=>`<button class="btn sm" data-ctquiz="rl|${id}|${v}">${LV[v]} (${bank(c,{r:id,lv:v}).length})</button>`).join("")}</div>`:""}
  ${r.one?`<p class="oneliner">${esc(r.one)}</p>`:""}
  ${(r.summary||[]).map(p=>`<p style="max-width:70ch">${p}</p>`).join("")}
  ${(r.figures||[]).map(f=>`<figure class="card" style="margin:16px 0"><div class="wbwrap">${SV[f.svg]?SV[f.svg]():""}</div><figcaption class="small mut" style="margin-top:8px">${f.cap}</figcaption></figure>`).join("")}
  ${(r.concepts||[]).length?`<h3>Key concepts</h3><div class="tbl"><table><tbody>${r.concepts.map(x=>`<tr><td style="width:28%"><b>${esc(x[0])}</b></td><td>${esc(x[1])}</td><td class="small mut" style="white-space:nowrap">${esc(x[2]||"")}</td></tr>`).join("")}</tbody></table></div>`:""}
  ${(r.quotes||[]).length?`<h3>Quotes to use</h3>${r.quotes.map(x=>`<blockquote class="flat" style="margin:8px 0">“${esc(x[0])}” <span class="small mut">(${esc(x[1])})</span></blockquote>`).join("")}`:""}
  ${(r.exam_angle||[]).length?`<h3>Exam angle</h3><ul>${r.exam_angle.map(x=>`<li>${x}</li>`).join("")}</ul>`:""}</div>`;}

/* quiz runner (shared by quiz, exam simulation and teacher mode) */
let Q=null;
function startQuiz(c,list,label,n){Q={c:c.id,list:shuffle(list).slice(0,n||12).map(perm),i:0,pick:null,score:0,label:label||"Quiz",wrong:[]};go(c.id+"-quiz","run");}
function vQuiz(c,sub){const s=st(c.id);
  if(sub==="run"&&Q&&Q.c===c.id){if(Q.i>=Q.list.length){return `<div class="fade"><button class="back" data-go="${c.id}-quiz">${ic('left')} Quiz</button><div class="card" style="text-align:center;padding:34px 20px;margin-top:10px"><div class="stat">${Q.score}<span class="mut" style="font-size:1.2rem"> / ${Q.list.length}</span></div><p class="mut">${esc(Q.label)}</p>${Q.wrong.length?`<div style="text-align:left;margin-top:16px"><div class="eyebrow">Review what you missed</div>${Q.wrong.map(q=>`<div class="flat" style="margin:8px 0"><b>${esc(q.q)}</b><div class="small" style="margin-top:4px">✓ ${esc(q.o[q.a])}</div><div class="small mut">${esc(q.e||"")}</div></div>`).join("")}</div>`:""}<div class="row" style="justify-content:center;margin-top:14px"><button class="btn primary" data-ctagain="1">Another round</button></div></div></div>`;}
   const q=Q.list[Q.i],done=Q.pick!==null,rep=s.rep[q.k];
   return `<div class="fade"><div class="row between"><button class="back" data-go="${c.id}-quiz">${ic('left')} Quiz</button><span class="small mut">${Q.i+1} / ${Q.list.length} · ${Q.score} right</span></div>
   <div class="qcard" style="margin-top:10px"><div class="row" style="gap:6px"><span class="eyebrow">${LV[q.lv]||""}${q.r&&c.readings[q.r]?" · "+esc(c.readings[q.r].short||""):""}</span>${q.gen?'<span class="chip">Generated variant</span>':""}</div>
   <p class="qq">${esc(q.q)}</p>${q.o.map((o,i)=>`<button class="opt ${done?(i===q.a?"right":i===Q.pick?"wrong":""):""}" data-ctopt="${i}" ${done?"disabled":""}><span class="k">${"ABCD"[i]}</span><span>${esc(o)}</span></button>`).join("")}
   ${done?`<div class="expl">${Q.pick===q.a?"<b>Right.</b> ":"<b>Not quite.</b> "}${esc(q.e||"")}${q.src?` <span class="mut">(${esc(q.src)})</span>`:""}</div>
   <div class="row between" style="margin-top:12px"><button class="btn sm" data-ctrep="${q.k}" ${rep?"disabled":""}>${rep?"Reported, thanks":"Report this question"}</button><button class="btn primary" id="ctnext">${Q.i+1<Q.list.length?"Next":"Finish"}</button></div>`:""}</div></div>`;}
  const all=bank(c,{}),hand=bank(c,{noGen:true});const tried=all.filter(q=>s.q[q.k]).length;
  return `<div class="fade"><p class="eyebrow">${hand.length} checked questions · ${all.length-hand.length} generated variants</p><h2 class="serif">Quiz</h2>
  <p class="lede">Questions follow the exam's five levels: knowledge, comprehension, application, analysis and evaluation. Checked questions come from the readings with page numbers; generated variants (definitions and calculations) are marked. Use “Report this question” when something looks off.</p>
  <div class="row" style="margin:14px 0;gap:6px"><button class="btn primary" data-ctquiz="all">${ic('quiz')} Mixed round (12)</button><button class="btn" data-ctquiz="weak">Mistakes first</button>${c.exam&&c.exam.mc?`<button class="btn" data-go="${c.id}-exam">${ic('clock')} Exam simulation</button>`:""}</div>
  <h3>By level</h3><div class="row" style="gap:6px">${[1,2,3,4,5].map(v=>`<button class="btn sm" data-ctquiz="lv|${v}" ${bank(c,{lv:v}).length?"":"disabled"}>${LV[v]} (${bank(c,{lv:v}).length})</button>`).join("")}</div>
  <h3>By lecture</h3><div class="list">${c.lectures.filter(l=>bank(c,{lec:l.n}).length).map(l=>`<div class="item" data-ctquiz="lec|${l.n}"><div class="lnum">L${l.n}</div><div><div class="t">${esc(l.title)}</div><div class="s">${bank(c,{lec:l.n,noGen:true}).length} checked · ${bank(c,{lec:l.n}).length-bank(c,{lec:l.n,noGen:true}).length} variants</div></div><span class="mut">→</span></div>`).join("")}</div>
  <p class="small mut" style="margin-top:12px">${tried} of ${all.length} questions tried.${Object.keys(s.rep).length?` ${Object.keys(s.rep).length} reported: <button class="btn sm" data-ctcopyrep="1">Copy report list</button>`:""}</p></div>`;}

function vOpen(c,sub){const s=st(c.id);const list=c.open;if(!list.length)return `<div class="fade"><h2 class="serif">Open questions</h2><p class="lede">No open questions yet.</p></div>`;
  return `<div class="fade"><p class="eyebrow">${list.length} questions</p><h2 class="serif">Open questions</h2><p class="lede">${esc(c.openLede||"Write your answer first, then reveal the key points and tick the ones you covered.")}</p>
  ${list.map((o,i)=>{const rev=s.open[o.id];return `<div class="card" style="margin:12px 0"><div class="row" style="gap:6px"><span class="eyebrow">${LV[o.lv]||""}${o.r&&c.readings[o.r]?" · "+esc(c.readings[o.r].short||""):""}</span>${o.mins?`<span class="chip">${o.mins} min</span>`:""}</div><p style="font-weight:500;margin:8px 0">${esc(o.q)}</p>
   <textarea class="ta" rows="4" data-ctnote="open-${o.id}" placeholder="Your answer…">${esc(s.notes["open-"+o.id]||"")}</textarea>
   ${rev?`<div class="expl"><b>Key points</b><ul style="margin:6px 0 0">${o.points.map((p,j)=>`<li><label><input type="checkbox" data-ctchk="${o.id}|${j}" ${s.check[o.id+"|"+j]?"checked":""}> ${esc(p)}</label></li>`).join("")}</ul>${o.model?`<p style="margin-top:8px"><b>Model answer.</b> ${esc(o.model)}</p>`:""}${o.src?`<p class="small mut">${esc(o.src)}</p>`:""}</div>`:`<button class="btn sm" style="margin-top:8px" data-ctreveal="${o.id}">Reveal key points</button>`}</div>`;}).join("")}</div>`;}

let F=null;
function vCards(c){const s=st(c.id);const cs=concepts(c);if(!cs.length)return `<div class="fade"><h2 class="serif">Flashcards</h2><p class="lede">No concept cards yet: they appear automatically once readings for this course are uploaded and summarised.</p></div>`;
  const due=cs.filter(x=>{const k=s.cards[x.t];return !k||k.due<=Date.now();});
  if(!F||F.c!==c.id)F={c:c.id,deck:shuffle(due),i:0,flip:false};
  if(F.i>=F.deck.length)return `<div class="fade"><h2 class="serif">Flashcards</h2><p class="lede">${cs.length} concept cards. Nothing due right now${F.deck.length?" — round done":""}.</p><button class="btn" data-ctcards="all">Review all ${cs.length} anyway</button></div>`;
  const x=F.deck[F.i];return `<div class="fade"><div class="row between"><h2 class="serif">Flashcards</h2><span class="small mut">${F.i+1} / ${F.deck.length}</span></div>
  <div class="qcard" style="margin-top:10px;min-height:200px;cursor:pointer" data-ctflip="1"><span class="eyebrow">${esc((c.readings[x.r]||{}).short||"")}</span><p class="qq" style="font-size:1.3rem">${esc(x.t)}</p>${F.flip?`<div class="expl">${esc(x.d)} <span class="mut">${esc(x.p||"")}</span></div>`:'<p class="small mut">Tap to flip</p>'}</div>
  ${F.flip?`<div class="row" style="margin-top:12px;gap:8px"><button class="btn" data-ctrate="0">Again</button><button class="btn" data-ctrate="1">Good</button><button class="btn primary" data-ctrate="2">Easy</button></div>`:""}</div>`;}

/* exam simulation: MC part (plus open part when the course has open questions) */
let X=null;
function vExam(c,sub){const s=st(c.id);const e=c.exam||{};
  if(!X||X.c!==c.id||sub!=="run")return `<div class="fade"><p class="eyebrow">${esc(e.label||"Exam")}</p><h2 class="serif">Exam simulation</h2><p class="lede">${e.simText||""}</p>
   <div class="row" style="gap:8px;margin:14px 0"><button class="btn primary" data-ctexam="full">${ic('clock')} Full simulation (${e.mc||20} MC + ${e.openN||3} open · ${e.mins||120} min)</button><button class="btn" data-ctexam="short">Short (10 MC · 20 min)</button></div>
   ${s.exams&&s.exams.length?`<h3>Earlier attempts</h3><div class="list">${s.exams.slice(-6).reverse().map(a=>`<div class="item"><div class="lnum">${Math.round(a.p*100)}</div><div><div class="t">${a.score}/${a.n} multiple choice</div><div class="s">${new Date(a.t).toLocaleString("en-GB",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}</div></div></div>`).join("")}</div>`:""}</div>`;
  const left=Math.max(0,Math.round((X.end-Date.now())/1000)),mm=Math.floor(left/60),ss=String(left%60).padStart(2,"0");
  if(X.done){const sc=X.mc.filter((q,i)=>X.ans[i]===q.a).length;return `<div class="fade"><h2 class="serif">Result: ${sc} / ${X.mc.length}</h2><p class="lede">Open questions: compare your answers with the key points below.</p>
    ${X.mc.map((q,i)=>`<div class="flat" style="margin:8px 0"><div class="small mut">${LV[q.lv]||""}</div><b>${esc(q.q)}</b><div class="small" style="margin-top:4px">${X.ans[i]===q.a?"✓":"✗"} Your answer: ${X.ans[i]!=null?esc(q.o[X.ans[i]]):"—"}${X.ans[i]!==q.a?` · right: ${esc(q.o[q.a])}`:""}</div><div class="small mut">${esc(q.e||"")}</div></div>`).join("")}
    ${X.op.map(o=>`<div class="card" style="margin:10px 0"><b>${esc(o.q)}</b><div class="small" style="margin:6px 0;white-space:pre-wrap">${esc(X.txt[o.id]||"(no answer)")}</div><div class="expl"><b>Key points</b><ul>${o.points.map(p=>`<li>${esc(p)}</li>`).join("")}</ul></div></div>`).join("")}
    <button class="btn" data-go="${c.id}-exam">Back</button></div>`;}
  return `<div class="fade"><div class="row between" style="position:sticky;top:0;background:var(--bg);padding:8px 0;z-index:2"><b>${esc(e.label||"Exam")}</b><span class="chip" id="cttimer">${mm}:${ss}</span><button class="btn sm primary" data-ctexamend="1">Hand in</button></div>
   ${X.mc.map((q,i)=>`<div class="qcard" style="margin:10px 0"><span class="eyebrow">Question ${i+1} · ${LV[q.lv]||""}</span><p class="qq">${esc(q.q)}</p>${q.o.map((o,j)=>`<button class="opt ${X.ans[i]===j?"sel":""}" data-ctxa="${i}|${j}"><span class="k">${"ABCD"[j]}</span><span>${esc(o)}</span></button>`).join("")}</div>`).join("")}
   ${X.op.map((o,i)=>`<div class="qcard" style="margin:10px 0"><span class="eyebrow">Open question ${i+1} · ${LV[o.lv]||""}</span><p class="qq">${esc(o.q)}</p><textarea class="ta" rows="6" data-ctxt="${o.id}">${esc(X.txt[o.id]||"")}</textarea></div>`).join("")}</div>`;}

/* teacher mode: scenes = point (text + whiteboard), classmate (misconception, you answer first), check (MC) */
function vTeach(c,sub){const T=c.teach||{};const keys=Object.keys(T);
  if(!sub||!T[sub])return `<div class="fade"><p class="eyebrow">Extra · pilot</p><h2 class="serif">Teacher mode</h2><p class="lede">A guided lesson in short scenes: a key point, a diagram that builds up on the whiteboard, a classmate who says something that sounds right but isn't, and a quick check. Built only from the readings, with page numbers.</p>
   <div class="list" style="margin-top:14px">${c.lectures.map(l=>`<div class="item" ${T[l.n]?`data-go="${c.id}-teach" data-sub="${l.n}"`:""} style="${T[l.n]?"":"opacity:.5;cursor:default"}"><div class="lnum">L${l.n}</div><div><div class="t">${esc(l.title)}</div><div class="s">${T[l.n]?T[l.n].scenes.length+" scenes · about "+T[l.n].mins+" min":"Coming when the lecture material is in"}</div></div><span class="mut">${T[l.n]?"→":""}</span></div>`).join("")}</div></div>`;
  const t=T[sub],s=st(c.id),k="t"+sub;const pos=s.teach[k]||{i:0,ans:{}};s.teach[k]=pos;const i=Math.min(pos.i,t.scenes.length-1),sc=t.scenes[i];const a=pos.ans[i];
  const prog=`<div class="pbar" style="margin:10px 0 16px">${t.scenes.map((_,j)=>`<i class="${j<i?"r":j===i?"on":""}"></i>`).join("")}</div>`;
  let body="";
  if(sc.type==="point")body=`<h3 style="margin-top:0">${esc(sc.title)}</h3>${sc.text.map(p=>`<p style="max-width:66ch">${p}</p>`).join("")}${sc.svg?`<div class="wbwrap wbanim">${SV[sc.svg]()}</div>`:""}${sc.src?`<p class="small mut">Source: ${esc(sc.src)}</p>`:""}`;
  else{const who=sc.type==="classmate";body=`${who?`<div class="row" style="gap:10px;align-items:flex-start"><div class="lnum" style="background:var(--info-soft)">${esc(sc.who||"S")}</div><div class="flat" style="flex:1"><div class="eyebrow">Classmate ${esc(sc.name||"")}</div><p style="margin:6px 0 0">“${esc(sc.say)}”</p></div></div><p style="margin:14px 0 6px;font-weight:500">${esc(sc.ask||"Is that right?")}</p>`:`<h3 style="margin-top:0">Quick check</h3><p class="qq">${esc(sc.q)}</p>`}
    ${sc.o.map((o,j)=>`<button class="opt ${a!=null?(j===sc.a?"right":j===a?"wrong":""):""}" data-ctta="${sub}|${i}|${j}" ${a!=null?"disabled":""}><span class="k">${"ABCD"[j]}</span><span>${esc(o)}</span></button>`).join("")}
    ${a!=null?`<div class="expl"><b>${who?"Teacher":"Explanation"}.</b> ${esc(sc.e)}${sc.src?` <span class="mut">(${esc(sc.src)})</span>`:""}</div>`:""}`;}
  const can=sc.type==="point"||a!=null;
  return `<div class="fade"><div class="row between"><button class="back" data-go="${c.id}-teach">${ic('left')} Teacher mode</button><span class="small mut">Scene ${i+1} / ${t.scenes.length}</span></div><h2 class="serif" style="margin-top:6px">${esc(t.title)}</h2>${prog}
   <div class="card">${body}</div><div class="row between" style="margin-top:12px"><button class="btn" data-ctts="${sub}|${i-1}" ${i?"":"disabled"}>Back</button>${i+1<t.scenes.length?`<button class="btn primary" data-ctts="${sub}|${i+1}" ${can?"":"disabled"}>Next</button>`:`<button class="btn primary" data-ctts="${sub}|0">Start again</button>`}</div></div>`;}

function vMissing(c){const rs=Object.values(c.readings);const miss=rs.filter(r=>r.status!=="full");const dois=miss.map(r=>r.doi?"https://doi.org/"+r.doi:r.where||r.ref);
  return `<div class="fade"><p class="eyebrow">${miss.length} of ${rs.length} readings still to add</p><h2 class="serif">Readings to add</h2><p class="lede">Upload these PDFs in the chat and they get the full treatment: summary, concepts, quotes with page numbers and checked questions. Log in through the UU library for access.</p>
  <div class="row" style="margin:12px 0"><button class="btn sm" data-ctcopy="${esc(dois.join("\n"))}">Copy all ${miss.length} links</button></div>
  <div class="tbl"><table><thead><tr><th>Lecture</th><th>Reading</th><th>Link</th></tr></thead><tbody>${rs.map(r=>`<tr><td>${r.lec?"L"+r.lec:"–"}</td><td>${esc(r.ref)}${r.optional?' <span class="chip">optional</span>':""}</td><td>${r.status==="full"?'<span class="chip ok">on file</span>':r.doi?`<a href="https://doi.org/${esc(r.doi)}" target="_blank" rel="noopener" style="font-family:var(--mono);font-size:.78rem;word-break:break-all">${esc(r.doi)}</a>`:`<span class="small mut">${esc(r.where||"")}</span>`}</td></tr>`).join("")}</tbody></table></div></div>`;}

function vMenu(c){return `<div class="fade"><h2 class="serif">More</h2><div class="list" style="margin-top:14px"><div class="item" data-go="home">${ic('grid')}<div class="t">All courses</div><span class="mut">→</span></div>${(c._nav||[]).flatMap(g=>g[1]).map(([k,l,i])=>`<div class="item" data-go="${k}">${ic(i)}<div class="t">${l}</div><span class="mut">→</span></div>`).join("")}</div></div>`;}

function render(view,sub){const id=courseOf(view);const c=C[id];cur=id;chrome(c,view);const part=view.slice(id.length+1);
  const V={"":vOverview,lectures:vLectures,reading:x=>vReading(x,sub),quiz:x=>vQuiz(x,sub),open:x=>vOpen(x,sub),cards:vCards,exam:x=>vExam(x,sub),teach:x=>vTeach(x,sub),missing:vMissing,menu:vMenu};
  Object.assign(V,c.views||{});let html;try{html=(V[part]||vOverview)(c,sub);}catch(e){console.error(e);html=`<div class="note bad">Something went wrong on this page (${esc(e.message)}). The rest of the site still works.</div>`;}
  $("#app").innerHTML=html;}

/* ---------- events ---------- */
document.addEventListener("click",e=>{const t=e.target.closest("[data-ctquiz],[data-ctopt],#ctnext,[data-ctagain],[data-ctrep],[data-ctcopyrep],[data-ctfold],[data-ctreveal],[data-ctchk],[data-ctflip],[data-ctrate],[data-ctcards],[data-ctexam],[data-ctxa],[data-ctexamend],[data-ctta],[data-ctts],[data-ctcopy]");if(!t||!cur)return;const c=C[cur],s=st(cur);const d=t.dataset;
 if(d.ctquiz){const [m,a,b]=d.ctquiz.split("|");let list,label;
   if(m==="all"){list=bank(c,{});label="Mixed round";}else if(m==="weak"){const all=bank(c,{});list=all.filter(q=>s.q[q.k]&&!s.q[q.k].last);if(list.length<12)list=list.concat(shuffle(all.filter(q=>!s.q[q.k])).slice(0,12-list.length));label="Mistakes first";}
   else if(m==="lv"){list=bank(c,{lv:+a});label=LV[a];}else if(m==="lec"){list=bank(c,{lec:+a});label="Lecture "+a;}else if(m==="r"){list=bank(c,{r:a});label=(c.readings[a]||{}).short||"Reading";}else if(m==="rl"){list=bank(c,{r:a,lv:+b});label=((c.readings[a]||{}).short||"")+" · "+LV[b];}
   if(!list||!list.length){toast("No questions here yet");return;}startQuiz(c,list,label,12);return;}
 if(d.ctopt&&Q&&Q.pick===null){const q=Q.list[Q.i];Q.pick=+d.ctopt;const ok=Q.pick===q.a;if(ok)Q.score++;else Q.wrong.push(q);const r=s.q[q.k]=s.q[q.k]||{n:0,c:0};r.n++;if(ok)r.c++;r.last=ok;save();tick(1);render(cur+"-quiz","run");return;}
 if(t.id==="ctnext"&&Q){Q.i++;Q.pick=null;render(cur+"-quiz","run");window.scrollTo(0,0);return;}
 if(d.ctagain&&Q){const all=Q.list;startQuiz(c,bank(c,{}).filter(q=>!all.some(x=>x.k===q.k)).length>=12?bank(c,{}).filter(q=>!all.some(x=>x.k===q.k)):bank(c,{}),"Mixed round",12);return;}
 if(d.ctrep){const note=prompt?null:null;s.rep[d.ctrep]={t:Date.now()};save();toast("Reported. Use “Copy report list” on the quiz page to send them.");render(cur+"-quiz","run");return;}
 if(d.ctcopyrep){const all=bank(c,{});const txt=Object.keys(s.rep).map(k=>{const q=all.find(x=>x.k===k);return q?`[${k}] ${q.q}`:k;}).join("\n");(navigator.clipboard?navigator.clipboard.writeText(txt):Promise.reject()).then(()=>toast("Report list copied")).catch(()=>toast("Copy blocked"));return;}
 if(d.ctcopy){(navigator.clipboard?navigator.clipboard.writeText(d.ctcopy):Promise.reject()).then(()=>toast("Copied")).catch(()=>toast("Copy blocked"));return;}
 if(d.ctfold){const f=document.querySelector(`[data-fold="${d.ctfold}"]`);if(f){f.hidden=!f.hidden;s.notes["lec"+d.ctfold]=!f.hidden;save();}return;}
 if(d.ctreveal){s.open[d.ctreveal]=1;save();tick(1);render(cur+"-open");return;}
 if(d.ctchk){s.check[d.ctchk]=t.checked;save();return;}
 if(d.ctflip){F.flip=!F.flip;render(cur+"-cards");return;}
 if(d.ctrate){const x=F.deck[F.i];const k=s.cards[x.t]=s.cards[x.t]||{box:0};const r=+d.ctrate;k.box=r===0?0:Math.min(5,k.box+r);k.due=Date.now()+[0,1,3,7,14,30][k.box]*864e5;F.i++;F.flip=false;save();tick(1);render(cur+"-cards");return;}
 if(d.ctcards){F={c:cur,deck:shuffle(concepts(c)),i:0,flip:false};render(cur+"-cards");return;}
 if(d.ctexam){const full=d.ctexam==="full",e=c.exam||{};const pool=bank(c,{exam:true});const mc=shuffle(pool).slice(0,full?(e.mc||20):10).map(perm);const op=full?shuffle(c.open.filter(o=>{const r=c.readings[o.r];return !r||r.exam!==false;})).slice(0,e.openN||3):[];
   X={c:cur,mc,op,ans:{},txt:{},end:Date.now()+(full?(e.mins||120):20)*60000,done:false};go(cur+"-exam","run");clearInterval(X.tm);X.tm=setInterval(()=>{const el=document.getElementById("cttimer");if(!el||!X||X.done){clearInterval(X&&X.tm);return;}const left=Math.max(0,Math.round((X.end-Date.now())/1000));el.textContent=Math.floor(left/60)+":"+String(left%60).padStart(2,"0");if(!left)endExam();},1000);return;}
 if(d.ctxa&&X&&!X.done){const [i,j]=d.ctxa.split("|").map(Number);X.ans[i]=j;t.parentElement.querySelectorAll(".opt").forEach((b,k)=>b.classList.toggle("sel",k===j));return;}
 if(d.ctexamend){endExam();return;}
 if(d.ctta){const [l,i,j]=d.ctta.split("|");const pos=s.teach["t"+l];pos.ans[i]=+j;save();tick(1);render(cur+"-teach",l);return;}
 if(d.ctts){const [l,i]=d.ctts.split("|");const pos=s.teach["t"+l];pos.i=Math.max(0,+i);if(+i===0&&pos.i===0)pos.ans={};save();render(cur+"-teach",l);window.scrollTo(0,0);return;}
});
function endExam(){if(!X||X.done)return;X.done=true;clearInterval(X.tm);const s=st(X.c);const sc=X.mc.filter((q,i)=>X.ans[i]===q.a).length;s.exams=s.exams||[];s.exams.push({t:Date.now(),score:sc,n:X.mc.length,p:X.mc.length?sc/X.mc.length:0});
  X.mc.forEach((q,i)=>{const r=s.q[q.k]=s.q[q.k]||{n:0,c:0};r.n++;const ok=X.ans[i]===q.a;if(ok)r.c++;r.last=ok;});save();tick(X.mc.length);render(X.c+"-exam","run");window.scrollTo(0,0);}
document.addEventListener("input",e=>{const t=e.target;if(!cur)return;const s=st(cur);
 if(t.dataset.ctnote){s.notes[t.dataset.ctnote]=t.value;clearTimeout(t._t);t._t=setTimeout(save,500);}
 if(t.dataset.ctxt&&X)X.txt[t.dataset.ctxt]=t.value;});

return {add,extend,get,C,render,isCourseView,courseOf,bank,generated,concepts,st,dleft,fmt,LV,SV,mastery,list:()=>Object.values(C)};
})();

/* ---------- routing: hook the template courses into the existing router ---------- */
(function(){const _go=go,_render=render;
  go=function(v,s){if(v&&String(v).includes("~")){[v,s]=String(v).split("~");}if(v&&CT.isCourseView(v)){course=CT.courseOf(v);view=v;sub=s??null;render();window.scrollTo(0,0);return;}return _go(v,s);};
  render=function(){try{document.body.classList.toggle("winter",typeof isWinter==="function"&&isWinter());}catch(e){}if(course&&CT.get(course)){try{history.replaceState(null,"","#"+view)}catch(e){}document.body.classList.remove("is-home");CT.render(view,sub);return;}return _render();};
  try{const h=location.hash.slice(1);if(h&&CT.isCourseView(h)){course=CT.courseOf(h);view=h;}}catch(e){}
  const _pal=palItems;palItems=function(){const g=_pal();const q=(typeof P!=="undefined"&&P.q)?P.q.toLowerCase():"";const items=CT.list().flatMap(c=>[[c.title+" · overview","go",c.id,""],[c.title+" · lectures","go",c.id+"-lectures",""],[c.title+" · quiz","go",c.id+"-quiz",""],...Object.values(c.readings).filter(r=>r.status==="full").map(r=>[c.short+" · "+(r.short||r.ref),"go",c.id+"-reading~"+r.id,"reading"])]).filter(a=>!q||a[0].toLowerCase().includes(q));if(items.length)g.unshift(["Period 2",items]);return g;};
})();
