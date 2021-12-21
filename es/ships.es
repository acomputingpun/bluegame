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