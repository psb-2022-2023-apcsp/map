# map

PSB 2022-2023 APCS-P BHS map app

This is the final project of BHS 2022-2023 APCS-P G-Block. There are several projects and files used in the preparation of this app.

| Link | Description |
| --- | --- |
| [https://psb-2022-2023-apcsp.github.io/map/p5.js/](https://psb-2022-2023-apcsp.github.io/map/p5.js/) | The live app on [Github](https://github.com/). |
| [https://replit.com/@bhsapcsp23g/BHSMap-bhsapcsp23g](https://replit.com/@bhsapcsp23g/BHSMap-bhsapcsp23g) | A shared [repl.it](repl.it) app using [p5.js](p5.js.org). |
| [https://editor.p5js.org/psb_david_petty/sketches/_eOTlmkFt](https://editor.p5js.org/psb_david_petty/sketches/_eOTlmkFt) | The [p5.js](p5.js.org) sketch. |
| [`bhsmap.py`](https://github.com/psb-2022-2023-apcsp/map/blob/main/src/bhsmap.py) | A [Python](https://python.org/) script to update `data.js` |

## TODO

- Add `building` and `floor` fields to data and use them so node type is not based on encoding w/ `'r'`, `'s'`, `'t'`.
- Complete all floors in 115 Greenough (especially floor 2) and all floors in 22 Tappan.
- Check all arrow connections &mdash; especially stair connections &mdash; to see that they are bidirectional.
- **Actually write the algorithm that searches room data for the shortest path from one room to another.**
- Display shortest path on the map.
- Add UI to to select *from* and *to* rooms.

<hr>

[&#128279; permalink](https://psb-2022-2023-apcsp.github.io/map/) and [&#128297; repository](https://github.com/psb-2022-2023-apcsp/map) for [this](https://editor.p5js.org/psb_david_petty/sketches/_eOTlmkFt) sketch.
