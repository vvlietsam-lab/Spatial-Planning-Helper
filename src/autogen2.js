/* Batch 2 (no new facts): super-hard matching across readings, built from verified concepts and attribution statements. */
const fs=require('fs');const L=fs.readFileSync('/home/claude/bpt/all.js','utf8').split('\n');const idx=L.findIndex(l=>l.startsWith('const R=Object.fromEntries'));
const o=new Function('window','document','localStorage',L.slice(0,idx).join('\n')+';return {READINGS,MG}')({},{},{});
let seed=99;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const R={};o.READINGS.forEach(r=>R[r.id]=r);
const SH={fw:"Rydin 2021 (framework)",rc:"Rational choice (HC6)",ni:"Neo-institutionalism (HC7)",alex:"Alexander",know:"Rydin 2007",gov:"Rydin 2021 (gov. models)",rydin6:"Rydin 2021 (urban politics)",olson:"Hindmoor/Olson",hh:"Hyötyläinen & Haila",dembski:"Dembski & Salet",bossuyt:"Bossuyt & D'Ottaviano",raco:"Raco & Imrie",gurran:"Gurran & Ruming",fog:"Foglesong"};
const sh=id=>SH[id]||R[id].title.match(/^[^(]+/)[0].trim();
const words=s=>new Set(s.toLowerCase().replace(/[^a-z\s]/g,' ').split(/\s+/).filter(w=>w.length>=5));
const has=(def,term)=>{const d=def.toLowerCase();for(const w of words(term))if(d.includes(w.slice(0,Math.max(5,w.length-2))))return true;return false;};
const nameIn=(txt,id)=>{const n=sh(id).split(/[\s&/(]+/).filter(w=>w.length>3);return n.some(w=>txt.includes(w));};
const cut=s=>s.length>170?s.slice(0,167).replace(/\s\S*$/,'')+'…':s;
const RN=["I","II","III","IV"];
const perms=a=>a.length<=1?[a]:a.flatMap((x,i)=>perms([...a.slice(0,i),...a.slice(i+1)]).map(p=>[x,...p]));
const P4=perms([0,1,2,3]);
const out=[];
function matchQ(group,stemHead,itemTxt,e,fmt){ // group: 4 items with distinct t
  const right=[0,1,2,3];const lab=p=>p.map((j,i)=>`${RN[i]} ${sh(group[j].t)}`).join(" · ");
  const dist=shuf(P4.filter(p=>p.some((x,i)=>x!==i)));const one=dist.filter(p=>p.filter((x,i)=>x!==i).length===2);const far=dist.filter(p=>p.filter((x,i)=>x!==i).length>=3);
  const ds=[one[0],far[0],far[1]];const opts=shuf([right,...ds]);
  out.push({t:group[0].t,lv:4,fmt,q:stemHead+" "+group.map((g,i)=>`${RN[i]}. ${itemTxt(g)}`).join(" "),o:opts.map(lab),a:opts.findIndex(p=>p===right),e,auto:1});}
const wkOf=t=>R[t].wk;const ids=Object.keys(R);
// pools
const W=o.MG.WHO.filter(w=>R[w.t]&&w.kind==="idea"&&!nameIn(w.txt,w.t));
const C=[];o.READINGS.forEach(r=>(r.concepts||[]).filter(c=>c[1]&&!has(c[1],c[0])).forEach(c=>C.push({t:r.id,term:c[0],def:c[1]})));
// build groups of 4 different readings from the same block (midterm W1-4, final W6-7), each reading appears as anchor several times
const FAM=[["fw","buit"],["hall","know","marx","hayek","cozz"],["gov","scott","davoudi","alex"],["rc","needham","olson","taylor"],["ni","dembski","moroni","sorensen"],["harvey","fog","hh","savini"],["rydin6","bossuyt","pruijt"],["raco","gurran"]];
const famOf=t=>FAM.findIndex(f=>f.includes(t));
for(let rep=0;rep<6;rep++)for(const anchor of ids){
    const mid=wkOf(anchor)<=4;const pool=FAM.map((f,i)=>i).filter(i=>i!==famOf(anchor)&&(mid?i<=4:true));
    const fams=shuf(pool).slice(0,3);const four=[anchor,...fams.map(i=>shuf(FAM[i])[0])];
    const g=four.map(t=>shuf(W.filter(w=>w.t===t))[0]);if(g.every(Boolean)){const gs=shuf(g);
      matchQ([g[0],...gs.filter(x=>x!==g[0])].sort(()=>0)&&gs,"Match each idea to the reading it comes from.",x=>cut(x.txt),gs.map((x,i)=>`${RN[i]}: ${sh(x.t)}`).join("; ")+".","match");out[out.length-1].t=anchor;}
    const c=four.map(t=>shuf(C.filter(x=>x.t===t))[0]);if(c.every(Boolean)){const cs=shuf(c);
      matchQ(cs,"Match each concept, as used in the course, to its reading.",x=>`${x.term}: ${cut(x.def)}`,cs.map((x,i)=>`${RN[i]}: ${x.term} (${sh(x.t)})`).join("; ")+".","match");out[out.length-1].t=anchor;}
}
const seen=new Set(),fin=out.filter(q=>{const k=q.q;if(seen.has(k))return false;seen.add(k);return new Set(q.o).size===4&&q.a>=0;});
const s=JSON.stringify(fin);if(s.includes('`')||s.includes('${'))throw 'bad';
fs.writeFileSync('/home/claude/bpt/auto2.js','const AUTOQ2='+s+';\n');
console.log(fin.length,'by t',Object.keys(R).map(t=>t+':'+fin.filter(q=>q.t===t).length).join(' '));console.log(fin[3].q,'\n',fin[3].o,fin[3].a);
