import * as dirconst from '/es/dirconst.js'

import * as blueprints from '/es/blueprints.js'
import * as ships from '/es/ships.js'

import * as framespecs from '/es/occupants/frames/specs.js'
import * as compspecs from '/es/occupants/comps/specs.js'

export class State {
    constructor() {
        this.debugGrid = new blueprints.BlueprintGrid()

        this.debugSetupGrid()

        this.debugShipDesign = new ships.ShipDesign(this.debugGrid)
        this.debugShip = this.debugShipDesign.reify()
        console.log("dbship", this.debugShip)
    }

    debugSetupGrid() {
        framespecs.Medium.reify().lockToGrid( this.debugGrid.lookup( 3,3 ) )
        framespecs.Medium.reify().lockToGrid( this.debugGrid.lookup( 5,3 ) )
        framespecs.Heavy.reify().lockToGrid( this.debugGrid.lookup( 4,5 ) )

        compspecs.ElectricSink.reify().lockToGrid( this.debugGrid.lookup( 3,3 ) )
        compspecs.ElectricSource.reify().lockToGrid( this.debugGrid.lookup( 5,4 ) )
        compspecs.MissileGun.reify().lockToGrid( this.debugGrid.lookup( 4,3 ), dirconst.E )
    }
}