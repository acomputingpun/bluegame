import * as occupants from '../occupants.js'
import * as dirconst from '/es/dirconst.js'

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
        this._fusedConn = null
    }

    unlock() {
        if (this.fused) {
            throw `PANIC connector ${this} is fused to another connector, can't unlock!`
        }
        return super.unlock()
    }
    checkLock() {
        super.checkLock()
        if (!this.comp.locked) {
            throw `Panic - tried to lock connector ${this} but parental component ${this.comp} is unlocked!`
        }
    }

    fuseTo (other) {
        if (!this.locked) {
            throw `PANIC: ${this} not locked to grid, can't fuse to another!`
        }

        if (this.isFused) {
            this.unfuse()
        }

        if (other != null) {
            if (other.isFused) {
                other.unfuse()
            }
            this._fuseFrom(other)
            other._fuseFrom(this)
        }
    }
    _fuseFrom (other) {
        if (!this.locked) {
            throw `PANIC: ${this} not locked to grid, can't fuse!`
        }
        if (this.isFused) {
            throw `PANIC: ${this} already fused, can't fuse again!`
        }
        if (!this.destConns.includes(other)) {
            throw `PANIC: ${this} can't fuse from ${other}, they're not facing!`
        }
        this._fusedConn = other
    }
    
    unfuse () {
        if (!this.locked) {
            throw `PANIC: ${this} not locked to grid, can't unfuse!`
        }
        if (this.isFused) {
            this.fusedConn._unfuseFrom()
        }
        this._unfuseFrom()
    }
    _unfuseFrom() {
        if (!this.locked) {
            throw `PANIC: ${this} not locked to grid, can't unfuse!`
        }
        this._fusedConn = null
    }

    setAnchorTile(tile) {
        throw `PANIC: Call to setAnchorTile() function of connector ${this}!`
    }

    get tiles() { return this.placeVecs.map( (placeVec) => this.anchorTile.relTile(placeVec) ) }
    get anchorTile() { return this.comp.innerToTile(this.spec.pos) }
    get facing() { return this.comp.innerVecToGridVec(this.spec.facing) }

    get destTile() { return this.anchorTile.relTile(this.facing) }
    get destConns() { return this.destTile.facingConnectors(this.facing.sMul(-1)) }
    get fusedConn() { return this._fusedConn }
    get isFused() { return this.fusedConn != null }

    toString() { return `[d${this.spec} of ${this.anchorTile}]` }
}

export class ConnectorInstance extends occupants.GeneralInstance {
    constructor(design, iGrid) {
        super(design, iGrid)
    }
    linkOtherInstances(iGrid) {
        this.comp = this.design.comp.reify(iGrid)
        this.fusedConn = iGrid.lookupOrReify(this.design.fusedConn)
        if (this.design.fusedConn != null) {
            this.fusedConn = this.design.fusedConn.reify(iGrid)
        } else {
            this.fusedConn = null
        }
        //TODO: Fix this to use new reify() semantics as per 0103
    }

    get isFused() { return this.fusedConn != null }
}
