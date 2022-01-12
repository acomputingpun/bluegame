import * as vecs from '/es/vectors.js'
import * as panels from '/es/ui/panels.js'

import * as ui_grids from './grids.js'

export class SBTilePanel extends ui_grids.TilePanel {
    constructor(...args) {
        super(...args)
        this.panelStart = this.xyLocal.sMul(25)
        this.panelSize = vecs.Vec2(25, 25)
    }
}

export class SBGridPanel extends ui_grids.GridPanel {
    get xySize () { return vecs.Vec2(9, 9) }
    get tilePanelClass() { return SBTilePanel }

    constructor(...args) {
        super(...args)
        this.panelStart = vecs.Vec2(5, 50)
        this.panelSize = vecs.Vec2(225, 225)
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

export class ShipPanel extends panels.Panel {
    constructor(pStart, ship, ...args) {
        super(...args)
        this.panelStart = pStart
        this.panelSize = vecs.Vec2(235, 280)
        this.ship = ship
        this.gridPanel = new SBGridPanel(this.ship.grid, this)
    }
    
    get children() { return [this.gridPanel] }

    drawContents() {
        this.drawLocationData()
    }
    
    drawLocationData() {
        
    }

// TODO: Move these out and into the grid class!    
    warpTileMouseMove(gridPanel, xyLocal) {
    }
    warpTileMouseDown(gridPanel, xyLocal) {
    }
}

export class BattlePanel extends panels.Panel {
    constructor(battle=hacks.argPanic(), parent=hacks.argPanic()) {
        super(parent)
        this.panelStart = vecs.Vec2(0, 0)
        this.panelSize = vecs.Vec2(800, 600)

        this.battle = battle

        this.messageLog = []

        this.advanceTickButton = new AdvanceTickButton(this)
        this.shipPanels = []
        for (let [index, ship] of this.battle.allShips().entries()) {
            console.log("ship, index, is", ship, index)
            this.shipPanels.push( new ShipPanel(vecs.Vec2(5+ 240 * index, 200), ship, this) )
        }
    }
    get children() {
        return [...this.shipPanels, this.advanceTickButton]
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
    }
}