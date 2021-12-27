import * as vecs from '/es/vectors.es'
import * as dirconst from '/es/dirconst.es'

export class Grid {
    constructor (tileClass) {
        this._dirtyID = 0

        this._tileClass = tileClass
        this._matrix = new Map()
        this._tiles = []
    }

    lookup(x, y) {
        let row = this._lookupRow(y)
        if (! row.has(x)) {
            let tile = new this._tileClass( x, y, this )
            row.set(x, tile )
            this._tiles.push(tile)
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
        this._dirtyID += 1
    }

    get tiles() { return this._tiles }
}

export class GridTile {
    constructor (x, y, parent) {
        this._dirtyID = 0

        this.xyPos = vecs.Vec2(x, y)
        this.parent = parent
    }

    markDirty() {
        this._dirtyID += 1
        this.parent.markDirty()
    }

    relTile(xyRel) {
        return this.parent.lookup( ...this.xyPos.add(xyRel).xy )
    }
    adjTiles() {
//        console.log("callign adjTiles of this", this, "dc is", dirconst.CARDINALS)
        return dirconst.CARDINALS.map( vec => this.relTile(vec) )
    }

    _recursiveExpand(fn, soFarSet) {
        if (!soFarSet.has(this)) {
            if (fn(this)) {
                soFarSet.add(this)
                for (let adjTile of this.adjTiles()) {
                    adjTile._recursiveExpand(fn, soFarSet)
                }
            }
        }
        return soFarSet
    }

    recursiveExpand(fn) {
        return this._recursiveExpand(fn, new Set())
    }

    toString() { return `t(${this.xyPos.x},${this.xyPos.y})>` }
}