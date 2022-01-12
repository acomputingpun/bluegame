import * as blueprints from '/es/blueprints.js'
import * as ogrids from '/es/occupants/ogrids.js'
import * as utils from '/es/utils.js'
import * as vecs from '/es/vectors.js'
import * as orients from '/es/orients.js'

export class ShipDesign {
    constructor(blueprintGrid) {
        this.grid = blueprintGrid
    }

    reify() {
        return new Ship(this)
    }
    
    get debugName() { return "???ship design???" }
}

export class ShipTile extends ogrids.OccGridTile {
    constructor (...args) {
        super(...args)
    }
}

export class ShipGrid extends ogrids.OccGrid {
    constructor(blueprintGrid) {
        super(ShipTile)
        
        this.reifyDict = new Map()
        this.reifyDict.set(null, null)

        for (let occupant of blueprintGrid.occupants) {
//            console.log("bgocc", `${occupant}`)
            this.lookupOrReify(occupant)
        }
    }

    lookupOrReify(design) {
        if (!this.reifyDict.has(design)) {
            let inst = new design.instanceClass(design, this)
            this.reifyDict.set(design, inst)
            inst.recursiveReify()
            inst.setInternalReferences()
        }
        return this.reifyDict.get(design)
    }
}

export class PresetDesign extends ShipDesign {
}

export class SpaceMoveData {
    constructor(pos = 0, orient = new orients.Orient(0)) {
        this.orient = new orients.Orient()
        this.pos = 0
        this.speed = 0
    }
    get motionCoeff() { return this.orient.motionCoeff }
}

export class Ship {
    constructor (design) {
        this._design = design
        this.grid = new ShipGrid(design.grid)

        this.moveData = new SpaceMoveData()
    }
    
    get pos() { return this.moveData.pos }
    get orient() { return this.moveData.orient }
    get speed() { return this.moveData.speed }
    get motionCoeff() { return this.moveData.motionCoeff }

    advanceTick(directive) {
        console.log("Advacing tick of ship", this, "directive", directive)
        for (let activeComponent of this.grid.activeComponents) {
//            console.log(`acticomp ${activeComponent}`, activeComponent)
            activeComponent.preAdvanceTick(directive)
        }

        for (let activeComponent of this.grid.activeComponents) {
            activeComponent.advanceTick(directive)
        }
    }
    
    get debugName() { return this._design.debugName }
}

export class OperatingDirective {
    constructor () {
    }
}