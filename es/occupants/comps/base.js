import * as utils from '/es/utils.js'
import * as vecs from '/es/vectors.js'
import * as dirconst from '/es/dirconst.js'
import * as occupants from '../occupants.js'

export class ComponentSpec extends occupants.GeneralSpec {
    constructor() {
        super()
        this._placeVecs = vecs.arrToVecs(utils.span2( [0, 0], this.xySize.xy ))
        this._connectors = this._createConnectors()
        this._resourcePools = this._createResourcePools()
    }

    get designClass() { return ComponentDesign }
    get instanceClass() { return ComponentInstance }
    get debugName() { return "unnamed component spec" }

    _createConnectors() {
        return []
    }
    _createResourcePools() { 
        return []
    }

    get isActiveComponent() { return false }

    get connectors() { return this._connectors }
    facingConnectors(vec) { return this._connectors.filter( (conn) => (conn.facing.eq(vec)) ) }

    get xySize() { throw "Not implemented!" }
    get placeVecs() { return this._placeVecs }
    get resourcePools() { return [...this._resourcePools] }

    toString() { return `<CSPEC ${this.debugName})>` }
}

class ComponentDesign extends occupants.GeneralDesign {
    constructor(spec) {
        super(spec)

        this._facing = dirconst.N
        this._connectors = this.spec.connectors.map( (connSpec) => connSpec.designify(this) )
    }

    get facing() { return this._facing }
    get connectors() { return this._connectors }
    facingConnectors(vec) { return this._connectors.filter( (conn) => (conn.facing.eq(vec)) ) }

    get isComponent() { return true }
    get isActiveComponent() { return this.spec.isActiveComponent }
    get resourcePools() { return this.spec.resourcePools }

    innerToTile(xyInner) {
        if (this.anchorTile == null) {
            return null
        } else {
            let xyRel = this.innerVecToGridVec(xyInner)
            return this.anchorTile.relTile(xyRel)
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
            this.setAnchorTile(tile)
        }
        if (facing !== undefined) {
            this.setFacing(facing)
        }
        super.lockToGrid()
        for (let connector of this.connectors) {
            connector.lockToGrid()
        }
        return this
    }
    unlock() {
        super.unlock()
        for (let connector of this.connectors) {
            connector.unlock()
        }
        return this
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

export class ComponentInstance extends occupants.GeneralInstance {
    constructor(design, iGrid) {
        super(design, iGrid)

        this._resourcePools = this.design.resourcePools.map( (resourcePool) => resourcePool.copy() ) 
    }

    linkOtherInstances(iGrid) {
        this._connectors = this.design.connectors.map( (conn) => conn.reify(iGrid) )
    }

    preAdvanceTick(directive) {
        console.log("Called preAdvanceTick of", this)
    }
    advanceTick(directive) {
        console.log("Called advanceTick of", this)
    }
    postAdvanceTick (directive) {
        console.log("Called postAdvanceTick of", this)
    }

    get isActiveComponent() { return this.spec.isActiveComponent }
    get resourcePools() { return this._resourcePools }
    get connectors() { return this._connectors }
    facingConnectors(vec) { return this._connectors.filter( (conn) => (conn.facing.eq(vec)) ) }
}

