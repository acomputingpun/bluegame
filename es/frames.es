export class Frame {    
    constructor (weight) {
        this._weight = weight

        this._anchorTile = null
        this._tiles = []

        this.__locked = false
    }

    get locked() { return this.__locked }

    get tile() { return this._anchorTile }
    get tiles() {
        return this._tiles            
    }

    setTile(tile) {
        if (this.__locked) { throw `Panic - can't adjust tile of locked frame ${this}` }

        if (tile == null) {
            this.clearTile()
        } else {
            this._anchorTile = tile
            this._tiles = this.placeVecs.map ( (placeVec) => tile.relTile(placeVec) )
        }
    }
    clearTile() {
        if (this.__locked) { throw `Panic - can't adjust tile of locked frame ${this}` }

        this._anchorTile = null
        this._tiles = []
    }

    lockToGrid(tile = undefined) {
        if (tile !== undefined) {
            this.setTile(tile)
        }

        if (!this.canLock()) { throw `Panic - can't lock frame ${this}!` }

        this.__locked = true
        this.grid.addFrame(this)
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
