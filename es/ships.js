import * as hacks from '/es/hacks.js'
import * as vecs from '/es/vectors.js'
import * as utils from '/es/utils.js'
import * as orients from '/es/orients.js'

import * as blueprints from '/es/blueprints.js'
import * as ogrids from '/es/occupants/ogrids.js'
import * as brains from '/es/brains.js'

export class ShipDesign {
    constructor(blueprintGrid=hacks.argPanic()) {
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
    constructor(blueprintGrid=hacks.argPanic()) {
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

/*export class SpaceMoveData {
    constructor(pos = 0, orient = new orients.Orient(0)) {
        this.orient = new orients.Orient()
        this.pos = 0
        this.speed = 0
    }
    get motionCoeff() { return this.orient.motionCoeff }
}*/

export class Ship {
    constructor (design=hacks.argPanic()) {
        this._design = design
        this.grid = new ShipGrid(design.grid)
        this._fleet = null

        this._orient = new orients.Orient()
        this._pos = 0
        this._speed = 10

        this.brain = new brains.SimpleBrain(this)
    }

    get fleet() { return this._fleet }
    setFleet(fleet) { this._fleet = fleet }
    get battle() { return this.fleet.battle } 
    get subjectiveFacingCoeff() { return this.fleet.subjectiveFacingCoeff }
    
    get pos() { return this._pos }
    get orient() { return this._orient }
    get speed() { return this._speed }

    get subjPos() { return this.pos * this.subjectiveFacingCoeff }
    get opposingForward() { return this.fleet.other.forwardShip() }

    get oEnemyDist() { return this.oRelPosOf(this.opposingForward) }
    get sEnemyDist() { return this.oEnemyDist * this.subjectiveFacingCoeff }

    oRelPosOf(otherShip) {
        return (otherShip.pos-this.pos) 
    }
    sRelPosOf(otherShip) {
        return this.oRelPosOf(otherShip) * this.subjectiveFacingCoeff
    }

    get linearCoeff() { return this.orient.linearCoeff }
    get angularCoeff() { return this.orient.angularCoeff }

    get linearMotion() { return this.linearCoeff * this.speed }
    get angularMotion() { return this.angularCoeff * this.speed }

    get oLinearMotion() { return this.linearMotion * this.subjectiveFacingCoeff }

    get facingVec() { return vecs.Vec2(this.linearCoeff * this.subjectiveFacingCoeff, this.angularCoeff) }

    setPos(pos) {
        this._pos = pos
    }
    setOrient(orient) {
        this._orient = orient
    }
    setSpeed(speed) {
        this._speed = speed
    }

    advanceTick() {
//        this.controlComponents()
//        this.advanceComponents()
//        this.emitActions()

        this.advanceMotion(this.brain.getTurningDelta())
    }

    advanceMotion(turningDelta = 0.05) {
        if (true || "Check to see if the turning delta is within our turning capability!") {
        }

        this.setOrient(this.orient.rotCW(turningDelta))
        this.setPos(this.pos + this.oLinearMotion)
        if (this.sEnemyDist < 0) {
            this.setPos( this.pos + (this.oEnemyDist * 2) )
            this.setOrient(this.orient.hInvert())
        }
    }

    controlComponents() {
    }

    advanceComponents() {
        this.emittedActions = []

        for (let activeComponent of this.grid.activeComponents) {
//            console.log(`acticomp ${activeComponent}`, activeComponent)
            activeComponent.preAdvanceTick(null)
        }

        for (let activeComponent of this.grid.activeComponents) {
            activeComponent.advanceTick(null)
        }
    }

    submitActions() {
        console.log ("Emitting", this.emittedActions)
    }

    get debugName() { return this._design.debugName }
}

export class OperatingDirective {
    constructor () {
    }
}