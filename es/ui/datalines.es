import * as colours from '/es/ui/colours.es';
import * as vecs from '/es/vectors.es';
import * as panels from '/es/ui/panels.es';

export class AbstractLine extends panels.Panel {
    drawContents() {
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle=colours.BORDER;
        this.ctx.font=fonts.GENERAL_TEXT;
    }
    drawInLine(text, xDraw) {
        this.ctx.fillText(text, this.absStart.x+xDraw, this.absCenter.y);
    }

    drawAboveLine(text, xDraw) {
        this.ctx.fillText(text, this.absStart.x+xDraw, this.absCenter.y - this.panelSize.y);
    }
}

export class AbstractShiftButton extends panels.Button {
    constructor(parent, shift) {
        super(parent);
        this.shift = shift;
    }
    get text() {
        if (this.shift >= 0) {
            return `+${this.shift}`
        } else {
            return `${this.shift}`
        }
    }
}

export class ShiftButton extends AbstractShiftButton {
    constructor(parent, res, shift, xDraw, yDraw) {
        super(parent, shift);
        this.res = res;
        this.panelStart = vecs.Vec2(xDraw, 0);
        this.panelSize = vecs.Vec2(20, 20);
    }
    onSelect() {
        this.renderer.panel.controller.commitAction( this.res.shiftAction(this.shift) );
    }
    get isDisabled() {
        return !this.res.canShiftBy(this.shift) ;
    }
}

export class ControlLine extends AbstractLine {
    constructor(parent, res, xStart, yStart) {
        super(parent);
        this.res = res;

        this.panelStart = vecs.Vec2(xStart, yStart);
        this.panelSize = vecs.Vec2(440, 20);

        this.inc5Button = new ShiftButton(this, this.res, 5, 265, 0);
        this.incButton = new ShiftButton(this, this.res, 1, 290, 0);
        this.decButton = new ShiftButton(this, this.res, -1, 315, 0);
        this.dec5Button = new ShiftButton(this, this.res, -5, 340, 0);
    }
    drawContents() {
        super.drawContents();
        this.drawInLine(this.res.name, 10);
        this.drawInLine(this.value, 235);
    }
    get value() { return this.res.hrValue }
    get children() { return [this.incButton, this.inc5Button, this.decButton, this.dec5Button] }
}

export class GeneralDataLine extends panels.Panel {
    constructor(parent, xDraw, yDraw) { 
        super(parent);
        this.panelStart = vecs.Vec2(xDraw, yDraw);
        this.panelSize = vecs.Vec2(300, 20);
    }

    drawContents() {
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle=colours.BORDER;

        let xDraw = this.absStart.x;
        let yDraw = this.absCenter.y;

        this.ctx.fillText(this.label, xDraw+5, yDraw );

        this.ctx.textAlign = "right";
        this.ctx.fillText(this.col1, xDraw+120, yDraw );
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.seperator, xDraw+130, yDraw );
        this.ctx.textAlign = "left";
        this.ctx.fillText(this.col2, xDraw+140, yDraw );

        this.ctx.fillText(this.afterNote, xDraw+180, yDraw );
    }

    get label() { return "" }
    get col1() { return "" }
    get seperator() { return "" }
    get col2() { return "" }
    get afterNote() { return "" }
}
