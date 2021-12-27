import * as dirconst from '/es/dirconst.es'

import * as blueprints from '/es/blueprints.es'
import * as ships from '/es/ships.es'
import * as frames from '/es/frames.es'
import * as frameweights from '/es/frameweights.es'

import * as components from '/es/comps/components.es'
import * as cspecs from '/es/comps/cspecs.es'

export class State {
    constructor() {
        this.debugGrid = new blueprints.BlueprintGrid()

        this.debugSetupGrid()

        this.debugShipDesign = new ships.ShipDesign(this.debugGrid)
        this.debugShip = this.debugShipDesign.reify()
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