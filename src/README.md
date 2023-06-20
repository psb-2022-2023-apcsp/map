# [`bhsmap.py`](https://github.com/psb-2022-2023-apcsp/map/blob/main/src/bhsmap.py)

This is a [Python](https://python.org/) script to update `data.js`. The original [sheet](https://docs.google.com/spreadsheets/d/1uQwINplxn1QdV_CDL8rVaeNIfAbMU_5RNFrokB4DKMw/) includes the original mapping that connects all rooms / stairs / turns *at least once*. Using `bhsmap.py` and the .CSV file downloaded from the `data` tab, the `data.js` code is generated as follows:

Read .CSV, add a next references for both from and to for each name, update stairs and turns names based on their positions, replace old stair and turn names, reformat .CSV and save it, and echo .JS data.

## TODO

- Add `building` and `floor` fields to data.
