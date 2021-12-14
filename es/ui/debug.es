import * as colours from '/es/ui/colours.es';
import * as vecs from '/es/vectors.es';
import * as panels from '/es/ui/panels.es';

export class DebugMenuPanel extends panels.Panel {
    constructor(parent) {
        super(parent)
        this.panelStart = vecs.Vec2(1180, 640)
        this.panelSize = vecs.Vec2(100, 160)

        this.swapPanelsButton = new SwapPanelsButton(this)
        this.killTimeButton = new KillTimeButton(this)
    }

    get children() {
        return [this.swapPanelsButton, this.killTimeButton]
    }
}

class SwapPanelsButton extends panels.Button {
    get text() { return "swap" }
    constructor(parent) {
        super(parent)
        this.panelStart = vecs.Vec2(10, 10)
        this.panelSize = vecs.Vec2(80, 40)
    }

    onSelect() {
        this.renderer.panel.swapPanels()
    }
}
class KillTimeButton extends panels.Button {
    get text() { return "die" }
    constructor(parent) {
        super(parent)
        this.panelStart = vecs.Vec2(10, 110)
        this.panelSize = vecs.Vec2(80, 40)
    }

    onSelect() {
        for (let client of this.renderer.runner.clients) {
            client.state = null
        }
        this.renderer.runner.server.state = null
    }
}

export class DebugGamePanel extends panels.Panel {
    constructor(parent) {
        super(parent);
        this.panelStart = vecs.Vec2(0, 0);
        this.panelSize = vecs.Vec2(1280, 800);
    }

    drawContents() {
        this.ctx.font = "10px Courier";
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "top";
        this.ctx.fillStyle=colours.BORDER;
        this.drawDebug();
    }

    drawDebug() {
        this.ctx.fillText("TrueMS " + (this.renderer.drawMS - this.renderer.firstDrawMS), 2, 2);
    }
}
