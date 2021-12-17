import * as vecs from '/es/vectors.es'
import * as panels from '/es/ui/panels.es'

import * as frameweights from '/es/frameweights.es'


export class GridPanel extends panels.Panel {
    constructor(parent, grid) {
        super(parent)
        this.panelStart = vecs.Vec2(0, 0)
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
            tilePanel.reflectTile( this.grid.lookup(xyGrid.xy) )
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
let TILE_LIGHT_STRUCTURE_BG = "#AAA"
let TILE_MEDIUM_STRUCTURE_BG = "#A8A"
let TILE_HEAVY_STRUCTURE_BG = "#959"
let TILE_SUPERHEAVY_STRUCTURE_BG = "#828"

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
            } else if (this.tile.frame.weight == 0) {
                return TILE_LIGHT_STRUCTURE_BG
            } else {
                return TILE_MEDIUM_STRUCTURE_BG                
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

        this.noFrameButton = new MenuButton( this, vecs.Vec2(5, 5), "none", 0 )
        this.superlightFrameButton = new MenuButton( this, vecs.Vec2(5, 55), "superlight", 1 )
        this.lightFrameButton = new MenuButton( this, vecs.Vec2(5, 105), "light", 2 )
        this.mediumFrameButton = new MenuButton( this, vecs.Vec2(5, 155), "medium", 3 )
        this.heavyFrameButton = new MenuButton( this, vecs.Vec2(5, 205), "heavy", 4 )
    }

    get children() {
        return [this.noFrameButton, this.superlightFrameButton, this.lightFrameButton, this.mediumFrameButton, this.heavyFrameButton]
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
            if (this.debugFrame == 0) {
                let frame = new debug_ships.Frame(frameweights.Superlight)
                frame.placeAt(tile)
            } else if (this.debugFrame == 1) {
                let frame = new debug_ships.Frame(frameweights.Light)
                frame.placeAt(tile)
            } else if (this.debugFrame == 2) {
                let frame = new debug_ships.Frame(frameweights.Medium)
                frame.placeAt(tile)
            } else if (this.debugFrame == 3) {
                let frame = new debug_ships.Frame(frameweights.Heavy)
                frame.placeAt(tile)
            } else if (this.debugFrame == 4) {
                let frame = new debug_ships.Frame(frameweights.Superheavy)
                frame.placeAt(tile)
            } else {
                throw "PANIC"
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
    }
    get children() {
        return [this.gridPanel, this.frameMenuPanel]
    }

    warpTileMouseDown(gridPanel, xyLocal) {
        if (gridPanel == this.gridPanel) {
            this.editingTool.warpTileMouseDown(xyLocal)
        } else {
            throw "PANIC"
        }
    }

}