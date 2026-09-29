/* ===== merge rebuilt midterm readings (full texts) + post-midterm readings ===== */
NEW_A.forEach(n=>{const i=READINGS.findIndex(r=>r.id===n.id);if(i>=0)READINGS[i]=n;else READINGS.push(n);});
[...NEW_B,...NEW_C,...NEW_D].forEach(n=>{if(!READINGS.some(r=>r.id===n.id))READINGS.push(n);});
FC.push(...FC_A,...FC_B,...FC_C,...FC_D);
MCQ.push(...MCQ_A,...MCQ_B,...MCQ_C,...MCQ_D);
OPEN.push(...OPEN_A,...OPEN_B,...OPEN_C,...OPEN_D);
