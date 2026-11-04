/* ===== "Link it (4 in 1)" (4 Nov): four items per round (quotes, concepts, signal words, research questions, methods,
   assumptions, building blocks, cases), each to be linked to the right perspective. Pool = every checked drill item whose answer is a perspective. ===== */
let LKP=null,LK=null;
function lkPool(){if(LKP)return LKP;const thN={};DTH.forEach(t=>{thN[t.n]=t.id;});const seen=new Set();LKP=[];
 const strip=s=>String(s).replace(/\s*The exam allows[^?]*\?/i,"").replace(/\s*(In which|Which|What)\b[^?“”]*\b(perspective|theory)\b[^?]*\?/g,"").replace(/^\s*(Which|What)\b[^?]*\?\s*/i,"").replace(/\s+/g," ").trim();
 let all=[];try{all=dGen("mix");}catch(e){}
 all.forEach(q=>{if(!q||!q.o)return;const id=thN[q.o[q.a]];if(!id)return;if(/^(Highlighting an article|Three of these)/.test(q.q))return;const txt=strip(q.q);if(txt.length<12||txt.length>520)return;
  add(txt,id,q.q,q.e);});
 function add(txt,id,src,e){const m=exTh(txt);if(m.hit.some(h=>h!==id))return;txt=m.t.replace(/^(Passage from a course reading|Quote from a course reading|From the lecture slides|Course example to cite|Signal word in an exam article|You highlight three terms in an exam article|These signal words are highlighted in an article|Real-life example|Typical article|The tell):\s*/i,"").replace(/^Q2: when would you pick this perspective as the alternative\?\s*/i,"Use it as the alternative when: ").replace(/^Concept from a course reading:\s*/i,"").trim();
  txt=txt.replace(/^Highlight practice\.\s*(Passage from a course reading:\s*)?/i,"").replace(/\s+\d\.[”"]?$/,m=>m.includes("”")?"”":"").replace(/\s*Which perspective[^?]*\?\s*$/,"").trim();
  if(/\b(this lecture|same week|this page|this site|this week)\b/i.test(txt))return;
  if(/\?\s*$/.test(txt)&&!/research question|Q3|RQ/i.test(src))return;
  if(txt.length<4||(txt.length<28&&!/Signal|signal|method/i.test(src)))return;const k=txt.toLowerCase().replace(/[^a-z0-9]+/g,"");if(seen.has(k))return;seen.add(k);
  const kind=/^Concept|Concept from/i.test(src)?"Concept":/Signal word|signal words|highlight three/i.test(src)?"Signal words":/alternative/i.test(src)?"Q2 alternative":/research question|Q3/i.test(src)?"Research focus / method":/assumption|assumes|^Assumption/i.test(src)?"Assumption":/building block/i.test(src)?"Building block":/Real-life|Course example|^Case/i.test(src)?"Case":/Typical article|The tell/i.test(src)?"Typical article":/Quote|Passage|lecture slides|“.{60,}/.test(src)?"Quote or passage":"Item";
  LKP.push({t:txt,id,kind,e:e||""});}
 /* extra sources straight from the readings and theory cards */
 Object.keys(DRD).forEach(rid=>{const r=R[rid];if(!r)return;const th=DRD[rid];const mk=x=>typeof mask==="function"?mask(String(x),rid):String(x);
  (r.quotes||[]).forEach(x=>add(mk(x),th,"Quote","Quote from "+short(r)+" ("+DT(th).n+")."));
  (r.concepts||[]).filter(c=>Array.isArray(c)&&c[1]).forEach(c=>add(c[0]+": "+mk(c[1]),th,"Concept","Concept from "+short(r)+" ("+DT(th).n+")."));
  (r.examples||[]).forEach(x=>x&&x.t&&x.d&&add(x.t+". "+mk(x.d),th,"Case","Case from "+short(r)+"."));});
 DTH.forEach(t=>{Object.entries(t.pos||{}).forEach(([a,[v,txt]])=>{if(!DAX[a])return;add("On "+DAX[a][0].toLowerCase()+": "+txt+".",t.id,"Assumption","Assumption of "+t.n+" (sheet "+t.sh+").");});
  (t.meth||[]).forEach(m=>add(m,t.id,"Q3 method","Method for "+t.n+"."));if(t.rq)add(t.rq,t.id,"research question","Typical research question of "+t.n+".");
  (t.blocks||[]).forEach(b=>add(b,t.id,"building block","Building block of "+t.n+" (sheet "+t.sh+")."));if(t.norm)add("Values: "+t.norm,t.id,"assumption","Normative commitments of "+t.n+".");});
 return LKP;}
function lkRound(){const P=lkPool();const T=DTH.map(t=>t.id);const base=dPick(T,1)[0];const near=(typeof SH_NEAR!=="undefined"&&SH_NEAR[base])||[];
 let opts=[base,...dPick(near,2)];while(opts.length<4){const x=dPick(T.filter(i=>!opts.includes(i)),1)[0];opts.push(x);}opts=shuffle(opts);
 let ans=opts.slice();if(Math.random()<0.35){const dup=dPick(opts,1)[0];ans[dPick([0,1,2,3].filter(i=>opts[i]!==dup),1)[0]]=dup;}
 const usedK=new Set();const items=ans.map(id=>{let c=P.filter(x=>x.id===id&&!usedK.has(x.kind));if(!c.length)c=P.filter(x=>x.id===id);const it=dPick(c,1)[0];if(it)usedK.add(it.kind);return it;}).filter(Boolean);
 return {opts,items:shuffle(items),pick:items.map(()=>null),checked:false};}
function lkNew(){LK={r:0,n:6,score:0,tot:0,cur:lkRound(),done:false};}
function vLink(){const nm=id=>DT(id).n;
 if(!LK)return `<div class="fade"><p class="eyebrow">Final exam · Thu 5 Nov</p><h2 class="serif">Link it (4 in 1)</h2><p class="lede">Every round shows four items: a quote, a concept, signal words, a research question, a method, an assumption or a case. Link each one to the right perspective. The four options are often neighbours that are easy to mix up, and a perspective can be the answer twice, or not at all.</p>
  <p class="small mut">${lkPool().length.toLocaleString()} items in the bank, all from the checked sheets, readings and drills. 6 rounds = 24 links.${(S.link&&S.link.best!=null)?" · best: "+S.link.best+"/24":""}</p>
  <div class="row" style="margin-top:12px"><button class="btn primary" id="lkgo">Start</button></div></div>`;
 if(LK.done){S.link=S.link||{};S.link.best=Math.max(S.link.best||0,LK.score);try{persist();}catch(_){}
  return `<div class="fade"><p class="eyebrow">Link it (4 in 1)</p><h2 class="serif">${LK.score} / ${LK.tot}</h2><p class="lede">${LK.score>=LK.tot*0.85?"Exam ready on recognition. Now practise writing the reasons.":LK.score>=LK.tot*0.6?"Good. Look back at the traps you missed: they are usually neighbouring perspectives.":"Go back to the sheets for the perspectives you mixed up, then try again."}</p><div class="row" style="margin-top:12px"><button class="btn primary" id="lkgo">Another game</button><button class="btn" id="lkback">Back</button></div></div>`;}
 const c=LK.cur;const all=c.pick.every(p=>p!=null);
 return `<div class="fade"><div class="row between"><button class="btn sm" id="lkback">${ic('left')} Link it</button><span class="small mut">Round ${LK.r+1} / ${LK.n} · ${LK.score} / ${LK.tot} right</span></div>
 <p class="small mut" style="margin:10px 0 4px">Options this round: ${c.opts.map(id=>"<b>"+esc(nm(id))+"</b>").join(" · ")}. A perspective can be used twice or not at all.</p>
 ${c.items.map((it,i)=>{const ok=c.checked&&c.pick[i]===it.id;return `<div class="qcard" style="margin-top:10px"><span class="eyebrow">${esc(it.kind)}</span><p class="qq" style="font-size:1rem">${esc(it.t)}</p>
  <div class="row" style="gap:6px;flex-wrap:wrap">${c.opts.map(id=>{let cl="";if(c.checked){if(id===it.id)cl="right";else if(c.pick[i]===id)cl="wrong";}else if(c.pick[i]===id)cl="sel";return `<button class="btn sm lkopt ${cl}" data-lk="${i}|${id}" ${c.checked?"disabled":""} style="${cl==="sel"?"background:var(--ink);color:var(--bg)":cl==="right"?"background:#2e7d4f;color:#fff":cl==="wrong"?"background:#b3261e;color:#fff":""}">${esc(nm(id))}</button>`;}).join("")}</div>
  ${c.checked?`<div class="expl">${ok?"Right. ":"It is "+esc(nm(it.id))+". "}${esc(it.e)}</div>`:""}</div>`;}).join("")}
 <div class="row" style="justify-content:flex-end;margin-top:12px">${c.checked?`<button class="btn primary" id="lknext">${LK.r+1<LK.n?"Next round":"Finish"}</button>`:`<button class="btn primary" id="lkcheck" ${all?"":"disabled"}>Check all four</button>`}</div></div>`;}
document.addEventListener("click",e=>{const t=e.target.closest("#lkgo,#lkback,#lkcheck,#lknext,[data-lk]");if(!t)return;
 if(t.id==="lkgo"){lkNew();render();window.scrollTo(0,0);return;}
 if(t.id==="lkback"){LK=null;render();return;}
 if(!LK)return;const c=LK.cur;
 if(t.dataset.lk&&!c.checked){const [i,id]=t.dataset.lk.split("|");c.pick[+i]=id;render();return;}
 if(t.id==="lkcheck"&&c.pick.every(p=>p!=null)){c.checked=true;c.items.forEach((it,i)=>{LK.tot++;if(c.pick[i]===it.id)LK.score++;});if(typeof qTick==="function")qTick(c.items.length);render();return;}
 if(t.id==="lknext"){LK.r++;if(LK.r>=LK.n)LK.done=true;else LK.cur=lkRound();render();window.scrollTo(0,0);}});
