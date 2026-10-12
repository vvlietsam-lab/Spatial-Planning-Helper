# Spec: extended summaries (+ filling missing tables/figures)

The study site (UU MSc Spatial Planning) has a short, dense summary per reading, which the student likes and which stays. You add an **Extended summary**: a much longer, readable walk-through that genuinely introduces the student to the article, as if a good tutor talked them through it section by section. Target reading time 8–12 minutes (≈1,500–2,500 words; shorter only if the text itself is short, e.g. a 3-page comment).

## Accuracy (most important)
- Read the FULL source text you are given, start to end. Everything in the extended summary must come from that text (or the named slides). Page numbers in brackets where the text shows them, e.g. (p. 7).
- Quotes verbatim only (copy exactly; fix only OCR hyphenation). Use a few (3–6) short quotes, not many.
- Where you add context beyond the text (e.g. how it links to other course theories), put it ONLY in the final section "Connecting it to the course" and say it's a link, not the author's claim.
- If you have no text for a reading (you'll be told), write a clearly flagged shorter version from general knowledge, first sentence saying so.

## Structure
An array of sections, each `{h:"Heading", p:["paragraph", "paragraph", ...]}`. Paragraphs 60–160 words. Suggested sections (adapt to the article's own structure, and follow the article's order):
1. "What the article asks and why" (context, puzzle, the author's position in the debate)
2. 3–6 sections following the article's own argument step by step (use the article's section logic; headings describing the content, not "Section 2")
3. "Evidence and cases" (method, cases, data, what they show) if applicable
4. "Conclusions and what the author wants" (incl. limitations the author admits)
5. "Connecting it to the course" (which theory it rests on; position on the course dimensions: structure↔agency, reproduction↔transformation, deliberate↔emergent, universal↔situated knowledge, monist↔pluralist, normative commitments; how it contrasts with other course readings). Clearly your synthesis.

Style: plain, clear English for a master's student; explain every technical term the first time; concrete; no filler ("This article explores…"); use ':' and ';' rather than long dashes; no markdown inside strings (plain text; you may use 'single quotes' for terms).

## Missing tables/figures
You'll be told which readings lack a `table` or `fig`. For those, also produce one:
- `table:{head:["col",...],rows:[["..."],...]}`: a genuinely useful comparison/typology/overview from the text (3–8 rows).
- `fig` + `cap`: inline SVG following the figure rules in /home/claude/bpt/AGENT_SPEC.md (section "Figures (SVG)"): viewBox width 620, allowed classes only, unique marker ids, no backticks or `${` inside. Show the core mechanism/model. Keep labels short so nothing overflows boxes (≈6.5px per character at font-size 12).

## Output
One JS file defining ONE const (name given in your assignment):
```js
const EXT_X={
 harvey:{ext:[{h:"...",p:["...","..."]}, ...], table:{...} /*only if asked*/, fig:`<svg ...>`, cap:"..." /*only if asked*/},
 ...
};
```
Use template literals only for `fig`. Validate: `node -e "eval(require('fs').readFileSync('FILE','utf8')+';for(const k in EXT_X){const w=EXT_X[k].ext.flatMap(s=>s.p).join(\" \").split(/\\s+/).length;console.log(k,w)}')"` (substitute the const name). Final report: word count per reading, which tables/figures you added, anything you couldn't verify.
