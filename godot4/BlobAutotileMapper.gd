# BlobAutotileMapper.gd — Pure 256->47 bitmask reducer for Godot 4 TileMapLayer / custom meshes
# Calculator: https://camberlabs.github.io/tools/47-tile-blob-autotile-atlas-calculator/
extends RefCounted
class_name BlobAutotileMapper

const BIT_N := 1
const BIT_NE := 2
const BIT_E := 4
const BIT_SE := 8
const BIT_S := 16
const BIT_SW := 32
const BIT_W := 64
const BIT_NW := 128

static func canonicalize_mask(raw_mask: int) -> int:
	var card := raw_mask & (BIT_N | BIT_E | BIT_S | BIT_W)
	var diag := 0
	if (raw_mask & BIT_NE) != 0 and (card & BIT_N) != 0 and (card & BIT_E) != 0:
		diag |= BIT_NE
	if (raw_mask & BIT_SE) != 0 and (card & BIT_E) != 0 and (card & BIT_S) != 0:
		diag |= BIT_SE
	if (raw_mask & BIT_SW) != 0 and (card & BIT_S) != 0 and (card & BIT_W) != 0:
		diag |= BIT_SW
	if (raw_mask & BIT_NW) != 0 and (card & BIT_W) != 0 and (card & BIT_N) != 0:
		diag |= BIT_NW
	return card | diag
