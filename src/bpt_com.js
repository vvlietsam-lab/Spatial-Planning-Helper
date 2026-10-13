/* ===== BPT commentary trainer (13 Oct) =====
   The final (5 Nov) asks for a commentary on an article from a clearly defined theoretical position: identify the perspective grounding it,
   support it with quotes, unpack its assumptions (the course's four dimensions), and critique it from an alternative perspective.
   This drill walks through those steps for every BPT reading, using only checked site data (theory, quotes, dims, hard critique/case items). */
const CDL=[["sa","Structure","Agency","the relative weight of structure and agency"],["rt","Reproduction","Transformation","how it explains stability and change"],["de","Deliberate","Emergent","whether change is deliberate or emergent"],["us","Universal","Situated","whether knowledge is universal or situated"],["mp","Monist","Pluralist","whether knowledge is monist or pluralist"]];
const comS=id=>{S.com=S.com||{};return S.com[id]=S.com[id]||{step:0,ok:{},ans:"",pick:{}};};
const comR=()=>READINGS.filter(r=>r.theory&&r.id!=="fw"&&r.wk<=7);
let CM=null;
function comBuild(id){const r=R[id],fam=t=>(t||"").split(/[ (/,:]/)[0].toLowerCase();
  const others=shuffle(comR().filter(x=>x.id!==id&&fam(x.theory)!==fam(r.theory)));
  const steps=[];
  {const d=[...new Map(others.map(x=>[fam(x.theory),x])).values()].slice(0,3);const o=shuffle([r,...d]);steps.push({k:"persp",q:"Which theoretical perspective grounds this article?",o:o.map(x=>x.theory),a:o.indexOf(r),e:`${short(r)}: ${r.theory}. ${r.one||""}`});}
  if((r.quotes||[]).length){const mine=shuffle(r.quotes)[0];const oq=shuffle(others.filter(x=>(x.quotes||[]).length)).slice(0,3).map(x=>({q:shuffle(x.quotes)[0],x}));const o=shuffle([{q:mine,x:r},...oq]);
    steps.push({k:"quote",q:"Your commentary must support the perspective with a quote. Which of these quotes comes from this article?",o:o.map(z=>z.q),a:o.findIndex(z=>z.x===r),e:"The other quotes: "+o.filter(z=>z.x!==r).map(z=>short(z.x)).join("; ")+"."});}
  if(r.dims){CDL.forEach(([k,lo,hi,txt])=>{const v=r.dims[k];if(v==null)return;const pos=v<=38?0:v>=62?2:1;steps.push({k:"dim",q:`Assumptions: on ${txt}, where does this article sit?`,o:[`Closer to ${lo.toLowerCase()}`,"In between / balanced",`Closer to ${hi.toLowerCase()}`],a:pos,e:`The site places it at ${v} on a 0–100 scale from ${lo} (0) to ${hi} (100).`});});
    if(r.dims.norm)steps.push({k:"norm",q:"Values: what normative position comes with this perspective?",info:r.dims.norm});}
  const crit=fresh(ALLQ.filter(q=>q.t===id&&q.lv>=3&&["critique","case","nuance","transfer"].includes(q.fmt)),2).map(permQ);
  crit.forEach(q=>steps.push({k:"crit",q:q.q,o:q.o,a:q.a,e:q.e}));
  steps.push({k:"write",q:"Now write your commentary paragraph by paragraph."});
  return {id,steps,i:0};}
function vCom(){const st=sub&&R[sub]?sub:null;
  if(!st){const rs=comR();return `<div class="fade"><p class="eyebrow">Final exam · Thu 5 Nov · Remindo</p><h2 class="serif">Commentary trainer</h2><p class="lede">The final asks you to write a commentary on an academic article from a clearly defined theoretical position: identify the perspective that grounds it, support that with quotes, and critique it from an alternative perspective. Train the steps on every reading of the course. Each drill: perspective → quote as evidence → assumptions on the four dimensions → values → critique → write.</p>
  ${[1,2,3,4,6,7].map(w=>{const L=rs.filter(r=>r.wk===w);if(!L.length)return'';return `<div class="wkhead"><b>Week ${w}</b></div><div class="list">${L.map(r=>{const s=S.com&&S.com[r.id];const n=s?Object.values(s.ok).filter(Boolean).length:0;return `<div class="item" data-go="commentary" data-sub="${r.id}"><div class="lnum">${s&&s.done?'✓':w}</div><div style="min-width:0"><div class="t">${esc(short(r))}</div><div class="s">${esc(r.theory)}</div></div><div class="r">${s?`<span class="chip ${s.done?'full':'plain'}">${n} right</span>`:''}</div></div>`;}).join('')}</div>`;}).join('')}</div>`;}
  if(!CM||CM.id!==st){CM=comBuild(st);const s=comS(st);s.ok={};s.pick={};}
  const r=R[st],s=comS(st),x=CM.steps[CM.i],N=CM.steps.length;
  const bar=`<div class="pbar" style="margin:10px 0 14px">${CM.steps.map((y,j)=>`<i class="${j<CM.i?(s.ok[j]===false?'w':'r'):j===CM.i?'on':''}"></i>`).join('')}</div>`;
  let body="";
  if(x.k==="norm")body=`<p class="qq">${esc(x.q)}</p><div class="expl">${esc(x.info)}</div>`;
  else if(x.k==="write")body=`<p class="qq">${esc(x.q)}</p><ol class="small" style="margin:0 0 10px 18px"><li><b>Claim and perspective:</b> what does the article argue, and from which theoretical position (name it and its key authors)?</li><li><b>Evidence:</b> two or three short quotes that show the perspective, each with a sentence on why.</li><li><b>Assumptions:</b> where it sits on structure–agency, change and stability, knowledge, and values.</li><li><b>Critique:</b> what an alternative perspective would see that this one misses, and what it would conclude differently.</li><li><b>Conclusion:</b> the relevance and the limits of the perspective for this case.</li></ol><textarea data-comans="${st}" style="min-height:300px" placeholder="Write your commentary…">${esc(s.ans||'')}</textarea><div class="small mut" style="margin-top:4px">${(s.ans||'').trim().split(/\s+/).filter(Boolean).length} words</div>
    <details class="card" style="margin-top:12px"><summary style="cursor:pointer"><b>Check against the key ingredients</b></summary><p class="small" style="margin-top:8px"><b>Perspective:</b> ${esc(r.theory)}</p>${r.one?`<p class="small"><b>Core claim:</b> ${esc(r.one)}</p>`:''}${(r.quotes||[]).length?`<p class="small"><b>Quotes you could use:</b></p>${r.quotes.map(q=>`<blockquote>${esc(q)}</blockquote>`).join('')}`:''}${r.dims&&r.dims.norm?`<p class="small"><b>Values:</b> ${esc(r.dims.norm)}</p>`:''}${r.exam?`<p class="small"><b>Exam angle:</b> ${esc(typeof r.exam==='string'?r.exam:JSON.stringify(r.exam))}</p>`:''}</details>`;
  else{const p=s.pick[CM.i];body=`<p class="qq">${esc(x.q)}</p>${x.o.map((o,j)=>`<button class="opt ${p==null?'':j===x.a?'right':j===p?'wrong':''}" data-comp="${j}" ${p!=null?'disabled':''}><span class="k">${"ABCD"[j]}</span><span>${esc(o)}</span></button>`).join('')}${p!=null?`<div class="expl">${esc(x.e||'')}</div>`:''}`;}
  const canNext=x.k==="norm"||x.k==="write"||s.pick[CM.i]!=null;
  return `<div class="fade"><button class="back" data-go="commentary">${ic('left')} All readings</button><p class="eyebrow">Commentary drill · step ${CM.i+1} of ${N}</p><h2 class="serif">${esc(short(r))}</h2>${bar}<div class="qcard">${body}</div>
  <div class="row" style="margin-top:12px">${CM.i>0?`<button class="btn" data-comnav="-1">${ic('left')} Back</button>`:''}${CM.i<N-1?`<button class="btn primary" data-comnav="1" ${canNext?'':'disabled'}>Next →</button>`:`<button class="btn primary" data-comdone="1">Finish</button>`}<button class="btn" data-go="readings" data-sub="${st}">Open the reading page</button></div></div>`;}
document.addEventListener("click",e=>{const t=e.target.closest("[data-comp],[data-comnav],[data-comdone]");if(!t||!CM)return;const s=comS(CM.id);
  if(t.dataset.comp!=null){const j=+t.dataset.comp;s.pick[CM.i]=j;s.ok[CM.i]=j===CM.steps[CM.i].a;persist();render();return;}
  if(t.dataset.comnav){CM.i=Math.max(0,Math.min(CM.steps.length-1,CM.i+ +t.dataset.comnav));render();window.scrollTo(0,0);return;}
  if(t.dataset.comdone){s.done=true;persist();toast("Drill done");go("commentary");}});
document.addEventListener("input",e=>{const t=e.target;if(t.dataset&&t.dataset.comans){comS(t.dataset.comans).ans=t.value;clearTimeout(t._c);t._c=setTimeout(persist,600);const w=t.nextElementSibling;if(w)w.textContent=t.value.trim().split(/\s+/).filter(Boolean).length+" words";}});
