import * as errs from '/es/errs.js'
import * as hacks from '/es/hacks.js'
import * as occupants from '../occupants.js'
import * as dirconst from '/es/dirconst.js'

export class InvalidFuse extends errs.CustomException {
}

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

export class ConnectorDesign extends occupants.GeneralDesign {
    constructor(spec = hacks.argPanic(), comp = hacks.argPanic()) {
        super(spec)
        console.log("Just called new ConnectorDesign with args spec:", spec, "and comp", comp, "got this", this)

        this.spec = spec
        this.comp = comp
        this._fusedConn = null
    }

    unlock() {
        if (this.fused) {
            throw new errs.Panic(`connector ${this} is fused to another connector, can't unlock!`)
        }
        return super.unlock()
    }
    checkLock() {
        super.checkLock()
        if (!this.comp.locked) {
            throw new occupants.InvalidLock(`tried to lock connector ${this} but parental component ${this.comp} is unlocked!`)
        }
    }

    canFuseTo(other) {
        return this._canFuseFrom(other) && other._canFuseFrom(this)
    }
    checkFuseTo(other) {
        this._checkFuseFrom(other)
        other._checkFuseFrom(this)
    }
    _canFuseFrom(other) {
        try {
            this._checkFuseFrom(other)
        } catch (fuseErr) {
            if (fuseErr instanceof InvalidFuse) {
                return false
            } else {
                throw fuseErr
            }
        }
    }
    _checkFuseFrom(other) {
        if (!this.locked) {
            throw new InvalidFuse(`${this} not locked to grid, can't fuse!`)
        }
        if (this.isFused) {
            throw new InvalidFuse(`${this} already fused, can't fuse again!`)
        }
        if (!this.destConns.includes(other)) {
            throw new InvalidFuse(`${this} can't fuse from ${other}, they're not facing!`)
        }
    }

    fuseTo (other) {
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
        this._checkFuseFrom(other)
        this._fusedConn = other
    }
    
    unfuse () {
        if (!this.locked) {
            throw new errs.Panic(`${this} not locked to grid, can't unfuse!`)
        }
        if (this.isFused) {
            this.fusedConn._unfuseFrom()
        }
        this._unfuseFrom()
    }
    _unfuseFrom() {
        if (!this.locked) {
            throw new errs.Panic(`${this} not locked to grid, can't unfuse!`)
        }
        this._fusedConn = null
    }

    setAnchorTile(tile) {
        throw new errs.Panic(`Call to setAnchorTile() function of connector ${this}!`)
    }

    get tiles() { return this.placeVecs.map( (placeVec) => this.anchorTile.relTile(placeVec) ) }
    get anchorTile() { return this.comp.innerToTile(this.spec.pos) }
    get facing() { return this.gridFacing }

    get compFacing() { return this.spec.facing }
    get gridFacing() { return this.comp.innerVecToGridVec(this.compFacing) }

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
    recursiveReify() {
        this.comp = this.iGrid.lookupOrReify(this.design.comp)
        this.fusedConn = this.iGrid.lookupOrReify(this.design.fusedConn)
    }

    get isFused() { return this.fusedConn != null }
}
