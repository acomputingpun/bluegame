import * as utils from '/es/utils.js'
import * as vecs from '/es/vectors.js'
import * as dirconst from '/es/dirconst.js'
import * as connspecs from '../conns/specs.js'

import * as interactors from '/es/comps/interactors.js'
import * as resources from '/es/comps/resources.js'

import * as base from './base.js'

class _SmallDoodad extends base.ComponentSpec {
    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [-.8,-.8], [.8,-.8], [-.8,.8], [-.8,-.8] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
    get debugName() { return "SmallDoodad" }
}
class _LargeDoodad extends base.ComponentSpec {
    get xySize() { return vecs.Vec2(3,2) }
    get debugDrawPoints () {
        return [ [-.8,-.8], [.8,-.8], [-.8,.8], [.8,.8] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
    get debugName() { return "LargeDoodad" }
}
class _HeavyDoodad extends base.ComponentSpec {
    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [-.8,-.8], [-.2,-.8], [-.2,-.2], [.8,-.2], [.8,.6], [.2,.6], [.2,.8], [-.8,.8] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
    get debugName() { return "HeavyDoodad" }
}

class _ESinkInteractor extends interactors.Interactor {
    preAdvanceTick() {
//        this.tryDrawResource(this.inst.connectors[0], res.Electric)
    }
    advanceTick() {
    }
    postAdvanceTick() {
    }
}

class _ElectricSink extends base.ComponentSpec {
    get interactorClass() { return _ESinkInteractor }
    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [-.2,-.8], [.2,-.8], [.2,-.2], [.8,-.2], [.8,.2], [.2,.2], [.2,.8], [-.2,.8], [-.2,.2], [-.8,.2], [-.8,-.2], [-.2,-.2] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
    get debugName() { return "ElectricSink" }
}

class _ESourceInteractor extends interactors.Interactor {
    preAdvanceTick() {
    }
    advanceTick() {
    }
    postAdvanceTick() {
    }
}

class _ElectricSource extends base.ComponentSpec {
    get interactorClass() { return _ESourceInteractor }
    get xySize() { return vecs.Vec2(1,1) }
    get debugDrawPoints () {
        return [ [-.2,-.6], [.2,-.8], [.2,-.2], [.6,-.2], [.8,.2], [.2,.2], [.2,.6], [-.2,.8], [-.2,.2], [-.6,.2], [-.8,-.2], [-.2,-.2] ].map( ( xy ) => vecs.Vec2(...xy) )
    }
    get debugName() { return "ElectricSource" }
}

class _FuelSink extends base.ComponentSpec {
    get xySize() { return vecs.Vec2(1,1) }
    get debugName() { return "FuelSink" }
}
class _FuelSource extends base.ComponentSpec {  
    get xySize() { return vecs.Vec2(1,1) }
    get debugName() { return "FuelSource" }
}

class _LGInteractor extends interactors.Interactor {
    preAdvanceTick() {
    }
    advanceTick() {
    }
    postAdvanceTick() {
    }
}

class _LaserGun extends base.ComponentSpec {
    get xySize() { return vecs.Vec2(1,1) }

    get debugDrawPoints () {
        return [ [-2,-8], [2,-8], [2,-2], [4,0], [2,2], [-2,2], [-4,0], [-2,-2] ].map( ( xy ) => vecs.Vec2(...xy).sMul(0.1) )
    }

    _createConnectors() {
        return [new connspecs.ElectricConnector( dirconst.IN_PLACE, dirconst.S )]
    }

    get isActiveComponent() { return true }

    get interactorClass() { return _LGInteractor }
    get debugName() { return "LaserGun" }
}

class _MGInteractor extends interactors.Interactor {
    preAdvanceTick() {
    }
    advanceTick() {
    }
    postAdvanceTick() {
    }
}

class _MissileGun extends base.ComponentSpec {
    get xySize() { return vecs.Vec2(1,1) }

    get debugDrawPoints () {
        return [ [-2,-8], [2,-8], [2,-2], [4,0], [2,2], [-2,2], [-4,0], [-2,-2] ].map( ( xy ) => vecs.Vec2(...xy).sMul(0.1) )
    }

    get isActiveComponent() { return true }

    get interactorClass() { return _MGInteractor }
    get debugName() { return "MissileGun" }
}


class _GenericCable extends base.ComponentSpec {
    get xySize() { return vecs.Vec2(1,1) }

    _createConnectors() {
        return [
            new this.connSpecClass( dirconst.IN_PLACE, dirconst.N ),
            new this.connSpecClass( dirconst.IN_PLACE, dirconst.E )
        ]
    }
    get connSpecClass() { return connspecs.ElectricConnector }
}

class _ElectricCable extends _GenericCable {
    get debugName() { return "ElectricCable" }
}

export var SmallDoodad = new _SmallDoodad()
export var LargeDoodad = new _LargeDoodad()
export var HeavyDoodad = new _HeavyDoodad()
export var ElectricSink = new _ElectricSink()
export var ElectricSource = new _ElectricSource()

export var FuelSink = new _FuelSink()
export var FuelSource = new _FuelSource()

export var LaserGun = new _LaserGun()
export var MissileGun = new _MissileGun()
export var ElectricCable = new _ElectricCable()
