# Spec: current-day examples ("In the news")

The student (UU MSc Spatial Planning, Dutch) wants, per reading, ONE concrete, recent, real-world example from current affairs (not from the reading or slides) that makes the theory click. Accuracy is non-negotiable.

## What a good example is
- Recent: ideally 2023–2026; older only if it is still a live issue and clearly the best fit.
- Preferably Dutch (Utrecht, Amsterdam, national housing/planning policy, Omgevingswet, stikstof, Lelystad, Schiphol, Tata Steel, Groningen gas, woningbouw, huurbevriezing/Wet betaalbare huur, kraakverbod, Airbnb rules, Zuidas, Merwedekanaalzone, Rijnenburg, Port of Rotterdam/Moerdijk, etc.); otherwise a well-known international case (NYC, London, Barcelona, Berlin rent referendum, Toronto, Melbourne, China, Brazil...).
- It must illustrate the reading's SPECIFIC mechanism/concept (name it), not just the general topic.

## Verification rules (strict)
- Use WebSearch to find candidates, then WebFetch the actual source page. Only state facts you saw on the fetched page (numbers, dates, names). A search snippet is NOT enough.
- Prefer reliable sources: NOS, Rijksoverheid, gemeente websites, CBS, PBL, Volkskrant, NRC, Trouw, Het Parool, DUIC, Financieel Dagblad, Reuters, BBC, Guardian, NYT, Bloomberg, official reports. No blogs/forums.
- If you can't verify an example for a reading, try another candidate; if nothing verifiable, omit that reading (better nothing than wrong).
- Interpretation (how it illustrates the theory) is your analysis: write it as such ("Read through X, this is…"), clearly separated from the facts.

## Output
One JS file defining ONE const (name in your assignment), keyed by reading id:
```js
const TD_X={
 harvey:{t:"Short title (≤ 8 words)",
   d:"What happened: 2–3 factual sentences, with the key number/date, all from the source.",
   why:"How it illustrates the reading: 2–3 sentences naming the concept/mechanism (e.g. 'inter-urban competition', 'public sector absorbs the risk'), plus one honest limit of the analogy.",
   src:{name:"Outlet or institution", title:"Page title", url:"https://...", date:"YYYY-MM-DD or YYYY-MM"}},
 ...
};
```
Plain English, concise, ':' or ';' instead of long dashes. Validate with node: `node -e "const fs=require('fs');const o=new Function(fs.readFileSync('FILE','utf8')+';return TD_X')();console.log(Object.keys(o))"` (substitute names). Final report: per reading, the example and source URL, and any reading you skipped and why.
