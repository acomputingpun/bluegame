import * as dirconst from '/es/dirconst.es'

class Connector {
    constructor(comp, tile, facing) {
        this.component = comp
        this.tile = tile
        this.facing = facing
    }
    get destTile() { return this.tile.rel(this.facing) }
    get destConnector() { return this.destTile.lookupConnector(dirconst.REVERSE[this.facing]) }
}

class ElectricConnector extends Connector {    
}
class EmptyTileConnector extends Connector {
    getLinkErrors() {
    }

}