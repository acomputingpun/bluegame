import * as vecs from '/es/vectors.es'
import * as panels from '/es/ui/panels.es'

import * as frameweights from '/es/frameweights.es'
import * as frames from '/es/frames.es'

export class GridPanel extends panels.Panel {
    constructor(parent, grid) {
        super(parent)
        this.panelStart = vecs.Vec2(20, 20)
        this.panelSize = vecs.Vec2(600, 500)

        this.grid = grid

        this.xySize = vecs.Vec2(9, 9)

        this.tilePanels = []
        this.tilePanelMatrix = []
        for (let y = 0; y < this.xySize.y; y++) {
            this.tilePanelMatrix.push([])
            for (let x = 0; x < this.xySize.x; x++) {
                let tilePanel = new TilePanel(this, vecs.Vec2(x, y))
                this.tilePanels.push(tilePanel)
                this.tilePanelMatrix[y].push(tilePanel)
            }            
        }

        this.xyViewportAnchor = vecs.Vec2(0, 0)
        this.reflectTilePanels()
    }

    localLookupPanel(xy) {
        let [x, y] = xy
        if (0 <= x && x < this.xySize.x && 0 <= y && y < this.xySize.x) {
            return this.tilePanelMatrix[y][x]
        } else {
            return null
        }
    }

    localToGrid(xy) {
        return this.xyViewportAnchor.add(xy)
    }

    reflectTilePanels() {
        console.log("this", this)
        for (let tilePanel of this.tilePanels) {
            let xyGrid = this.localToGrid(tilePanel.xyLocal)
            tilePanel.reflectTile( this.grid.lookup(...xyGrid.xy) )
        }
    }

    get children() {
        return this.tilePanels
    }

    warpTileMouseDown(xyLocal) {
        this.parent.warpTileMouseDown(this, xyLocal)
    }
}

let TILE_EMPTY_BG = "#EEE"

class TilePanel extends panels.Panel {
    constructor(parent, xyLocal) {
        super(parent)
        this.xyLocal = xyLocal
        this.panelStart = this.xyLocal.sMul(55)
        this.panelSize = vecs.Vec2(50, 50)

        this.tile = null
    }

    get bgFillColour() {
        if (this.tile == null) {
            return "#F11"
        } else {    
            if (this.tile.frame == null) {
                return TILE_EMPTY_BG
            } else {
                return this.tile.frame.weight.debugColour
            }
        }
    }

    drawContents() {
        for (let comp of this.tile.components) {

            let drawPoints = comp.specs.debugDrawPoints
            if (drawPoints.length > 0) {
                this.ctx.beginPath()
                this.ctx.moveTo( ...this.absStart.add( drawPoints[0].sMul(0.1).lMul(this.panelSize) ).xy )
                for (let xyInterior of comp.specs.debugDrawPoints) {
                    this.ctx.lineTo( ...this.absStart.add( xyInterior.sMul(0.1).lMul(this.panelSize) ).xy )
                }
                this.ctx.lineTo( ...this.absStart.add( drawPoints[0].sMul(0.1).lMul(this.panelSize) ).xy )
                this.ctx.stroke()
            }
        }
    }

    warpMouseDown(mousePos) {
        console.log(`Tile ${this} mouse down!`)
        this.parent.warpTileMouseDown(this.xyLocal)
    }

    reflectTile(tile) {
        this.tile = tile
    }

    toString() {
        return `TPanel ${this.xyLocal} ${this.tile}`
    }
}

export class MenuButton extends panels.Button {
    constructor(parent, panelStart, text, data) {
        super(parent)
        this.panelStart = panelStart
        this.panelSize = vecs.Vec2(90, 45 )
        this._text = text
        this._data = data
    }
    get text() { return this._text }    
    get data() { return this._data }
    onSelect() {
        this.parent.warpMenuSelect(this.data)
    }
}

export class FrameMenuPanel extends panels.Panel {
    constructor(parent, grid) {
        super(parent)
        this.panelStart = vecs.Vec2(700, 0)
        this.panelSize = vecs.Vec2(100, 600)

        this.noFrameButton = new MenuButton( this, vecs.Vec2(5, 5), "none", null )

        this.superlightFrameButton = new MenuButton( this, vecs.Vec2(5, 55), "superlight", frameweights.Superlight )
        this.lightFrameButton = new MenuButton( this, vecs.Vec2(5, 105), "light", frameweights.Light )
        this.mediumFrameButton = new MenuButton( this, vecs.Vec2(5, 155), "medium", frameweights.Medium )
        this.heavyFrameButton = new MenuButton( this, vecs.Vec2(5, 205), "heavy", frameweights.Heavy )
        this.superheavyFrameButton = new MenuButton( this, vecs.Vec2(5, 255), "superheavy", frameweights.Superheavy )
    }

    get children() {
        return [this.noFrameButton, this.superlightFrameButton, this.lightFrameButton, this.mediumFrameButton, this.heavyFrameButton, this.superheavyFrameButton]
    }

    warpMenuSelect(data) {
        this.parent.editingTool.debugFrame = data
    }
}

import * as debug_ships from '/es/ships.es'

export class EditingToolState {
    constructor(parent) {
        this.parent = parent

        this.debugFrame = 0
    }

    get gridPanel() { return this.parent.gridPanel }

    warpTileMouseDown(xyLocal) {
        let tilePanel = this.gridPanel.localLookupPanel( xyLocal.xy )
        if (tilePanel != null) {
            let tile = tilePanel.tile
            if (this.debugFrame == null) {
                if (tile.frame != null) {
                    tile.frame.remove()
                }
            } else {
                let frame = new frames.Frame(this.debugFrame)
                frame.placeAt(tile)
            }
        } else {
            throw "PANIC"
        }

    }
}

export class EditGridPanel extends panels.Panel {
    constructor(parent, grid) {
        super(parent)
        this.panelStart = vecs.Vec2(0, 0)
        this.panelSize = vecs.Vec2(800, 600)

        this.gridPanel = new GridPanel(this, grid)
        this.frameMenuPanel = new FrameMenuPanel(this)
        this.editingTool = new EditingToolState(this)

        this.debugHillValid = true
    }
    get children() {
        return [this.gridPanel, this.frameMenuPanel]
    }

    drawContents() {
        this.ctx.font = "11px Courier"
        this.ctx.textAlign = "left"
        this.ctx.textBaseline = "top"
        this.ctx.fillStyle=this.borderColour

        this.ctx.fillText( `hill validity: ${this.debugHillValid}`, ...this.absStart.xy )
    }

    warpTileMouseDown(gridPanel, xyLocal) {
        if (gridPanel == this.gridPanel) {
            this.editingTool.warpTileMouseDown(xyLocal)

            this.debugHillValid = this.gridPanel.grid.checkFrameweightDecreasing()
        } else {
            throw "PANIC"
        }
    }

}