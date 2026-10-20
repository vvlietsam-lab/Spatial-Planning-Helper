/* 20 Oct: hand-written questions where two or more WRONG options use absolute wording ("always", "never", "only"…) while the right one does not
   give the answer away. In exactly those questions the wrong options are softened slightly; the claims stay wrong, the stems stay the same. */
const ABSW=/\b(always|never|all|only|no|none|nothing|every|completely|entirely|automatically|cannot|impossible|irrelevant)\b/i;
const SOFT=[[/\balways\b/g,"usually"],[/\bAlways\b/g,"Usually"],[/\bnever\b/g,"rarely"],[/\bNever\b/g,"Rarely"],[/\bcompletely\b/g,"largely"],[/\bentirely\b/g,"largely"],[/\bautomatically\b/g,"typically"],[/\bcannot\b/g,"can hardly"],[/\bimpossible\b/g,"unlikely"],[/\birrelevant\b/g,"secondary"],[/\bonly\b/g,"mainly"],[/\bOnly\b/g,"Mainly"]];
function softenQ(q){if(q.auto||!q.o||q.o.length!==4||q.fmt==="tf"||q.fmt==="match")return q;const r=q.o[q.a];if(ABSW.test(r))return q;
  const d=q.o.map((x,i)=>i!==q.a&&ABSW.test(x)?i:-1).filter(i=>i>=0);if(d.length<2)return q;
  const o=q.o.map((x,i)=>{if(!d.includes(i))return x;let y=x;SOFT.forEach(([re,w])=>{y=y.replace(re,w);});return y;});
  return new Set(o).size===4?{...q,o}:q;}
