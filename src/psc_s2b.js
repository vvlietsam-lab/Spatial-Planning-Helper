/* PSC lecture list patch (13 Oct): slides on file, and the 5 Oct swap (Planning with Nature took the slot of lecture 9). */
(function(){const L=n=>PSC_LECTURES.find(l=>l.n===n);
[5,8,10,11,13].forEach(n=>{L(n).slides=true;});
L(13).d="2026-10-05";L(9).d="2026-10-19";L(9).slides=true;L(12).slides=true;L(8).theme=3;
L(13).note="Given on 5 Oct (swapped with lecture 9)";L(9).note="Moved to 19 Oct";})();

/* 20 Oct: DOIs on the Readings & DOIs page checked against Crossref (McPhearson: the manual's link is a different paper; Savini: chapter DOI) */
(function(){if(typeof PSC_REC_MORE==="undefined")return;PSC_LECTURES.forEach(L=>(L.rec||[]).forEach(r=>{const x=PSC_REC_MORE.find(z=>z.m.test(r.r||""));if(x){r.doi=x.doi;if(x.find)r.note=x.find;}}));})();
