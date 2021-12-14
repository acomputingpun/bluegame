import * as ui from '/es/ui/ui.es'

import * as states from '/es/states.es'

export class GameRunner {
    constructor() {
        this.state = new states.State()
        this.renderer = new ui.Renderer(this)
    }

    main () {
        this.renderer.startDrawLoop()
        console.log("amain", this)
    }
}