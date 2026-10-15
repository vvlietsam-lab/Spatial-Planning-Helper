/* PSC batch 3 (no new facts): builds quiz items from verified site text only:
   lecture points (from slides), extended summaries, examples, comparison tables and recommended-reading abstracts.
   Types: attribution (which lecture), fill-in (masked concept term), example→lecture, table lookups, True/False I–IV attribution, 4-way matching. */
const fs=require('fs');const L=fs.readFileSync(__dirname+'/all.js','utf8').split('\n');const idx=L.findIndex(l=>l.startsWith('const R=Object.fromEntries'));
const o=new Function('window','document','localStorage',L.slice(0,idx).join('\n')+';return {PSC}')({},{},{});
let seed=11;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const PS=o.PSC,byId={};PS.forEach(l=>byId[l.id]=l);const ids=PS.map(l=>l.id);
const lab=id=>{const l=byId[id];return 'L'+l.n+' '+l.title;};
const theme=id=>byId[id].theme;
const near=id=>[...shuf(ids.filter(x=>x!==id&&theme(x)===theme(id))),...shuf(ids.filter(x=>x!==id&&theme(x)!==theme(id)))];
const surn=id=>{const c=byId[id].man.cite||'';const s=new Set();(c.split('(')[0].match(/[A-ZÀ-Ž][a-zà-žø'’-]{2,}/g)||[]).forEach(w=>s.add(w));return [...s];};
const clean=s=>s.replace(/\s+/g,' ').replace(/`/g,"'").replace(/\$\{/g,'$ {').trim();
const cut=s=>s.length>230?s.slice(0,227).replace(/\s\S*$/,'')+'…':s;
const sents=t=>clean(t).split(/(?<=[.!?])\s+(?=[A-Z'‘"(])/).map(x=>x.trim()).filter(x=>x.length>=70&&x.length<=260&&!/\b(slides?|this page|text version|garbled|date note|uploaded|on file|the site|lecture page|lecture \d+)\b/i.test(x)&&!/^(This|It|They|These|He|She|His|Her|Their|That|But|And|So|Yet|Also|Here|There|For each|Each|In each|Both|Such)\b/.test(x));
// ---- collect statements per lecture
const ST=[];
for(const l of PS){const id=l.id;const m=l.man;
  (l.lecture||[]).forEach(b=>sents(b).forEach(s=>ST.push({t:id,s,src:'slides'})));
  if(!['p4','p5','p6','p7'].includes(id))(m.ext||[]).forEach(sec=>(sec.p||[]).forEach(p=>sents(typeof p==='string'?p:JSON.stringify(p)).forEach(s=>ST.push({t:id,s,src:'reading'}))));
  if(!['p4','p5','p6','p7'].includes(id))(l.rec||[]).forEach(r=>{if(r.abs)sents(r.abs).forEach(s=>ST.push({t:id,s,src:'rec'}));});
}
// mask names of the lecture's own authors and words from its title so the stem does not give the answer away
const mask=(s,id)=>{let t=s;surn(id).forEach(w=>{t=t.replace(new RegExp('\\b'+w+'\\b','g'),'▇▇▇');});return t;};
const give=(s,id)=>{const ttl=byId[id].title.toLowerCase().split(/\W+/).filter(w=>w.length>=6);const lw=s.toLowerCase();return ttl.filter(w=>lw.includes(w)).length>=2;};
const out=[];const seen=new Set();
const mk=(t,lv,fmt,q,right,wrong,e)=>{wrong=[...new Set(wrong)].filter(x=>x!==right);if(wrong.length<3||seen.has(q))return;seen.add(q);const opts=shuf([right,...wrong.slice(0,3)]);out.push({t,lv,fmt,q,o:opts,a:opts.indexOf(right),e,auto:3});};
// A attribution: which lecture
for(const x of ST){if(give(x.s,x.t))continue;const s=mask(x.s,x.t);
  mk(x.t,x.src==='slides'?2:1,'who',`Which PSC lecture does this come from? "${cut(s)}"`,lab(x.t),near(x.t).slice(0,3).map(lab),`From ${lab(x.t)} (${x.src==='slides'?'lecture slides':x.src==='rec'?'a recommended reading':'the mandatory reading'}).`);}
// B fill-in: concept term masked inside a statement of the same lecture
const C=[];for(const l of PS)(l.man.concepts||[]).forEach(c=>{if(c[0]&&c[0].length<=48)C.push({t:l.id,term:c[0].replace(/\s*\(.*?\)\s*/g,' ').trim()});});
for(const c of C){if(c.term.length<5)continue;const re=new RegExp(c.term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i');
  const hits=ST.filter(x=>x.t===c.t&&re.test(x.s)).slice(0,3);
  for(const h of hits){const q=`Fill in the blank (${lab(c.t)}): "${cut(h.s.replace(re,'______'))}"`;
    const d=[...shuf(C.filter(y=>y.t===c.t&&y.term.toLowerCase()!==c.term.toLowerCase())),...shuf(C.filter(y=>theme(y.t)===theme(c.t)&&y.t!==c.t))].map(y=>y.term).filter(y=>!re.test(y)&&!new RegExp(y.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i').test(c.term));
    mk(c.t,2,'recall',q,c.term,d,`The missing term is "${c.term}": ${cut(h.s)}`);}}
// C examples
const EX=[];for(const l of PS.filter(l=>!['p4','p5','p6','p7'].includes(l.id)))(l.man.examples||[]).forEach(x=>{if(x.t&&x.d)EX.push({t:l.id,ti:clean(x.t),d:clean(x.d)});});
for(const x of EX){mk(x.t,1,'example',`Which lecture uses the example "${x.ti}"?`,lab(x.t),near(x.t).slice(0,3).map(lab),`${x.ti} (${lab(x.t)}): ${cut(x.d)}`);
  const ds=sents(x.d);if(ds[0])mk(x.t,2,'example',`Which example is described here? "${cut(mask(ds[0],x.t).replace(new RegExp(x.ti.split(/\W+/).filter(w=>w.length>4).join('|')||'^$','gi'),'▇▇▇'))}"`,x.ti,shuf(EX.filter(y=>y.ti!==x.ti&&theme(y.t)===theme(x.t))).map(y=>y.ti),`${x.ti} (${lab(x.t)}).`);}
// D tables: cell lookups
for(const l of PS){if(['p4','p5','p6','p7'].includes(l.id))continue;const T=l.table;if(!T||!T.rows||T.rows.length<4)continue;const H=T.head;
  for(let c=1;c<H.length;c++)for(const r of T.rows){const v=clean(String(r[c]||''));const k=clean(String(r[0]||''));if(v.length<8||k.length<2)continue;
    const others=T.rows.filter(x=>x!==r).map(x=>clean(String(x[0]||''))).filter(x=>x&&x!==k);
    mk(l.id,3,'case',`In the ${lab(l.id)} comparison table, which ${H[0].toLowerCase()} has "${H[c]}: ${cut(v)}"?`,k,shuf(others),`${k}: ${H[c]} = ${v}.`);}}
// E True/False I–IV: which statements come from lecture X
const pat=v=>v.map((b,i)=>["I","II","III","IV"][i]+" "+(b?"T":"F")).join(" · ");
const tfOpts=v=>{const all=[];for(let m=0;m<16;m++)all.push([0,1,2,3].map(i=>!!(m>>i&1)));const d=a=>a.reduce((s,b,i)=>s+(b!==v[i]),0);const far=shuf(all.filter(a=>d(a)>=2)),one=shuf(all.filter(a=>d(a)===1));return [one[0],far[0],far[1]].map(pat);};
for(const id of ids){const mine=shuf(ST.filter(x=>x.t===id&&!give(x.s,id)&&x.s.length<=200)),theirs=shuf(ST.filter(x=>x.t!==id&&theme(x.t)===theme(id)&&x.s.length<=200));
  for(let k=0;k<14&&mine.length>=2&&theirs.length>=2;k++){const truth=[0,1,2,3].map(()=>rnd()<.5);if(truth.every(x=>x)||truth.every(x=>!x))truth[k%4]=!truth[k%4];
    let a=k*2,b=k*2;const items=truth.map(t=>t?mine[a++%mine.length]:theirs[b++%theirs.length]);if(new Set(items).size<4)continue;
    mk(id,3,'tf',`Which statements come from ${lab(id)} (T) and which from other lectures in the same theme (F)? ${items.map((x,i)=>`${["I","II","III","IV"][i]}. ${mask(x.s,x.t)}`).join(' ')}`,pat(truth),tfOpts(truth),items.map((x,i)=>`${["I","II","III","IV"][i]}: ${lab(x.t)}`).join('; '));}}
// F 4-way matching across lectures (super hard)
const R4=["I","II","III","IV"];
for(let k=0;k<420;k++){const four=shuf(ids).slice(0,4);const st=four.map(id=>shuf(ST.filter(x=>x.t===id&&!give(x.s,id)&&x.s.length<=170))[0]);if(st.some(x=>!x))continue;
  const right=four.map((id,i)=>R4[i]+"–L"+byId[id].n).join(' · ');const wr=[];for(let j=0;j<12&&wr.length<3;j++){const p=shuf(four);const s=p.map((id,i)=>R4[i]+"–L"+byId[id].n).join(' · ');if(s!==right&&!wr.includes(s))wr.push(s);}
  mk(four[0],4,'match',`Match each statement to its lecture. ${st.map((x,i)=>`${R4[i]}. ${mask(x.s,x.t)}`).join(' ')}`,right,wr,st.map((x,i)=>`${R4[i]}: ${lab(x.t)}`).join('; '));}
const fin=out.filter(q=>q.o.length===4&&new Set(q.o).size===4);
const s=JSON.stringify(fin);if(s.includes('`')||s.includes('${'))throw 'bad chars';
fs.writeFileSync(__dirname+'/../src/autop3.js','const AUTOQP3='+s+';\n');
const lv={},fm={},per={};fin.forEach(q=>{lv[q.lv]=(lv[q.lv]||0)+1;fm[q.fmt]=(fm[q.fmt]||0)+1;per[q.t]=(per[q.t]||0)+1;});
console.log(fin.length,JSON.stringify(lv),JSON.stringify(fm));console.log(JSON.stringify(per));
['who','recall','example','case','tf','match'].forEach(f=>{const q=fin.find(x=>x.fmt===f);if(q)console.log('['+f+'] '+q.q.slice(0,300)+' => '+q.o[q.a]);});
