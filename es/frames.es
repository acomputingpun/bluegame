export class Frame {    
    constructor (weight) {
        this._weight = weight

        this._anchorTile = null
        this._tiles = []
    }

    placeAt(tile) {
        if (this._anchorTile !== null) {
            throw `Panic - can't place frame ${this} from ${tile} - already placed at ${this.anchorTile}`
        }

        this._tiles = []
        for (let placeVec of this.placeVecs) {
            let placeTile = tile.relTile(placeVec)
            console.log("placing frame", this, "at", placeVec, "total", `${placeTile.xyPos}`)
            if (placeTile.frame !== null) {
                console.log("Can't place tile there!")
                throw `Panic - can't place frame section ${this}->${placeVec} at ${placeTile}`
            } else {
                this._tiles.push(placeTile)
            }
        }
        this._anchorTile = tile
        for (let tile of this._tiles) {
            tile.frame = this
        }
    }
    get tiles() {
        if (this._anchorTile === null) {
            return []
        } else {

        }
    }
    remove() {
        if (this._anchorTile === null) {
            throw `Panic - can't remove frame ${this} - not currently placed at all!`
        } else {

            for (let tile of this._tiles) {
                tile.frame = null
            } 
            this._anchorTile = null
        }
    }

    get weight() { return this._weight }

    get placeVecs() {
        return this.weight.placeVecs
    }
}
