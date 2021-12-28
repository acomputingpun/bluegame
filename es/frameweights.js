import * as vecs from '/es/vectors.js'
import * as utils from '/es/utils.js'
import * as occupants from '/es/comps/occupants.js'


class _FrameWeight extends occupants.GeneralSpec {
    constructor() {
        super()
        this._placeVecs = vecs.arrToVecs(utils.span2( [0, 0], this.xySize.xy ))
    }

    get isFrame() { return true }

    get xySize() { throw "Not implemented!" }
    get placeVecs() { return this._placeVecs }
    get debugName () { return "unnamedFrameweight" }

    valueOf() { return ASCENDING_ORDER.indexOf(this) }
    toString() { return `w${this.debugName}` }
}

class _SuperlightFrameWeight extends _FrameWeight {
    get xySize() { return vecs.Vec2(1, 1) }
    get debugColour() { return "#DD9" }
    get debugName () { return "superlight" }
}

class _LightFrameWeight extends _FrameWeight {
    get xySize() { return vecs.Vec2(1, 1) }
    get debugColour() { return "#B85" }
    get debugName () { return "light" }
}
class _MediumFrameWeight extends _FrameWeight {
    get xySize() { return vecs.Vec2(2, 2) }
    get debugColour() { return "#B55" }
    get debugName () { return "medium" }
}
class _HeavyFrameWeight extends _FrameWeight {
    get xySize() { return vecs.Vec2(2, 2) }
    get debugColour() { return "#923" }
    get debugName () { return "heavy" }
}
class _SuperheavyFrameWeight extends _FrameWeight {
    get xySize() { return vecs.Vec2(3, 3) }
    get debugColour() { return "#414" }
    get debugName () { return "superheavy" }
}

export var Superlight = new _SuperlightFrameWeight()
export var Light = new _LightFrameWeight()
export var Medium = new _MediumFrameWeight()
export var Heavy = new _HeavyFrameWeight()
export var Superheavy = new _SuperheavyFrameWeight()

export var ASCENDING_ORDER = [ Superlight, Light, Medium, Heavy, Superheavy ]
export var DESCENDING_ORDER = [ Superheavy, Heavy, Medium, Light, Superlight ]