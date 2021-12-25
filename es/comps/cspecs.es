import * as utils from '/es/utils.es'
import * as vecs from '/es/vectors.es'
import * as connectors from '/es/connectors.es'
import * as interactors from './interactors.es'

import * as resources from './resources.es'

export class ComponentSpecs {
    constructor() {
        this._placeVecs = vecs.arrToVecs(utils.span2( [0, 0], this.xySize.xy ))
    }

    createConnectors(comp) {
        return []
    }

    get interactorClass() { return interactors.NoInteractor }
    get xySize() { throw "Not implemented!" }
    get placeVecs() { return this._placeVecs }
}

class _SmallDoodad extends ComponentSpecs {
    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [-.8,-.8], [.8,-.8], [-.8,.8], [-.8,-.8] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
}
class _LargeDoodad extends ComponentSpecs {
    get xySize() { return vecs.Vec2(3,2) }
    get debugDrawPoints () {
        return [ [-.8,-.8], [.8,-.8], [-.8,.8], [.8,.8] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
}
class _HeavyDoodad extends ComponentSpecs {
    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [-.8,-.8], [-.2,-.8], [-.2,-.2], [.8,-.2], [.8,.6], [.2,.6], [.2,.8], [-.8,.8] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
}

class _ESinkInteractor extends interactors.Interactor {
    preAdvanceTick() {
        this.tryDrawResource(this.inst.connectors[0], res.Electric)
    }
    advanceTick() {
    }
    postAdvanceTick() {
    }
}

class _ElectricSink extends ComponentSpecs {
    get interactorClass() { return _ESinkInteractor }
    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [-.2,-.8], [.2,-.8], [.2,-.2], [.8,-.2], [.8,.2], [.2,.2], [.2,.8], [-.2,.8], [-.2,.2], [-.8,.2], [-.8,-.2], [-.2,-.2] ].map( ( xy ) => vecs.Vec2(...xy) )
    }

}

class _ESourceInteractor extends interactors.Interactor {
    preAdvanceTick() {
    }
    advanceTick() {
    }
    postAdvanceTick() {
    }
}

class _ElectricSource extends ComponentSpecs {
    get interactorClass() { return _ESourceInteractor }
    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [-.2,-.6], [.2,-.8], [.2,-.2], [.6,-.2], [.8,.2], [.2,.2], [.2,.6], [-.2,.8], [-.2,.2], [-.6,.2], [-.8,-.2], [-.2,-.2] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
}

class _FuelSink extends ComponentSpecs {
    get xySize() { return vecs.Vec2(1,1) }
}
class _FuelSource extends ComponentSpecs {  
    get xySize() { return vecs.Vec2(1,1) }
}

class _LGInteractor extends interactors.Interactor {
    preAdvanceTick() {
    }
    advanceTick() {
    }
    postAdvanceTick() {
    }
}

class _LaserGun extends ComponentSpecs {
    get xySize() { return vecs.Vec2(1,1) }

    get debugDrawPoints () {
        return [ [-.2,-.8], [.2,-.8], [.2,-.2], [.4,0], [.2,.2], [-.2,.2], [-.4,0], [-.2,-.2] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
}

class _GenericCable extends ComponentSpecs {
    get xySize() { return vecs.Vec2(1,1) }

    get connectorClass() { return connectors.ElectricConnector }

    createConnectors(comp) {
        if (comp.facing == null) {
            return []
        } else if (comp.tile == null) {
            return []
        } else {
            return comp.facing.map( (vec) => new this.connectorClass(comp.tile, vec) )
        }
    }
}

class _ElectricCable extends _GenericCable {
}

export var SmallDoodad = new _SmallDoodad()
export var LargeDoodad = new _LargeDoodad()
export var HeavyDoodad = new _HeavyDoodad()
export var ElectricSink = new _ElectricSink()
export var ElectricSource = new _ElectricSource()

export var FuelSink = new _FuelSink()
export var FuelSource = new _FuelSource()

export var LaserGun = new _LaserGun()
export var ElectricCable = new _ElectricCable()
