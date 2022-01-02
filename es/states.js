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
        framespecs.Medium.designify().lockToGrid( this.debugGrid.lookup( 3,3 ) )
        framespecs.Medium.designify().lockToGrid( this.debugGrid.lookup( 5,3 ) )
        framespecs.Heavy.designify().lockToGrid( this.debugGrid.lookup( 4,5 ) )

//        compspecs.ElectricSink.designify().lockToGrid( this.debugGrid.lookup( 3,3 ) )
        let lg = compspecs.LaserGun.designify().lockToGrid( this.debugGrid.lookup( 4,3 ), dirconst.N )
        let es = compspecs.Battery.designify().lockToGrid( this.debugGrid.lookup( 4,4 ), dirconst.N )
        lg.connectors[0].linkConnector(es.connectors[0])
    }
}