/* Generates extra quiz questions from already-verified site material (concepts, pairs, flashcards, who-statements). No new facts. */
const fs=require('fs');const L=fs.readFileSync('/home/claude/bpt/all.js','utf8').split('\n');const idx=L.findIndex(l=>l.startsWith('const R=Object.fromEntries'));
const o=new Function('window','document','localStorage',L.slice(0,idx).join('\n')+';return {READINGS,MG,FC}')({},{},{});
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const R={};o.READINGS.forEach(r=>R[r.id]=r);
const LAB={fw:"Rydin (2021) and the course framework",rc:"the rational choice lecture (HC6)",ni:"the neo-institutionalism lecture (HC7)",alex:"Alexander",know:"Rydin (2007)",gov:"Rydin (2021) on governmental models",rydin6:"Rydin (2021) on urban politics"};
const lab=id=>LAB[id]||(R[id].title.match(/^[^()]*\(\d{4}[^)]*\)/)||[R[id].title.split(':')[0]])[0].trim();
const words=s=>new Set(s.toLowerCase().replace(/[^a-z\s]/g,' ').split(/\s+/).filter(w=>w.length>=5));
const clash=(a,b)=>{const A=words(a);for(const w of words(b))if(A.has(w))return true;return a.toLowerCase()===b.toLowerCase();};
const mask=(txt,term)=>{let t=txt;for(const w of words(term))t=t.replace(new RegExp(w.slice(0,Math.max(5,w.length-2))+'[a-z]*','gi'),'▇▇▇');return t;};
const has=(def,term)=>{const d=def.toLowerCase();for(const w of words(term))if(d.includes(w.slice(0,Math.max(5,w.length-2))))return true;return false;};
const cut=s=>s.length>200?s.slice(0,197).replace(/\s\S*$/,'')+'…':s;
const near=(id,pool)=>{const w=R[id].wk;return [...shuf(pool.filter(x=>x.t!==id&&R[x.t].wk===w)),...shuf(pool.filter(x=>x.t!==id&&Math.abs(R[x.t].wk-w)<=1&&R[x.t].wk!==w)),...shuf(pool.filter(x=>x.t!==id))];};
const ids=Object.keys(R);
// concept pool
const C=[];o.READINGS.forEach(r=>(r.concepts||[]).filter(c=>c[1]&&c[1].length>25).forEach(c=>C.push({t:r.id,term:c[0],def:c[1]})));
o.MG.PAIRS.filter(p=>R[p.t]).forEach(p=>{if(!C.some(c=>c.t===p.t&&c.term.toLowerCase()===p.term.toLowerCase()))C.push({t:p.t,term:p.term,def:p.def});});
const out=[];const mk=(t,lv,fmt,q,right,wrong,e)=>{if(wrong.length<3)return;const opts=shuf([right,...wrong.slice(0,3)]);out.push({t,lv,fmt,q,o:opts,a:opts.indexOf(right),e,auto:1});};
for(const c of C){
  // 1 term -> definition
  const dd=near(c.t,C).filter(x=>!clash(x.term,c.term)&&x.def!==c.def);
  const L0=c.def.length;const dd2=dd.slice(0,14).sort((x,y)=>Math.abs(x.def.length-L0)-Math.abs(y.def.length-L0));const pickD=[];for(const x of dd2){if(pickD.length>=3)break;if(!has(x.def,x.term)&&!pickD.some(y=>y.term===x.term))pickD.push(x);}
  if(!has(c.def,c.term))mk(c.t,1,"define",`In ${lab(c.t)}, what does "${c.term}" mean?`,cut(c.def),pickD.map(x=>cut(x.def)),`"${c.term}" (${lab(c.t)}): ${c.def}`);
  // 2 definition -> term (same reading distractors first: harder)
  const tt=[...shuf(C.filter(x=>x.t===c.t&&!clash(x.term,c.term))),...dd].filter((x,i,a)=>a.findIndex(y=>y.term===x.term)===i&&!clash(x.term,c.term));
  mk(c.t,tt.slice(0,3).every(x=>x.t===c.t)?2:1,"recall",`Which term from ${lab(c.t)} fits this description? "${cut(mask(c.def,c.term))}"`,c.term,tt.map(x=>x.term),`${c.term}: ${c.def}`);
}
// 3 flashcards -> pick the right answer
const F=o.FC.filter(f=>R[f[0]]&&f[2]&&f[2].length>15).map(f=>({t:f[0],q:f[1],a:f[2]}));
for(const f of F){const w=near(f.t,F).filter(x=>x.a!==f.a&&!clash(x.q,f.q)).slice(0,14).sort((x,y)=>Math.abs(x.a.length-f.a.length)-Math.abs(y.a.length-f.a.length));const pick=[];for(const x of w){if(pick.length>=3)break;pick.push(x);}
  mk(f.t,1,"recall",`${lab(f.t)}: ${f.q.replace(/\?*$/,'?')}`,cut(f.a),pick.map(x=>cut(x.a)),`${f.q}: ${f.a}`);}
// 4 who said it
const W=o.MG.WHO.filter(w=>R[w.t]);
for(const w of W){const others=shuf(ids.filter(id=>id!==w.t&&Math.abs(R[id].wk-R[w.t].wk)<=1)).concat(shuf(ids.filter(id=>id!==w.t))).filter((x,i,a)=>a.indexOf(x)===i);
  mk(w.t,2,"who",`Whose ${w.kind==="quote"?"words are these":"idea is this"}? ${w.kind==="quote"?'"'+w.txt+'"':w.txt}`,lab(w.t),others.map(lab).filter(l=>l!==lab(w.t)),`This is ${lab(w.t)}.`);}
// 5 exam-format True/False I–IV
const pat=v=>v.map((b,i)=>["I","II","III","IV"][i]+" "+(b?"T":"F")).join(" · ");
const tfOpts=v=>{const all=[];for(let m=0;m<16;m++)all.push([0,1,2,3].map(i=>!!(m>>i&1)));const d=a=>a.reduce((s,b,i)=>s+(b!==v[i]),0);
  const far=shuf(all.filter(a=>d(a)>=2)),one=shuf(all.filter(a=>d(a)===1));return [one[0],far[0],far[1]].map(pat);};
for(const id of ids){
  // 5a definitions: true pairings vs swapped pairings within the same reading (4 items per reading max)
  const cs=C.filter(c=>c.t===id&&!has(c.def,c.term));if(cs.length>=5)for(let k=0;k<4;k++){const four=shuf(cs).slice(0,4);const used=new Set(four.map(c=>c.def));const truth=[0,1,2,3].map(()=>rnd()<.5);if(truth.every(x=>x)||truth.every(x=>!x))truth[Math.floor(rnd()*4)]=!truth[0];
    const lines=four.map((c,i)=>{if(truth[i])return `${["I","II","III","IV"][i]}. ${c.term}: ${cut(c.def)}`;const sw=shuf(cs.filter(x=>x!==c&&!used.has(x.def)&&!clash(x.term,c.term)))[0];if(!sw){truth[i]=true;return `${["I","II","III","IV"][i]}. ${c.term}: ${cut(c.def)}`;}used.add(sw.def);return `${["I","II","III","IV"][i]}. ${c.term}: ${cut(sw.def)}`;});
    if(truth.every(x=>x)||truth.every(x=>!x))continue;const right=pat(truth);mk(id,3,"tf",`According to ${lab(id)}, which pairings of term and meaning are correct (T) and which are wrong (F)? ${lines.join(' ')}`,right,tfOpts(truth),"Correct pairings: "+four.map(c=>`${c.term} = ${cut(c.def)}`).join('; '));}
  // 5b attribution: which ideas are this author's?
  const mine=W.filter(w=>w.t===id&&w.kind==="idea"),theirs=W.filter(w=>w.t!==id&&w.kind==="idea"&&Math.abs(R[w.t].wk-R[id].wk)<=1);
  if(mine.length>=2&&theirs.length>=2)for(let k=0;k<3;k++){const truth=shuf([true,true,false,false,rnd()<.5,rnd()<.5]).slice(0,4);if(truth.every(x=>x)||truth.every(x=>!x))truth[0]=!truth[0];
    const sm=shuf(mine),st=shuf(theirs);let a=0,b=0;const items=truth.map(t=>t?sm[a++%sm.length]:st[b++%st.length]);
    if(new Set(items).size<4)continue;
    mk(id,3,"tf",`Which of these ideas come from ${lab(id)} (T) and which from other course readings (F)? ${items.map((x,i)=>`${["I","II","III","IV"][i]}. ${x.txt}`).join(' ')}`,pat(truth),tfOpts(truth),items.map((x,i)=>`${["I","II","III","IV"][i]}: ${lab(x.t)}`).join('; '));}
}
// dedupe by stem
const seen=new Set(),fin=out.filter(q=>{if(seen.has(q.q))return false;seen.add(q.q);return q.o.length===4&&new Set(q.o).size===4;});
const s=JSON.stringify(fin);if(s.includes('`')||s.includes('${'))throw 'bad chars';
fs.writeFileSync('/home/claude/bpt/auto.js','const AUTOQ='+s+';\n');
const lv={},fm={};fin.forEach(q=>{lv[q.lv]=(lv[q.lv]||0)+1;fm[q.fmt]=(fm[q.fmt]||0)+1;});console.log(fin.length,JSON.stringify(lv),JSON.stringify(fm));
console.log(JSON.stringify(fin.find(q=>q.fmt==="tf"&&q.t==="hayek"),null,1));console.log(JSON.stringify(fin.find(q=>q.fmt==="define"&&q.t==="olson"),null,1));
