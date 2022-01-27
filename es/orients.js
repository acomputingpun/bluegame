import * as errs from '/es/errs.js'
import * as hacks from '/es/hacks.js'
import * as vecs from '/es/vectors.js'

const PI = Math.PI
const TAU = Math.PI*2

export class Orient {
    constructor(facing = 0) {
        if (facing > PI) {
            this.facing = (facing % (TAU)) - (TAU)
        } else if (facing < -PI) {
            this.facing = (facing % (TAU)) + (TAU)
        } else {
            this.facing = facing
        }
    }
    
    get linearCoeff() { return Math.sin(this.facing) }
    get angularCoeff() { return Math.cos(this.facing) }

    get portFacing() { return (this.facing - ( PI/2 )) }
    get starboardFacing() { return this.rotCW( PI ).facing }
    get sternFacing() { return this.rotCW( PI ).facing }
    get facingVec() {
//        if (this.facing % TAU) {
//        } else {
//        }
        return vecs.Vec2(Math.cos(this.facing), Math.sin(this.facing))
    }

    rotCW(ang) { return new Orient (this.facing + ang) }
    rotCCW(ang) { return new Orient (this.facing - ang) }
    hInvert() { return new Orient( -this.facing ) }

    get deg() { return (this.facing / TAU) * 360 }
    
    toString() { return `${this.facing}` }
}