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
/* extended summaries + missing tables/figures */
{const E=Object.assign({},EXT_1,EXT_2,EXT_3,EXT_4,EXT_5);READINGS.forEach(r=>{const e=E[r.id];if(!e)return;r.ext=e.ext;if(e.table&&!r.table)r.table=e.table;if(e.fig&&!r.fig){r.fig=e.fig;r.cap=e.cap;}});}
/* current-day examples, verified against the linked source */
{const N=Object.assign({},TD_1,TD_2,TD_3,TD_4);READINGS.forEach(r=>{if(N[r.id])r.news=N[r.id];});}
/* lecture slides: redrawn diagrams/tables + slide points not covered elsewhere */
const SLIDE_ADD=(()=>{const all={};[SL_1,SL_2,SL_3,SL_4,SL_5,SL_6].forEach(o=>{for(const k in o){const a=all[k]=all[k]||{figs:[],tables:[],points:[]};for(const t of ["figs","tables","points"])a[t].push(...(o[k][t]||[]));}});
  if(all.fw)all.fw.tables=all.fw.tables.filter(t=>!/^The course framework: four dimensions/.test(t.title));return all;})();
READINGS.forEach(r=>{if(SLIDE_ADD[r.id])r.lect=SLIDE_ADD[r.id];});
