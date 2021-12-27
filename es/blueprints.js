import * as grids from '/es/grids.js'
import * as utils from '/es/utils.js'
import * as vecs from '/es/vectors.js'
import * as frameweights from '/es/frameweights.js'

import * as warnings from '/es/warnings.js'


class BlueprintTile extends grids.GridTile {
    constructor (...args) {
        super(...args)

        this.frame = null
        this.components = []
        this.connectors = []
    }

    get frameWeight () {
        if (this.frame == null) {
            return null
        } else {
            return this.frame.weight
        }
    }

    addOccupant(occ) {
        this.markDirty()
    }

    addComponent(comp) {
        this.components.push(comp)
        this.markDirty()
    }
    removeComponent(comp) {
        utils.aRemove(this.components, comp)
        this.markDirty()
    }

    addConnector(conn) {
        this.connectors.push(conn)
        this.markDirty()
    }
    removeConnector(conn) {
        utils.aRemove(this.connectors, conn)
        this.markDirty()
    }
}

export class BlueprintGrid extends grids.Grid {
    constructor () {
        super(BlueprintTile)

        this.occupants = []
        this.frames = []
        this.components = []
        this.connectors = []
        this.activeComponents = []
    }

    addFrame(frame) {
        if (!frame.locked) { throw `PANIC: Tried to add unlocked frame ${frame} to BlueprintGrid ${this}` }
        this.frames.push(frame)
        this.occupants.push(frame)
        this.markDirty()
    }
    removeFrame(frame) {
        if (!frame.locked) { throw `PANIC: Tried to remove unlocked frame ${frame} from BlueprintGrid ${this}` }
        utils.aRemove(this.frames, frame)
        utils.aRemove(this.occupants, frame)
        this.markDirty()
    }
    addComponent(comp) {
        if (!comp.locked) { throw `PANIC: Tried to add unlocked component ${comp} to BlueprintGrid ${this}` }
        if (comp.isActive) {
            this.activeComponents.push(comp)
        }
        this.components.push(comp)
        this.occupants.push(comp)
        this.markDirty()
    }
    removeComponent(comp) {
        if (!comp.locked) { throw `PANIC: Tried to remove unlocked component ${comp} from BlueprintGrid ${this}` }
        if (comp.isActive) {
            utils.aRemove(this.activeComponents, comp)
        }
        utils.aRemove(this.components, comp)
        utils.aRemove(this.occupants, comp)
        this.markDirty()
    }
    addConnector(conn) {
        this.connectors.push(conn)
        this.occupants.push(frame)
        this.markDirty()
    }
    removeConnector(conn) {
        utils.aRemove(this.connectors, conn)
        utils.aRemove(this.occupants, conn)
        this.markDirty()
    }

    checkHillProperty() {
        console.log("Checking hill validity of grid", this)

        let fwMap = new Map() 

        for (let frameWeight of frameweights.DESCENDING_ORDER) {
            fwMap.set(frameWeight, [])
        }

        /// Start with the heaviest frames, then the next-heaviest, then the next-heaviest, and so on.
        for (let tile of this.tiles) {
            if (tile.frame != null) {
                fwMap.get(tile.frame.weight).push(tile)
            }
        }

        console.log("tiles in weight categories are:", fwMap)

        let allowedTiles = []
        for (let minFrameWeight of frameweights.DESCENDING_ORDER) {
            let exactFWTiles = fwMap.get(minFrameWeight)
            if (exactFWTiles.length > 0) {
                allowedTiles = allowedTiles.concat(exactFWTiles)

                console.log("testing fweight:", minFrameWeight, "got allowedTiles", allowedTiles)

                let linkedTiles = exactFWTiles[0].recursiveExpand( (tile) => (tile.frame != null && tile.frame.weight >= minFrameWeight) )

                console.log("got linkedTiles", linkedTiles)

                if (linkedTiles.size == allowedTiles.length) {
                    for (let tile of allowedTiles) {
                        if (!linkedTiles.has(tile)) {
                            return false
                        }
                    }
                } else {
                    return false
                }
            }
        }

        return true
    }

    isLegal() {
        warns = this.getWarnings()
        errs = warns.filter( (warn) => (warn.isFatal) )
        return errors.length == 0
    }
    getWarnings() {
        if (this.getWarnings.__dirtyID !== this._dirtyID) {
            this.getWarnings.__dirtyID = this._dirtyID

            let errs = []
            if (!this.checkHillProperty()) {
                errs.push( new warnings.HillPropertyError(this) )
            }

            for (let comp of this.components) {

            }

            this.getWarnings.__cachedValue = errs
        }
        return this.getWarnings.__cachedValue
    }
}
