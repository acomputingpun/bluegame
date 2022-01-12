import * as vecs from '/es/vectors.js'
import * as panels from '/es/ui/panels.js'

import * as ui_grids from './grids.js'

export class SBTilePanel extends ui_grids.TilePanel {
    constructor(...args) {
        super(...args)
        this.panelStart = this.xyLocal.sMul(35)
        this.panelSize = vecs.Vec2(30, 30)
    }
}

export class SBGridPanel extends ui_grids.GridPanel {
    get xySize () { return vecs.Vec2(9, 9) }
    get tilePanelClass() { return SBTilePanel }

    constructor(...args) {
        super(...args)
        this.panelStart = vecs.Vec2(400, 200)
        this.panelSize = vecs.Vec2(320, 320)
    }
}

export class AdvanceTickButton extends panels.Button {
    get text() { return "advance" }
    constructor(parent) {
        super(parent)
        this.panelStart = vecs.Vec2(10, 550)
        this.panelSize = vecs.Vec2(50, 20)
    }
    onSelect() {
        this.parent.ship.advanceTick(this.parent.directive)
    }
}

export class ShipBattlePanel extends panels.Panel {
    constructor(ship, parent) {
        super(parent)
        this.panelStart = vecs.Vec2(0, 0)
        this.panelSize = vecs.Vec2(800, 600)

        this.ship = ship
        this.directive = null

        this.messageLog = []

        this.advanceTickButton = new AdvanceTickButton(this)
        this.gridPanel = new SBGridPanel(this, this.ship.grid)
    }
    get children() {
        return [this.gridPanel, this.advanceTickButton]
    }
    
    drawShipOccupants() {
        this.ctx.font = "11px Courier"
        this.ctx.textAlign = "left"
        this.ctx.textBaseline = "top"
        this.ctx.fillStyle=this.borderColour

        let [xDraw, yDraw] = this.absStart.xy
        xDraw += 150

        for (let occ of this.ship.grid.occupants) {
            this.ctx.fillText( `${occ}`, xDraw, yDraw )
            yDraw += 12
        }
    }

    drawMessageLog() {
        this.ctx.font = "11px Courier"
        this.ctx.textAlign = "left"
        this.ctx.textBaseline = "top"
        this.ctx.fillStyle=this.borderColour

        let [xDraw, yDraw] = this.absStart.xy

        for (let message of this.messageLog) {
            this.ctx.fillText( message, xDraw, yDraw )
            yDraw += 12
        }
    }


    drawContents() {
        this.drawMessageLog()
        this.drawShipOccupants()
    }

// TODO: Move these out and into the grid class!    
    warpTileMouseMove(gridPanel, xyLocal) {
        if (gridPanel == this.gridPanel) {
        } else {
            throw new errs.Panic()
        }
    }
    warpTileMouseDown(gridPanel, xyLocal) {
        if (gridPanel == this.gridPanel) {
            console.log("xyl is", xyLocal, "tilePanel", this.gridPanel.localLookupPanel(xyLocal.xy) )
        } else {
            throw new errs.Panic()
        }
    }
}