export class Interactor {
    constructor(inst) {
        this.inst = inst
    }
    preAdvanceTick(directive) {
        throw `PANIC: call of to-be-overridden function preAdvanceTick of interactor ${this}`
    }
    advanceTick(directive) {
        throw `PANIC: call of to-be-overridden function advanceTick of interactor ${this}`
    }
    postAdvanceTick() {
        throw `PANIC: call of to-be-overridden function postAdvanceTick of interactor ${this}`
    }
}

export class NoInteractor extends Interactor {
    preAdvanceTick(directive) {
    }
    advanceTick(directive) {
    }
    postAdvanceTick() {
    }
}