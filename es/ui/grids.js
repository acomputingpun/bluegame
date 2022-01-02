import * as vecs from '/es/vectors.js'
import * as panels from '/es/ui/panels.js'
import * as dirconst from '/es/dirconst.js'

import * as framespecs from '/es/occupants/frames/specs.js'
import * as compspecs from '/es/occupants/comps/specs.js'

export class GridPanel extends panels.Panel {
    constructor(parent, grid) {
        super(parent)
        this.panelStart = vecs.Vec2(20, 20)
        this.panelSize = vecs.Vec2(600, 500)

        this.grid = grid

        this.tilePanels = []
        this.tilePanelMatrix = []
        for (let y = 0; y < this.xySize.y; y++) {
            this.tilePanelMatrix.push([])
            for (let x = 0; x < this.xySize.x; x++) {
                let tilePanel = new this.tilePanelClass(this, vecs.Vec2(x, y))
                this.tilePanels.push(tilePanel)
                this.tilePanelMatrix[y].push(tilePanel)
            }            
        }

        this.viewportOrient = dirconst.N
        this.xyViewportAnchor = vecs.Vec2(0, 0)
        this.reflectTilePanels()
    }

    get tilePanelClass() { return TilePanel }
    get xySize() { return vecs.Vec2(9, 9) }

    shiftViewport(vec) {
        this.xyViewportAnchor = this.xyViewportAnchor.add(vec)
    }

    rotateViewport() {
        this.viewportOrient = dirconst.ROT_CW.get(this.viewportOrient)
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

    viewportToGrid(xy) {
        if (this.viewportOrient == dirconst.N) {
            return this.xyViewportAnchor.add(xy)
        } else if (this.viewportOrient == dirconst.S) {
            return this.xyViewportAnchor.add(xy.reverse())
        } else if (this.viewportOrient == dirconst.E) {
            return this.xyViewportAnchor.add(xy.rotCW())
        } else if (this.viewportOrient == dirconst.W) {
            return this.xyViewportAnchor.add(xy.rotCCW())
        }
    }

    localToGrid(xy) {
        return this.viewportToGrid(xy)
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
    warpTileMouseMove(xyLocal) {
        this.parent.warpTileMouseMove(this, xyLocal)
    }
}

let TILE_EMPTY_BG = "#EEE"

export class TilePanel extends panels.Panel {
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
                return this.tile.frame.spec.debugColour
            }
        }
    }

    drawContents() {
        for (let comp of this.tile.components) {
            let rotFunc = (vec) => (vec)
            if (comp.facing != null && dirconst.CARDINALS.includes(comp.facing)) {
                this.ctx.beginPath()
                this.ctx.arc( ...this.absFacingMidpoint(comp.facing).xy, 5, 0, 2*Math.PI )
                this.ctx.stroke()

                if (comp.facing == dirconst.N) {
                    rotFunc = (vec) => vec
                } else if (comp.facing == dirconst.S) {
                    rotFunc = (vec) => vec.reverse()
                } else if (comp.facing == dirconst.E) {
                    rotFunc = (vec) => vec.rotCCW()
                } else if (comp.facing == dirconst.W) {
                    rotFunc = (vec) => vec.rotCW()
                }
            }

            let drawPoints = comp.spec.debugDrawPoints
            if (drawPoints.length > 0) {
                let adjustedDrawPoints = [...drawPoints, drawPoints[0]].map( (vec) => rotFunc(vec).sMul(0.5).lMul(this.panelSize) )

                this.ctx.beginPath()
                this.ctx.moveTo( ...this.absCenter.add( adjustedDrawPoints[0] ).xy )
                for (let xyInterior of adjustedDrawPoints) {
                    this.ctx.lineTo( ...this.absCenter.add( xyInterior ).xy )
                }
                this.ctx.stroke()
            }
        } 
        for (let conn of this.tile.connectors) {
            this.ctx.beginPath()
            this.ctx.arc( ...this.absFacingMidpoint(conn.facing).xy, 9, 0, 2*Math.PI )
            this.ctx.stroke()
        }
    }

    localFacingMidpoint(vec) {
        if (vec.eq(dirconst.N)) {
            return vecs.Vec2(this.localCenter.x, 0)
        } else if (vec.eq(dirconst.S)) {
            return vecs.Vec2(this.localCenter.x, this.panelSize.y)
        } else if (vec.eq(dirconst.W)) {
            return vecs.Vec2(0, this.localCenter.y)
        } else if (vec.eq(dirconst.E)) {
            return vecs.Vec2(this.panelSize.x, this.localCenter.y)
        } else if (vec.eq(dirconst.IN_PLACE)) {
            return this.panelCenter
        } else {
            throw `PANIC - tried to get localFacingMidpoint of invalid vec ${vec}`
        }
    }
    absFacingMidpoint(vec) {
        return this.absStart.add(this.localFacingMidpoint(vec))
    }

    warpMouseDown(mousePos) {
        console.log(`Tile ${this} mouse down!`)
        this.parent.warpTileMouseDown(this.xyLocal)
    }
    warpMouseMove(mousePos) {
        this.parent.warpTileMouseMove(this.xyLocal)
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

        this.swapButton = new MenuButton( this, vecs.Vec2(5, 5), "swap", "swap" )
        this.noFrameButton = new MenuButton( this, vecs.Vec2(5, 55), "none", null )

        this.superlightFrameButton = new MenuButton( this, vecs.Vec2(5, 105), "superlight", framespecs.Superlight )
        this.lightFrameButton = new MenuButton( this, vecs.Vec2(5, 155), "light", framespecs.Light )
        this.mediumFrameButton = new MenuButton( this, vecs.Vec2(5, 205), "medium", framespecs.Medium )
        this.heavyFrameButton = new MenuButton( this, vecs.Vec2(5, 255), "heavy", framespecs.Heavy )
        this.superheavyFrameButton = new MenuButton( this, vecs.Vec2(5, 305), "superheavy", framespecs.Superheavy )
    }

    get children() {
        return [this.swapButton, this.noFrameButton, this.superlightFrameButton, this.lightFrameButton, this.mediumFrameButton, this.heavyFrameButton, this.superheavyFrameButton]
    }

    warpMenuSelect(data) {
        if (data == null) {
            this.parent.editingTool = this.parent.removeFrameTool
        } else if (data == "swap") {
            this.parent.swapToComponentTools()
        } else {
            this.parent.editingTool = this.parent.placeFrameTool
            this.parent.editingTool.createHoveringFrame(data)
        }

    }
}

export class ComponentMenuPanel extends panels.Panel {
    constructor(parent, grid) {
        super(parent)
        this.panelStart = vecs.Vec2(700, 0)
        this.panelSize = vecs.Vec2(100, 600)

        this.swapButton = new MenuButton( this, vecs.Vec2(5, 5), "swap", "swap" )
        this.noComponentButton = new MenuButton( this, vecs.Vec2(5, 55), "none", null )

        this.laserGunButton = new MenuButton( this, vecs.Vec2(5, 105), "lgun", compspecs.LaserGun )
        this.electricSourceButton = new MenuButton( this, vecs.Vec2(5, 155), "esource", compspecs.ElectricSource )

        this.cwRotButton = new MenuButton( this, vecs.Vec2(5, 205), "rotCW", "rotCW" )
        this.ccwRotButton = new MenuButton( this, vecs.Vec2(5, 255), "rotCCW", "rotCCW" )
    }

    get children() {
        return [this.swapButton, this.noComponentButton, this.laserGunButton, this.electricSourceButton, this.cwRotButton, this.ccwRotButton]
    }

    warpMenuSelect(data) {
        if (data == null) {
            this.parent.editingTool = this.parent.removeComponentTool
        } else if (data == "swap") {
            this.parent.swapToFrameTools()
        } else if (data == "rotCW") {
            if (this.parent.editingTool == this.parent.placeComponentTool) {
                this.parent.editingTool.rotateHoveringComponent(true)
            }
        } else if (data == "rotCCW") {
            if (this.parent.editingTool == this.parent.placeComponentTool) {
                this.parent.editingTool.rotateHoveringComponent(false)
            }
        } else {
            this.parent.editingTool = this.parent.placeComponentTool
            this.parent.editingTool.createHoveringComponent(data)
        }

    }
}

export class Tool {
    constructor(parent) {
        this.parent = parent
    }    
    get gridPanel() { return this.parent.gridPanel }
}


export class RemoveComponentTool extends Tool {
    warpTileMouseMove(xyLocal) {
    }
    warpTileMouseDown(xyLocal) {
        let tilePanel = this.gridPanel.localLookupPanel( xyLocal.xy )
        if (tilePanel != null) {
            if (tilePanel.tile.components.length > 0) {
                tilePanel.tile.components[0].unlock()
            }
        } else {
            throw "PANIC"
        }
    }
}

export class PlaceComponentTool extends Tool {
    constructor(parent) {
        super(parent)
        this.hoveringComp = null
    }

    rotateHoveringComponent(cw = true) {
        this.hoveringComp.rotFacing(cw)
    }

    createHoveringComponent(spec) {
        this.hoveringComp = spec.designify()
    }
    setHoverTilePanel(tilePanel) {
        if (this.hoveringComp != null) {
            this.hoverTilePanel = tilePanel
            if (this.hoverTilePanel.tile != this.hoveringComp.anchorTile) {
                this.hoveringComp.setAnchorTile(this.hoverTilePanel.tile)
            }
        }
    }

    warpTileMouseMove(xyLocal) {
        let tilePanel = this.gridPanel.localLookupPanel( xyLocal.xy )
        if (tilePanel != null) {
            if (this.hoveringComp != null) {
                this.setHoverTilePanel(tilePanel)
            }
        } else {
            throw "PANIC"
        }
    }
    warpTileMouseDown(xyLocal) {
        let tilePanel = this.gridPanel.localLookupPanel( xyLocal.xy )
        if (tilePanel != null) {
            if (this.hoveringComp != null) {
                if (this.hoveringComp.canLock()) {
                    this.hoveringComp.lockToGrid(tilePanel.tile)
                    this.createHoveringComponent(this.hoveringComp.spec)
                } else {
                    console.log("Can't place!")
                }
            }
        } else {
            throw "PANIC"
        }
    }


}

export class RemoveFrameTool extends Tool {
    warpTileMouseMove(xyLocal) {
    }
    warpTileMouseDown(xyLocal) {
        let tilePanel = this.gridPanel.localLookupPanel( xyLocal.xy )
        if (tilePanel != null) {
            if (tilePanel.tile.frame != null) {
                tilePanel.tile.frame.unlock()   
            }
        } else {
            throw "PANIC"
        }
    }
}

export class PlaceFrameTool extends Tool {
    constructor(parent) {
        super(parent)

        this.hoverTilePanel = null
        this.hoveringFrame = null
    }

    warpTileMouseDown(xyLocal) {
        let tilePanel = this.gridPanel.localLookupPanel( xyLocal.xy )
        if (tilePanel != null) {
            if (this.hoveringFrame != null) {
                if (this.hoveringFrame.canLock()) {
                    this.hoveringFrame.lockToGrid(tilePanel.tile)
                    this.createHoveringFrame(this.hoveringFrame.spec)
                } else {
                    console.log("Can't place!")
                }
            }
        } else {
            throw "PANIC"
        }
    }

    createHoveringFrame(framespec) {
        this.hoveringFrame = framespec.designify()
    }
    
    setHoverTilePanel(tilePanel) {
        if (this.hoveringFrame != null) {
            this.hoverTilePanel = tilePanel
            if (this.hoverTilePanel.tile != this.hoveringFrame.anchorTile) {
                this.hoveringFrame.setAnchorTile(this.hoverTilePanel.tile)
            }
        }
    }

    warpTileMouseMove(xyLocal) {
        let tilePanel = this.gridPanel.localLookupPanel( xyLocal.xy )
        if (tilePanel != null) {
            if (this.hoveringFrame != null) {
                this.setHoverTilePanel(tilePanel)
            }
        } else {
            throw "PANIC"
        }
    }

    drawContents() {
        if (this.hoveringFrame != null && this.hoveringFrame.tile != null) {
            let tilePanel = hoveringFrame.tilePanel
        }
    }
}

export class RotateViewportButton extends panels.Button {
    get text() { return "rotate" }
    constructor(parent) {
        super(parent)
        this.panelStart = vecs.Vec2(10, 550)
        this.panelSize = vecs.Vec2(50, 20)
    }
    onSelect() {
        this.parent.gridPanel.rotateViewport()
    }
}

export class EditGridPanel extends panels.Panel {
    constructor(parent, grid) {
        super(parent)
        this.panelStart = vecs.Vec2(0, 0)
        this.panelSize = vecs.Vec2(800, 600)

        this.gridPanel = new GridPanel(this, grid)

        this.frameMenuPanel = new FrameMenuPanel(this)
        this.removeFrameTool = new RemoveFrameTool(this)
        this.placeFrameTool = new PlaceFrameTool(this)

        this.componentMenuPanel = new ComponentMenuPanel(this)
        this.removeComponentTool = new RemoveComponentTool(this)
        this.placeComponentTool = new PlaceComponentTool(this)

        this.editingSideMenu = this.frameMenuPanel
        this.editingTool = this.removeFrameTool

        this.rotateViewportButton = new RotateViewportButton(this)

        this.debugHillValid = true
    }
    get children() {
        return [this.gridPanel, this.editingSideMenu, this.rotateViewportButton]
    }

    swapToComponentTools() {
        this.editingTool = this.removeComponentTool
        this.editingSideMenu = this.componentMenuPanel
    }
    swapToFrameTools() {
        this.editingTool = this.removeFrameTool
        this.editingSideMenu = this.frameMenuPanel
    }

    drawWarnings() {
        this.ctx.font = "11px Courier"
        this.ctx.textAlign = "left"
        this.ctx.textBaseline = "top"
        this.ctx.fillStyle=this.borderColour

        let [xDraw, yDraw] = this.absStart.xy

        for (let warning of this.gridPanel.grid.getWarnings()) {
            this.ctx.fillText( warning.text, xDraw, yDraw )
            yDraw += 12
        }
    }

    drawContents() {
        this.drawWarnings()
    }

    warpTileMouseMove(gridPanel, xyLocal) {
        if (gridPanel == this.gridPanel) {
            this.editingTool.warpTileMouseMove(xyLocal)
        } else {
            throw "PANIC"
        }
    }

    warpTileMouseDown(gridPanel, xyLocal) {
        if (gridPanel == this.gridPanel) {
            this.editingTool.warpTileMouseDown(xyLocal)
        } else {
            throw "PANIC"
        }
    }

}