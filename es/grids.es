import * as vecs from '/es/vectors.es'

export class Grid {
    constructor (tileClass) {
        this._dirtyID = 0

        this._tileClass = tileClass
        this._matrix = new Map()
    }

    lookup(xy) {
        let [x, y] = xy
        let row = this._lookupRow(y)
        if (! row.has(x)) {
            row.set(x, new this._tileClass( x, y, this ) )
        }
        return row.get(x)
     }

     _lookupRow(y) {
        if (! this._matrix.has(y)) {
            this._matrix.set(y, new Map())
        }
        return this._matrix.get(y)
    }

    markDirty() {
        this.dirtyID += 1
    }
}

export class GridTile {
    constructor (x, y, parent) {
        this._dirtyID = 0

        this.xyPos = vecs.Vec2(x, y)
        this.parent = parent
    }

    markDirty() {
        this.dirtyID += 1
        this.parent.markDirty()
    }

    relTile(xyRel) {
        return this.parent.lookup( this.xyPos.add(xyRel).xy )
    }
}