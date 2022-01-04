import * as hacks from '/es/hacks.js'
import * as dirconst from '/es/dirconst.js'
import * as resources from '/es/resources.js'
import * as base from './base.js'

class _ResourceConnectorInstance extends base.ConnectorInstance {
    constructor(...args) {
        super(...args)
    }

    foreignReserve(bidder = hacks.argPanic(), res = hacks.argPanic() ) {
        console.log(`Conn ${this} | Foreign bidder ${bidder} trying to reserve resource ${res}`)
        if (res.resClass != this.resClass) { throw new errs.Panic(`Tried to reserve invalid resource type ${res} from conn ${this}`) }

        if (bidder === this.comp) {
//            console.log(`-- Bidder is own parent (of ${this}!`)
            if (this.fusedConn == null) {   
//                console.log(`-- No link - reserve definitionally fails!`)
                return false
            } else {
                return this.fusedConn.foreignReserve(this, res)
            }
        } else if (bidder === this.fusedConn) {
//            console.log(`-- Bidder is fused connector (of ${this}!`)
            return this.comp.foreignReserve(this, res)
        } else {
            throw new errs.Panic(`Call to foreignReserve() of connector ${this} from non-adjanent foreign bidder ${this}!`)
        }
    }
    
    foreignConsume(consumer = hacks.argPanic(), res = hacks.argPanic()) {
        if (res.resClass != this.resClass) { throw new errs.Panic(`Tried to reserve invalid resource type ${res} from conn ${this}`) }
        console.log(`Conn ${this} | Foreign consumer ${consumer} trying to consume resource ${res}`)

        if (consumer === this.comp) {
//            console.log(`-- Consumer is own parent (of ${this}!`)
            if (this.fusedConn == null) {
                console.log(`-- No link - consume definitionally fails (and... how did we even get here?`)
                throw new errs.Panic(`Call to foreignConsume() of connector ${this} with no valid link - should not have passed foreignReserve() stage!`)
            } else {
                return this.fusedConn.foreignConsume(this, res)
            }
        } else if (consumer === this.fusedConn) {
//            console.log(`-- Consumer is fused connector (of ${this}!`)
            return this.comp.foreignConsume(this, res)
        } else {
            throw new errs.Panic(`Call to foreignReserve() of connector ${this} from non-adjanent foreign consumer ${this}!`)
        }
    }

    get resClass() { return this.spec.resClass }
}

class ResourceConnector extends base.ConnectorSpec {
    get debugName() {return "rescon"}

    constructor(pos = hacks.argPanic(), facing = hacks.argPanic(), resClass = hacks.argPanic(), capacity) {
        super(pos, facing)
        this.resClass = resClass
        this.capacity = capacity
    }
    
    get instanceClass() { return _ResourceConnectorInstance }
}

export class ElectricConnector extends ResourceConnector {   
    constructor(pos, facing) {
        super(pos, facing, resources.Electric, 1)
    }
}
export class FuelConnector extends ResourceConnector {   
    constructor(pos, facing) {
        super(pos, facing, resources.Fuel, 1)
    }
}

class EmptyTileConnector extends base.ConnectorSpec {
    get debugName() {return "emptyTile"}

    getLinkErrors() {
    }
}