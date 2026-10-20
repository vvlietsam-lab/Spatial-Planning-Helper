/* 20 Oct: more PSC game material, generated at load from checked lecture content (no new facts).
   Pairs: every PSC concept becomes a term–meaning pair. Odd One Out: three concepts of one lecture + one of another lecture in the same theme.
   Whose idea: statements from the lecture points (slides) with the lecture's own author names masked. */
(function(){if(typeof MG==="undefined")return;let sd=31;const rnd=()=>{sd=(sd*16807)%2147483647;return sd/2147483647;};const sh=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const NOR=typeof PSC_NORE!=="undefined"?PSC_NORE:/^$/;
  const C=[];PSC.forEach(l=>(l.man.concepts||[]).forEach(c=>{if(c[0]&&c[1]&&c[1].length>20&&c[0].length<=60&&!(l.man.noexam&&NOR.test(c[0]+" "+c[1])))C.push({t:l.id,th:l.theme,n:l.n,term:c[0],def:c[1]});}));
  C.forEach(c=>{if(!MG.PAIRS.some(p=>p.t===c.t&&p.term.toLowerCase()===c.term.toLowerCase()))MG.PAIRS.push({t:c.t,term:c.term,def:c.def,auto:1});});
  const byL={};C.forEach(c=>(byL[c.t]=byL[c.t]||[]).push(c));
  for(const id in byL){const mine=byL[id];if(mine.length<3)continue;const others=C.filter(c=>c.t!==id&&c.th===mine[0].th);
    for(let k=0;k<Math.min(4,Math.floor(mine.length/2));k++){const three=sh(mine).slice(0,3),odd=sh(others)[0];if(!odd)continue;const items=sh([...three.map(c=>c.term),odd.term]);
      ODD.push({w:mine[0].th,psc:1,auto:1,items,odd:items.indexOf(odd.term),e:`${three.map(c=>c.term).join(", ")} are from lecture ${mine[0].n}; ${odd.term} is from lecture ${odd.n} (${odd.def})`});}}
  const surn=l=>((l.man.cite||"").split("(")[0].match(/[A-ZÀ-Ž][a-zà-žø'’-]{2,}/g)||[]);
  PSC.forEach(l=>{if(!l.slides)return;const sn=surn(l);(l.lecture||[]).forEach(b=>b.split(/(?<=[.!?])\s+(?=[A-Z])/).filter(s=>s.length>=70&&s.length<=220&&!/\b(slides?|date note|lecture \d)\b/i.test(s)).slice(0,4).forEach(s=>{let t=s;sn.forEach(w=>{t=t.replace(new RegExp("\\b"+w+"\\b","g"),"▇▇▇");});MG.WHO.push({t:l.id,kind:"idea",txt:t,auto:1});}));});
})();
