"""Concatenate src/ into one self-contained index.html (no dependencies)."""
from pathlib import Path
SRC = Path(__file__).parent / "src"
ORDER = ["p2_readings.js", "p3_bank.js", "p2b_updates.js",
         "p9a_mid.js", "p9b_w6.js", "p9c_w7a.js", "p9d_w7b.js", "ex1.js", "ex2.js", "ex3.js", "ex4.js", "p9z_merge.js",
         "p4_consts.js", "p8_psc_data.js", "p5_app.js", "p6_courses.js",
         "p10_motion.js", "p7_studio.js"]
js = "\n".join((SRC / f).read_text(encoding="utf-8") for f in ORDER)
shell = (SRC / "p1_shell.html").read_text(encoding="utf-8")
Path(__file__).parent.joinpath("index.html").write_text(
    "<!doctype html>\n<html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\"></head><body>\n"
    + shell + "\n<script>\n" + js + "\n</script>\n</body></html>\n", encoding="utf-8")
print("index.html built")
