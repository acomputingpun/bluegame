import * as errs from '/es/errs.js'
import * as hacks from '/es/hacks.js'
import * as orients from '/es/orients.js'

class Fleet {
    constructor(ships=hacks.argPanic(), subjectiveFacingCoeff = 1) {
        this._battle = null

        this.subjectiveFacingCoeff = subjectiveFacingCoeff
        this.ships = ships
        for (let ship of this.ships) {
            ship.setFleet(this)
        }

        this._dirtyID = 0
    }

    setBattle(battle) { this._battle = battle }
    get battle() { return this._battle }
    get other() { return this.battle.otherFleet(this) }

    forwardShip = hacks.cachedLookup(this, () => {
        let best = this.ships[0]
        for (let ship of this.ships) {
            if (ship.sPos > best.sPos) {
                best = ship
            }
        }
        return best
    })
}

export class Battle {
    static fromShips(s0=hacks.argPanic(), s1=hacks.argPanic()) {
        return new this(new Fleet(s0), new Fleet(s1,-1))
    }

    constructor(f0=hacks.argPanic(), f1=hacks.argPanic()) {
        this.fleets = [f0, f1]
        this.f0.setBattle(this)
        this.f1.setBattle(this)
        this.initialSetup()
    }
    allShips() {
        return [...this.f0.ships, ...this.f1.ships]
    }
    get f0() { return this.fleets[0] }
    get f1() { return this.fleets[1] }
    
    otherFleet( fleet ){
        if (fleet === this.f0) {
            return this.f1
        } else if (fleet == this.f1) {
            return this.f0
        } else {
            throw errs.Panic(`Called get ${this}otherFleet() with arg ${fleet} which is not a child fleet.`)
        }
    }
    
    advanceTick() {
        for (let ship of this.allShips()) {
            let emittedActions = ship.advanceTick()
        }
    }

    initialSetup() {
        for (let ship of this.f0.ships) {
            ship.setPos(-405)
            ship.setOrient( new orients.Orient( -1 ) )
        }
        for (let ship of this.f1.ships) {
            ship.setPos(405)
            ship.setOrient( new orients.Orient( 1 ) )
        }
    }
}