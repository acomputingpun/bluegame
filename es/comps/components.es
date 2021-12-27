import * as utils from '/es/utils.es'
import * as vecs from '/es/vectors.es'
import * as dirconst from '/es/dirconst.es'
import * as occupants from './occupants.es'

export class ComponentDesign extends occupants.GeneralDesign {
    constructor(spec) {
        super(spec)

        this._facing = dirconst.N
        this._interactor = new this.spec.interactorClass()
        this._connectors = this.spec.connectorSpecs.map( (connSpec) => connSpec.reify(this) )
    }

    get instanceClass() { return ComponentInstance }

    get placeVecs() {
        return this.spec.placeVecs
    }

    get facing() { return this._facing }
    get connectors() { return this._connectors }

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
        this.grid.addComponent(this)
        for (let tile of this._tiles) {
            tile.addComponent(this)
        }
        for (let connector of this._connectors) {
            connector.lockToGrid()
//            this.grid.addConnector(connector)
//            connector.tile.addConnector(connector)
        }
    }
    unlock() {
        if (!this.__locked) {
            throw `Panic - frame ${this} not locked to grid!`
        }

        this.grid.removeComponent(this)
        for (let tile of this._tiles) {
            tile.removeComponent(this)
        }
        for (let connector of this._connectors) {
            this.grid.removeConnector(connector)
            connector.tile.removeConnector(connector)
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

class ComponentInstance {
    constructor(design) {
        this.design = design
        this._interactor = new this.spec.interactorClass(this)
    }
    get facing() { return this.design.facing}
    get spec() { return this.design.spec }

    preAdvanceTick(directive) {
        this._interactor.preAdvanceTick(directive)
    }
    advanceTick(directive) {
        this._interactor.advanceTick(directive)
    }
    postAdvanceTick (directive) {
        this._interactor.postAdvanceTick(directive)
    }
}

