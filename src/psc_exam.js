/* ===== PSC timed exam simulator (13 Oct) =====
   Format from the course manual: 6 essay questions in two parts (a: comprehension, b: essay); answer 2; 3 hours (13:30-16:30); no notes.
   Questions are drawn from the PSC essay bank (only questions with an (a) and (b) part), at most one per lecture, two per theme. */
const XQ=()=>OQ.filter(q=>isPSC(q.t)&&PSC.find(l=>l.id===q.t).theme!==2&&/\(a\)/.test(q.q)&&/\(b\)/.test(q.q));
const xS=()=>{S.pscx=S.pscx||{cur:null,hist:[]};return S.pscx;};
function xNew(){const pool=shuffle(XQ()),pick=[],used=new Set(),th={1:0,3:0};
  for(const q of pool){const t=PSC.find(l=>l.id===q.t).theme;if(used.has(q.t)||!(t in th)||th[t]>=3)continue;pick.push(q.k);used.add(q.t);th[t]++;if(pick.length===6)break;}
  for(const q of pool){if(pick.length>=6)break;if(!pick.includes(q.k)&&!used.has(q.t)){pick.push(q.k);used.add(q.t);}}
  const x=xS();x.cur={qs:pick,chosen:[],ans:{},rub:{},start:Date.now(),dur:180*60000,done:false};persist();render();}
const xQ=k=>OQ.find(o=>o.k===k);
const xLeft=c=>Math.max(0,c.start+c.dur-Date.now());
const xFmt=ms=>{const m=Math.floor(ms/60000),h=Math.floor(m/60);return h+":"+String(m%60).padStart(2,"0");};
const xWords=s=>(s||"").trim().split(/\s+/).filter(Boolean).length;
const xScore=(c,k)=>{const q=xQ(k),r=c.rub[k]||[];return q.rubric.length?r.filter(Boolean).length/q.rubric.length:0;};
let xTimer=null;
function vPSCExam(){const x=xS(),c=x.cur;clearInterval(xTimer);
  const head=`<p class="eyebrow">Mon 26 Oct · 13:30–16:30 · 70% of the grade</p><h2 class="serif">Exam simulator</h2>`;
  if(!c){const h=x.hist.slice(-5).reverse();
    return `<div class="fade">${head}<p class="lede">A full mock in the real format: six questions, each with (a) a short comprehension part and (b) an essay part. Choose two and answer them in three hours, closed book. The questions come from the essay bank: one per lecture, three from theme 1 and three from theme 3 (theme 2 is not on the exam). In the real exam part (a) is worth 10 points and part (b) 40 points. Afterwards you get the model answers and score yourself with the rubric.</p>
    <div class="card"><div class="row between"><div><b>Before you start</b><p class="small mut" style="margin:4px 0 0">Put your notes away. Plan about 10 minutes reading and choosing, 75 minutes per question, and 10 minutes checking. The timer keeps running if you leave this page.</p></div><button class="btn primary" id="xstart">Start a 3-hour mock</button></div></div>${typeof PSC_EXAMINFO!=='undefined'?`<div class="card" style="margin-top:12px"><div class="eyebrow">From the lecturer · ${esc(PSC_EXAMINFO.src)}</div><ul class="small" style="margin:8px 0 0 18px">${PSC_EXAMINFO.lines.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><p class="small mut" style="margin-top:8px">${esc(PSC_EXAMINFO.example)}</p></div>`:''}
    ${h.length?`<h3>Earlier mocks</h3><div class="list">${h.map(r=>`<div class="item" style="cursor:default"><div class="lnum">${Math.round(r.score*100)}</div><div><div class="t">${r.titles.map(esc).join(' · ')}</div><div class="s">${new Date(r.at).toLocaleDateString('en-GB',{day:'numeric',month:'short'})} · ${r.words} words · ${r.mins} min</div></div><div class="r"></div></div>`).join('')}</div>`:''}</div>`;}
  const left=xLeft(c);
  if(c.done){const tot=c.chosen.reduce((s,k)=>s+xScore(c,k),0)/Math.max(1,c.chosen.length);
    return `<div class="fade">${head}<div class="card"><div class="row between"><div><div class="stat">${Math.round(tot*100)}%</div><p class="small mut" style="margin:4px 0 0">Rubric score over your two answers. Tick only what your answer really contains.</p></div><div class="row"><button class="btn" id="xsave">Save to history</button><button class="btn primary" id="xreset">New mock</button></div></div></div>
    ${c.chosen.map(k=>{const q=xQ(k);return `<div class="qcard" style="margin-top:14px"><span class="eyebrow">${esc(short(R[q.t]))} · ${xWords(c.ans[k])} words</span><p class="qq" style="white-space:pre-wrap">${esc(q.q)}</p><h4>Your answer</h4><div class="expl" style="white-space:pre-wrap">${esc(c.ans[k]||'(empty)')}</div><h4>Model answer</h4><div class="expl" style="white-space:pre-wrap">${esc(q.model)}</div><h4>Score yourself</h4>${q.rubric.map((r,j)=>`<label class="check"><input type="checkbox" data-xrub="${k}|${j}" ${(c.rub[k]||[])[j]?'checked':''}><span>${esc(r)}</span></label>`).join('')}<p class="eyebrow" style="margin-top:8px">${Math.round(xScore(c,k)*100)}%</p></div>`;}).join('')}</div>`;}
  xTimer=setInterval(()=>{const el=document.getElementById("xclock");if(!el||view!=="psc-exam"){clearInterval(xTimer);return;}const l=xLeft(c);el.textContent=xFmt(l);if(l<=0){clearInterval(xTimer);c.done=true;persist();render();}},20000);
  return `<div class="fade">${head}
  <div class="card" style="position:sticky;top:8px;z-index:5"><div class="row between"><div><span class="eyebrow">Time left</span><div class="stat" id="xclock">${xFmt(left)}</div></div><div class="small mut">${c.chosen.length}/2 chosen · ${c.chosen.map(k=>xWords(c.ans[k])).reduce((a,b)=>a+b,0)} words</div><div class="row"><button class="btn" id="xquit">Abandon</button><button class="btn primary" id="xhand" ${c.chosen.length?'':'disabled'}>Hand in</button></div></div></div>
  ${c.qs.map((k,i)=>{const q=xQ(k),on=c.chosen.includes(k);return `<div class="qcard" style="margin-top:14px;${on?'border-color:var(--ink)':''}"><div class="row between"><span class="eyebrow">Question ${i+1}</span><button class="btn sm ${on?'primary':''}" data-xpick="${k}" ${!on&&c.chosen.length>=2?'disabled':''}>${on?'Chosen ✓':'Choose this one'}</button></div><p class="qq" style="white-space:pre-wrap">${esc(q.q.replace(/^\s*/,''))}</p>${on?`<textarea data-xans="${k}" style="min-height:320px" placeholder="(a) …&#10;&#10;(b) …">${esc(c.ans[k]||'')}</textarea><div class="small mut" style="margin-top:4px">${xWords(c.ans[k])} words</div>`:''}</div>`;}).join('')}</div>`;}
document.addEventListener("click",e=>{const t=e.target.closest("#xstart,#xhand,#xquit,#xreset,#xsave,[data-xpick]");if(!t)return;const x=xS(),c=x.cur;
  if(t.id==="xstart")return xNew();
  if(t.id==="xquit"){if(c&&!Object.values(c.ans).some(a=>(a||"").trim())){x.cur=null;persist();render();return;}t.textContent="Click again to abandon";t.id="xquit2";return;}
  if(t.id==="xhand"&&c){c.done=true;persist();render();window.scrollTo(0,0);return;}
  if(t.id==="xreset"){x.cur=null;persist();render();return;}
  if(t.id==="xsave"&&c){x.hist.push({at:Date.now(),score:c.chosen.reduce((s,k)=>s+xScore(c,k),0)/Math.max(1,c.chosen.length),titles:c.chosen.map(k=>short(R[xQ(k).t])),words:c.chosen.map(k=>xWords(c.ans[k])).reduce((a,b)=>a+b,0),mins:Math.round((Math.min(Date.now(),c.start+c.dur)-c.start)/60000)});x.cur=null;persist();render();toast("Saved");return;}
  const k=t.dataset.xpick;if(k&&c){const i=c.chosen.indexOf(k);if(i>=0){if(!(c.ans[k]||"").trim())c.chosen.splice(i,1);else{toast("Clear the answer first to swap this question");return;}}else if(c.chosen.length<2)c.chosen.push(k);persist();render();}});
document.addEventListener("click",e=>{const t=e.target.closest("#xquit2");if(!t)return;xS().cur=null;persist();render();});
document.addEventListener("input",e=>{const t=e.target;const c=xS().cur;if(!c)return;
  if(t.dataset.xans){c.ans[t.dataset.xans]=t.value;clearTimeout(t._x);t._x=setTimeout(persist,600);const w=t.nextElementSibling;if(w)w.textContent=xWords(t.value)+" words";}
  if(t.dataset.xrub){const [k,j]=t.dataset.xrub.split("|");c.rub[k]=c.rub[k]||[];c.rub[k][+j]=t.checked;persist();render();}});
document.addEventListener("change",e=>{const t=e.target;if(t.dataset&&t.dataset.xrub){const c=xS().cur;if(!c)return;const [k,j]=t.dataset.xrub.split("|");c.rub[k]=c.rub[k]||[];c.rub[k][+j]=t.checked;persist();render();}});
