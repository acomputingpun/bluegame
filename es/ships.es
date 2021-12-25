import * as blueprints from '/es/blueprints.es'
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

export class ShipGrid extends blueprints.BlueprintGrid {

}

export class PresetDesign extends ShipDesign {
}

export class Ship {
    constructor (design) {
        this._design = design
        this.grid = design.grid.reify()
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