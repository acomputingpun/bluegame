import * as blueprints from '/es/blueprints.js'
import * as ogrids from '/es/occupants/ogrids.js'
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

export class ShipTile extends ogrids.OccGridTile {
    constructor (...args) {
        super(...args)

        this.occupants = []
    }

    addOccupant(occ) {
        this.occupants.push(occ)
        this.markDirty()
    }
}

export class ShipGrid extends ogrids.OccGrid {
    constructor(blueprintGrid) {
        super(ShipTile)

        for (let occupant of blueprintGrid.occupants) {
            console.log("bgocc", `${occupant}`)
            occupant.reify(this)
        }
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
        console.log("Advacing tick of ship", this, "directive", directive)
        for (let activeComponent of this.grid.activeComponents) {
            console.log(`acticomp ${activeComponent}`, activeComponent)
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