import * as hacks from '/es/hacks.js'
import * as errs from '/es/errs.js'
import * as vecs from '/es/vectors.js'
import * as dirconst from '/es/dirconst.js'

import * as base from './base.js'
import * as specs from './specs.js'
import * as resources from '/es/resources.js'

class _CableInstance extends specs._ResourceCompInstance {
    foreignReserve(bidder = hacks.argPanic(), res = hacks.argPanic() ) {
        if (this.connectors.includes(bidder)) {
            return this.otherConnector(bidder).foreignReserve(this, res)
        } else {
            throw new errs.Panic("invalid call of foreignReserve()!")
        }
    }
    foreignConsume(consumer = hacks.argPanic(), res = hacks.argPanic()) {
        if (this.connectors.includes(consumer)) {
            return this.otherConnector(consumer).foreignConsume(this, res)
        } else {
            throw new errs.Panic("invalid call of foreignConsume()!")
        }
    }
    otherConnector(conn) {
        if (conn == this.connectors[0]) {
            return this.connectors[1]
        } else if (conn == this.connectors[1]) {
            return this.connectors[0]
        } else {
            return null
        }
    }
}
class _Cable extends base.ComponentSpec {
    constructor (resClass = hacks.argPanic(), isTurn = hacks.argPanic(), ...args) {
        super(...args)
        this._resClass = resClass
        if (isTurn) {
            this._connectors = [dirconst.N, dirconst.E].map( (facing) => this.resClass.toConnector(dirconst.IN_PLACE, facing ) )
            this._debugDrawPoints = [ [-1,-8], [1,-8], [1,-1], [8,-1], [8,1], [-1,1] ].map( ( xy ) => vecs.Vec2(...xy).sMul(0.1) )
        } else {
            this._connectors = [dirconst.N, dirconst.S].map( (facing) => this.resClass.toConnector(dirconst.IN_PLACE, facing ) )
            this._debugDrawPoints = [ [-1,-8], [1,-8], [1,8], [-1,8] ].map( ( xy ) => vecs.Vec2(...xy).sMul(0.1) )
        }
    }

    _createConnectors() {
        return null
    }
    get debugDrawPoints() {
        return this._debugDrawPoints
    }

    get xySize() { return vecs.Vec2(1,1) }
    get instanceClass() { return _CableInstance }
    get resClass() { return this._resClass }
}

export var ElectricCableStraight = new _Cable( resources.Electric, false )
export var ElectricCableTurn = new _Cable( resources.Electric, true )
export var FuelCableStraight = new _Cable( resources.Fuel, false )
export var FuelCableTurn = new _Cable( resources.Fuel, true )

