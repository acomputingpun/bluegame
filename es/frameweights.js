import * as vecs from '/es/vectors.js'
import * as utils from '/es/utils.js'


class _FrameWeight {
    constructor() {
        this._placeVecs = vecs.arrToVecs(utils.span2( [0, 0], this.xySize.xy ))
    }

    get xySize() { throw "Not implemented!" }
    get placeVecs() { return this._placeVecs }

    valueOf() { return ASCENDING_ORDER.indexOf(this) }
}

class _SuperlightFrameWeight extends _FrameWeight {
    get xySize() { return vecs.Vec2(1, 1) }
    get debugColour() { return "#DD9" }
}

class _LightFrameWeight extends _FrameWeight {
    get xySize() { return vecs.Vec2(1, 1) }
    get debugColour() { return "#B85" }
}
class _MediumFrameWeight extends _FrameWeight {
    get xySize() { return vecs.Vec2(2, 2) }
    get debugColour() { return "#B55" }
}
class _HeavyFrameWeight extends _FrameWeight {
    get xySize() { return vecs.Vec2(2, 2) }
    get debugColour() { return "#923" }
}
class _SuperheavyFrameWeight extends _FrameWeight {
    get xySize() { return vecs.Vec2(3, 3) }
    get debugColour() { return "#414" }
}

export var Superlight = new _SuperlightFrameWeight()
export var Light = new _LightFrameWeight()
export var Medium = new _MediumFrameWeight()
export var Heavy = new _HeavyFrameWeight()
export var Superheavy = new _SuperheavyFrameWeight()

export var ASCENDING_ORDER = [ Superlight, Light, Medium, Heavy, Superheavy ]
export var DESCENDING_ORDER = [ Superheavy, Heavy, Medium, Light, Superlight ]