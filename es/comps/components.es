import * as utils from '/es/utils.es'
import * as vecs from '/es/vectors.es'
import * as dirconst from '/es/dirconst.es'

export class Component {
    constructor(specs) {
        this.specs = specs 

        this._facing = dirconst.N
        this._interactor = new specs.interactorClass()

        this._anchorTile = null
        this._tiles = []
        this._connectors = []

        this.__locked = false
    }

    get placeVecs() {
        return this.specs.placeVecs
    }

    get locked() { return this.__locked }

    get facing() { return this._facing }

    get tile() { return this._anchorTile }
    get tiles() {
        return this._tiles            
    }
    get connectors() { return this._connectors }

    lockToGrid(tile = undefined, facing = undefined) {
        if (tile !== undefined) {
            this.setTile(tile)
        }
        if (facing !== undefined) {
            this.setFacing(facing)
        }

        if (!this.canLock()) { throw `Panic - can't lock frame ${this}!` }

        this.__locked = true
        this.grid.addComponent(this)
        for (let tile of this._tiles) {
            tile.addComponent(this)
        }
        for (let connector of this._connectors) {
            this.grid.addConnector(connector)
            connector.tile.addConnector(connector)
        }
    }
    unlock() {
        if (!this.__locked) {
            throw `Panic - frame ${this} not locked to grid!`
        }

        this.grid.removeComponent(this)
        for (let tile of this._tiles) {
            tile.removeComponent(this)
        }
        for (let connector of this._connectors) {
            this.grid.removeConnector(connector)
            connector.tile.removeConnector(connector)
        }
        this.__locked = false
    }

    canLock() {
        if (this.locked) { return false } 
        if (this.tile == null) { return false }
        return true
    }

    setTile(tile) {
        if (this.__locked) { throw `Panic - can't adjust tile of locked component ${this}` }
        if (tile == null) {
            this.clearTile(tile)
        } else {
            this._anchorTile = tile
            this._tiles = this.placeVecs.map ( (placeVec) => tile.relTile(placeVec) )
        }
        this._connectors = this.specs.createConnectors(this)
    }
    clearTile(tile) {
        if (this.__locked) { throw `Panic - can't adjust tile of locked component ${this}` }
        this._anchorTile = null
        this._tiles = []
        this._connectors = this.specs.createConnectors(this)
    }
    setFacing(data) {
        if (this.__locked) { throw `Panic - can't adjust facing of locked component ${this}` }
        this._facing = data
        this._connectors = this.specs.createConnectors(this)
    }
    rotFacing(cw = true) {
        if (cw) {
            this.setFacing(dirconst.ROT_CW.get(this.facing))
        } else {
            this.setFacing(dirconst.ROT_CCW.get(this.facing))
        }
    }


    get grid() {
        if (this._anchorTile != null) {
            return this._anchorTile.parent
        } else {
            return null
        }
    }
}

class ComponentInstance {
    constructor(comp) {
        this.comp = comp
        this._interactor = new comp.specs.interactorClass(this)
    }
    get facing() { return this.comp.facing}
    get specs() { return this.comp.specs }

    preAdvanceTick(directive) {
        this._interactor.preAdvanceTick(directive)
    }

    advanceTick(directive) {
        this._interactor.advanceTick(directive)
    }
    postAdvanceTick (directive) {
        this._interactor.postAdvanceTick(directive)
    }
}

