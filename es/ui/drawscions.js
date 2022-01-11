import * as errs from '/es/errs.js'
import * as utils from '/es/utils.js'
import * as uiconst from './uiconst.js'

export class DrawScion {
    constructor(parent) {
        this.parent = parent
    }

    get renderer() { return this.parent.renderer }
    get controller() { return this.parent.controller }
    get state() { return this.parent.state }
    get playerFaction() { return this.controller.playerFaction }

    get cursor() { return this.renderer.cursor }
    get ctx() { return this.renderer.ctx }

    get children() {
        return []
    }
    warpMouseMove(clickLocal) {
        for (let child of utils.aReverse(this.children)) { 
            let childLocal = clickLocal.sub(child.originShift)
            if (child.localWithin(childLocal)) {
                if (child.warpMouseMove(childLocal)) {
                    return true
                }
            }
        }
        return false
    }
    warpMouseDown(clickLocal, mouseButton = uiconst.LMOUSE) {
        for (let child of utils.aReverse(this.children)) {
            let childLocal = clickLocal.sub(child.originShift)
            if (child.localWithin(childLocal)) {
                if (child.warpMouseDown(childLocal)) {
                    return true
                }
            }
        }
        return false
    }
    warpMouseUp(clickLocal) {
        for (let child of utils.aReverse(this.children)) {
            let childLocal = clickLocal.sub(child.originShift)
            if (child.localWithin(childLocal)) {
                if (child.warpMouseUp(childLocal)) {
                    return true
                }
            }
        }
        return false
    }

    get originShift() {
        throw new errs.ToBeOverridden()
    }
    get absOrigin() {
        return this.parent.absOrigin.add(this.originShift)
    }


    localWithin(local) {
        throw new errs.ToBeOverridden()
    }
    absWithin(local) {
        return this.localWithin(local.sub(this.absOrigin))
    }
}

