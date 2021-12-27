
class Resource {
    constructor(quantity) {
        this.quantity = quantity
    }

    get resName() { return "unknown resource" }

    toString() { return `[rs ${this.resName} ${this.quantity}]` }
}

export class Electric extends Resource {
    get resName() { return "electricity" }
}

export class Ammunition extends Resource {    
    get resName() { return "ammunition" }
}
