import * as ships from '/es/ships.es'
import * as frames from '/es/frames.es'
import * as frameweights from '/es/frameweights.es'

import * as components from '/es/components.es'
import * as cspecs from '/es/cspecs.es'

export class State {
    constructor() {
        this.debugGrid = new ships.BlueprintGrid()

        this.debugSetupGrid()
    }

    debugSetupGrid() {
        new frames.Frame( frameweights.Medium ).placeAt ( this.debugGrid.lookup( 3,3 ) )
        new frames.Frame( frameweights.Medium ).placeAt ( this.debugGrid.lookup( 5,3 ) )
        new frames.Frame( frameweights.Heavy ).placeAt ( this.debugGrid.lookup( 4,5 ) )

        new components.Component( cspecs.ElectricSink ).placeAt( this.debugGrid.lookup( 3,3 ) )
        new components.Component( cspecs.ElectricSource ).placeAt( this.debugGrid.lookup( 5,4 ) )
    }
}