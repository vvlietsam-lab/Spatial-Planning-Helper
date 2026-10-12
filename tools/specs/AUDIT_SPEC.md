# Spec: slide-by-slide coverage audit (midterm is Thu 8 Oct)

The student is afraid of missing slide content. Check EVERY slide of your decks against what the study site actually shows, fill every gap, and produce a coverage map that the site will display as a checklist.

## Inputs
- Slide images: /home/claude/bpt/slides/png/<deck>/s-NN.png (one per slide; look at EVERY slide with the Read tool; contact sheets in slides/sheets/<deck>/ may speed this up, but open single slides whenever a sheet is hard to read). Slide text: the txt file named in your assignment.
- What the site shows per page: /home/claude/bpt/site_text/<page id>.txt (full content of each reading page: summary, concepts, examples, extended summary `ext`, lecture notes `lect`, slide additions `figs`/`tables`/`points`, figures shown as "[SVG figure; labels: …]"). Pages: fw, buit, hall, know, marx, hayek, cozz, gov, scott, davoudi, alex, rc, needham, olson, taylor, ni, dembski, moroni, sorensen (and later weeks). Use grep across site_text/ for key words of each slide.
- Existing slide-addition format and SVG rules: /home/claude/bpt/SLIDES_SPEC.md and "Figures (SVG)" in /home/claude/bpt/AGENT_SPEC.md.

## For every slide
Decide: kind = "title" (title/agenda/learning goals/contact/break/references), "photo" (decorative or photo without teaching content), or "content". For content slides, find where the site covers it (page id) and judge: "covered" (all substantive points, including diagrams' structure, present), "partial", or "missing". Be strict: a diagram counts as covered only if the site has a figure or table with the same structure, or a text that fully conveys it; a question the lecturer posed, a case, an example, an exam tip, a definition or a quote must be present.
For partial/missing: write the addition (points / figs / tables, same format and rules as SLIDES_SPEC.md) and assign it to the best page. Then mark the slide "covered" with note "added".

## Output
One JS file (path and const names in your assignment):
```js
const AUD_X={"<deck id>":{name:"HC7 Neo-institutionalism (29 Sept)",slides:[
  {n:1,title:"Neo-institutionalism & planning",kind:"title"},
  {n:5,title:"Ostrom's design principles",kind:"content",page:"ni",status:"covered",where:"figure 'Ostrom design principles'"},
  {n:9,title:"…",kind:"content",page:"ni",status:"covered",where:"added: point 'X'"}]}};
const SLX_X={ni:{figs:[],tables:[],points:[{t:"…",d:"…",slide:"HC7 slide 9"}]}};
```
`title`: the slide's own heading (short). `where`: short pointer the student can find on the page (section name, figure title, point title). Every slide of the deck must appear in AUD. No backticks or `${` inside strings except in svg template literals (follow the SVG rules). Validate with node that both consts load, the slide count equals the number of PNGs, and render-check any new SVGs (see SLIDES_SPEC.md). Final report: per deck counts of title/photo/covered-before/added, and anything unreadable.
