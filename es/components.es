import * as utils from '/es/utils.es'
import * as vecs from '/es/vectors.es'

export class ComponentSpecs {
    constructor() {
    }
}

class SmallDoodad extends ComponentSpecs {
    get debugDrawPoints () {
        return [ [1,1], [9,1], [1,9], [9,9] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
}
class LargeDoodad extends ComponentSpecs {
    get debugDrawPoints () {
        return [ [1,1], [9,1], [1,9], [9,9] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
}
class HeavyDoodad extends ComponentSpecs {
    get debugDrawPoints () {
        return [ [1,1], [4,1], [4,4], [9,4], [9,8], [6,8], [6,9], [1,9] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
}

class ElectricSink extends ComponentSpecs {
    get debugDrawPoints () {
        return [ [4,1], [6,1], [6,4], [9,4], [9,6], [6,6], [6,9], [4,9], [4,6], [1,6], [1,4], [4,4] ].map( ( xy ) => vecs.Vec2(...xy) )
    }

}
class ElectricSource extends ComponentSpecs {
    get debugDrawPoints () {
        return [ [4,3], [6,1], [6,4], [7,4], [9,6], [6,6], [6,7], [4,9], [4,6], [3,6], [1,4], [4,4] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
}

class FuelSink extends ComponentSpecs {
}
class FuelSource extends ComponentSpecs {  
}

export class Component {
    constructor(specs) {
        this.specs = specs 

        this._anchorTile = null
        this._facing = null
        this._tiles = []
    }

    placeAt(tile) {
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

