/* BPT: Theory sheets view (exam-format master sheets, checked against sources). */
function vSheets(){if(typeof BPT_SHEETS==="undefined")return vFinal();
  const cur=BPT_SHEETS.find(s=>s.id===sub)||BPT_SHEETS[0];const i=BPT_SHEETS.indexOf(cur);
  const tabs=BPT_SHEETS.map(s=>`<button data-go="sheets" data-sub="${s.id}" aria-pressed="${s===cur}">${s.id==="0"?"Start":esc(s.id)}</button>`).join('');
  const nfix=BPT_SHEETS.reduce((a,s)=>a+s.fix.length,0);
  const prev=BPT_SHEETS[i-1],next=BPT_SHEETS[i+1];
  return `<div class="fade sheetv"><p class="eyebrow">Final exam · Thu 5 Nov · copy these into your handwritten notes</p><h2 class="serif">Theory sheets</h2>
  <p class="lede noprint">One sheet per theory, in the layout of the exam questions: recognise it (Q1), building blocks (Q1/Q2), framework positions (Q1b/Q2a), use as the alternative (Q2) and research focus and methods (Q3). Made by a classmate and checked line by line against the syllabus, the lecture slides and the readings; ${nfix} points were corrected (marked per sheet).</p>
  <div class="seg sheettabs noprint" style="flex-wrap:wrap">${tabs}</div>
  <div class="row between noprint" style="margin:12px 0"><b>${esc(cur.id==="0"?"How to use the sheets":(cur.id.length>1?"Sheet "+cur.id+": ":"Sheet "+cur.id+": ")+cur.title.replace(/^7\. /,""))}</b><button class="btn sm" id="shprint">Print this sheet</button></div>
  <div class="card sheet">${cur.html}</div>
  ${cur.fix.length?`<div class="card noprint" style="margin-top:12px;border-left:3px solid var(--lime,#ffcd00)"><div class="eyebrow">Checked against the sources: corrected on this sheet</div><ul class="small" style="margin:8px 0 0 18px">${cur.fix.map(f=>`<li>${esc(f)}</li>`).join('')}</ul></div>`:`<p class="small mut noprint" style="margin-top:10px">Checked against the syllabus, slides and readings: no corrections needed on this sheet.</p>`}
  <div class="row between noprint" style="margin-top:14px">${prev?`<button class="btn" data-go="sheets" data-sub="${prev.id}">← ${esc(prev.id==="0"?"Start":prev.id)}</button>`:'<span></span>'}${next?`<button class="btn primary" data-go="sheets" data-sub="${next.id}">${esc(next.id)} →</button>`:''}</div></div>`;}
document.addEventListener("click",e=>{if(e.target.closest("#shprint"))window.print();});
