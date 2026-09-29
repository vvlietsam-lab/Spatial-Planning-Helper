/* ===== merge rebuilt midterm readings (full texts) + post-midterm readings ===== */
NEW_A.forEach(n=>{const i=READINGS.findIndex(r=>r.id===n.id);if(i>=0)READINGS[i]=n;else READINGS.push(n);});
[...NEW_B,...NEW_C,...NEW_D].forEach(n=>{if(!READINGS.some(r=>r.id===n.id))READINGS.push(n);});
FC.push(...FC_A,...FC_B,...FC_C,...FC_D);
MCQ.push(...MCQ_A,...MCQ_B,...MCQ_C,...MCQ_D);
OPEN.push(...OPEN_A,...OPEN_B,...OPEN_C,...OPEN_D);
/* Madden & Marcuse is not a syllabus reading: drop its page (the HC4 slide quote stays in the Marx example) */
{const i=READINGS.findIndex(r=>r.id==="mm");if(i>=0)READINGS.splice(i,1);}
for(const A of [FC]){for(let i=A.length-1;i>=0;i--)if(A[i][0]==="mm")A.splice(i,1);}
for(const A of [MCQ,OPEN]){for(let i=A.length-1;i>=0;i--)if(A[i].t==="mm")A.splice(i,1);}
/* extra examples (from the text, the slides, or a clearly flagged similar case) */
{const EXX=Object.assign({},EX_1,EX_2,EX_3);READINGS.forEach(r=>{if(EXX[r.id])r.examples=EXX[r.id];});}
