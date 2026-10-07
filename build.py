"""Concatenate src/ into one self-contained index.html (no dependencies)."""
from pathlib import Path
SRC = Path(__file__).parent / "src"
ORDER = ["p2_readings.js", "p3_bank.js", "p2b_updates.js",
         "p9a_mid.js", "p9b_w6.js", "p9c_w7a.js", "p9d_w7b.js", "ex1.js", "ex2.js", "ex3.js", "ex4.js", "ext1.js", "ext2.js", "ext3.js", "ext4.js", "ext5.js", "ext6.js", "ext7.js", "games_data.js", "gq1.js", "gq2.js", "gq3.js", "gq4.js", "td1.js", "td2.js", "td3.js", "td4.js", "td5.js", "sl1.js", "sl2.js", "sl3.js", "sl4.js", "sl5.js", "sl6.js", "mf1.js", "mf2.js", "mf3.js", "mf4.js", "hq1.js", "hq2.js", "hq3.js", "hq4.js", "hq5.js", "hq6.js", "hq7.js", "hq8.js", "aud1.js", "aud2.js", "aud3.js", "aud4.js", "aud5.js", "mgall.js", "fx1.js", "fx2.js", "auto.js", "p9z_merge.js",
         "p4_consts.js", "p8_psc_data.js", "p5_app.js", "p6_courses.js",
         "p11_games.js", "p10_motion.js", "p7_studio.js"]
js = "\n".join((SRC / f).read_text(encoding="utf-8") for f in ORDER)
shell = (SRC / "p1_shell.html").read_text(encoding="utf-8")
Path(__file__).parent.joinpath("index.html").write_text(
    "<!doctype html>\n<html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\"></head><body>\n"
    + shell + "\n<script>\n" + js + "\n</script>\n</body></html>\n", encoding="utf-8")
print("index.html built")
