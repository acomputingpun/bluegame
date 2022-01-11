import * as hacks from '/es/hacks.js'
import * as errs from '/es/errs.js'
import * as occupants from '../occupants.js'
import * as utils from '/es/utils.js'
import * as vecs from '/es/vectors.js'

export class FrameSpec extends occupants.GeneralSpec {
    constructor() {
        super()
        this._placeVecs = [...utils.span2( [0, 0], this.xySize.xy )].map( (xy) => vecs.Vec2(...xy) )
    }

    get designClass() { return FrameDesign }

    get isFrame() { return true }

    get placeVecs() { return this._placeVecs }
    get debugName () { return "unnamedFrameSpec" }

    valueOf() { throw new errs.ToBeOverridden() }
    toString() { return `w${this.debugName}` }
}

export class FrameDesign extends occupants.GeneralDesign {
    constructor (spec = hacks.argPanic()) {
        super(spec)
    }

    get instanceClass() { return FrameInstance }

    lockToGrid(tile = undefined) {
        if (tile !== undefined) {
            this.setAnchorTile(tile)
        }
        super.lockToGrid()
        for (let tile of this.tiles) {
            tile.frame = this
        }
    }
    unlock() {
        super.unlock()
        for (let tile of this._tiles) {
            tile.frame = null
        }
    }
    checkLock() {
        super.checkLock()
        for (let placeTile of this.tiles) {
            if (placeTile.frame !== null) {
                throw new occupants.InvalidLock(`tile ${placeTile} already contains frame, can't lock ${this} here!`)
            }
        }
    }

    toString() { return `FR ${this.spec} at ${this._anchorTile}` }
}

export class FrameInstance extends occupants.GeneralInstance {
}