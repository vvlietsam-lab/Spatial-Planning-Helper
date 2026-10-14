/* Batch 4 (no new facts): CONTENT questions about one lecture or reading, built from that unit's own checked text.
   True statements come straight from the site; false ones are made by swapping a number, an author or a quoted term
   for another one from the SAME lecture/reading, so the distractors are plausible but wrong.
   Types: number / author / term fill-in (lv2), which statement is false (lv3), True/False I–IV (lv3), the only correct statement (lv4). */
const fs=require('fs');const which=process.argv[2]||'psc';
const L=fs.readFileSync(__dirname+'/all.js','utf8').split('\n');const idx=L.findIndex(l=>l.startsWith('const R=Object.fromEntries'));
const o=new Function('window','document','localStorage',L.slice(0,idx).join('\n')+';return {PSC,READINGS}')({},{},{});
let seed=which==='psc'?23:29;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const clean=s=>String(s).replace(/\s+/g,' ').replace(/`/g,"'").replace(/\$\{/g,'$ {').trim();
const sents=t=>clean(t).split(/(?<=[.!?])\s+(?=[A-Z'‘"(])/).map(x=>x.trim()).filter(x=>x.length>=60&&x.length<=230&&!/\b(slides?|this page|text version|garbled|date note|uploaded|on file|the site|lecture page)\b/i.test(x)&&!/^(This|It|They|These|He|She|His|Her|Their|That|But|And|So|Yet|Also|Here|There|For each|Each|In each|Both|Such)\b/.test(x));
// ---- units
const U=[];
if(which==='psc'){for(const l of o.PSC){const st=[];(l.lecture||[]).forEach(b=>st.push(...sents(b)));(l.man.ext||[]).forEach(sec=>(sec.p||[]).forEach(p=>st.push(...sents(typeof p==='string'?p:''))));(l.man.examples||[]).forEach(x=>st.push(...sents(x.d||'')));
  U.push({id:l.id,lab:'lecture '+l.n+' ('+l.title+')',st:[...new Set(st)]});}}
else{for(const r of o.READINGS){if(r.id==='fw')continue;const st=[];if(r.one)st.push(...sents(r.one));(r.ext||[]).forEach(sec=>(sec.p||[]).forEach(p=>st.push(...sents(typeof p==='string'?p:''))));(r.examples||[]).forEach(x=>st.push(...sents(x.d||'')));if(r.lect)(r.lect.points||[]).forEach(p=>st.push(...sents(p.d||'')));
  const nm=(r.title.match(/^[^()]*\(\d{4}[^)]*\)/)||[r.title.split(':')[0]])[0].trim();U.push({id:r.id,lab:nm,st:[...new Set(st)]});}}
// ---- swappable tokens
const NUM=/(?:€|\$)?\b\d{1,3}(?:[.,]\d{3})*(?:[.,]\d+)?\s?(?:%|per cent|percent|million|billion|km|ha|hectares|years|cities|villages)?(?=[\s,.;:)'’]|$)/g;
const CIT=/\b([A-ZÀ-Ž][a-zà-žø'’-]+(?:\s(?:&|and)\s[A-ZÀ-Ž][a-zà-žø'’-]+|\set al\.)?)\s\(?((?:19|20)\d{2})\)?/g;
const QT=/['‘]([A-Za-zÀ-ž][^'’]{3,40})['’]/g;
const kind=n=>/%|per cent|percent/.test(n)?'pct':/^(19|20)\d{2}$/.test(n)?'year':/million|billion|€|\$/.test(n)?'money':'n';
const toks=(s,re,f)=>{const out=[];let m;re.lastIndex=0;while((m=re.exec(s))){if(re===NUM){const pre=s.slice(Math.max(0,m.index-5),m.index),post=s.slice(m.index+m[0].length,m.index+m[0].length+1);if(/pp?\.\s?$|[–-]$/.test(pre)||/[–-]/.test(post))continue;}out.push(f(m));}return out;};
const out=[];const seen=new Set();
const mk=(t,lv,fmt,q,right,wrong,e)=>{wrong=[...new Set(wrong)].filter(x=>x&&x!==right);const key=q+'|'+right;if(wrong.length<3||seen.has(key))return false;seen.add(key);const opts=shuf([right,...wrong.slice(0,3)]);out.push({t,lv,fmt,q,o:opts,a:opts.indexOf(right),e,auto:4});return true;};
const cut=s=>s.length>220?s.slice(0,217).replace(/\s\S*$/,'')+'…':s;
for(const u of U){
  const nums=[],names=[],quotes=[];
  for(const s of u.st){toks(s,NUM,m=>m[0].trim()).filter(n=>/\d/.test(n)&&!/^(1|2|3|4|5)$/.test(n)).forEach(n=>nums.push({s,v:n,k:kind(n)}));
    toks(s,CIT,m=>m[1]).filter(n=>!/^(In|The|From|Since|By|After|Before|Between|Until|During|Table|Figure|Fig|Lecture|Chapter|Article)$/.test(n)).forEach(n=>names.push({s,v:n}));
    toks(s,QT,m=>m[1]).forEach(n=>quotes.push({s,v:n}));}
  const uniq=a=>[...new Set(a)];
  const pool={num:k=>uniq(nums.filter(x=>x.k===k).map(x=>x.v)),name:()=>uniq(names.map(x=>x.v)),q:()=>uniq(quotes.map(x=>x.v))};
  // fill-ins
  for(const x of nums){const d=shuf(pool.num(x.k).filter(v=>v!==x.v&&!x.s.includes(v)));if(d.length<3)continue;
    mk(u.id,2,'recall',`Fill in the number (${u.lab}): "${cut(x.s.replace(x.v,'____'))}"`,x.v,d,`Right: ${x.v}. "${cut(x.s)}"`);}
  for(const x of names){const d=shuf(pool.name().filter(v=>v!==x.v&&!x.s.includes(v)));if(d.length<3)continue;
    mk(u.id,2,'recall',`Which author fills the gap (${u.lab})? "${cut(x.s.split(x.v).join('____'))}"`,x.v,d,`Right: ${x.v}. "${cut(x.s)}"`);}
  for(const x of quotes){const d=shuf(pool.q().filter(v=>v!==x.v&&!x.s.includes(v)));if(d.length<3)continue;
    mk(u.id,2,'recall',`Which term fills the gap (${u.lab})? "${cut(x.s.replace(x.v,'____'))}"`,x.v,d,`Right: '${x.v}'. "${cut(x.s)}"`);}
  // altered (false) versions of statements
  const alter=s=>{const c=[];
    toks(s,NUM,m=>m[0].trim()).filter(n=>/\d/.test(n)&&!/^(1|2|3|4|5)$/.test(n)).forEach(n=>{const d=pool.num(kind(n)).filter(v=>v!==n&&!s.includes(v));if(d.length)c.push([n,shuf(d)[0]]);});
    toks(s,CIT,m=>m[1]).forEach(n=>{const d=pool.name().filter(v=>v!==n&&!s.includes(v));if(d.length)c.push([n,shuf(d)[0]]);});
    toks(s,QT,m=>m[1]).forEach(n=>{const d=pool.q().filter(v=>v!==n&&!s.includes(v));if(d.length)c.push([n,shuf(d)[0]]);});
    if(!c.length)return null;const [a,b]=shuf(c)[0];const t=s.replace(a,b);return t!==s?{t,from:a,to:b}:null;};
  const alt=shuf(u.st.filter(s=>s.length<=200).map(s=>({s,f:alter(s)})).filter(x=>x.f));
  const tru=shuf(u.st.filter(s=>s.length<=200));
  if(alt.length<2||tru.length<4)continue;
  const R4=["I","II","III","IV"];
  // which is false
  for(let k=0;k<Math.min(alt.length,24);k++){const f=alt[k];const t3=shuf(tru.filter(s=>s!==f.s)).slice(0,3);if(t3.length<3)continue;
    mk(u.id,3,'except',`According to ${u.lab}, which statement is FALSE?`,cut(f.f.t),t3.map(cut),`False: it says "${f.f.to}" where the source says "${f.f.from}". Original: "${cut(f.s)}"`);}
  // only correct one (super hard)
  for(let k=0;k+2<Math.min(alt.length*2,48);k+=2){const A=[alt[k%alt.length],alt[(k+1)%alt.length],alt[(k+2)%alt.length]];if(new Set(A.map(x=>x.s)).size<3)continue;const tr=tru.find(s=>!A.some(x=>x.s===s)&&!seen.has('oc'+s));if(!tr)continue;seen.add('oc'+tr);
    mk(u.id,4,'multi',`According to ${u.lab}, which is the ONLY correct statement? (Three have one detail changed.)`,cut(tr),A.map(x=>cut(x.f.t)),`Correct: "${cut(tr)}". Changed details: ${A.map(x=>`"${x.f.to}" should be "${x.f.from}"`).join('; ')}.`);}
  // True/False I–IV
  const pat=v=>v.map((b,i)=>R4[i]+" "+(b?"T":"F")).join(" · ");
  const tfOpts=v=>{const all=[];for(let m=0;m<16;m++)all.push([0,1,2,3].map(i=>!!(m>>i&1)));const d=a=>a.reduce((s,b,i)=>s+(b!==v[i]),0);const far=shuf(all.filter(a=>d(a)>=2)),one=shuf(all.filter(a=>d(a)===1));return [one[0],far[0],far[1]].map(pat);};
  for(let k=0;k<12;k++){const truth=[0,1,2,3].map(()=>rnd()<.5);if(truth.every(x=>x))truth[k%4]=false;if(truth.every(x=>!x))truth[k%4]=true;
    let a=k*2,b=k*3;const items=truth.map(t=>t?{s:tru[(b++)%tru.length],ok:true}:{s:alt[(a++)%alt.length].f.t,ok:false,src:alt[(a-1)%alt.length]});
    if(new Set(items.map(x=>x.s)).size<4)continue;
    mk(u.id,3,'tf',`${u.lab}: which statements are true (T) and which have a detail changed (F)? ${items.map((x,i)=>`${R4[i]}. ${cut(x.s)}`).join(' ')}`,pat(truth),tfOpts(truth),items.map((x,i)=>x.ok?`${R4[i]} true`:`${R4[i]} false ("${x.src.f.to}" should be "${x.src.f.from}")`).join('; '));}
}
const fin=out.filter(q=>q.o.length===4&&new Set(q.o).size===4);
const s=JSON.stringify(fin);if(s.includes('`')||s.includes('${'))throw 'bad chars';
const file=which==='psc'?'autop4.js':'auto4.js',v=which==='psc'?'AUTOQP4':'AUTOQ4';
fs.writeFileSync(__dirname+'/../src/'+file,'const '+v+'='+s+';\n');
const lv={},fm={},per={};fin.forEach(q=>{lv[q.lv]=(lv[q.lv]||0)+1;fm[q.fmt]=(fm[q.fmt]||0)+1;per[q.t]=(per[q.t]||0)+1;});
console.log(which,fin.length,JSON.stringify(lv),JSON.stringify(fm));console.log(JSON.stringify(per));
['recall','except','multi','tf'].forEach(f=>{const q=fin.find(x=>x.fmt===f&&x.q.length<600);if(q)console.log('['+f+'] '+q.q.slice(0,330)+' => '+q.o[q.a].slice(0,120)+' | E: '+q.e.slice(0,160));});
