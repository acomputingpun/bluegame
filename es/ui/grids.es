import * as vecs from '/es/vectors.es'
import * as panels from '/es/ui/panels.es'

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
    }

    localLookupPanel(xy) {
        [x, y] = xy
        if (0 <= x && x < this.xySize.x && 0 <= y && y < this.xySize.x) {
            return this.tilePanels[y][x]
        } else {
            return null
        }
    }

    localToGrid(xy) {
        return this.xyViewportAnchor.add(xy)
    }

    get children() {
        return this.tilePanels
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
    }

    get bgFillColour() {
        return TILE_LIGHT_STRUCTURE_BG
    }
}

export class MenuButton extends panels.Button {
    constructor(parent, panelStart, text) {
        super(parent)
        this.panelStart = panelStart
        this.panelSize = vecs.Vec2(90, 45 )
        this._text = text
    }
    get text() { return this._text }    
    onSelect() {

    }
}

export class FrameMenuPanel extends panels.Panel {
    constructor(parent, grid) {
        super(parent)
        this.panelStart = vecs.Vec2(700, 0)
        this.panelSize = vecs.Vec2(100, 600)

        this.noFrameButton = new MenuButton( this, vecs.Vec2(5, 5), "none" )
        this.superlightFrameButton = new MenuButton( this, vecs.Vec2(5, 55), "superlight" )
        this.lightFrameButton = new MenuButton( this, vecs.Vec2(5, 105), "light" )
        this.mediumFrameButton = new MenuButton( this, vecs.Vec2(5, 155), "medium" )
        this.heavyFrameButton = new MenuButton( this, vecs.Vec2(5, 205), "heavy" )
    }

    get children() {
        return [this.noFrameButton, this.superlightFrameButton, this.lightFrameButton, this.mediumFrameButton, this.heavyFrameButton]
    }

}

export class EditGridPanel extends panels.Panel {
    constructor(parent, grid) {
        super(parent)
        this.panelStart = vecs.Vec2(0, 0)
        this.panelSize = vecs.Vec2(800, 600)

        this.gridPanel = new GridPanel(this)
        this.frameMenuPanel = new FrameMenuPanel(this)
    }
    get children() {
        return [this.gridPanel, this.frameMenuPanel]
    }
}