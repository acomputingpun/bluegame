import * as occupants from './occupants.js'

export class ConnectorDesign extends occupants.GeneralDesign {
    constructor(comp, spec) {
        super(spec)

        this.spec = spec
        this.comp = comp

        this.__locked = false
    }

    reify() {
        if (!this.__locked) {
            throw `Panic - connector ${this} not locked to grid, can't reify!`
        }
        return new ComponentInstance(this)
    }

    lockToGrid() {
        if (this.__locked) {
            throw `Panic - ${this} already locked to grid, can't lock!`
        }
        this.__locked = true
    }
    unlock() {
        if (!this.__locked) {
            throw `Panic - connector ${this} not locked to grid, can't unlock!`
        }
        this.__locked = false
    }

    get tile() {
        return this.comp.innerToTile(this.spec.pos)
    }
    get destTile() {
        return this.comp.innerToTile(this.spec.pos)
    }

    toString() { return `<CONN ${this.spec}>` }
}

class ConnectorInstance {
    constructor(design) {
        this.design = design
    }
}
