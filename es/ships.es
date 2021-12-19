import * as grids from '/es/grids.es'
import * as utils from '/es/utils.es'
import * as vecs from '/es/vectors.es'
import * as frameweights from '/es/frameweights.es'

export class ShipDesign {
    constructor(blueprintGrid) {
        this.grid = blueprintGrid
    }

    reify() {
        return Ship(this)
    }
}

export class PresetDesign extends ShipDesign {
}

export class Ship {
    constructor (design) {
        this._design = design
        this.grid = design.grid.reify()
    }
}

class BlueprintTile extends grids.GridTile {
    constructor (...args) {
        super(...args)

        this.frame = null
        this.components = []
    }

    get frameWeight () {
        if (this.frame == null) {
            return null
        } else {
            return this.frame.weight
        }
    }

    addComponent(comp) {
        this.components.push(comp)
    }
    removeComponent(comp) {
        utils.aRemove(this.components, comp)
    }
}

export class BlueprintGrid extends grids.Grid {
    constructor () {
        super(BlueprintTile)
    }

    checkFrameweightDecreasing() {
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
        errors = this.getErrors()
        return errors.length == 0
    }
    getErrors() {
        return []        
    }
}
