import * as vecs from '/es/vectors.js'
import * as panels from '/es/ui/panels.js'

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
    constructor(parent, ship) {
        super(parent)
        this.panelStart = vecs.Vec2(0, 0)
        this.panelSize = vecs.Vec2(800, 600)

        this.ship = ship
        this.directive = null

        this.messageLog = []

        this.advanceTickButton = new AdvanceTickButton(this)
        /*
        this.gridPanel = new GridPanel(this, grid)
        */
    }
    get children() {
        return [this.advanceTickButton]
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
}