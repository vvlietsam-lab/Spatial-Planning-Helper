/* Batch 5 (PSC, no new facts): more CONTENT questions per lecture, built only from the site's own checked text.
   A concept-in-context: a lecture sentence with a concept term blanked; distractors = other concepts of the same lecture (lv2)
   B which definition is WRONG: four concept-definition pairs, one definition belongs to another concept (lv3)
   C case recognition: case description -> case name, and name -> description (lv2), distractors from the same theme
   D two statements I/II, one or both with a detail changed (number/author/quoted term): only I / only II / both / neither (lv3)
   E table cell: which cell belongs to row X under column Y (lv3)
   Theme 2 (L4-L7) uses lecture bullets only, as in batch 4. */
const fs=require('fs');
const L=fs.readFileSync(__dirname+'/all.js','utf8').split('\n');const idx=L.findIndex(l=>l.startsWith('const R=Object.fromEntries'));
const o=new Function('window','document','localStorage',L.slice(0,idx).join('\n')+';return {PSC}')({},{},{});
let seed=41;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const clean=s=>String(s).replace(/\s+/g,' ').replace(/`/g,"'").replace(/\$\{/g,'$ {').trim();
const sents=t=>clean(t).split(/(?<=[.!?])\s+(?=[A-Z'‘"(])/).map(x=>x.trim()).filter(x=>x.length>=60&&x.length<=230&&!/\b(slides?|this page|text version|garbled|date note|uploaded|on file|the site|lecture page|synthesis)\b/i.test(x)&&!/^(This|It|They|These|He|She|His|Her|Their|That|But|And|So|Yet|Also|Here|There|For each|Each|In each|Both|Such)\b/.test(x));
const cut=s=>s.length>220?s.slice(0,217).replace(/\s\S*$/,'')+'…':s;
const NR=/Satg|\bLiu\b|\bZhou\b|Witte|Fu (and|&) Zhang|Africa/i;
const out=[],seen=new Set();
const mk=(t,lv,fmt,q,right,wrong,e)=>{wrong=[...new Set(wrong)].filter(x=>x&&x!==right);const key=q+'|'+right;if(wrong.length<3||seen.has(key))return false;seen.add(key);const opts=shuf([right,...wrong.slice(0,3)]);out.push({t,lv,fmt,q,o:opts,a:opts.indexOf(right),e,auto:5});return true;};
const mask=(d,t)=>{let r=d;(t.match(/[A-ZÀ-Ž][\wÀ-ž'’-]{3,}/g)||[]).filter(w=>!/^(The|With|From|Into|Over|City|Cities)$/.test(w)).forEach(w=>{r=r.split(w).join('▇▇▇');});return r;};
const lab=l=>'lecture '+l.n+' ('+l.title+')';
const T2=['p4','p5','p6','p7'];
const st=l=>{const s=[];(l.lecture||[]).forEach(b=>s.push(...sents(b)));if(!T2.includes(l.id)){(l.man.ext||[]).forEach(sec=>(sec.p||[]).forEach(p=>s.push(...sents(typeof p==='string'?p:''))));(l.man.examples||[]).forEach(x=>s.push(...sents(x.d||'')));}return [...new Set(s)].filter(x=>!NR.test(x));};
const termOf=c=>c[0].replace(/\s*\([^)]*\)\s*$/,'').trim();
// token swapping for D (same as batch 4)
const NUM=/(?:€|\$)?\b\d{1,3}(?:[.,]\d{3})*(?:[.,]\d+)?\s?(?:%|per cent|percent|million|billion|km|ha|hectares|years|cities|villages)?(?=[\s,.;:)'’]|$)/g;
const CIT=/\b([A-ZÀ-Ž][a-zà-žø'’-]+(?:\s(?:&|and)\s[A-ZÀ-Ž][a-zà-žø'’-]+|\set al\.)?)\s\(?((?:19|20)\d{2})\)?/g;
const QT=/['‘]([A-Za-zÀ-ž][^'’]{3,40})['’]/g;
const kind=n=>/%|per cent|percent/.test(n)?'pct':/^(19|20)\d{2}$/.test(n)?'year':/million|billion|€|\$/.test(n)?'money':'n';
const toks=(s,re,f)=>{const r=[];let m;re.lastIndex=0;while((m=re.exec(s))){if(re===NUM){const pre=s.slice(Math.max(0,m.index-5),m.index),post=s.slice(m.index+m[0].length,m.index+m[0].length+1);if(/pp?\.\s?$|[–-]$/.test(pre)||/[–-]/.test(post))continue;}r.push(f(m));}return r;};
const themeOf={};o.PSC.forEach(l=>themeOf[l.id]=l.theme);
for(const l of o.PSC){
  const S=st(l),C=(l.man.concepts||[]).filter(c=>!NR.test(c[0]+c[1]));
  const sameTheme=o.PSC.filter(x=>x.theme===l.theme&&x.id!==l.id);
  const themeTerms=[...new Set(sameTheme.flatMap(x=>(x.man.concepts||[]).map(termOf)))];
  // A concept in context
  const terms=C.map(termOf).filter(t=>t.length>=4&&t.length<=45);
  for(const s of S){for(const t of terms){const re=new RegExp('\\b'+t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b','i');const m=s.match(re);if(!m)continue;
    let d=shuf(terms.filter(x=>x!==t&&!re.test(x)&&!s.toLowerCase().includes(x.toLowerCase())));if(d.length<3)d=d.concat(shuf(themeTerms.filter(x=>!s.toLowerCase().includes(x.toLowerCase())&&x!==t)));
    mk(l.id,2,'recall',`Which concept fills the gap (${lab(l)})? "${cut(s.replace(m[0],'____'))}"`,t,d,`Right: ${t}. "${cut(s)}"`);break;}}
  // B wrong definition
  if(C.length>=5)for(let k=0;k<Math.min(C.length*2,24);k++){const four=shuf(C).slice(0,4);const w=k%4;const other=shuf(C.filter(c=>!four.includes(c)))[0];if(!other)continue;
    const show=four.map((c,i)=>i===w?[c[0],other[1]]:c);const fmt=c=>cut(termOf(c)+': '+c[1]);
    mk(l.id,3,'except',`According to ${lab(l)}, which concept is paired with the WRONG definition?`,fmt(show[w]),show.filter((_,i)=>i!==w).map(fmt),`Wrong: that definition belongs to "${termOf(other)}". ${termOf(four[w])} means: ${four[w][1]}`);}
  // C case recognition
  const ex=(l.man.examples||[]).filter(x=>x.t&&x.d&&!NR.test(x.t+x.d));
  const thEx=o.PSC.filter(x=>x.theme===l.theme).flatMap(x=>(x.man.examples||[]).filter(e=>e.t&&e.d&&!NR.test(e.t+e.d)));
  if(!T2.includes(l.id))for(const x of ex){const d=shuf(thEx.filter(e=>e.t!==x.t).map(e=>e.t));
    const desc=cut(mask(clean(x.d),x.t));
    mk(l.id,2,'case',`Which case from ${lab(l)} is this? "${desc}"`,x.t,d,`Right: ${x.t}. ${desc}`);
    const d2=shuf(thEx.filter(e=>e.t!==x.t).map(e=>cut(mask(clean(e.d),e.t))));
    mk(l.id,2,'case',`${lab(l)}: which description fits the case "${x.t}"?`,desc,d2,`${x.t}: ${desc}`);}
  // D two statements
  const nums=[],names=[],quotes=[];
  for(const s of S){toks(s,NUM,m=>m[0].trim()).filter(n=>/\d/.test(n)&&!/^(1|2|3|4|5)$/.test(n)).forEach(n=>nums.push({v:n,k:kind(n)}));toks(s,CIT,m=>m[1]).filter(n=>!/^(In|The|From|Since|By|After|Before|Between|Until|During|Table|Figure|Fig|Lecture|Chapter|Article)$/.test(n)).forEach(n=>names.push(n));toks(s,QT,m=>m[1]).forEach(n=>quotes.push(n));}
  const pn=k=>[...new Set(nums.filter(x=>x.k===k).map(x=>x.v))],pa=[...new Set(names)],pq=[...new Set(quotes)];
  const alter=s=>{const c=[];toks(s,NUM,m=>m[0].trim()).filter(n=>/\d/.test(n)&&!/^(1|2|3|4|5)$/.test(n)).forEach(n=>{const d=pn(kind(n)).filter(v=>v!==n&&!s.includes(v));if(d.length)c.push([n,shuf(d)[0]]);});
    toks(s,CIT,m=>m[1]).forEach(n=>{const d=pa.filter(v=>v!==n&&!s.includes(v));if(d.length)c.push([n,shuf(d)[0]]);});
    toks(s,QT,m=>m[1]).forEach(n=>{const d=pq.filter(v=>v!==n&&!s.includes(v));if(d.length)c.push([n,shuf(d)[0]]);});
    // concept-term swap as a fourth kind of change
    for(const t of terms){if(s.includes(t)){const d=terms.filter(v=>v!==t&&!s.includes(v));if(d.length)c.push([t,shuf(d)[0]]);break;}}
    if(!c.length)return null;const [a,b]=shuf(c)[0];const t=s.replace(a,b);return t!==s?{t,from:a,to:b}:null;};
  const short=S.filter(s=>s.length<=190);const alt=shuf(short.map(s=>({s,f:alter(s)})).filter(x=>x.f));const tru=shuf(short);
  const OPT=["Only I is correct","Only II is correct","Both are correct","Neither is correct"];
  if(alt.length>=2&&tru.length>=4)for(let k=0;k<Math.min(40,tru.length+alt.length);k++){const pat=k%4;let I,II,e;
    const tA=tru[k%tru.length],tB=tru[(k+1)%tru.length],fA=alt[k%alt.length],fB=alt[(k+1)%alt.length];
    if(pat===0){I={s:tA};II={s:fA.f.t,f:fA};}else if(pat===1){I={s:fA.f.t,f:fA};II={s:tA};}else if(pat===2){I={s:tA};II={s:tB};}else{I={s:fA.f.t,f:fA};II={s:fB.f.t,f:fB};}
    if(I.s===II.s||(pat===3&&fA.s===fB.s))continue;
    const ex2=[I,II].map((x,i)=>(i?'II':'I')+(x.f?` is wrong: "${x.f.f.to}" should be "${x.f.f.from}"`:' is correct')).join('; ');
    mk(l.id,3,'tf',`${lab(l)}: I. ${cut(I.s)} II. ${cut(II.s)}`,OPT[pat],OPT.filter((_,i)=>i!==pat),ex2+'.');}
  // E table cells
  if(l.table&&l.table.head&&l.table.rows&&l.table.rows.length>=3&&!T2.includes(l.id)){const H=l.table.head,Rw=l.table.rows;
    for(let c=1;c<H.length;c++)for(const r of Rw){const right=cut(clean(r[c]||''));if(right.length<3||right.length>160)continue;
      const d=shuf(Rw.filter(x=>x!==r).map(x=>cut(clean(x[c]||''))).filter(x=>x.length>=3&&x!==right));
      mk(l.id,3,'match',`In the table of ${lab(l)}, what goes under "${clean(H[c])}" for "${clean(r[0])}"?`,right,d,`${clean(r[0])} · ${clean(H[c])}: ${right}`);}}
}
const fin=out.filter(q=>q.o.length===4&&new Set(q.o).size===4);
const s=JSON.stringify(fin);if(s.includes('`')||s.includes('${'))throw 'bad chars';
fs.writeFileSync(__dirname+'/../src/autop5.js','const AUTOQP5='+s+';\n');
const per={},fm={};fin.forEach(q=>{per[q.t]=(per[q.t]||0)+1;fm[q.fmt]=(fm[q.fmt]||0)+1;});
console.log(fin.length,JSON.stringify(fm));console.log(JSON.stringify(per));
['recall','except','case','tf','match'].forEach(f=>{const q=fin.find(x=>x.fmt===f);if(q)console.log('['+f+'] '+q.q.slice(0,300)+' => '+q.o[q.a].slice(0,120));});
