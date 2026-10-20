/* 20 Oct: the "Connecting it to the course" sections were my own synthesis (with BPT-framework language and cross-links), not the authors' claims. Removed from every PSC page. */
PSC.forEach(l=>{if(l.man&&Array.isArray(l.man.ext))l.man.ext=l.man.ext.filter(s=>!/^Connecting it to the course/i.test(s.h||""));});
