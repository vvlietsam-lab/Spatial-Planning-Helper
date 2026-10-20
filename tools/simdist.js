/* Makes the wrong options of GENERATED questions slightly closer to the right answer.
   Distractors are re-picked from the right answers of questions of the same kind in the same lecture/reading or week,
   preferring ones that share words (or, for numbers, are similar in size), but never near-copies of the right answer.
   Only formats where any same-kind answer is certainly wrong are touched: define, recall (term/fill-in), example, case. */
const fs=require('fs');const path=__dirname+'/../src/';
let seed=5;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
const W=s=>new Set(String(s).toLowerCase().replace(/[^a-zà-ž0-9\s]/g,' ').split(/\s+/).filter(w=>w.length>=4));
const jac=(a,b)=>{const A=W(a),B=W(b);if(!A.size||!B.size)return 0;let i=0;for(const x of A)if(B.has(x))i++;return i/(A.size+B.size-i);};
const num=s=>{const m=String(s).replace(/,/g,'').match(/\d+(\.\d+)?/);return m?parseFloat(m[0]):null;};
const kind=s=>/%|per cent/.test(s)?'pct':/^(19|20)\d{2}$/.test(s)?'year':/million|billion|€|\$/.test(s)?'money':/^\d/.test(s)?'n':'t';
function sim(a,b){const na=num(a),nb=num(b);if(kind(a)!=='t'&&kind(a)===kind(b)&&na!=null&&nb!=null){const r=Math.min(na,nb)/Math.max(na,nb||1);return 0.3+0.7*r;}
  return jac(a,b)+0.25*(1-Math.min(1,Math.abs(String(a).length-String(b).length)/Math.max(String(a).length,1)));}
const FMT=new Set(['define','recall','example','case']);
const files=[['autop.js','AUTOQP'],['auto.js','AUTOQ'],['autop3.js','AUTOQP3'],['autop4.js','AUTOQP4'],['auto4.js','AUTOQ4']];
const unit=JSON.parse(fs.readFileSync(__dirname+'/units.json','utf8'));
for(const [f,v] of files){if(!fs.existsSync(path+f))continue;const arr=JSON.parse(fs.readFileSync(path+f,'utf8').replace(/^const \w+=/,'').replace(/;\s*$/,''));
  const typ=q=>q.fmt+'|'+q.q.replace(/\(.*$/,'').replace(/"[\s\S]*$/,'').slice(0,28);
  const pool={};arr.forEach(q=>{if(!FMT.has(q.fmt))return;const r=q.o[q.a];(pool[typ(q)]=pool[typ(q)]||[]).push({t:q.t,r});});
  let ch=0,before=0,after=0;
  for(const q of arr){if(!FMT.has(q.fmt))continue;const right=q.o[q.a],P=pool[typ(q)]||[];
    const same=P.filter(x=>x.r!==right&&(x.t===q.t||unit[x.t]===unit[q.t]));
    const cand=[...new Map(same.map(x=>[x.r,x])).values()].filter(x=>!q.q.includes(x.r)&&!x.r.includes(right)&&!right.includes(x.r)&&jac(x.r,right)<0.6).map(x=>({r:x.r,s:sim(right,x.r)+(x.t===q.t?0.1:0)})).sort((a,b)=>b.s-a.s);
    if(cand.length<3)continue;
    const old=q.o.filter((_,i)=>i!==q.a);before+=old.reduce((s,x)=>s+sim(right,x),0)/3;
    const top=cand.slice(0,8);const pick=[];while(pick.length<3&&top.length){pick.push(top.splice(Math.floor(rnd()*Math.min(top.length,5)),1)[0].r);}
    // slight: keep one original distractor when it is already reasonably close
    const keep=old.sort((a,b)=>sim(right,b)-sim(right,a))[0];if(keep&&sim(right,keep)>=0.15&&!pick.includes(keep))pick[2]=keep;
    if(new Set(pick).size<3)continue;
    const opts=[right,...pick].map(x=>({x,r:rnd()})).sort((a,b)=>a.r-b.r).map(z=>z.x);q.o=opts;q.a=opts.indexOf(right);ch++;after+=pick.reduce((s,x)=>s+sim(right,x),0)/3;}
  const s=JSON.stringify(arr);if(s.includes('`')||s.includes('${'))throw 'bad chars';
  fs.writeFileSync(path+f,'const '+v+'='+s+';\n');
  console.log(f,'changed',ch,'of',arr.length,'mean similarity',(before/Math.max(ch,1)).toFixed(2),'→',(after/Math.max(ch,1)).toFixed(2));}
