import * as vecs from '/es/vectors.es'

export var N = vecs.Vec2( 0, -1 )
export var S = vecs.Vec2( 0, +1 )
export var E = vecs.Vec2( +1, 0 )
export var W = vecs.Vec2( -1, 0 )
export var IN_PLACE = vecs.Vec2( 0, 0 )

export var NE = vecs.Vec2( +1, -1 )
export var NW = vecs.Vec2( -1, -1 )
export var SE = vecs.Vec2( +1, +1 )
export var SW = vecs.Vec2( -1, +1 )

export var CARDINALS = [N, S, E, W]
export var DIAGONALS = [NE, NW, SE, SW]
export var PENTAGONALS = [...CARDINALS, IN_PLACE]
export var OCTAGONALS = [...CARDINALS, ...DIAGONALS]
export var NONAGONALS = [...OCTAGONALS, IN_PLACE]