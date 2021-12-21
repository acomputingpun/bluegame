export class Frame {    
    constructor (weight) {
        this._weight = weight

        this._anchorTile = null
        this._tiles = []

        this.__locked = false
    }

    get locked() { return this.__locked }

    get tile() { return this._anchorTile }
    set tile(data) {
        if (this.__locked) { throw `Panic - can't adjust tile of locked frame ${this}` }

        if (this.tile != null) {
            this._clearTile()
        }
        if (data != null) {
            this._setTile(data)
        }
    }
    get tiles() {
        return this._tiles            
    }

    _setTile(tile) {
        if (this.__locked) { throw `Panic - can't adjust tile of locked frame ${this}` }

        this._anchorTile = tile
        this._tiles = this.placeVecs.map ( (placeVec) => tile.relTile(placeVec) )
    }
    _clearTile() {
        if (this.__locked) { throw `Panic - can't adjust tile of locked frame ${this}` }

        this._anchorTile = null
        this._tiles = []
    }

    lockToGrid(tile = undefined) {
        if (this.__locked) { throw `Panic - frame ${this} already locked to grid!` } 

        if (tile !== undefined) {
            this.tile = tile
        }

        if (this.tile == null) { throw `Panic - can't lock frame without linked tile!` }

        this.__locked = true
        for (let placeTile of this.tiles) {
            if (placeTile.frame !== null) {
                console.log("Can't place tile there!")
                throw `Panic - can't reify frame section ${this} at ${placeTile}`
            }
        }

        for (let tile of this._tiles) {
            tile.frame = this
        }
    }
    unlock() {
        if (!this.__locked) {
            throw `Panic - frame ${this} not locked to grid!`
        }

        this.grid.removeFrame(this)
        for (let tile of this._tiles) {
            tile.frame = null
        }
        this.__locked = false
    }

    canLock() {
        if (this.locked) { return false } 
        if (this.tile == null) { return false }
        for (let placeTile of this.tiles) {
            if (placeTile.frame !== null) {
                return false
            }
        }
        return true
    }

    get grid() {
        if (this._anchorTile != null) {
            return this._anchorTile.parent
        } else {
            return null
        }
    }

    get weight() { return this._weight }

    get placeVecs() {
        return this.weight.placeVecs
    }
}
