import * as vecs from '/es/vectors.es'
import * as utils from '/es/utils.es'


class _FrameWeight {
    constructor() {
        this._placeVecs = vecs.arrToVecs(utils.span2( [0, 0], this.xySize.xy ))
    }

    get xySize() { throw "Not implemented!" }
    get placeVecs() { return this._placeVecs }
}

class _SuperlightFrameWeight extends _FrameWeight {
    get xySize() { return vecs.Vec2(1, 1) }
}
class _LightFrameWeight extends _FrameWeight {
    get xySize() { return vecs.Vec2(1, 1) }
}
class _MediumFrameWeight extends _FrameWeight {
    get xySize() { return vecs.Vec2(2, 2) }
}
class _HeavyFrameWeight extends _FrameWeight {
    get xySize() { return vecs.Vec2(2, 2) }
}
class _SuperheavyFrameWeight extends _FrameWeight {
    get xySize() { return vecs.Vec2(3, 3) }
}

export var Superlight = new _SuperlightFrameWeight()
export var Light = new _LightFrameWeight()
export var Medium = new _MediumFrameWeight()
export var Heavy = new _HeavyFrameWeight()
export var Superheavy = new _SuperheavyFrameWeight()