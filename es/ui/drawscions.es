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
    warpMouseDown(clickLocal) {
        for (let child of this.children) {
            let childLocal = clickLocal.sub(child.originShift)
//            console.log("childL", childLocal, "chi", child)
            if (child.localWithin(childLocal)) {
                if (child.warpMouseDown(childLocal)) {
                    return true
                }
            }
        }
        return false
    }
    warpMouseUp(clickLocal) {
        for (let child of this.children) {
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
        throw "ERR: Tried to call get originShift() of base DrawScion!"
    }
    get absOrigin() {
        return this.parent.absOrigin.add(this.originShift)
    }


    localWithin(local) {
        throw "ERR: Tried to call localWithin() of base DrawScion!"
    }
    absWithin(local) {
        return this.localWithin(local.sub(this.absOrigin))
    }
}

