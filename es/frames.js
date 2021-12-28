import * as occupants from './comps/occupants.js'

export class FrameInstance extends occupants.GeneralInstance {
}

export class FrameDesign extends occupants.GeneralDesign {
    constructor (spec) {
        super(spec)
    }

    get instanceClass() { return FrameInstance }

    lockToGrid(tile = undefined) {
        if (tile !== undefined) {
            this.setTile(tile)
        }

        if (!this.canLock()) { throw `Panic - can't lock frame ${this}!` }

        this.__locked = true
        this.grid.addOccupant(this)
        for (let tile of this._tiles) {
            tile.frame = this
        }
    }
    unlock() {
        if (!this.__locked) {
            throw `Panic - frame ${this} not locked to grid, can't unlock!`
        }

        this.grid.removeOccupant(this)
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

    get weight() { return this.spec }
    get placeVecs() {
        return this.weight.placeVecs
    }

    toString() { return `FR ${this.spec} at ${this._anchorTile}` }
}
