export class GeneralSpec {
    reify(...args) {
        return new this.designClass(this, ...args)
    }
    get designClass() { throw `PANIC: Call to to-be-overridden method get designClass() of base GeneralSpec item ${this}!` }
}

export class GeneralDesign {
    constructor(spec) {
        this.spec = spec

        this.__locked = false

        this._anchorTile = null
        this._tiles = []
    }

    get locked() { return this.__locked }
    get tile() { return this._anchorTile }
    get tiles() { return this._tiles }
    get instanceClass() { throw `PANIC: Call to to-be-overridden method get instanceClass() of base GeneralDesign item ${this}!` }

    get placeVecs() {return []}
 
    reify(...args) {
        if (!this.locked) {
            throw `Panic - component ${this} not locked to grid, can't reify!`
        }
        return new this.instanceClass(this, ...args)
    }

    lockToGrid() {
        throw (`PANIC: Call to to-be-overridden method lock() of base GeneralDesign item ${this}!`)
    }
    unlock() {
        throw (`PANIC: Call to to-be-overridden method unlock() of base GeneralDesign item ${this}!`)
    }

    setTile(tile) {
        if (this.__locked) { throw `Panic - can't adjust tile of locked component ${this}` }
        this._anchorTile = tile
        if (tile == null) {
            this.tiles = []
        } else {
            this._tiles = this.placeVecs.map ( (placeVec) => tile.relTile(placeVec) )
        }
    }
    clearTile() {
        this.setTile(null)
    }

    get grid() {
        if (this._anchorTile != null) {
            return this._anchorTile.parent
        } else {
            return null
        }
    }
}

export class GeneralInstance {
    constructor(design) {
        this.design = design
    }
}

