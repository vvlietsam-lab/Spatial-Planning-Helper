# Spec: bring the lecture slides' diagrams and content into the reading pages ("don't miss anything")

The student wants everything from the lecture slides on the study site, especially diagrams, models, charts and tables, which so far were only used as text. The site must NOT embed the slide images (the site is public); instead you RECREATE each meaningful visual as our own SVG figure or HTML table, and add any slide point the page doesn't yet cover.

## Inputs
- Slide images: /home/claude/bpt/slides/sheets/<deck>/sheetNN.png: 2×2 contact sheets, each slide labelled #n (slide number). Full-size single slides: /home/claude/bpt/slides/png/<deck>/s-NN.png (use these with the Read tool when a slide is hard to read). LOOK AT EVERY SHEET of your decks.
- Slide text (helps with exact wording): BPT decks in /home/claude/bpt/txt/ (file names start with the deck id) or /home/claude/bpt/txt2/0e1809a1.txt (HC7); PSC decks in /home/claude/psc/ (0c0c3264-Cou.txt = L1, Lecture_2_Ar.txt = L2, d5cc57d2-3._.txt = L3, 4bab7955.txt = L4, 55a4774d.txt = L5, 0ec76877-Pla.txt = L6, 8097f621.txt = L7).
- What the site already has per page: BPT readings in /home/claude/bpt/readings.json (summary, concepts, examples) + extended summaries in /home/claude/bpt/ext1.js…ext5.js (const EXT_n[id].ext) + existing figure/table: run `node -e "..."` against the data files if needed (each reading's `fig` and `table` are in p2_readings.js / p2b_updates.js / p9a_mid.js / p9b_w6.js…; you may grep). PSC lectures in /home/claude/bpt/psc.json (lecture[] = notes from the slides, man.summary) + /home/claude/bpt/ext6.js (EXT_6).

## What to produce, per reading/lecture page
1. figs: recreate EVERY substantive visual on the slides (models, frameworks, flow charts, typologies, 2×2s, timelines, graphs with a clear shape, maps reduced to their schematic message) that is not already shown by the page's existing figure. Skip photos, logos, decorative images, and screenshots of article title pages. For a data chart, recreate its shape and the key values/labels you can read; never invent numbers. Each fig: {title, svg, cap, slide:"<deck short name> slide n"}.
2. tables: slide tables or comparison slides (≥ 3 parallel items) as {title, head:[], rows:[[]], slide}.
3. points: every substantive slide point (definition, argument, example, case, quote, author+claim, exam tip, question the lecturer posed) that the page does NOT already cover: {t:"short title", d:"1–3 sentences, faithful to the slide; quotes verbatim", slide:"..."}. Be thorough: the goal is that someone who only studies the site misses nothing from the lecture. Don't repeat what the page already says (check summary, concepts, examples, extended summary, lecture notes).
Assign each item to the reading/lecture page it belongs to (by id). A lecture that covers several readings: put general lecture content under the most fitting id (or the framework/lecture page id given in your assignment).

## SVG rules
Follow "Figures (SVG)" in /home/claude/bpt/AGENT_SPEC.md exactly (viewBox width 620, only the listed classes, unique marker ids, no backticks or `${`). Keep labels short so they fit; ≈6.5 px per character at font-size 12. Use the slide's own structure and wording.

## Output
One JS file defining ONE const (name in your assignment):
```js
const SL_X={
 rc:{figs:[{title:"Land value rises with each planning phase",svg:`<svg ...>...</svg>`,cap:"After Bonczek & Halstenberg (1963), HC6",slide:"HC6 slide 16"}],
     tables:[{title:"...",head:["..."],rows:[["..."]],slide:"..."}],
     points:[{t:"...",d:"...",slide:"..."}]},
 ...
};
```
Validate: `node -e "const fs=require('fs');const o=new Function(fs.readFileSync('FILE','utf8')+';return SL_X')();for(const k in o)console.log(k,(o[k].figs||[]).length,(o[k].tables||[]).length,(o[k].points||[]).length)"` and render-check your SVGs: write a quick HTML with all svgs and screenshot it with Playwright (NODE_PATH=$(npm root -g); chromium is preinstalled), then look at the screenshot and fix overflowing/overlapping labels. For the CSS classes in that test page, use: text{fill:#111;font-family:sans-serif} .mut{fill:#666} .bx{fill:#fff;stroke:#bbb} .bxa{fill:#fde8ec;stroke:#c00a35} .bxg{fill:#e6f6ec;stroke:#16a34a} .bxi{fill:#e8efff;stroke:#2f6bff} .bxw{fill:#fff4dc;stroke:#d97706} .acc{fill:#c00a35} .fg{fill:#16a34a} .fi{fill:#2f6bff} .fw{fill:#d97706} .fm{fill:#888} .accs{stroke:#c00a35} .ln{stroke:#888;fill:none}.
Final report: per deck, a slide-by-slide coverage list compressed into ranges (e.g. "1–3 title/agenda; 4–9 → points fw; 12 → fig rc; 13 photo skipped"), counts per page, and anything you couldn't read.
