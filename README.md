# Spatial Planner helper

A single-page study site for the **MSc Spatial Planning at Utrecht University** (2026–27).

| Course | Code | Status |
|---|---|---|
| Real Estate | GEO4-3917 | Period 2 · readings, quiz at five exam levels, open questions, flashcards, exam simulation, teacher mode |
| Advanced Research Methods | GEO4-3120 | Period 2 · proposal checklist, oral exam practice, learning labs, reading list |
| Beyond Planning Theory | GEO4-3115 | Period 1 · finished, archived |
| Planning for Sustainable Cities | GEO4-3124 | Period 1 · finished, archived |
| Graduate Planning Studio | GEO4-3127 | Runs until end of January |

Progress is stored in your own browser (`localStorage`), so everyone who opens it has their own progress.

## Use it
Open `index.html` in a browser, or enable **GitHub Pages** (Settings → Pages → Deploy from branch → `main` / root) and share the link.

## Edit it
All content and code live in `src/` (plain JS data files + app code). After editing, run:

```bash
python3 build.py   # writes index.html
NODE_PATH=$(npm root -g) node tools/test_site.js   # smoke test: every page, quiz and question bank
```

- `src/p2_readings.js`, `p2b_updates.js`, `p9*.js`: BPT readings; `p3_bank.js`: flashcards (`FC`), MCQs (`MCQ`), open questions (`OPEN`)
- `src/p8_psc_data.js`: PSC lectures, flashcards, essay questions
- `src/p4_consts.js`: exam dates, weeks, day plan
- `src/p5_app.js`, `p6_courses.js`, `p7_studio.js`, `p10_motion.js`: the app
- `src/p1_shell.html`: styles and page shell

Continuing development in a new chat: see `HANDOVER.md`.

Each reading page says what it is built from (full text, slides only, or general knowledge). Check anything marked partial against the original text. Not affiliated with Utrecht University.

## Adding a course (period 2 onwards)
New courses are data files on the course template in `src/ct_core.js`: call `CT.add({...})` with lectures, readings, questions, open questions and optional teacher-mode scenes (see `src/re_data.js`). Views, routing, progress and the home tile come for free.
