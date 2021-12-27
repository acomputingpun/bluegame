import * as dirconst from '/es/dirconst.js'

import * as blueprints from '/es/blueprints.js'
import * as ships from '/es/ships.js'
import * as frames from '/es/frames.js'
import * as frameweights from '/es/frameweights.js'

import * as components from '/es/comps/components.js'
import * as cspecs from '/es/comps/cspecs.js'

export class State {
    constructor() {
        this.debugGrid = new blueprints.BlueprintGrid()

        this.debugSetupGrid()

        this.debugShipDesign = new ships.ShipDesign(this.debugGrid)
        this.debugShip = this.debugShipDesign.reify()
        console.log("dbship", this.debugShip)
    }

    debugSetupGrid() {
        new frames.Frame( frameweights.Medium ).lockToGrid( this.debugGrid.lookup( 3,3 ) )
        new frames.Frame( frameweights.Medium ).lockToGrid( this.debugGrid.lookup( 5,3 ) )
        new frames.Frame( frameweights.Heavy ).lockToGrid( this.debugGrid.lookup( 4,5 ) )

        cspecs.ElectricSink.reify().lockToGrid( this.debugGrid.lookup( 3,3 ) )
        cspecs.ElectricSource.reify().lockToGrid( this.debugGrid.lookup( 5,4 ) )
        cspecs.LaserGun.reify().lockToGrid( this.debugGrid.lookup( 4,3 ), dirconst.E )
    }
}