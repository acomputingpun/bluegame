import * as colours from '/es/ui/colours.js'
import * as drawscions from '/es/ui/drawscions.js'

export class Panel extends drawscions.DrawScion {
    constructor(parent) {
        super(parent)
        this.panelStart = null
        this.panelSize = null
    }

    get absStart() {
        return this.absOrigin
    }
    get originShift() {
        return this.panelStart
    }

    draw() {
        this.drawBacking()
        this.drawContents()
        this.drawChildren()
    }
    drawBacking() {
        this.ctx.fillStyle = this.bgFillColour
        this.ctx.strokeStyle = this.borderColour
        this.ctx.strokeRect(...this.absStart.xy, ...this.panelSize.xy)
        this.ctx.fillRect(...this.absStart.xy,  ...this.panelSize.xy)
    }
    drawContents() {
    }
    drawChildren() {
        for (let child of this.children) {
            child.draw()
        }
    }

    get localCenter() { return this.panelSize.sMul(0.5) }
    get panelCenter() { return this.panelStart.add(this.localCenter) }
    get absCenter() { return this.absStart.add(this.localCenter) }
    get absEnd() { return this.absStart.add(this.panelSize) }
    get borderColour() { return colours.BORDER }
    get bgFillColour() { return colours.PANEL_BACK }

    localWithin(local) {
        return 0 <= local.x && local.x < this.panelSize.x && 0 <= local.y && local.y < this.panelSize.y
    }
}

export class Button extends Panel {
    get text() { return "button" }

    warpMouseDown(local) {
        this.cursor.clickedDownOn = this
        return true
    }
    warpMouseUp(local) {
        if ( this.cursor.clickedDownOn == this) {
            this.onSelect()
        }
        return true
    }
    onSelect() {
        console.log("pressed", this)
    }

    drawContents() {
        this.ctx.font = "11px Courier"
        this.ctx.textAlign = "center"
        this.ctx.textBaseline = "middle"
        this.ctx.fillStyle=this.borderColour

        this.ctx.fillText(this.text, ...this.absCenter.xy)
    }

    get isDisabled() {
        return false
    }

    get bgFillColour() {
        if (this.isDisabled) {
            return colours.DISABLED_BUTTON_BACK
        } else if (this.cursor.clickedDownOn == this) {
            return colours.PRESSED_BUTTON_BACK
        } else {
            return colours.PANEL_BACK
        }
    }
    get borderColour() {
        if (this.isDisabled) {
            return colours.DISABLED_BORDER
        } else if (this.absWithin(this.cursor.mousePos)) {
            return colours.HIGHLIGHT_BORDER
        } else {
            return colours.BORDER
        }
    }
}

export class ReflectorPanel extends Panel {
    constructor(parent) {
        super(parent)
        this._invariant = null
    }
    draw() {
        this.updateInvariant()
        super.draw()
    }
    updateInvariant() {
        let lastInvariant = this._invariant
        this._invariant = this.getInvariant()
        if (lastInvariant !== this._invariant) {
            this.refresh()
        }
    }
    getInvariant() {
        throw new errs.ToBeOverridden()
    }
    refresh() {
        throw new errs.ToBeOverridden()
    }
}
