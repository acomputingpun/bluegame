import * as occupants from '../occupants.js'

export class ConnectorSpec extends occupants.GeneralSpec {
    get debugName() {return "unnamed connector"}

    constructor(pos, facing) {
        super()
        this.pos = pos
        this.facing = facing
    }

    get isConnector() { return true }

    get designClass() { return ConnectorDesign }
    get instanceClass() { return ConnectorInstance }
    get destPos() { return this.pos.add(this.facing) }

    toString() { return `[CONN ${this.debugName}]` }
}

class ConnectorDesign extends occupants.GeneralDesign {
    constructor(spec, comp) {
        super(spec)
        console.log("Just called new ConnectorDesign with args spec:", spec, "and comp", comp, "got this", this)

        this.spec = spec
        this.comp = comp
        this._destConn = null
    }

    lockToGrid() {
        if (this.__locked) {
            throw `Panic - ${this} already locked to grid, can't lock!`
        }
        if (!this.comp.locked) {
            throw `Panic - tried to lock connector ${this} but parental component ${this.comp} is unlocked!`
        }
        this.__locked = true
        this.grid.addOccupant(this)
        return this
    }
    unlock() {
        if (!this.__locked) {
            throw `Panic - connector ${this} not locked to grid, can't unlock!`
        }
        this.grid.removeOccupant(this)
        this.__locked = false
    }

    linkConnector(destConn) {
        if (!this.__locked) {
            throw `Panic - connector ${this} not locked to grid, can't link to another!`
        }
        if (this.destConn != null) {
            this.unlinkConnector()
        }
        if (destConn != null) {
            destConn.unlinkConnector()
            this._destConn = destConn
            destConn._destConn = this
        }
    }
    unlinkConnector() {
        if (!this.__locked) {
            throw `Panic - connector ${this} not locked to grid, can't unlink!`
        }
        if (this.destConn != null) {
            this.destConn._destConn = null
            this._destConn = null
        }
    }

    get tiles() {
        return this.placeVecs.map( (placeVec) => this.anchorTile.relTile(placeVec) )
    }
    get anchorTile() {
        return this.comp.innerToTile(this.spec.pos)
    }
    get facing() {
        return this.comp.innerVecToGridVec(this.spec.facing)
    }
    get destTile() {
        return this.tile.rel(this.facing)
    }
    get destConn() {
        return this._destConn
    }

    toString() { return `[d${this.spec} of ${this.anchorTile}]` }
}

export class ConnectorInstance extends occupants.GeneralInstance {
    constructor(design, iGrid) {
        super(design, iGrid)
    }
    linkOtherInstances(iGrid) {
        this.comp = this.design.comp.reify(iGrid)
        this.destConn = iGrid.lookupOrReify(this.design.destConn)
        if (this.design.destConn != null) {
            this.destConn = this.design.destConn.reify(iGrid)
        } else {
            this.destConn = null
        }
        //TODO: Fix this to use new reify() semantics as per 0103
    }
}
