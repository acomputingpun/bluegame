import * as dirconst from '/es/dirconst.js'

import * as blueprints from '/es/blueprints.js'
import * as ships from '/es/ships.js'
import * as battles from '/es/battles.js'

import * as framespecs from '/es/occupants/frames/specs.js'
import * as compspecs from '/es/occupants/comps/specs.js'

import * as comp_cables from '/es/occupants/comps/cables.js'
import * as comp_sources from '/es/occupants/comps/sources.js'


export class State {
    constructor() {
        this.debugGrid = new blueprints.BlueprintGrid()
        this.debugSetupGrid()
        this.debugSetupShip()
        this.debugSetupBattle()
    }

    debugSetupBattle() {
        this.debugShip2 = this.debugShipDesign.reify()
        this.debugBattle = battles.Battle.fromShips( [this.debugShip], [this.debugShip2] )
    }

    debugSetupShip() {
        this.debugShipDesign = new ships.ShipDesign(this.debugGrid)
        this.debugShip = this.debugShipDesign.reify()
        console.log("dbship", this.debugShip)
    }
    
    debugSetupGrid() {
//        framespecs.Medium.designify().lockToGrid( this.debugGrid.lookup( 3,3 ) )
//        framespecs.Medium.designify().lockToGrid( this.debugGrid.lookup( 5,3 ) )
//        framespecs.Heavy.designify().lockToGrid( this.debugGrid.lookup( 4,5 ) )

//        let fg1 = compspecs.ForwardGun.designify().lockToGrid( this.debugGrid.lookup( 4,1 ), dirconst.N )
//        let fg2 = compspecs.ForwardGun.designify().lockToGrid( this.debugGrid.lookup( 4,2 ), dirconst.E )

//        console.log("LG1 is:", fg1)
//        console.log("LG2 is:", fg2)

//        console.log("LG1 facing", fg1.facing, "LG1 conn facing", fg1.connectors[0].facing)
//        console.log("LG2 facing", fg2.facing, "LG2 conn facing", fg2.connectors[0].facing)


        let lg = compspecs.LaserGun.designify().lockToGrid( this.debugGrid.lookup( 4,3 ), dirconst.N )
        let cd = comp_cables.ElectricCableTurn.designify().lockToGrid( this.debugGrid.lookup( 4,4 ), dirconst.W )
//        let es = comp_sources.Battery.designify().lockToGrid( this.debugGrid.lookup( 3,4 ), dirconst.N )
        let gn = compspecs.Generator.designify().lockToGrid( this.debugGrid.lookup( 3,4 ), dirconst.N)
        let ft = comp_sources.FuelTank.designify().lockToGrid( this.debugGrid.lookup( 3,5 ), dirconst.N )

        lg.connectors[0].fuseTo(cd.facingConnectors(dirconst.N)[0])
        cd.facingConnectors(dirconst.W)[0].fuseTo(gn.facingConnectors(dirconst.E)[0])
        ft.facingConnectors(dirconst.N)[0].fuseTo(gn.facingConnectors(dirconst.S)[0])
    }
}