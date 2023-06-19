#!/usr/bin/env python3
#
# bhsmap.py
#
import csv, os

datastartf, dataendf = """/** BHS Map data. 
 */
//34567890123456789012345678901234567890123456789012345678901234567890
// Rooms code from the spreadsheet.
var rooms = [\n""", '];'

def update(csvpath, verb=False):
    """Read csvpath, add next references in both from and to for each name,
    update stairs and turns based on their positions, replace stair and turn
    names with new ones, reformat .CSV and save it, and echo .JS data."""
    # Read csvpath w/ columns name,x,y,direction,next1,next2,next3 into datadict
    # w/ keys 'name' of dictionaries w/ keys str 'name', int 'x', int 'y',
    # str 'direction', set 'next'.
    with open(csvpath, 'r') as f:
        data = csv.reader(f)
        datadict = dict()
        for row in list(data)[1:]:
            if any(row):
                assert all(row[:3]), f"missing something of [ room, x, y, ]: {row[:3]}"
                name, x, y, direction = row[0].upper(), int(row[1]), int(row[2]), row[3].upper()
                datadict[name] = {
                    'name': name, 'x': x, 'y': y, 'direction': direction,
                    'next': set([ n.upper() for n in row[4: ] if n ]),
                }
                if verb: print(datadict[name])
    # Update datadict[key]['next'] set for every key in each rowdict['next'] set
    # to include a back reference.
    for key, rowdict in datadict.items():
        for name in rowdict.get('next', set()):
            assert name in datadict, f"'{name}' in rowdict['next'] but not in datadict"
            datadict[name]['next'].add(key)
            if verb: print(datadict[name])
    # Create stairdict and turndict keyed by key = (floor, y, x, ).
    stairdict, turndict, mapdict = dict(), dict(), dict()
    for name in datadict:
        floor, x, y = int(name[1]), datadict[name].get('x', 0), datadict[name].get('y', 0)
        assert x and y, f"missing something of (x,y): {datadict[name]}"
        key = (floor, y, x, )
        if name.startswith('S'):
            assert key not in stairdict, \
                f"{key} already in stairdict ({name} v. {stairdict[key]}"
            stairdict[key] = name
            if verb: print(f"stairdict[{key}]: {stairdict[key]}")
        if name.startswith('T'):
            assert key not in turndict, \
                f"{key} already in turndict ({name} v. {turndict[key]}"
            turndict[key] = name
            if verb: print(f"turndict[{key}]: {turndict[key]}")
    # Add to mapdict w/ stair names in order by key.
    ns = [ 1, 1, 1, 1, ]
    for k in sorted(stairdict):
        p, v, f, x, y = 'S', stairdict[k], *k
        mapdict[v] = f"{p}{f}{ns[f - 1]:02}"
        if verb: print(f"mapdict[{v}]: {mapdict[v]}")
        ns[f - 1] += 1
    # Add to mapdict w/ turn names in order by key.
    ns = [ 1, 1, 1, 1, ]
    for k in sorted(turndict):
        p, v, f, x, y = 'T', turndict[k], *k
        mapdict[v] = f"{p}{f}{ns[f - 1]:02}"
        if verb: print(f"mapdict[{v}]: {mapdict[v]}")
        ns[f - 1] += 1
    # Substitute mapdict values throughout datadict w/ prefixed '*'.
    for k in list(datadict):
        current, next = datadict[k].get('next', set()), set()
        for e in current:
            next.add(f"*{mapdict[e]}" if e in mapdict else e)
        datadict[k]['next'] = next
        # Replace datadict[k] if mapdict[k] exists w/ new key.
        if (mapdict.get(k, None)):
            assert k not in current, f"{k} in {current}"
            datadict[f"*{mapdict[k]}"] = datadict[k]
            del datadict[k]
    # Remove '*' prefix from all names.
    for k in list(datadict):
        current, next = datadict[k].get('next', set()), set()
        for e in current:
            next.add(e.replace('*', '', 1))
        datadict[k]['next'] = next
        if ('*' in k):
            datadict[k.replace('*', '', 1)] = datadict[k]
            del datadict[k]
    # Export updated .CSV.
    data = list()
    for name in sorted(datadict):
        x, y, d = datadict[name]['x'], datadict[name]['y'], datadict[name]['direction'],
        n = sorted(list(datadict[name]['next']))
        data.append([name, x, y, d] + n)
    name, ext = os.path.splitext(csvpath)
    print(f"/* Updated .CSV: {name}-updated{ext} */")
    with open(f"{name}-updated{ext}", 'w') as f:
        writer = csv.writer(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        writer.writerow('name,x,y,direction,next1,next2,next3,next4'.split(','))
        writer.writerows(data)
    # Print JavaScript data.
    js = ''
    for name in sorted(datadict):
        x, y, d = datadict[name]['x'], datadict[name]['y'], datadict[name]['direction'],
        n = repr(sorted(list(datadict[name]['next']))).replace("'", '"')
        direction = f'direction: "{d}", ' if d else ''
        next = f'next: {n}, ' if datadict[name]['next'] else ''
        js += f'  {{ name: "{name}", x: {x}, y: {y}, {direction}{next}}},\n'
    print(f"{datastartf}{js}{dataendf}")

if __name__ == '__main__':
    csvpath = './bhs-map-sheet-data.csv'
    update(csvpath)