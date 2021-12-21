import * as utils from '/es/utils.es'
import * as vecs from '/es/vectors.es'
import * as dirconst from '/es/dirconst.es'

export class NoFacing {
    set(vec) {
        if (vec == null) {
        } else {
            throw ("PANIC: Tried to set facing of directionless component!")
        }
    }
}

export class HVFacing {
    constructor() {
        this.data = null
    }

    set(vec) {
        if (vec.eq(dirconst.N) || vec.eq(dirconst.S)) {
            this.data = dirconst.S
        } else if (vec.eq(dirconst.E) || vec.eq(dirconst.W)) {
            this.data = dirconst.E
        } else if (vec == null) {
            this.data = null
        } else {
            throw ("PANIC: Tried to set facing of CardinalFacing component to non-cardinal value!")
        }
    }
}

export class CardinalFacing {
    constructor() {
        this.data = null
    }

    set(vec) {
        if (dirconst.CARDINALS.includes(vec)) {
            this.data = vec
        } else if (vec == null) {
            this.data = null
        } else {
            throw ("PANIC: Tried to set facing of CardinalFacing component to non-cardinal value!")
        }
    }
}

export class DoubleCardinalFacing {
    constructor() {
        this.data = null
    }

    set( vecs ) {
        if (vecs == null) {
            this.data = null
        } else if (vecs.length != 2) {
            throw ("PANIC: Tried to set facing of DoubleCardinalFacing component to non-cardinal value pair!")
        } else {
            let [vec0, vec1] = vecs
            if (!dirconst.CARDINALS.includes(vec0)) {
                throw ("PANIC: Tried to set facing element of CardinalFacing component to non-cardinal value!")
            } else if (!dirconst.CARDINALS.includes(vec1)) {
                throw ("PANIC: Tried to set facing element of CardinalFacing component to non-cardinal value!")
            } else if (vecs0 == vec1) {
                throw ("PANIC: Tried to set facing element of CardinalFacing component to duplicate values!")
            } else {
                this.data = [vec0, vec1]
            }
        }
    }
}


export class ComponentSpecs {
    constructor() {
        this._placeVecs = vecs.arrToVecs(utils.span2( [0, 0], this.xySize.xy ))
    }

    tConnectors(tile) {
        return []
    }

    get facingClass() { return NoFacing }
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
    get facingClass() { return CardinalFacing }
    get xySize() { return vecs.Vec2(1,1) }

    get debugDrawPoints () {
        return [ [4,1], [6,1], [6,4], [7,5], [6,6], [4,6], [3,5], [4,4] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
}

class Connector {
    constructor(tile, facing) {
        this.tile = tile
        this.facing = facing
    }
    get destTile() { return this.tile.rel(this.facing) }
}
class ElectricConnector extends Connector {    
}
class EmptyTileConnector extends Connector {
}

class _GenericCable extends ComponentSpecs {
    get facingClass() { return DoubleCardinalFacing }
    get xySize() { return vecs.Vec2(1,1) }

    get connectorClass() { return ElectricConnector }

    tConnectors(comp) {
        if (comp.facing == null) {
            return []
        } else {
            return comp.facing.map( (vec) => new this.connectorClass(comp.tile, vec) )
        }
    }
}

class _ElectricCable extends _GenericCable {
    get facingClass() { return DoubleCardinalFacing }
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
