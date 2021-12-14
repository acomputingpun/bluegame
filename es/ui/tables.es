import * as colours from '/es/ui/colours.es';
import * as fonts from '/es/ui/fonts.es';
import * as vecs from '/es/vectors.es';
import * as panels from '/es/ui/panels.es';


export class TablePanel extends panels.Panel {
    constructor(parent) {
        super(parent);

        this.rowPanels = []
        this.setupRowPanels()
    }

    get children() {return [...this.rowPanels]}

    drawContents () {
        this.drawHeadings()
    }
    drawHeadings() {
    }
}
export class Row extends panels.Panel {
    get rowIndex() { return this.parent.rowPanels.indexOf(this) }
    get panelStart() { return vecs.Vec2(0, 50 * this.rowIndex)  }
    set panelStart(data) { }

    drawContents () {
        this.setTextSettings()
        this.drawColumnData()
    }

    drawInLine(text, xDraw) {
        this.ctx.fillText(text, this.absStart.x+xDraw, this.absCenter.y);
    }

    setTextSettings() {
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle=colours.BORDER;
        this.ctx.font=fonts.GENERAL_TEXT;
    }
}

