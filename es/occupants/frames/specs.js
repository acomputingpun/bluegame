import * as vecs from '/es/vectors.js'
import * as utils from '/es/utils.js'
import * as base from './base.js'

class _SuperlightFrameSpec extends base.FrameSpec {
    get xySize() { return vecs.Vec2(1, 1) }
    get debugColour() { return "#DD9" }
    get debugName () { return "superlight" }
}

class _LightFrameSpec extends base.FrameSpec {
    get xySize() { return vecs.Vec2(1, 1) }
    get debugColour() { return "#B85" }
    get debugName () { return "light" }
}
class _MediumFrameSpec extends base.FrameSpec {
    get xySize() { return vecs.Vec2(2, 2) }
    get debugColour() { return "#B55" }
    get debugName () { return "medium" }
}
class _HeavyFrameSpec extends base.FrameSpec {
    get xySize() { return vecs.Vec2(2, 2) }
    get debugColour() { return "#923" }
    get debugName () { return "heavy" }
}
class _SuperheavyFrameSpec extends base.FrameSpec {
    get xySize() { return vecs.Vec2(3, 3) }
    get debugColour() { return "#414" }
    get debugName () { return "superheavy" }
}

export var Superlight = new _SuperlightFrameSpec()
export var Light = new _LightFrameSpec()
export var Medium = new _MediumFrameSpec()
export var Heavy = new _HeavyFrameSpec()
export var Superheavy = new _SuperheavyFrameSpec()

export var ASCENDING_ORDER = [ Superlight, Light, Medium, Heavy, Superheavy ]
export var DESCENDING_ORDER = [ Superheavy, Heavy, Medium, Light, Superlight ]