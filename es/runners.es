import * as ui from '/es/ui/ui.es';

import * as states from '/es/states.es';

export class GameRunner {
    constructor() {
        this.renderer = new ui.Renderer(this);
        this.state = new states.State();
    }

    main () {
        this.renderer.startDrawLoop();
        console.log("amain", this)
    }
}