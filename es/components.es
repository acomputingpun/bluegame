import * as utils from '/es/utils.es'
import * as vecs from '/es/vectors.es'

export class Component {
    constructor(specs) {
        this.specs = specs 

        this._facing = new specs.facingClass()

        this._anchorTile = null
        this._tiles = []

        this.__locked = false
    }

    get placeVecs() {
        return this.specs.placeVecs
    }

    get locked() { return this.__locked }

    get facing() { return this._facing.data }
    set facing(data) {
        if (this.__locked) { throw `Panic - can't adjust facing of locked component ${this}` }
        this._facing.set(data)
    }

    get tile() { return this._anchorTile }
    set tile(data) {
        if (this.__locked) { throw `Panic - can't adjust tile of locked component ${this}` }
        if (data == null) {
            this._clearTile()
        } else {
            this._setTile(data)
        }
    }
    get tiles() {
        return this._tiles            
    }

    lockToGrid(tile = undefined, facing = undefined) {
        if (this.__locked) { throw `Panic - frame ${this} already locked to grid!` } 

        if (tile !== undefined) {
            this.tile = tile
        }
        if (facing !== undefined) {
            this.facing = facing
        }

        if (this.tile == null) { throw `Panic - can't lock frame without linked tile!` }

        this.__locked = true

        this.grid.addComponent(this)
        for (let tile of this._tiles) {
            tile.addComponent(this)
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
        this.__locked = false
    }

    canLock() {
        if (this.locked) { return false } 
        if (this.tile == null) { return false }
        return true
    }


    _setTile(tile) {
        if (this.__locked) { throw `Panic - can't adjust tile of locked component ${this}` }

        this._anchorTile = tile
        this._tiles = this.placeVecs.map ( (placeVec) => tile.relTile(placeVec) )
    }
    _clearTile(tile) {
        if (this.__locked) { throw `Panic - can't adjust tile of locked component ${this}` }
        this._anchorTile = null
        this._tiles = []
    }

    get grid() {
        if (this._anchorTile != null) {
            return this._anchorTile.parent
        } else {
            return null
        }
    }
}

