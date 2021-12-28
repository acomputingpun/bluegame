import * as grids from '/es/grids.js'

import * as components from '/es/comps/components.js'
import * as frames from '/es/frames.js'
import * as connectors from '/es/comps/connectors.js'

export class OccGridTile extends grids.GridTile {
}

export class OccGrid extends grids.Grid {
    constructor (tileClass) {
        super(tileClass)
        
        this.occupants = []
        this.frames = []
        this.components = []
        this.connectors = []
        this.activeComponents = []
    }

    addOccupant(occ) {
        console.log( `Adding occupant ${occ}`, occ )

        this.occupants.push(occ)
        if (occ.isComponent) {
            this.components.push(occ)
            if (occ.isActiveComponent) {
                this.activeComponents.push(occ)
            }
        } else if (occ.isFrame) {
            this.frames.push(occ)
        } else if (occ.isConnector) {
            this.connectors.push(occ)
        } else {
            throw (`PANIC: Can't add occupant ${occ} to BlueprintGrid ${this} - occupant can't be accurately categorised!`)
        }
        this.markDirty()
    }

    removeOccupant(occ) {
        utils.aRemove(this.occupants, occ)
        if (occ.isComponent) {
            utils.aRemove(this.components, occ)
            if (occ.isActive) {
                utils.aRemove(this.activeComponents, occ)
            }
        } else if (occ.isFrame) {
            utils.aRemove(this.frames, occ)
        } else if (occ.isConnector) {
            utils.aRemove(this.connectors, occ)
        } else {
            throw (`PANIC: Can't remove occupant ${occ} from BlueprintGrid ${this} - occupant can't be accurately categorised!`)
        }
        this.markDirty()
    }
}
