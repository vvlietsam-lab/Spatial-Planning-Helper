/* ===== Graduate Planning Studio ===== */
const STUDIO_DL=DEADLINES.filter(d=>d[1]==="Studio");
const STUDIO_PHASES=[
 ["I","Problem identification","Research orientation + preliminary research within your topic.","Research plan · 15% · 7 Oct 17:00"],
 ["II","Research","Assess the contemporary dimensions of your topic (approved plan).","Draft 6 Nov · Research report · 30% · 27 Nov 17:00"],
 ["III","Design or retrospective","Future track: a (speculative) intervention (plan, policy, design, law…). Or retrospective track: past decisions → today's spatial patterns, with implications for planning.","Project report & product · 30% · 29 Jan 12:00"],
 ["IV","Showcase","Present at the closing symposium to peers and practitioners.","Final presentation · 25% · 20 Jan"]];
const STUDIO_REQ=[
 "Focus on an urban place inside the Netherlands",
 "Visit the place at least once",
 "Phase I: consult ≥1 societal actor for the problem statement",
 "Phase II: interview ≥1 relevant actor (likely more)",
 "Phase III: get feedback from ≥1 actor on the product and integrate it",
 "Document analysis (maps, policy, zoning, laws…)",
 "Embed in academic literature beyond Brightspace",
 "Set project milestones in the research plan"];
function chromeStudio(){
  $("#side").innerHTML=`<button class="brand homebtn" data-go="home"><div class="logo" style="background:#5e5ce6">STU</div><div><b>Planning Studio</b><small>GEO4-3127 · ← all courses</small></div></button>
  <nav class="nav"><div class="grp">Studio</div><button data-go="studio" aria-current="page">${ic('home')}Overview</button><div class="grp">Other courses</div><button data-go="today">${ic('book')}Beyond Planning Theory</button><button data-go="psc">${ic('book')}Sustainable Cities</button></nav>
  <div class="sidefoot"><div class="lbl">Research plan · 7 Oct</div><div style="margin-top:6px"><span class="big">${dleft(new Date("2026-10-07T17:00:00+02:00"))}</span> <span class="mut small">days</span></div></div>`;
  $("#tabbar").innerHTML=[["home","Courses","grid"],["studio","Studio","home"]].map(([k,l,i])=>`<button data-go="${k}" ${view===k?'aria-current="page"':''}>${ic(i)}${l}</button>`).join('');
  $("#tabbar").style.gridTemplateColumns="repeat(2,1fr)";$("#cdm").textContent=`Plan due in ${dleft(new Date("2026-10-07T17:00:00+02:00"))} days`;}
function vStudio(){S.studio=S.studio||{};
  const next=STUDIO_DL.find(d=>new Date(d[0])>Date.now());
  return `<div class="fade"><p class="eyebrow">GEO4-3127 · Wijsman & Smith · Sep 2026 – Jan 2027</p><h1 class="hero">Graduate <em>Planning Studio</em></h1>
  <p class="lede">Theme 2026/27: <b>Just Cities</b>. A semester-long group project in four phases, graded on group deliverables. There are no exams, plus one individual pass/fail reflection essay.</p>
  ${next?`<div class="card" style="margin:16px 0"><div class="row between"><div><div class="eyebrow">Next deadline</div><div style="font:400 1.8rem/1.15 var(--serif);margin-top:4px">${esc(next[2])}</div><div class="small mut">${new Date(next[0]).toLocaleString('en-GB',{weekday:'long',day:'numeric',month:'long',hour:'2-digit',minute:'2-digit'})} · Brightspace</div></div><div class="stat">${dleft(new Date(next[0]))}<span class="mut" style="font-size:1rem"> days</span></div></div></div>`:''}
  <div class="note" style="margin-bottom:8px">Check with your supervisor: the grading table says the research plan is due <b>7 Oct 17:00</b>, but the week schedule puts it in the Friday column (9 Oct). The earlier date is shown here to be safe.</div>
  <h3>Four phases</h3><div class="grid g2">${STUDIO_PHASES.map(([n,t,d,dl])=>`<div class="flat"><div class="row between"><span class="eyebrow">Phase ${n}</span></div><b>${t}</b><p class="small mut" style="margin:6px 0">${esc(d)}</p><span class="chip plain">${esc(dl)}</span></div>`).join('')}</div>
  <h3>Requirements checklist</h3><div class="flat">${STUDIO_REQ.map((r,i)=>`<label class="check ${S.studio[i]?'done':''}"><input type="checkbox" data-studio="${i}" ${S.studio[i]?'checked':''}><span>${esc(r)}</span></label>`).join('')}</div>
  <h3>All deadlines</h3><div class="list">${STUDIO_DL.map(([d,,t])=>{const dt=new Date(d);const past=dt<Date.now();return `<div class="item" style="cursor:default;${past?'opacity:.55':''}"><div class="lnum">${dt.getDate()}</div><div><div class="t">${esc(t)}</div><div class="s">${dt.toLocaleString('en-GB',{weekday:'short',day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}</div></div><div class="r"><span class="chip ${past?'plain':'slides'}">${past?'done':'in '+dleft(dt)+' days'}</span></div></div>`}).join('')}</div>
  <h3>Readings & sessions</h3><ul class="small"><li>Rocco (2026), chapter 6, for the Just Cities opening symposium</li><li>Janssen &amp; Van Duinen (2025), for the Dutch planning system lecture (Patrick Witte, also PSC lecture 4)</li><li>Mandatory: design thinking workshops with Wiepke Koekenberg, 28 Oct &amp; 4 Nov</li><li>Interim feedback sessions are mandatory. They are informal progress conversations, not full presentations.</li></ul>
  <p class="small mut">Tip: Buitelaar's Just City (BPT week 1) gives you a ready vocabulary for the Just Cities theme: Happy, Equal, Supportive and Free City.</p></div>`;}
document.addEventListener("change",e=>{const t=e.target;if(t.dataset.studio!=null){S.studio=S.studio||{};S.studio[t.dataset.studio]=t.checked;persist();render();}});

render();
