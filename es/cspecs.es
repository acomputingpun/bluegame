import * as utils from '/es/utils.es'
import * as vecs from '/es/vectors.es'
import * as dirconst from '/es/dirconst.es'
import * as connectors from '/es/connectors.es'

export class NoFacing {
    set(vec) {
        if (vec == null) {
        } else {
            throw ("PANIC: Tried to set facing of directionless component!")
        }
    }
    rot(cw = true) {
        // do nothing, we can't rotate a directionless comp
    }
}

export class HVFacing {
    constructor() {
        this.data = null
    }

    set(vec) {
        if (vec == null) {
            this.data = null
        } else if (vec.eq(dirconst.N) || vec.eq(dirconst.S)) {
            this.data = dirconst.S
        } else if (vec.eq(dirconst.E) || vec.eq(dirconst.W)) {
            this.data = dirconst.E
        } else {
            throw ("PANIC: Tried to set facing of HVFacing component to non-cardinal value!")
        }
    }

    rot(cw = true) {
        if (this.data == null) {
            this.data = null
        } else if (this.data.eq(dirconst.S)) {
            this.data = dirconst.E
        } else if (this.data.eq(Sirconst.E)) {
            this.data = dirconst.E
        } else {
            throw (`PANIC: facing of HVFacing component somehow became set to invalid value ${this.data}`)
        }
    }
}

export class CardinalFacing {
    constructor() {
        this.data = dirconst.N
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
    rot(cw = true) {
        if (this.data == null) {
            this.data = null
        } else if (dirconst.CARDINALS.includes(this.data)) {
            if (cw) {
                this.data = dirconst.ROT_CW.get(this.data)
            } else {
                this.data = dirconst.ROT_CCW.get(this.data)
            }
        } else {
            throw (`PANIC: facing of CardinalFacing component somehow became set to invalid value ${this.data}`)
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

    rot(cw = true) {
        if (this.data == null) {
            this.data = null
        } else {
            if (cw) {
                this.set( this.data.map( (vec) => dirconst.ROT_CW.get(vec) ) )
            } else {
                this.set( this.data.map( (vec) => dirconst.ROT_CCW.get(vec) ) )
            }
        }
    }
}


export class ComponentSpecs {
    constructor() {
        this._placeVecs = vecs.arrToVecs(utils.span2( [0, 0], this.xySize.xy ))
    }

    createConnectors(comp) {
        return []
    }

    get facingClass() { return NoFacing }
    get xySize() { throw "Not implemented!" }
    get placeVecs() { return this._placeVecs }
}

class _SmallDoodad extends ComponentSpecs {
    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [-.8,-.8], [.8,-.8], [-.8,.8], [-.8,-.8] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
}
class _LargeDoodad extends ComponentSpecs {
    get xySize() { return vecs.Vec2(3,2) }
    get debugDrawPoints () {
        return [ [-.8,-.8], [.8,-.8], [-.8,.8], [.8,.8] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
}
class _HeavyDoodad extends ComponentSpecs {
    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [-.8,-.8], [-.2,-.8], [-.2,-.2], [.8,-.2], [.8,.6], [.2,.6], [.2,.8], [-.8,.8] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
}

class _ElectricSink extends ComponentSpecs {
    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [-.2,-.8], [.2,-.8], [.2,-.2], [.8,-.2], [.8,.2], [.2,.2], [.2,.8], [-.2,.8], [-.2,.2], [-.8,.2], [-.8,-.2], [-.2,-.2] ].map( ( xy ) => vecs.Vec2(...xy) )
    }

}
class _ElectricSource extends ComponentSpecs {
    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [-.2,-.6], [.2,-.8], [.2,-.2], [.6,-.2], [.8,.2], [.2,.2], [.2,.6], [-.2,.8], [-.2,.2], [-.6,.2], [-.8,-.2], [-.2,-.2] ].map( ( xy ) => vecs.Vec2(...xy) )
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
        return [ [-.2,-.8], [.2,-.8], [.2,-.2], [.4,0], [.2,.2], [-.2,.2], [-.4,0], [-.2,-.2] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
}


class _GenericCable extends ComponentSpecs {
    get facingClass() { return DoubleCardinalFacing }
    get xySize() { return vecs.Vec2(1,1) }

    get connectorClass() { return connectors.ElectricConnector }

    createConnectors(comp) {
        if (comp.facing == null) {
            return []
        } else if (comp.tile == null) {
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
