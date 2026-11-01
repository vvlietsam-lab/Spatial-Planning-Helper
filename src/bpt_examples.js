/* BPT: Real-life examples menu: every case from the readings (with page), grouped by theory sheet. */
let EXF={sh:"all",nl:false,q:""};
const NLRE=/Dutch|Netherlands|Amsterdam|Rotterdam|Utrecht|Hague|Haag|Bijlmer|Escamp|Rijnenburg|Green Heart|Randstad|Groningen|Eindhoven|Almere|Oosterwold|Kop van Zuid|planschade|Wet betaalbare|participation society|Voorschriften/i;
function vExamples(){if(typeof exList!=="function")return vFinal();const all=exList();
 const groups=[["all","All"],["F","Foundations (L1–L3)"],["1","1 Rational planning"],["2","2 Rational choice"],["3a","3a RCI"],["3b","3b Sociological"],["3c","3c Historical"],["3d","3d Evolutionary"],["4","4 Political economy"],["5","5 Urban politics"],["6","6 Discourse"]];
 const q=EXF.q.toLowerCase();const L=all.filter(x=>(EXF.sh==="all"||x.sid===EXF.sh)&&(!EXF.nl||NLRE.test(x.t+" "+x.d))&&(!q||(x.t+" "+x.d+" "+x.r.title).toLowerCase().includes(q)));
 const tag=x=>x.sid==="F"?"Foundations":(DT(SHEET_TH[x.sid][0])||{}).n;
 return `<div class="fade"><p class="eyebrow">Final exam · Thu 5 Nov</p><h2 class="serif">Real-life examples</h2>
 <p class="lede">Every concrete case from the course readings, with its source and page, sorted by the theory it illustrates. Use them to make Q2 ("what this perspective helps us see") and Q3 ("concrete examples") specific. ${all.length} cases.</p>
 <div class="row" style="gap:8px;flex-wrap:wrap;margin:10px 0"><input id="exq" type="search" placeholder="Search cases (e.g. housing, Amsterdam, land)" value="${esc(EXF.q)}" style="flex:1;min-width:200px"><label class="small" style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="exnl" ${EXF.nl?'checked':''}> Dutch cases only</label><button class="btn sm primary" data-drill="ex" data-go="drills">Test me on these</button></div>
 <div class="seg" style="flex-wrap:wrap">${groups.map(([k,l])=>`<button data-exsh="${k}" aria-pressed="${EXF.sh===k}">${esc(l)}</button>`).join('')}</div>
 <p class="small mut" style="margin:10px 0">${L.length} shown</p>
 <div class="stack">${L.map(x=>`<div class="card"><div class="row between" style="gap:8px;align-items:flex-start"><b>${esc(x.t)}</b><span class="chip plain" style="white-space:nowrap">${esc(x.sid==="F"?"Foundations":"Sheet "+x.sid)}</span></div><p style="margin:6px 0">${esc(x.d)}</p><div class="small mut">${esc(tag(x))} · <a href="#" data-go="readings" data-sub="${x.r.id}">${esc(short(x.r))}</a>${x.p?" · "+esc(x.p):""}</div></div>`).join('')||'<p class="mut">No cases match.</p>'}</div></div>`;}
document.addEventListener("click",e=>{const t=e.target.closest("[data-exsh]");if(t){EXF.sh=t.dataset.exsh;render();return;}
 const d=e.target.closest('[data-drill="ex"][data-go]');if(d){e.stopPropagation();DR={mode:"ex",qs:dGen("ex").slice(0,12),i:0,pick:null,score:0,done:false};sub="run";view="drills";render();window.scrollTo(0,0);}},true);
document.addEventListener("input",e=>{if(e.target.id==="exq"){EXF.q=e.target.value;clearTimeout(e.target._t);e.target._t=setTimeout(()=>{const pos=e.target.selectionStart;render();const n=document.getElementById("exq");if(n){n.focus();try{n.setSelectionRange(pos,pos);}catch(_){}}},250);}});
document.addEventListener("change",e=>{if(e.target.id==="exnl"){EXF.nl=e.target.checked;render();}});
