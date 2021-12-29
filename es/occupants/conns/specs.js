import * as dirconst from '/es/dirconst.js'
import * as resources from '/es/comps/resources.js'
import * as base from './base.js'

class ResourceConnector extends base.ConnectorSpec {
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
class EmptyTileConnector extends base.ConnectorSpec {
    get debugName() {return "emptyTile"}

    getLinkErrors() {
    }
}