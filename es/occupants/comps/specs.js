import * as utils from '/es/utils.js'
import * as vecs from '/es/vectors.js'
import * as dirconst from '/es/dirconst.js'
import * as connspecs from '../conns/specs.js'

import * as resources from '/es/comps/resources.js'

import * as base from './base.js'

class _ResourceCompInstance extends base.ComponentInstance {
    constructor(...args) {
        super(...args)
        this._resourceBids = []
    }

    foreignReserve(bidder = hacks.argPanic(), res = hacks.argPanic() ) {
        throw `PANIC: Call to to-be-overridden method foreignReserve() of ResourceCompInstance ${this}!`
    }
    foreignConsume(consumer = hacks.argPanic(), res = hacks.argPanic()) {
        throw `PANIC: Call to to-be-overridden method foreignConsume() of ResourceCompInstance ${this}!`
    }

    drawReserve(resSource, res) {
        console.log(`COMP ${this} calling drawReserve ${resSource} of ${res}`)

        if (resSource.foreignReserve(this, res)) {
            this._resourceBids.push ( [resSource, res] )
            return true
        } else {
            return false
        }
    }
    drawConsume() {
//        console.log(`COMP ${this} calling drawConsume`)
        for (let bid of this._resourceBids) {
            let [resSource, res] = bid
            resSource.foreignConsume(this, res)
        }
        this._resourceBids = []
    }
}

class _SmallDoodad extends base.ComponentSpec {
    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [-8,-8], [8,-8], [-8,8], [-8,-8] ].map( ( xy ) => vecs.Vec2(...xy).sMul(0.1) )
    }
    get debugName() { return "SmallDoodad" }
}
class _LargeDoodad extends base.ComponentSpec {
    get xySize() { return vecs.Vec2(3,2) }
    get debugDrawPoints () {
        return [ [-8,-8], [8,-8], [-8,8], [8,8] ].map( ( xy ) => vecs.Vec2(...xy).sMul(0.1) )
    }
    get debugName() { return "LargeDoodad" }
}
class _HeavyDoodad extends base.ComponentSpec {
    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [-8,-8], [-2,-8], [-2,-2], [8,-2], [8,6], [2,6], [2,8], [-8,8] ].map( ( xy ) => vecs.Vec2(...xy).sMul(0.1) )
    }
    get debugName() { return "HeavyDoodad" }
}

class _ElectricSinkInstance extends _ResourceCompInstance {
}
class _ElectricSink extends base.ComponentSpec{
    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [-2,-8], [2,-8], [2,-2], [8,-2], [8,2], [2,2], [2,8], [-2,8], [-2,2], [-8,2], [-8,-2], [-2,-2] ].map( ( xy ) => vecs.Vec2(...xy).sMul(0.1) )
    }
    get debugName() { return "ElectricSink" }

    get instanceClass() { return _ElectricSinkInstance }
}

class _ElectricSourceInstance extends _ResourceCompInstance {
    foreignReserve(bidder = hacks.argPanic(), res = hacks.argPanic()) {
        return res.resClass == resources.Electric
    }
    foreignConsume(consumer = hacks.argPanic(), res = hacks.argPanic()) {
        return res.resClass == resources.Electric
    }
}
class _ElectricSource extends base.ComponentSpec {
    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [-2,-6], [2,-8], [2,-2], [6,-2], [8,2], [2,2], [2,6], [-2,8], [-2,2], [-6,2], [-8,-2], [-2,-2] ].map( ( xy ) => vecs.Vec2(...xy).sMul(0.1) )
    }
    get debugName() { return "ElectricSource" }
    
    _createConnectors() {
        return [new connspecs.ElectricConnector( dirconst.IN_PLACE, dirconst.N ), new connspecs.ElectricConnector( dirconst.IN_PLACE, dirconst.S ), new connspecs.ElectricConnector( dirconst.IN_PLACE, dirconst.E ), new connspecs.ElectricConnector( dirconst.IN_PLACE, dirconst.W )]
    }

    get instanceClass() { return _ElectricSourceInstance }
}

class _BatteryInstance extends _ResourceCompInstance {
    constructor(...args) {
        super(...args)
        this.electricPool = this.resourcePools[0]
    }

    foreignReserve(bidder = hacks.argPanic(), res = hacks.argPanic()) {
        if (this.connectors.includes(bidder)) {
            return this.electricPool.foreignReserve(this, res)
        } else {
            throw ("PANIC: invalid call of foreignReserve()!")
        }
    }
    foreignConsume(consumer = hacks.argPanic(), res = hacks.argPanic()) {
        if (this.connectors.includes(consumer)) {
            console.log(`Consuming from Battery - power left, ${this.electricPool.quantity}`)
            return this.electricPool.foreignConsume(this, res)
        } else {
            throw ("PANIC: invalid call of foreignConsume()!")
        }
    }
}

class _Battery extends base.ComponentSpec {
    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [0, 9], [0, 3], [3, 6], [3, -6], [0, -9], [0, -3], [-3, -6], [-3, 6] ].map( ( xy ) => vecs.Vec2(...xy).sMul(0.1) )
    }
    get debugName() { return "Battery" }
    
    _createConnectors() {
        return [new connspecs.ElectricConnector( dirconst.IN_PLACE, dirconst.N ), new connspecs.ElectricConnector( dirconst.IN_PLACE, dirconst.S ), new connspecs.ElectricConnector( dirconst.IN_PLACE, dirconst.E ), new connspecs.ElectricConnector( dirconst.IN_PLACE, dirconst.W )]
    }

    get instanceClass() { return _BatteryInstance }

    _createResourcePools() {
        return [ new resources.ResourcePool(resources.Electric, 30) ]
    }
}

class _FuelSink extends base.ComponentSpec {
    get xySize() { return vecs.Vec2(1,1) }
    get debugName() { return "FuelSink" }
}
class _FuelSource extends base.ComponentSpec {  
    get xySize() { return vecs.Vec2(1,1) }
    get debugName() { return "FuelSource" }
}

class _LGInstance extends _ResourceCompInstance {
    constructor(...args) {
        super(...args)
        this.fireReady = false
    }

    get powerInflow() { return this.connectors[0] }

    preAdvanceTick() {
        console.log("THIS", this)
        if (this.drawReserve(this.powerInflow, new resources.Electric(3) )) {
            this.fireReady = true
            this.drawConsume()
        }
    }
    advanceTick() {
        if (this.fireReady) {
            this.fireReady = false
            console.log("firing!" )
        }
    }
    postAdvanceTick() {
    }
}

class _LaserGun extends base.ComponentSpec {
    get xySize() { return vecs.Vec2(1,1) }

    get debugDrawPoints () {
        return [ [-2,-8], [2,-8], [2,-2], [4,0], [2,2], [-2,2], [-4,0], [-2,-2] ].map( ( xy ) => vecs.Vec2(...xy).sMul(0.1) )
    }

    _createConnectors() {
        return [new connspecs.ElectricConnector( dirconst.IN_PLACE, dirconst.S )]
    }

    get isActiveComponent() { return true }

    get instanceClass() { return _LGInstance }
    get debugName() { return "LaserGun" }
}

class _MGInstance extends _ResourceCompInstance {
    constructor(...args) {
        super(...args)

        this.ammoPool = this.resourcePools[0]
        this.fireReady = false
    }

    drawReserve(resSource, res) {
        if (resSource.foreignReserve(this, res)) {
            this._resourceBids.push ( [resSource, res] )
            return true
        } else {
            return false
        }
    }
    drawConsume() {
        for (let bid of this._resourceBids) {
            let [resSource, res] = bid
            resSource.foreignConsume(this, res)
        }
    }

    preAdvanceTick() {
        console.log("THIS", this)
        if (this.drawReserve(this.ammoPool, new resources.Ammunition(3) )) {
            this.fireReady = true
            this.drawConsume()
        }
    }
    advanceTick() {
        if (this.fireReady) {
            this.fireReady = false
            console.log("firing, remaining ammo:", this.ammoPool.quantity )
        }
    }
    postAdvanceTick() {
        console.log("mgic")
    }
}

class _MissileGun extends base.ComponentSpec {
    get instanceClass() { return _MGInstance }

    get xySize() { return vecs.Vec2(1,1) }

    get debugDrawPoints () {
        return [ [-2,-8], [2,-8], [2,-2], [4,0], [2,2], [-2,2], [-4,0], [-2,-2] ].map( ( xy ) => vecs.Vec2(...xy).sMul(0.1) )
    }

    get isActiveComponent() { return true }

    get debugName() { return "MissileGun" }

    _createResourcePools() {
        return [ new resources.ResourcePool(resources.Ammunition, 30) ]
    }
}


class _GenericCable extends base.ComponentSpec {
    get xySize() { return vecs.Vec2(1,1) }

    _createConnectors() {
        return [
            new this.connSpecClass( dirconst.IN_PLACE, dirconst.N ),
            new this.connSpecClass( dirconst.IN_PLACE, dirconst.E )
        ]
    }
    get connSpecClass() { return connspecs.ElectricConnector }
}

class _ElectricCable extends _GenericCable {
    get debugName() { return "ElectricCable" }
}

export var SmallDoodad = new _SmallDoodad()
export var LargeDoodad = new _LargeDoodad()
export var HeavyDoodad = new _HeavyDoodad()
export var ElectricSink = new _ElectricSink()
export var ElectricSource = new _ElectricSource()

export var FuelSink = new _FuelSink()
export var FuelSource = new _FuelSource()

export var LaserGun = new _LaserGun()
export var MissileGun = new _MissileGun()
export var ElectricCable = new _ElectricCable()

export var Battery = new _Battery()
