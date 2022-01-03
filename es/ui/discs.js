import * as vecs from '/es/vectors.js'
import * as drawscions from '/es/ui/drawscions.js'

export class Disc extends drawscions.DrawScion {
    constructor(parent) {
        super(parent)
        this.discCenter = vecs.Vec2(0, 0)
        this.discRadius = 5
    }

    get originShift() {
        return this.discCenter
    }

    draw() {
        this.drawBacking()
        this.drawContents()
        this.drawChildren()
    }
    drawBacking() {
        this.ctx.fillStyle = this.bgFillColour
        this.ctx.strokeStyle = this.borderColour
        this.ctx.beginPath()
        this.ctx.arc( ...this.absOrigin.xy, this.discRadius, 0, 2*Math.PI )
        this.ctx.fill()
        this.ctx.stroke()
        
    }
    drawContents() {
    }
    drawChildren() {
        for (let child of this.children) {
            child.draw()
        }
    }

    localWithin(local) {
        return local.mag <= this.discRadius
    }
}