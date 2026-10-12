# Spec: reading entries for the BPT study site (GEO4-3115 Beyond Planning Theory, UU MSc Spatial Planning)

You write ONE JavaScript file containing study material for the readings you are assigned. The student is preparing for (a) a midterm on 8 Oct 2026 (25 MCQ + 3 open questions, closed book), and (b) a final exam on 5 Nov 2026: a *theoretical commentary* — pick one of two articles, analyse which theoretical perspective grounds its argument, then critique it from an alternative perspective.

## Accuracy rules (most important)
- Read the FULL text you are given. Every claim, concept, page number and quote must come from that text. Quotes must be verbatim (copy them exactly; fix only OCR hyphenation/line-break artefacts). Give page numbers where the text shows them.
- If a text is not the assigned reading (or only partly), say so honestly in `statusNote` and set `status` accordingly: "full" (full text read), "partial" (partial/secondary text), "missing" (not on file; built from general knowledge — say so explicitly).
- Don't invent case facts or numbers.

## Style
- English. Concise, dense, exam-oriented. Plain sentences; use ':' and ';' rather than long dashes. No fluff, no "this article explores".
- Use the course's vocabulary where it fits: structure ↔ agency, reproduction ↔ transformation, deliberate ↔ emergent, universal ↔ situated knowledge, monist ↔ pluralist, normative commitments; theories covered: rational-comprehensive planning, rational choice / public choice, (historical / sociological / evolutionary / rational-choice) neo-institutionalism, Marxism/political economy, Hayek/liberalism, complexity, communicative planning, Foucault/governmentality, urban politics/social movements, regime theory, discourse.

## Output format
File must define exactly these (use `const` names given in your assignment, e.g. `const NEW_A=[...]`, `const FC_A=[...]`, `const MCQ_A=[...]`, `const OPEN_A=[...]`):

```js
const NEW_A=[
{id:"harvey", wk:6, title:"Harvey (1989) From managerialism to entrepreneurialism", cite:"Full reference", theory:"Marxist political economy", status:"full",
 statusNote:"What this page is built from (honest).",
 one:"The argument in 2–3 sentences.",
 summary:["paragraph","paragraph","paragraph","(3–5 dense paragraphs, ~80–150 words each)"],
 concepts:[["Term","definition (1–2 sentences)"], ... 6–10 items],
 fig:`<svg viewBox="0 0 620 220" role="img" aria-label="..."><g font-size="12"> ... </g></svg>`,
 cap:"One-line caption.",
 table:{head:["",...],rows:[[...],...]} /* or null */,
 example:"A concrete case/example from the text (or one clearly marked as an illustration).",
 quotes:["\"verbatim quote\" (p. X)", ... 2–4],
 dims:{sa:0-100, rt:0-100, de:0-100, us:0-100, mp:0-100, norm:"normative commitments"},
 exam:"How this is likely to be examined: commentary angle (which perspective grounds it; which alternative perspective critiques it best and why), likely MCQ traps."},
];
const FC_A=[["harvey","front (question/prompt)","back (answer, 1–3 sentences)"], ... 8–12 per reading];
const MCQ_A=[{t:"harvey",q:"question",o:["A","B","C","D"],a:1,e:"why (1–2 sentences)"}, ... 5–7 per reading];
const OPEN_A=[{t:"harvey",pts:12,q:"exam-style open question (for post-midterm readings: commentary-style: identify perspective + critique from an alternative)",model:"model answer (150–250 words)",rubric:["criterion","criterion","criterion","criterion"]}]; // 1 per reading
```
dims scale: sa 0=structure…100=agency; rt 0=reproduction…100=transformation; de 0=deliberate…100=emergent; us 0=universal…100=situated; mp 0=monist…100=pluralist. Use null for a dimension that doesn't apply.

## Figures (SVG)
Inline SVG, viewBox width 620, height 180–320. Must communicate the core mechanism (a model, a causal chain, a typology, a timeline, a 2×2), not decoration. Use ONLY these classes for colour (they adapt to dark mode): text default ink; `class="mut"` muted text/fill; boxes `bx` (neutral), `bxa` (accent/red), `bxg` (green), `bxi` (blue), `bxw` (amber) — use on <rect> with rx="8"; fills `acc fg fi fw fm`; strokes `accs`; lines `ln` (muted stroke, fill none). Font-size attributes ≤13, text-anchor="middle" for centred labels. Keep text inside boxes short (≤ 22 chars per line; use multiple <text> lines). Arrowheads: define `<defs><marker id="UNIQUE_ID" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" class="fm"/></marker></defs>` with a unique id per figure and `marker-end="url(#UNIQUE_ID)"`. No external fonts/images. Must be valid inside a JS template literal (no backticks, no `${` unless intentional).

## Validate
Run `node -e "const fs=require('fs');eval(fs.readFileSync('YOURFILE','utf8')+';console.log(NEW_A.length,FC_A.length,MCQ_A.length,OPEN_A.length)')"` (substitute names) and fix any syntax error. Check every MCQ `a` index is correct and every `t` matches an id. Return a short report: what each entry is built from, anything you could not verify, and the counts.
