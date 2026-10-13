// Checks and rebalances a PSC question file: answer position spread, correct-is-longest share, length ratio.
const fs=require('fs');const f=process.argv[2],name=process.argv[3],fix=process.argv[4]==='fix';
const src=fs.readFileSync(f,'utf8');const arr=new Function(src+';return '+name)();
let longest=0,ratios=[];arr.forEach(q=>{const c=q.o[q.a].length,d=q.o.filter((_,i)=>i!==q.a).map(x=>x.length);if(c>Math.max(...d))longest++;ratios.push(c/(d.reduce((a,b)=>a+b,0)/d.length));});
const r=ratios.reduce((a,b)=>a+b,0)/ratios.length;
console.log(name,arr.length,'correct longest:',(100*longest/arr.length).toFixed(0)+'%','mean ratio:',r.toFixed(2),'pos:',[0,1,2,3].map(p=>arr.filter(q=>q.a===p).length).join('/'));
const bad=arr.map((q,i)=>{const c=q.o[q.a].length,d=q.o.filter((_,j)=>j!==q.a).map(x=>x.length);return {i,t:q.t,r:c/(d.reduce((a,b)=>a+b,0)/3),lg:c>Math.max(...d)}}).filter(x=>x.lg&&x.r>1.25);
console.log('worst (longest & ratio>1.25):',bad.length,bad.slice(0,40).map(x=>x.i+':'+x.t+':'+x.r.toFixed(2)).join(' '));
if(fix){let k=0;arr.forEach(q=>{const want=k++%4;const right=q.o[q.a];const rest=q.o.filter((_,i)=>i!==q.a);rest.splice(want,0,right);q.o=rest;q.a=want;});
 const s=JSON.stringify(arr);if(s.includes('`')||s.includes('${'))throw 'bad chars';
 fs.writeFileSync(f,src.split('\n')[0]+'\nconst '+name+'='+JSON.stringify(arr,null,0).replace(/\},\{/g,'},\n{')+';\n');console.log('rebalanced');}
