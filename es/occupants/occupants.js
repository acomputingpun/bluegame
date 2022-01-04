import * as errs from '/es/errs.js'
import * as hacks from '/es/hacks.js'
import * as dirconst from '/es/dirconst.js'

export class GeneralSpec {
    designify(...args) {
        return new this.designClass(this, ...args)
    }
    get designClass() { throw new errs.Panic(`Call to to-be-overridden method get designClass() of base GeneralSpec item ${this}!`) }
    get instanceClass() { throw new errs.Panic(`Call to to-be-overridden method get instanceClass() of base GeneralDesign item ${this}!`) }

    get isComponent() { return false }
    get isFrame() { return false }
    get isConnector() { return false }

    get xySize() { throw new errs.ToBeOverridden() }
    get placeVecs() { return [dirconst.IN_PLACE] }
}

export class GeneralDesign {
    constructor(spec) {
        this.spec = spec

        this.__locked = false

        this._anchorTile = null
        this._tiles = []
    }

    get instanceClass() { return this.spec.instanceClass }

    get locked() { return this.__locked }
    get tiles() { return this._tiles }
    get poses() { return this.tiles.map( (tile) => tile.xyPos ) }

    get anchorTile() { return this._anchorTile }
    get anchorPos() {
        if (this.anchorTile != null) {
            return this.anchorTile.xyPos
        } else {
            return null
        }
    }

    get tile () {
        console.log("Deprecated function get tile() called!")
        console.trace()
        throw ("PANIC: Deprecated function get tile() called!")
    }
  
    lockToGrid() {
        this.checkLock()
        this.__locked = true
        for (let tile of this.tiles) {
            tile.addOccupant(this)
        }
        this.grid.addOccupant(this)
        return this
    }
    unlock() {
        if (!this.__locked) {
            throw new errs.Panic(`${this} not locked to grid, can't unlock!`)
        }
        this.grid.removeOccupant(this)
        for (let tile of this.tiles) {
            tile.removeOccupant(this)
        }
        this.__locked = false
    }

    canLock() {
        try {
            this.checkLock()
        } catch (lockErr) {
            return false
        }
        return true
    }
    checkLock() {
        if (this.__locked) {
            throw new errs.Panic(`${this} already locked to grid, can't lock!`)
        }
        if (this.anchorTile == null) {
            throw new errs.Panic(`${this} has no anchorTile, can't lock!`)
        }
    }

    setAnchorTile(tile) {
        if (this.__locked) { throw new errs.Panic(`can't adjust tile of locked component ${this}`) }
        this._anchorTile = tile
        if (tile == null) {
            this._tiles = []
        } else {
            this._tiles = this.placeVecs.map ( (placeVec) => tile.relTile(placeVec) )
        }
    }

    get grid() {
        if (this.anchorTile != null) {
            return this.anchorTile.parent
        } else {
            return null
        }
    }

    get placeVecs() { return this.spec.placeVecs }

    get isComponent() { return this.spec.isComponent }
    get isFrame() { return this.spec.isFrame }
    get isConnector() { return this.spec.isConnector }
}

export class GeneralInstance {
    constructor(design, iGrid) {
        this.design = design
        this.iGrid = iGrid

//        console.log("design", design)
//        console.log("despec", design.spec)
//        console.log("igridR", iGrid)
        
        this.anchorPos = this.design.anchorPos
        this.anchorTile = this.iGrid.lookup(...this.anchorPos.xy)
        this.tiles = this.design.tiles.map(  (designTile) => this.iGrid.lookup(...designTile.xyPos.xy) )

        for (let tile of this.tiles) {
            tile.addOccupant(this)
        }
        this.iGrid.addOccupant(this)
    }
    
    recursiveReify() {
    }
    setInternalReferences() {
    }
    
    toString() { return `i${this.design}` }
    get spec() { return this.design.spec }
    get facing() { return this.design.facing }

    get isComponent() { return this.design.isComponent }
    get isFrame() { return this.design.isFrame }
    get isConnector() { return this.design.isConnector }
}

