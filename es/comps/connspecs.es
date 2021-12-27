import * as dirconst from '/es/dirconst.es'
import * as resources from '/es/comps/resources.es'
import * as occupants from './occupants.es'
import * as conndesigns from './connectors.es'

class ConnectorSpec extends occupants.GeneralSpec {
    get debugName() {return "unnamed connector"}

    constructor(pos, facing) {
        super()
        this.pos = pos
        this.facing = facing
    }

    get designClass() {return conndesigns.ConnectorDesign }
    get destPos() { return this.pos.add(this.facing) }

    toString() { return `[connspec ${this.debugName}]` }
}

class ResourceConnector extends ConnectorSpec {
    get debugName() {return "rescon"}

    constructor(pos, facing, res, capacity) {
        super(pos, facing)
        this.res = res
        this.capacity = capacity
    }
}

export class ElectricConnector extends ResourceConnector {   
    constructor(pos, facing) {
        super(pos, facing, resources.Electric, 1)
    }
}
class EmptyTileConnector extends ConnectorSpec {
    get debugName() {return "emptyTile"}

    getLinkErrors() {
    }
}