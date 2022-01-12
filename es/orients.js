import * as errs from '/es/errs.js'
import * as hacks from '/es/hacks.js'

export class Orient {
    constructor(facing = 0) {
        this.facing = facing
        this.roll = 1
    }
    
    get motionCoeff() {
        return math.sin(this.pos)
    }
    
    get portFacing() {
        return (this.facing - (PI/2))
    }
    get starboardFacing() {
        return (this.facing + (PI/2))
    }
    get sternFacing() {
        return (this.facing + PI) % PI/2
    }
    get facingVec() {
        throw errs.Panic("Not currently implemented!")
    }
}