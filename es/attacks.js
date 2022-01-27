import * as errs from '/es/errs.js'
import * as hacks from '/es/hacks.js'

class Attack {
    constructor(sourceWeapon=hacks.argPanic(), targetShip=hacks.argPanic(), ) {
        super()
        this._sourceWeapon = sourceWeapon
        this._targetShip = targetShip
    }

    get roller() { return this.battle.roller }
    get battle() { return this.sourceShip.battle }
    get sourceShip() { return this.sourceComp.ship }
    get sourceWeapon() { return this._sourceWeapon }

    get targetShip() { return this._targetShip }

    calculate() {
        this.weaponAccuracy = this.sourceWeapon.baseAccuracy

        this.targetDataValue = 0 // to be implemented
        this.modTargetData = (this.targetDataValue) ** 2

        this.rangeIncrement = (this.sourceWeapon.rangeIncrement) // to be implemented
        this.rangeDistance = (this.sourceShip.oDistTo(this.targetShip)) // to be implemented
        this.modRange = -((this.rangeDistance) / (this.rangeIncrement)) ** 2

        this.weaponTracking = this.sourceWeapon.trackingValue
        this.enemyEvasion = 0 // to be implemented
        this.modEvasion = -Math.min(this.enemyEvasion - this.weaponTracking) ** 2

        this.finalAccuracy = this.weaponAccuracy + this.modTargetData + this.modRange + this.modEvasion
        this.scatterValue = Math.max(0, -this.finalAccuracy)
    }

    roll() {
        // we roll d(0-Scatter), the enemy ship rolls d(0-Size)

        this.targetProfileValue = "tbi"

        this.attackRoll = this.roller.uniform(0, this.scatterValue)
        this.missRoll = this.roller.uniform(0, this.targetProfileValue)
    }
}

class Weapon {
    constructor() {
        this.baseAccuracy = 10

        this.rangeIncrement = 1000
        this.trackingValue = 0
    }
}