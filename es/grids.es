export class Grid {
    constructor (tileClass) {
        this._dirtyID = 0

        this._tileClass = tileClass
        this._matrix = new Map()
    }

    lookup(x,y) {
        let row = this._lookupRow(y)
        if (! row.has(x)) {
            row.set(x, new this._tileClass( [x, y], this ) )
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
    constructor (xyPos, parent) {
        this._dirtyID = 0

        this.xyPos = xyPos
        this.parent = parent
    }

    markDirty() {
        this.dirtyID += 1
        this.parent.markDirty()
    }
}