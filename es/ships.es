import * as grids from '/es/grids.es'
import * as utils from '/es/utils.es'
import * as vecs from '/es/vectors.es'

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

export class FrameWeight {
    constructor() {
        this.placeVecs = vecs.arrToVecs(utils.span2( [0, 0], this.xySize.xy ))
        console.log("pv", this.placeVecs)
    }

    get xySize() { throw "PANIC: to be overridden!" }
}


export class SuperlightWeight extends FrameWeight {
    get xySize() { return vecs.Vec2(1, 1) }
}
export class LightWeight extends FrameWeight {
    get xySize() { return vecs.Vec2(1, 1) }
}
export class MediumWeight extends FrameWeight {
    get xySize() { return vecs.Vec2(2, 2) }
}
export class HeavyWeight extends FrameWeight {
    get xySize() { return vecs.Vec2(2, 2) }
}
export class SuperheavyWeight extends FrameWeight {
    get xySize() { return vecs.Vec2(3, 3) }
}



export class Frame {    
    constructor (weight) {
        this._weight = weight

        this._anchorTile = null
        this._tiles = []
    }

    placeAt(tile) {
        if (this._anchorTile !== null) {
            throw `Panic - can't place frame ${this} from ${tile} - already placed at ${this.anchorTile}`
        }

        this._tiles = []
        for (let placeVec of this.placeVecs) {
            let placeTile = tile.relTile(placeVec)
            console.log("placing at", placeVec, "total", `${placeTile.xyPos}`)
            if (placeTile.frame !== null) {
                console.log("Can't place tile there!")
                throw `Panic - can't place frame section ${this}->${placeVec} at ${placeTile}`
            } else {
                this._tiles.push(placeTile)
            }
        }
        this._anchorTile = tile
        for (let tile of this._tiles) {
            tile.frame = this
        }
    }
    get tiles() {
        if (this._anchorTile === null) {
            return []
        } else {

        }
    }
    remove() {
        if (this._anchorTile === null) {
            throw `Panic - can't remove frame ${this} - not currently placed at all!`
        }
    }

    get weight() { return this._weight }

    get placeVecs() {
        return this.weight.placeVecs
    }
}

export class ComponentDesign {
}

export class Component {
    constructor() {
        this._anchorTile = null
        this._facing = null
        this._tiles = []
    }

    placeAt(tile) {
        if (this._anchorTile !== null) {
            throw `Panic - can't place component ${this} from ${tile} - already placed at ${this._anchorTile}`
        }

        this._tiles = []
        for (let placeVec of this.placeVecs) {
            let placeTile = tile.relTile(placeVec)
            this._tiles.push(placeTile)
        }
        this._anchorTile = tile
        for (let tile of this._tiles) {
            tile.addComponent(this)
        }
    }
}

class BlueprintTile extends grids.GridTile {
    constructor (...args) {
        super(...args)

        this.frame = null
        this.component = null
    }

    get frameWeight () {
        if (this.frame == null) {
            return null
        } else {
            return this.frame.weight
        }
    }
}

export class BlueprintGrid extends grids.Grid {
    constructor () {
        super(BlueprintTile)
    }

    isLegal() {
        errors = this.getErrors()
        return errors.length == 0
    }
    getErrors() {
        return []        
    }
}
