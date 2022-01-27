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
        this.panelStart = vecs.Vec2(5, 90)
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
        this.parent.battle.advanceTick()
    }
}

export class LinearDisplayPanel extends panels.Panel {
    constructor(...args) {
        super(...args)
        this.panelStart = vecs.Vec2(10, 10)
        this.panelSize = vecs.Vec2(500, 50)
    }

    drawContents() {
        let orderedShips = [...this.ships].sort( (a, b) => (a.pos - b.pos) )
        let lPos = orderedShips[0].pos - 5
        let rPos = orderedShips[orderedShips.length-1].pos + 5

//        console.log("oShips is", orderedShips, "lPos", lPos, "rPos", rPos)

        for (let ship of orderedShips) {
            let relPos = (ship.pos - lPos) / (rPos - lPos)
            let relDraw = this.panelSize.x * relPos
            let absDraw = vecs.Vec2(this.absStart.x + relDraw, this.absStart.y+25)

            this.ctx.beginPath()
            this.ctx.arc( ...absDraw.xy, 5, 0, 2*Math.PI )
            this.ctx.stroke()
            this.ctx.beginPath()
            this.ctx.moveTo( ...absDraw.xy )
            this.ctx.lineTo( ...absDraw.add( ship.oFacingVec.sMul(20) ).xy )
            this.ctx.stroke()
        }
    }
    
    get ships() { return this.parent.battle.allShips() }
}

export class ShipPanel extends panels.Panel {
    constructor(shipIndex, ship, ...args) {
        super(...args)
        this.shipIndex = shipIndex
        this.panelStart = vecs.Vec2(5+ 240 * shipIndex, 200)
        this.panelSize = vecs.Vec2(235, 280)
        this.ship = ship
        this.gridPanel = new SBGridPanel(this.ship.grid, this)
    }
    
    get children() { return [this.gridPanel] }

    drawContents() {
        this.drawLocationData()
    }
    
    drawLocationData(xyDraw = this.absStart.xy) {
        this.ctx.font = "11px Courier"
        this.ctx.textAlign = "left"
        this.ctx.textBaseline = "top"
        this.ctx.fillStyle=this.borderColour
        
        let [xDraw, yDraw] = xyDraw

        this.ctx.fillText( `Ship ${this.shipIndex} : ${this.ship.debugName}`, xDraw, yDraw )
        yDraw += 12
        this.ctx.fillText( `oFacing: ${this.ship.oDeg.toFixed(2)} | coeff ${this.ship.oLinearCoeff.toFixed(2)}`, xDraw, yDraw )
        yDraw += 12
        this.ctx.fillText( `sFacingVec ${this.ship.sFacingVec}`, xDraw, yDraw )
        yDraw += 12
        this.ctx.fillText( `pos: ${this.ship.pos.toFixed(2)}, spd: ${this.ship.speed.toFixed(2)}`, xDraw, yDraw )
        yDraw += 12
        this.ctx.fillText( `spos: ${this.ship.sPos.toFixed(2)}, sofd: ${this.ship.sEnemyDist.toFixed(2)}`, xDraw, yDraw )
        yDraw += 12
        this.ctx.fillText( `linear ${this.ship.oLinearMotion.toFixed(2)} | angular ${this.ship.oAngularMotion.toFixed(2)}`, xDraw, yDraw )
        yDraw += 12
        
        return [xDraw, yDraw]
    }

// TODO: Move these out and into the grid class!    
    warpTileMouseMove(gridPanel, xyLocal) {
    }
    warpTileMouseDown(gridPanel, xyLocal) {
    }
    warpReflMouseMove(gridPanel, xyLocal) {
    }
    warpReflMouseDown(gridPanel, xyLocal) {
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
        this.lDisplayPanel = new LinearDisplayPanel(this)
        this.shipPanels = []
        for (let [index, ship] of this.battle.allShips().entries()) {
            console.log("ship, index, is", ship, index)
            this.shipPanels.push( new ShipPanel(index, ship, this) )
        }
    }
    get children() {
        return [...this.shipPanels, this.advanceTickButton, this.lDisplayPanel]
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