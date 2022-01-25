import * as hacks from '/es/hacks.js'
import * as utils from '/es/utils.js'
import * as vecs from '/es/vectors.js'

import * as ogrids from '/es/occupants/ogrids.js'
import * as framespecs from '/es/occupants/frames/specs.js'

import * as warnings from '/es/warnings.js'

class BlueprintTile extends ogrids.OccGridTile {
    constructor (...args) {
        super(...args)
    }

    addOccupant(occ=hacks.argPanic()) {
        if(!occ.locked) { throw new errs.Panic(`Tried to add unlocked occupant ${occ} to Grid ${this}`) }
        super.addOccupant(occ)
    }
    removeOccupant(occ=hacks.argPanic()) {
        if (!occ.locked) { throw new errs.Panic(`Tried to remove unlocked occupant ${occ} from Grid ${this}`) }
        super.removeOccupant(occ)
    }
}

export class BlueprintGrid extends ogrids.OccGrid {
    constructor () {
        super(BlueprintTile)
    }

    addOccupant(occ=hacks.argPanic()) {
        if(!occ.locked) { throw new errs.Panic(`Tried to add unlocked occupant ${occ} to Grid ${this}`) }
        super.addOccupant(occ)
    }
    removeOccupant(occ=hacks.argPanic()) {
        if (!occ.locked) { throw new errs.Panic(`Tried to remove unlocked occupant ${occ} from Grid ${this}`) }
        super.removeOccupant(occ)
    }

    checkHillProperty() {
        console.log("Checking hill validity of grid", this)

        let fwMap = new Map() 

        for (let spec of framespecs.DESCENDING_ORDER) {
            fwMap.set(spec, [])
        }

        // Start with the heaviest frames, then the next-heaviest, then the next-heaviest, and so on.
        for (let tile of this.tiles) {
            if (tile.frame != null) {
                fwMap.get(tile.frame.spec).push(tile)
            }
        }

        console.log("tiles in weight categories are:", fwMap)

        let allowedTiles = []
        for (let minFrameWeight of framespecs.DESCENDING_ORDER) {
            let exactFWTiles = fwMap.get(minFrameWeight)
            if (exactFWTiles.length > 0) {
                allowedTiles = allowedTiles.concat(exactFWTiles)

                console.log("testing fweight:", minFrameWeight, "got allowedTiles", allowedTiles)

                let linkedTiles = exactFWTiles[0].recursiveExpand( (tile) => (tile.frame != null && tile.frame.spec >= minFrameWeight) )

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
    getWarnings = hacks.cachedLookup(this, () => {
        let errs = []
        if (!this.checkHillProperty()) {
            errs.push( new warnings.HillPropertyError(this) )
        }
        for (let comp of this.components) {

        }
        return errs
    })
}