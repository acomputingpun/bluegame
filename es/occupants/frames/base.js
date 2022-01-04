import * as occupants from '../occupants.js'
import * as utils from '/es/utils.js'
import * as vecs from '/es/vectors.js'
import * as errs from '/es/errs.js'

export class FrameSpec extends occupants.GeneralSpec {
    constructor() {
        super()
        this._placeVecs = [...utils.span2( [0, 0], this.xySize.xy )].map( (xy) => vecs.Vec2(...xy) )
    }

    get designClass() { return FrameDesign }

    get isFrame() { return true }

    get placeVecs() { return this._placeVecs }
    get debugName () { return "unnamedFrameSpec" }

    valueOf() { throw "PANIC: to be overridden!" }
    toString() { return `w${this.debugName}` }
}

export class FrameDesign extends occupants.GeneralDesign {
    constructor (spec) {
        super(spec)
    }

    get instanceClass() { return FrameInstance }

    lockToGrid(tile = undefined) {
        if (tile !== undefined) {
            this.setAnchorTile(tile)
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
        if (this.anchorTile == null) { return false }
        for (let placeTile of this.tiles) {
            if (placeTile.frame !== null) {
                return false
            }
        }
        return true
    }

    toString() { return `FR ${this.spec} at ${this._anchorTile}` }
}

export class FrameInstance extends occupants.GeneralInstance {
}