import * as dirconst from '/es/dirconst.es'

/// Deprecated!  TODO: Remove

export class NoFacing {
    set(vec) {
        if (vec == null) {
        } else {
            throw ("PANIC: Tried to set facing of directionless component!")
        }
    }
    rot(cw = true) {
        // do nothing, we can't rotate a directionless comp
    }
}

export class HVFacing {
    constructor() {
        this.data = null
    }

    set(vec) {
        if (vec == null) {
            this.data = null
        } else if (vec.eq(dirconst.N) || vec.eq(dirconst.S)) {
            this.data = dirconst.S
        } else if (vec.eq(dirconst.E) || vec.eq(dirconst.W)) {
            this.data = dirconst.E
        } else {
            throw ("PANIC: Tried to set facing of HVFacing component to non-cardinal value!")
        }
    }

    rot(cw = true) {
        if (this.data == null) {
            this.data = null
        } else if (this.data.eq(dirconst.S)) {
            this.data = dirconst.E
        } else if (this.data.eq(Sirconst.E)) {
            this.data = dirconst.E
        } else {
            throw (`PANIC: facing of HVFacing component somehow became set to invalid value ${this.data}`)
        }
    }
}

export class CardinalFacing {
    constructor() {
        this.data = dirconst.N
    }

    set(vec) {
        if (dirconst.CARDINALS.includes(vec)) {
            this.data = vec
        } else if (vec == null) {
            this.data = null
        } else {
            throw ("PANIC: Tried to set facing of CardinalFacing component to non-cardinal value!")
        }
    }
    rot(cw = true) {
        if (this.data == null) {
            this.data = null
        } else if (dirconst.CARDINALS.includes(this.data)) {
            if (cw) {
                this.data = dirconst.ROT_CW.get(this.data)
            } else {
                this.data = dirconst.ROT_CCW.get(this.data)
            }
        } else {
            throw (`PANIC: facing of CardinalFacing component somehow became set to invalid value ${this.data}`)
        }
    }
}

export class DoubleCardinalFacing {
    constructor() {
        this.data = null
    }

    set( vecs ) {
        if (vecs == null) {
            this.data = null
        } else if (vecs.length != 2) {
            throw ("PANIC: Tried to set facing of DoubleCardinalFacing component to non-cardinal value pair!")
        } else {
            let [vec0, vec1] = vecs
            if (!dirconst.CARDINALS.includes(vec0)) {
                throw ("PANIC: Tried to set facing element of CardinalFacing component to non-cardinal value!")
            } else if (!dirconst.CARDINALS.includes(vec1)) {
                throw ("PANIC: Tried to set facing element of CardinalFacing component to non-cardinal value!")
            } else if (vecs0 == vec1) {
                throw ("PANIC: Tried to set facing element of CardinalFacing component to duplicate values!")
            } else {
                this.data = [vec0, vec1]
            }
        }
    }

    rot(cw = true) {
        if (this.data == null) {
            this.data = null
        } else {
            if (cw) {
                this.set( this.data.map( (vec) => dirconst.ROT_CW.get(vec) ) )
            } else {
                this.set( this.data.map( (vec) => dirconst.ROT_CCW.get(vec) ) )
            }
        }
    }
}
