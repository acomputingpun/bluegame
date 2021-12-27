import * as blueprints from '/es/blueprints.es'
import * as grids from '/es/grids.es'
import * as utils from '/es/utils.es'
import * as vecs from '/es/vectors.es'

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
    }
}

export class ShipGrid extends grids.Grid {
    constructor(blueprintGrid) {
        super(ShipTile)

        this.frames = blueprintGrid.frames.map( (frame) => frame.reify(this) )
        this.components = blueprintGrid.components.map( (component) => component.reify(this) )
        this.connectors = blueprintGrid.connectors.map( (connector) => connector.reify(this) )
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