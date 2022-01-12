import * as errs from '/es/errs.js'
import * as hacks from '/es/hacks.js'

const PI = Math.PI

export class Fleet {
    constructor(ships=hacks.argPanic()) {
        this.ships = ships
    }
}

export class Battle {
    constructor(f0=hacks.argPanic(), f1=hacks.argPanic()) {
        this.fleets = [f0, f1]
    }
    allShips() {
        return [...this.f0.ships, ...this.f1.ships]
    }
    get f0() { return this.fleets[0] }
    get f1() { return this.fleets[1] }
}