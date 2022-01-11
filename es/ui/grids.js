import * as errs from '/es/errs.js'
import * as hacks from '/es/hacks.js'
import * as vecs from '/es/vectors.js'
import * as panels from '/es/ui/panels.js'
import * as discs from '/es/ui/discs.js'
import * as dirconst from '/es/dirconst.js'

export class GridPanel extends panels.Panel {
    constructor(parent, grid) {
        super(parent)
        this.panelStart = vecs.Vec2(20, 20)
        this.panelSize = vecs.Vec2(600, 500)

        this._dirtyID = -1
        this._reflectionDict = new Map()

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

    isReflectionDirty() { return this._dirtyID != this.grid._dirtyID }

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
    localToViewport(xy) {
        return xy
    }
    localToGrid(xy) {
        return this.viewportToGrid(this.localToViewport(xy))
    }

    gridToViewport(xy) {
        return xy.sub(this.xyViewportAnchor)
    }
    viewportToLocal(xy) {
        return xy
    }
    gridToLocal(xy) {
        return this.viewportToLocal(this.gridToViewport(xy))
    }

    reflectTilePanels() {
//        console.log("this", this)
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

    warpReflMouseOver(refl) {
        this.parent.warpReflMouseOver(refl)
    }
    warpReflMouseDown(refl) {
        this.parent.warpReflMouseDown(refl)
    }
    
    addReflection(reflection) {
        if (this._reflectionDict.has(reflection.reflector)) {
            console.log("reflection is", reflection)
            console.log("old reflection is", this._reflectionDict.get(reflection.reflector))
            throw new errs.Panic("Tried to add duplicate reflection of item!")
        } else {
            this._reflectionDict.set(reflection.reflector, reflection)
        }
        return reflection
    }
    reflectionLookup(reflector) {
        if (this._reflectionDict.has(reflector)) {
            return this._reflectionDict.get(reflector)
        } else {
            return null
        }
    }
    clearReflection(reflection) {
        if (this._reflectionDict.has(reflection.reflector)) {
            this._reflectionDict.delete(reflection.reflector)
        }
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
        this.componentReflections= []
        this.connectorReflections = []
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
        /*
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
        */
        /*
        for (let conn of this.tile.connectors) {
            this.ctx.beginPath()
            this.ctx.arc( ...this.absFacingMidpoint(conn.facing).xy, 9, 0, 2*Math.PI )
            this.ctx.stroke()
        }*/
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
            throw new errs.Panic(`tried to get localFacingMidpoint of invalid vec ${vec}`)
        }
    }
    absFacingMidpoint(vec) {
        return this.absStart.add(this.localFacingMidpoint(vec))
    }

    warpMouseDown(mousePos) {
        console.log(`Tile ${this} mouse down!, tp`, this)
        if (super.warpMouseDown(mousePos)) {
            
        } else {
            this.parent.warpTileMouseDown(this.xyLocal)
        }
    }
    warpMouseMove(mousePos) {
        if (super.warpMouseMove(mousePos)) {
        }
        this.parent.warpTileMouseMove(this.xyLocal)
    }
    warpReflMouseOver(refl) {
        this.parent.warpReflMouseOver(refl)
    }
    warpReflMouseDown(refl) {
        this.parent.warpReflMouseDown(refl)
    }

    reflectTile(tile = hacks.argPanic()) {
        if (tile != null) {
            this.tile = tile
            this.componentReflections = this.tile.components.map( (comp) => this.parent.addReflection(new ComponentReflection(this, comp)) )
            this.connectorReflections = this.tile.connectors.map( (conn) => this.parent.addReflection(new ConnectorReflection(this, conn)) )
        }
    }
    updateReflections() {
        console.log("YAFFAR", this)
        this._clearReflections()
        this.reflectTile(this.tile)
    }
    _clearReflections() {
        console.log("Clearing refls of", this)
        for (let compRefl of this.componentReflections) {
            this.parent.clearReflection(compRefl)
        }
        for (let connRefl of this.connectorReflections) {
            this.parent.clearReflection(connRefl)
        }
        this.componentReflections = []
        this.connectorReflections = []
        console.log("CLEARED refls of", this)
    }

    get children() { return [...this.componentReflections, ...this.connectorReflections] }

    toString() {
        return `TPanel ${this.xyLocal} ${this.tile}`
    }
}

export class ComponentReflection extends discs.Disc {
    constructor(parent, comp) {
        super(parent)
        
        this.comp = comp
        this.discCenter = this.parent.localCenter
        this.discRadius = this.parent.panelSize.x * 0.4
    }

    get reflector() { return this.comp }
    get bgFillColour() {
        if (this.comp == null) {
            return "#BBB"
        } else {
            return "#DD0"
        }
    }

    warpMouseMove(mousePos) {
//        console.log(`Comp ${this} mouseover!, comp`, this)
//        this.parent.setMouseoverRefl(this)
        this.parent.warpReflMouseOver(this)
        return true
   }
    warpMouseDown(mousePos) {
        console.log(`Comp ${this} mouse down!, comp`, this)
        this.parent.warpReflMouseDown(this)
        return true
    }

    drawContents() {
        let rotFunc = (vec) => (vec)
        if (this.comp.facing != null && dirconst.CARDINALS.includes(this.comp.facing)) {
//            this.ctx.beginPath()
//            this.ctx.arc( ...this.absFacingMidpoint(this.comp.facing).xy, 5, 0, 2*Math.PI )
//            this.ctx.stroke()

            if (this.comp.facing == dirconst.N) {
                rotFunc = (vec) => vec
            } else if (this.comp.facing == dirconst.S) {
                rotFunc = (vec) => vec.reverse()
            } else if (this.comp.facing == dirconst.E) {
                rotFunc = (vec) => vec.rotCW()
            } else if (this.comp.facing == dirconst.W) {
                rotFunc = (vec) => vec.rotCCW()
            }
        }

        let drawPoints = this.comp.spec.debugDrawPoints
        if (drawPoints.length > 0) {
            let adjustedDrawPoints = [...drawPoints, drawPoints[0]].map( (vec) => rotFunc(vec).sMul(0.5).sMul(this.discRadius*2) )

            this.ctx.beginPath()
            this.ctx.moveTo( ...this.absOrigin.add( adjustedDrawPoints[0] ).xy )
            for (let xyInterior of adjustedDrawPoints) {
                this.ctx.lineTo( ...this.absOrigin.add( xyInterior ).xy )
            }
            this.ctx.stroke()
        }
    }

    toString() {
        return `refl{${this.comp}}`
    }
}

export class ConnectorReflection extends discs.Disc {
    constructor(parent, conn) {
        super(parent)
        
        this.conn = conn
        this.discCenter = this.parent.localFacingMidpoint(this.conn.facing).interp(0.2, this.parent.localCenter)
        this.discRadius = 4
    }

    get reflector() { return this.conn }
    get bgFillColour() {
        if (this.conn == null) {
            return "#BBB"
        } else {    
            return "#0D0"
        }
    }

    warpMouseMove(mousePos) {
        this.parent.warpReflMouseOver(this)
        console.log(`Conn ${this} mouseover!, conn`, this)
        return true
    }
    warpMouseDown(mousePos) {
        console.log(`Conn ${this} mouse down!, conn`, this)
        this.parent.warpReflMouseDown(this)
        return true
    }

    drawContents() {
        if (this.conn.isFused) {
//            console.log("DC", this)
//            console.log("dcon", this.fusedConn)
            let fusedConn = this.conn.fusedConn
            let fusedConnIcon = this.parent.parent.reflectionLookup(fusedConn)
            if (fusedConnIcon != null) {
                this.ctx.beginPath()
                this.ctx.moveTo(...this.absOrigin.xy)
                this.ctx.lineTo(...fusedConnIcon.absOrigin.xy)
                this.ctx.stroke()
            }
        }
    }

    toString() {
        return `refl{${this.conn}}`
    }
}