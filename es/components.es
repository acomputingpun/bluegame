import * as utils from '/es/utils.es'
import * as vecs from '/es/vectors.es'

export class Component {
    constructor(specs) {
        this.specs = specs 

        this._anchorTile = null
        this._facing = null
        this._tiles = []
    }

    get placeVecs() {
        return this.specs.placeVecs
    }

    setFacing(facing) {
        throw "PANIC: to be overridden!"
    }

    placeAt(tile, facing) {
        this.setFacing(facing)

        if (this._anchorTile !== null) {
            throw `Panic - can't place component ${this} from ${tile} - already placed at ${this._anchorTile}`
        }

        this._tiles = []
        for (let placeVec of this.placeVecs) {
            let placeTile = tile.relTile(placeVec)
            this._tiles.push(placeTile)
        }
        this._anchorTile = tile
        for (let tile of this._tiles) {
            tile.addComponent(this)
        }
    }

    remove(tile) {
        if (this._anchorTile === null) {
            throw `Panic - can't remove frame ${this} - not currently placed at all!`
        } else {

            for (let tile of this._tiles) {
                tile.removeComponent(this)
            } 
            this._anchorTile = null
        }
    }
}

