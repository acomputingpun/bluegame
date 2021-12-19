import * as utils from '/es/utils.es'
import * as vecs from '/es/vectors.es'

export class ComponentSpecs {
    constructor() {
        this._placeVecs = vecs.arrToVecs(utils.span2( [0, 0], this.xySize.xy ))
    }

    get xySize() { throw "Not implemented!" }
    get placeVecs() { return this._placeVecs }
}

class _SmallDoodad extends ComponentSpecs {
    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [1,1], [9,1], [1,9], [9,9] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
}
class _LargeDoodad extends ComponentSpecs {
    get xySize() { return vecs.Vec2(3,2) }
    get debugDrawPoints () {
        return [ [1,1], [9,1], [1,9], [9,9] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
}
class _HeavyDoodad extends ComponentSpecs {
    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [1,1], [4,1], [4,4], [9,4], [9,8], [6,8], [6,9], [1,9] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
}

class _ElectricSink extends ComponentSpecs {
    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [4,1], [6,1], [6,4], [9,4], [9,6], [6,6], [6,9], [4,9], [4,6], [1,6], [1,4], [4,4] ].map( ( xy ) => vecs.Vec2(...xy) )
    }

}
class _ElectricSource extends ComponentSpecs {
    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [4,3], [6,1], [6,4], [7,4], [9,6], [6,6], [6,7], [4,9], [4,6], [3,6], [1,4], [4,4] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
}

class _FuelSink extends ComponentSpecs {
    get xySize() { return vecs.Vec2(1,1) }
}
class _FuelSource extends ComponentSpecs {  
    get xySize() { return vecs.Vec2(1,1) }
}

class _LaserGun extends ComponentSpecs {
    get xySize() { return vecs.Vec2(1,1) }

    get debugDrawPoints () {
        return [ [4,1], [6,1], [6,4], [7,5], [6,6], [4,6], [3,5], [4,4] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
}

class _ElectricCable extends ComponentSpecs {
    get xySize() { return vecs.Vec2(1,1) }
}

export var SmallDoodad = new _SmallDoodad()
export var LargeDoodad = new _LargeDoodad()
export var HeavyDoodad = new _HeavyDoodad()
export var ElectricSink = new _ElectricSink()
export var ElectricSource = new _ElectricSource()

export var FuelSink = new _FuelSink()
export var FuelSource = new _FuelSource()

export var LaserGun = new _LaserGun()
export var ElectricCable = new _ElectricCable()
