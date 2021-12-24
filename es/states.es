import * as dirconst from '/es/dirconst.es'

import * as blueprints from '/es/blueprints.es'
import * as frames from '/es/frames.es'
import * as frameweights from '/es/frameweights.es'

import * as components from '/es/components.es'
import * as cspecs from '/es/cspecs.es'

export class State {
    constructor() {
        this.debugGrid = new blueprints.BlueprintGrid()

        this.debugSetupGrid()
    }

    debugSetupGrid() {
        new frames.Frame( frameweights.Medium ).lockToGrid( this.debugGrid.lookup( 3,3 ) )
        new frames.Frame( frameweights.Medium ).lockToGrid( this.debugGrid.lookup( 5,3 ) )
        new frames.Frame( frameweights.Heavy ).lockToGrid( this.debugGrid.lookup( 4,5 ) )

        new components.Component( cspecs.ElectricSink ).lockToGrid( this.debugGrid.lookup( 3,3 ) )
        new components.Component( cspecs.ElectricSource ).lockToGrid( this.debugGrid.lookup( 5,4 ) )

        new components.Component( cspecs.LaserGun ).lockToGrid( this.debugGrid.lookup( 4,3 ), dirconst.E )

    }
}