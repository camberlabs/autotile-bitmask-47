// Blob47TileMapper.cs — 256->47 canonical bitmask lookup for Unity RuleTile / procedural grids
// Calculator: https://camberlabs.github.io/tools/47-tile-blob-autotile-atlas-calculator/
namespace CamberLabs.Autotile
{
    public static class Blob47TileMapper
    {
        public const int N = 1, NE = 2, E = 4, SE = 8, S = 16, SW = 32, W = 64, NW = 128;

        public static int CanonicalizeMask(int rawMask)
        {
            int c = rawMask & (N | E | S | W);
            int d = 0;
            if ((rawMask & NE) != 0 && (c & N) != 0 && (c & E) != 0) d |= NE;
            if ((rawMask & SE) != 0 && (c & E) != 0 && (c & S) != 0) d |= SE;
            if ((rawMask & SW) != 0 && (c & S) != 0 && (c & W) != 0) d |= SW;
            if ((rawMask & NW) != 0 && (c & W) != 0 && (c & N) != 0) d |= NW;
            return c | d;
        }

        public static int DualGridIndex(bool tl, bool tr, bool br, bool bl)
        {
            return (tl ? 1 : 0) | (tr ? 2 : 0) | (br ? 4 : 0) | (bl ? 8 : 0);
        }
    }
}
