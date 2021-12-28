import * as utils from '/es/utils.js'
import * as vecs from '/es/vectors.js'
import * as dirconst from '/es/dirconst.js'
import * as occupants from './occupants.js'

export class ComponentDesign extends occupants.GeneralDesign {
    constructor(spec) {
        super(spec)

        this._facing = dirconst.N
        this._interactor = new this.spec.interactorClass()
        this._connectors = this.spec.connectors.map( (connSpec) => connSpec.reify(this) )
    }

    get instanceClass() { return ComponentInstance }

    get placeVecs() {
        return this.spec.placeVecs
    }

    get facing() { return this._facing }
    get connectors() { return this._connectors }

    get isComponent() { return true }
    get isActiveComponent() { return this.spec.isActiveComponent }

    innerToTile(xyInner) {
        if (this.tile == null) {
            return null
        } else {
            let xyRel = this.innerVecToGridVec(xyInner)
            return this.tile.relTile(xyRel)
        }
    }
    innerVecToGridVec(xyInner){
        if (this.facing.eq(dirconst.N)) {
            return xyInner
        } else if (this.facing.eq(dirconst.S)) {
            return xyInner.reverse()
        } else if (this.facing.eq(dirconst.E)) {
            return xyInner.rotCW()
        } else if (this.facing.eq(dirconst.W)) {
            return xyInner.rotCCW()
        } else {
            throw `PANIC: invalid (non-cardinal) facing of comp ${this} is ${this.facing}`
        }
    }

    lockToGrid(tile = undefined, facing = undefined) {
        if (tile !== undefined) {
            this.setTile(tile)
        }
        if (facing !== undefined) {
            this.setFacing(facing)
        }

        if (!this.canLock()) { throw `Panic - can't lock frame ${this}!` }

        this.__locked = true
        this.grid.addOccupant(this)
        for (let tile of this._tiles) {
            tile.addOccupant(this)
        }
        for (let connector of this._connectors) {
            connector.lockToGrid()
        }
    }
    unlock() {
        if (!this.__locked) {
            throw `Panic - frame ${this} not locked to grid!`
        }

        this.grid.removeComponent(this)
        for (let tile of this._tiles) {
            tile.removeOccupant(this)
        }
        for (let connector of this._connectors) {
            connector.unlock()
        }
        this.__locked = false
    }

    canLock() {
        if (this.locked) { return false } 
        if (this.tile == null) { return false }
        return true
    }

    setFacing(data) {
        if (this.__locked) { throw `Panic - can't adjust facing of locked component ${this}` }
        this._facing = data
    }
    rotFacing(cw = true) {
        if (cw) {
            this.setFacing(dirconst.ROT_CW.get(this.facing))
        } else {
            this.setFacing(dirconst.ROT_CCW.get(this.facing))
        }
    }

    toString() { return `<CMP ${this.spec} at ${this._anchorTile})>` }
}

class ComponentInstance extends occupants.GeneralInstance {
    constructor(design, iGrid) {
        super(design, iGrid)

        this._interactor = new this.spec.interactorClass(this)
    }

    preAdvanceTick(directive) {
        this._interactor.preAdvanceTick(directive)
    }
    advanceTick(directive) {
        this._interactor.advanceTick(directive)
    }
    postAdvanceTick (directive) {
        this._interactor.postAdvanceTick(directive)
    }

    get isActiveComponent() { return this.spec.isActiveComponent }
}

