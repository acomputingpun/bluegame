import * as occupants from '../occupants.js'

export class ConnectorSpec extends occupants.GeneralSpec {
    get debugName() {return "unnamed connector"}

    constructor(pos, facing) {
        super()
        this.pos = pos
        this.facing = facing
    }

    get isConnector() { return true }

    get designClass() { return ConnectorDesign }
    get destPos() { return this.pos.add(this.facing) }

    toString() { return `[connspec ${this.debugName}]` }
}

export class ConnectorDesign extends occupants.GeneralDesign {
    constructor(spec, comp) {
        super(spec)
        console.log("Just called new ConnectorDesign with args spec:", spec, "and comp", comp, "got this", this)

        this.spec = spec
        this.comp = comp

        this.__locked = false
    }

    get instanceClass() { return ConnectorInstance }

    lockToGrid() {
        if (this.__locked) {
            throw `Panic - ${this} already locked to grid, can't lock!`
        }
        if (!this.comp.locked) {
            throw `Panic - tried to lock connector ${this} but parental component ${this.comp} is unlocked!`
        }
        this.__locked = true
        this.grid.addOccupant(this)
    }
    unlock() {
        if (!this.__locked) {
            throw `Panic - connector ${this} not locked to grid, can't unlock!`
        }
        this.grid.removeOccupant(this)
        this.__locked = false
    }

    get tile() {
        return this.comp.innerToTile(this.spec.pos)
    }
    get facing() {
        return this.comp.innerToFacing(this.spec.facing)
    }
    get destTile() {
        return this.tile.rel(this.facing)
    }

    toString() { return `[CONN ${this.spec}]` }
}

class ConnectorInstance extends occupants.GeneralInstance {
}
