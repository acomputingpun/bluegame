import * as blueprints from '/es/blueprints.js'
import * as grids from '/es/grids.js'
import * as utils from '/es/utils.js'
import * as vecs from '/es/vectors.js'

export class ShipDesign {
    constructor(blueprintGrid) {
        this.grid = blueprintGrid
    }

    reify() {
        return new Ship(this)
    }
}

export class ShipTile extends grids.GridTile {
    constructor (...args) {
        super(...args)

        this.occupants = []
    }

    addOccupant(occ) {
        this.occupants.push(occ)
        this.parent.addOccupant(occ)
        this.markDirty()
    }
}

export class ShipGrid extends grids.Grid {
    constructor(blueprintGrid) {
        super(ShipTile)

        this.occupants = []
        this.activeComponents = []

        for (let occupant of blueprintGrid.occupants) {
            console.log("bgocc", `${occupant}`)
            occupant.reify(this)
        }
    }

    addOccupant(occ) {
        this.occupants.push(occ)
        this.markDirty()
    }
}

export class PresetDesign extends ShipDesign {
}

export class Ship {
    constructor (design) {
        this._design = design
        this.grid = new ShipGrid(design.grid)
    }

    advanceTick(directive) {
        for (let activeComponent of this.grid.activeComponents) {
            activeComponent.preAdvanceTick(directive)
        }

        for (let activeComponent of this.grid.activeComponents) {
            activeComponent.advanceTick(directive)
        }
    }
}

export class OperatingDirective {
    constructor () {
    }
}