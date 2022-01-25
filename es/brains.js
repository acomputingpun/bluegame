import * as errs from '/es/errs.js'
import * as hacks from '/es/hacks.js'

class Brain {
    constructor(ship = hacks.argPanic()) {
        this.ship = ship
    }
    
    get battle() { return this.ship.battle }
    getTurningDelta() { return 0 }
}

export class SimpleBrain extends Brain {
    constructor(...args) {
        super(...args)
    }

    get enemyShips() { return this.ship.battle.enemyShips(this) }

    getTurningDelta() {
        if (Math.abs(this.ship.orient.facing) < 0.05) {
            return -this.ship.orient.facing
        } else if (this.ship.orient < 0) {
            return 0.05
        } else if (this.ship.orient > 0) {
            return -0.05
        } else {
            return 0
        }
    }
}

export class Fighter extends SimpleBrain {
    get enemyShip() { return this.enemyShips[0] }
}