import * as genconst from '/es/genconst.js'

import * as vecs from '/es/vectors.js'
import * as panels from '/es/ui/panels.js'
import * as colours from '/es/ui/colours.js'

import * as ui_debug from '/es/ui/debug.js'
import * as ui_editors from '/es/ui/editors.js'
import * as ui_sbattles from '/es/ui/sbattles.js'

class Cursor {
    constructor() {
        this.clickedDownOn = null
        this.mousePos = vecs.Vec2(0, 0)
    }

    setPos(mousePos) {
        this.mousePos = mousePos
    }
}

export class Renderer {
    constructor(runner) {
        this.canvas = document.createElement("canvas")
        this.ctx = this.canvas.getContext("2d");  // If this semicolon is removed, the next line doesn't get executed properly.  Why?  Who knows, it's Javascript!

        [this.canvas.width, this.canvas.height] = genconst.mainCanvasSize
        document.body.appendChild(this.canvas)

        this.panel = null
        this.cursor = new Cursor()

        this.setupListeners()

        this.runner = runner
    }

    setupListeners() {
        this.canvas.addEventListener("mousemove", this.warpMouseMove.bind(this), false)
        this.canvas.addEventListener("mousedown", this.warpMouseDown.bind(this), false)
        this.canvas.addEventListener("mouseup", this.warpMouseUp.bind(this), false)
        this.canvas.addEventListener("mouseout", this.warpMouseOut.bind(this), false)
    }

    startDrawLoop() {
        this.panel = new TopLevelPanel(this)

        this.offPanels = []

        this.firstDrawMS = Date.now()
        this.requestAnimationFrame = window.requestAnimationFrame.bind(window)
        this.requestAnimationFrame( this.drawLoop.bind(this) )
    }

    drawLoop() {
        this.drawMS = Date.now()
        this.draw()
        this.requestAnimationFrame( this.drawLoop.bind(this) )
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.panel.draw(this)
        this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height)
    }

    drawDebug() {
        this.ctx.font = fonts.SMALL_TEXT
        this.ctx.textAlign = "left"
        this.ctx.textBaseline = "top"
        this.ctx.fillStyle=colours.BORDER
        this.ctx.fillText("TrueMS " + (this.drawMS - this.firstDrawMS), 2, 2)
    }

//

    warpMouseMove(event) {
        let canvasOffset = this.canvas.getBoundingClientRect()
        let mousePos = vecs.Vec2(event.clientX - canvasOffset.left, event.clientY - canvasOffset.top)
        this.panel.warpMouseMove(mousePos)
        this.cursor.setPos(mousePos)
    }
    warpMouseDown(event) {
        let canvasOffset = this.canvas.getBoundingClientRect()
        let mousePos = vecs.Vec2(event.clientX - canvasOffset.left, event.clientY - canvasOffset.top)
        this.cursor.setPos(mousePos)
        this.panel.warpMouseDown(mousePos)
    }
    warpMouseUp(event) {
        let canvasOffset = this.canvas.getBoundingClientRect()
        let mousePos = vecs.Vec2(event.clientX - canvasOffset.left, event.clientY - canvasOffset.top)
        this.cursor.setPos(mousePos)
        this.panel.warpMouseUp(mousePos)
        this.cursor.clickedDownOn = null
    }   
    warpMouseOut(event) {
        this.cursor.clickedDownOn = null
        this.cursor.setPos( vecs.Vec2(-100, -100) )
    }

    swapPanels() {
        this.offPanels.push(this.panel)
        this.panel = this.offPanels[0]
        this.offPanels = this.offPanels.slice(1)
    }

// Drawing convenience functions
    wrapText(text, xDraw, yDraw, xWidth, yLineHeight) {
        let words = text.split(' ')
        let line = ''

        let yShift = 0

        for (let word of words) {
            let metric = this.ctx.measureText(line + word + ' ')
            if (metric.width > xWidth) {
                this.ctx.fillText(line, xDraw, yDraw+yShift)
                yShift += yLineHeight
                line = word + ' '
            } else {
                line = line + word + ' '
            }
        }
        this.ctx.fillText(line, xDraw, yDraw+yShift)
        yShift += yLineHeight
        return yShift
    }
}


class TopLevelPanel extends panels.Panel {
    constructor(renderer) {
        super()
        this.panelStart = vecs.Vec2(0, 0)
        this.panelSize = vecs.Vec2(800, 600)

        this._renderer = renderer

//        console.log("this", this)
//        console.log("tgrid,", renderer.runner.state.debugGrid)
//        this.mainPanel = new ui_editors.EditGridPanel(this, this._renderer.runner.state.debugGrid)
        this.mainPanel = new ui_sbattles.ShipBattlePanel(this, this._renderer.runner.state.debugShip)
    }

    draw() {
        super.draw()
        this.ctx.textBaseline = "top"
        this.ctx.fillStyle=colours.BORDER
        if (this.state == null) {
            this.ctx.fillText("toplevel: no state?", 700, 2)
        } else {
            this.ctx.fillText("toplevel: state",  aName, 700, 2)
        }
    }

    get absOrigin() { return vecs.Vec2(0, 0) }
    get children() {
        return [this.mainPanel]
//        return [this.mainPanel, this.debugMenuPanel]
    }
    get renderer() { return this._renderer }
    get state() { return this.renderer.state }
}

class ClearPanel extends panels.Panel {
    constructor() {
        super()
        this.panelStart = vecs.Vec2(0, 0)
        this.panelSize = vecs.Vec2(800, 600)
    }
    draw() {
    }
}