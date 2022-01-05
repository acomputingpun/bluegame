import * as hacks from '/es/hacks.js'
import * as errs from '/es/errs.js'
import * as vecs from '/es/vectors.js'
import * as dirconst from '/es/dirconst.js'

import * as base from './base.js'
import * as specs from './specs.js'
import * as resources from '/es/resources.js'

class _IndefiniteSource extends base.ComponentSpec {
    constructor(resClass = hacks.argPanic(), connFacings = dirconst.CARDINALS, ...args) {
        super(...args)
        this._resClass = resClass
        this._connectors = connFacings.map( (facing) => this.resClass.toConnector(dirconst.IN_PLACE, facing ) )
    }
    get instanceClass() { return _ISInstance }

    get resClass() { return this._resClass }
    _createConnectors() { return null }
}

class _LPSInstance extends specs._ResourceCompInstance {
    constructor(...args) {
        super(...args)
        this.resPool = this.resourcePools[0]
    }

    foreignReserve(bidder = hacks.argPanic(), res = hacks.argPanic()) {
        if (this.connectors.includes(bidder)) {
            return this.resPool.foreignReserve(this, res)
        } else {
            throw new errs.Panic("invalid call of foreignReserve()!")
        }
    }
    foreignConsume(consumer = hacks.argPanic(), res = hacks.argPanic()) {
        if (this.connectors.includes(consumer)) {
            console.log(`Consuming from ${this} - res left, ${this.resPool.quantity}`)
            return this.resPool.foreignConsume(this, res)
        } else {
            throw new errs.Panic("invalid call of foreignConsume()!")
        }
    }
}
class _LimitedPoolSource extends base.ComponentSpec {
    constructor(resClass = hacks.argPanic(), connFacings = dirconst.CARDINALS, ...args) {
        super(...args)
        this._resClass = resClass
        this._connectors = connFacings.map( (facing) => this.resClass.toConnector(dirconst.IN_PLACE, facing ) )
        this._resourcePools = [ new resources.ResourcePool(this.resClass, 30) ]
    }

    get instanceClass() { return _LPSInstance }
    get resClass() { return this._resClass }

    _createConnectors() {
        return null
    }
    _createResourcePools() {
        return null
    }
}

class _ElectricSourceInstance extends specs._ResourceCompInstance {
    foreignReserve(bidder = hacks.argPanic(), res = hacks.argPanic()) {
        return res.resClass == resources.Electric
    }
    foreignConsume(consumer = hacks.argPanic(), res = hacks.argPanic()) {
        return res.resClass == resources.Electric
    }
}
class _ElectricSource extends _IndefiniteSource {
    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [-2,-6], [2,-8], [2,-2], [6,-2], [8,2], [2,2], [2,6], [-2,8], [-2,2], [-6,2], [-8,-2], [-2,-2] ].map( ( xy ) => vecs.Vec2(...xy).sMul(0.1) )
    }
    get debugName() { return "ElectricSource" }
    get instanceClass() { return _ElectricSourceInstance }
}

class _Battery extends _LimitedPoolSource {
    constructor() {
        super(resources.Electric)
    }

    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [0, 9], [0, 3], [3, 6], [3, -6], [0, -9], [0, -3], [-3, -6], [-3, 6] ].map( ( xy ) => vecs.Vec2(...xy).sMul(0.1) )
    }
    get debugName() { return "Battery" }
}

class _FuelTank extends _LimitedPoolSource {
    constructor() {
        super(resources.Fuel)
    }

    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [7,7], [0,6], [-7,7], [-6,0], [-7,-7], [0,-6], [7,-7], [6,0] ].map( ( xy ) => vecs.Vec2(...xy).sMul(0.1) )
    }
    get debugName() { return "Fuel Tank" }
}

export var Battery = new _Battery()
export var FuelTank = new _FuelTank()