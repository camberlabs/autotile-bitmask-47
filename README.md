# autotile-bitmask-47

Zero-dependency **47-Tile Blob Bitmask Reducer** (`256 -> 47`), **16-Tile Dual-Grid Wang Mapper**, and **Extruded Atlas Dimension Calculator** for **JavaScript**, **Godot 4**, and **Unity**.

## Why 47 Instead of 256?

An 8-neighbor boolean bitmask produces `2^8 = 256` combinations, but diagonal corners (`NE, SE, SW, NW`) only visually affect a tile when **both** bordering cardinal edges (`N & E`, etc.) are solid. Masking out redundant corners collapses all 256 raw bitmasks cleanly into the exact **47 canonical blob tiles**.

- **Free Interactive Atlas & Extrusion Calculator:** [47-Tile Blob & Autotile Atlas Calculator](https://camberlabs.github.io/tools/47-tile-blob-autotile-atlas-calculator/)

---

## Quick Usage (JS / ESM)

```js
import { canonicalizeMask47, maskToTileIndex47, computeExtrudedAtlasSize } from './src/bitmask47.mjs';

const mask = canonicalizeMask47(1 | 2 | 4 | 8); // corners pruned unless both cardinals solid
const tileIdx = maskToTileIndex47(mask);        // 0..46
const atlas = computeExtrudedAtlasSize({ tilePx: 16, cols: 12, rows: 4, extrudePx: 1, paddingPx: 1 });
// -> { widthPx: 227, heightPx: 75, cellWithExtrusionPx: 18 }
```

## Want Ready-Made 47-Tile Biome Sheets + Tiled `.tmj` Dungeons?

Try **[TileForge Studio (£6.99)](https://camberlabs.itch.io/tileforge-studio)** (free live browser demo + 24 extruded RGBA biome sheets & 10 Tiled `.tmj` dungeons) or grab all 5 offline tools in the **[Camber Labs Game-Maker Toolkit (£16.99 — Save 51%)](https://itch.io/s/218099/camber-labs-game-maker-toolkit-all-5-tools)**.
