import * as hacks from '/es/hacks.js'
import * as connspecs from '/es/occupants/conns/specs.js'

class Resource {
    constructor(quantity) {
        this.quantity = quantity
    }
    static get resClass() { return this }
    get resClass() { return this.constructor }

    static get resName() { return "?resource?" }
    get resName() { return this.resClass.resName }

    toString() { return `[rs ${this.resName} ${this.quantity}]` }
    static toString() { return `[RC ${this.resName}]` }

    static toConnector(...args) {
        return new this.connSpecClass(...args)
    }
    toConnector(...args) {
        return this.resClass.connSpecClass(...args)
    }
    static get connSpecClass() { throw new errs.Panic(`Tried to get connSpecClass() of resource ${this} without equivalent Connector`) }
    get connSpecClass() { return this.resClass.connSpecClass }

    eq(other) { return this.resClass == other.resClass && this.quantity == other.quantity }
    add(other) {
        if (this.resClass != other.resClass) { throw new errs.Panic(`Tried to perform arithmetic operations on different resource types ${this} and ${other}`) }
        return new this.resClass(this.quantity + other.quantity)
    }
    sub(other) {
        if (this.resClass != other.resClass) { throw new errs.Panic(`Tried to perform arithmetic operations on different resource types ${this} and ${other}`) }
        return new this.resClass(this.quantity + other.quantity)
    }
    gt(other) {
        if (this.resClass != other.resClass) { throw new errs.Panic(`Tried to perform arithmetic operations on different resource types ${this} and ${other}`) }
        return this.quantity > other.quantity
    }
    lt(other) {
        if (this.resClass != other.resClass) { throw new errs.Panic(`Tried to perform arithmetic operations on different resource types ${this} and ${other}`) }
        return this.quantity < other.quantity
    }
    ge(other) {
        if (this.resClass != other.resClass) { throw new errs.Panic(`Tried to perform arithmetic operations on different resource types ${this} and ${other}`) }
        return this.quantity >= other.quantity
    }
    le(other) {
        if (this.resClass != other.resClass) { throw new errs.Panic(`Tried to perform arithmetic operations on different resource types ${this} and ${other}`) }
        return this.quantity <= other.quantity
    }

    compatibleTo(other) {
        return this.resClass.compatibleTo(other.resClass)
    }
    static compatibleTo(other) {
        return this == other.resClass
    } 
}

export class Electric extends Resource {
    static get resName() { return "electricity" }
    static get connSpecClass() { return connspecs.ElectricConnector }
}
export class Ammunition extends Resource {    
    static get resName() { return "ammunition" }
}
export class Fuel extends Resource {    
    static get resName() { return "fuel" }
    static get connSpecClass() { return connspecs.FuelConnector }
}

export class ResourcePool {
    constructor(resClass, capacity, initial = capacity, quantity = initial) {
        this.resClass = resClass
        this.capacity = capacity
        this.initial = initial
        this.quantity = quantity

        this._freeQuantity = quantity
        this._reserveBids = []
    }
    
    copy() {
        return new this.constructor( this.resClass, this.capacity, this.initial, this.quantity )
    }
    
    foreignReserve(bidder = hacks.argPanic(), res = hacks.argPanic() ) {
        if (res.resClass != this.resClass) { throw new errs.Panic(`Tried to reserve invalid resource type ${res} from pool ${this}`) }

        if (res.quantity <= this._freeQuantity) {
            this._reserveBids.push ( [bidder, res] ) 
            this._freeQuantity -= res.quantity
            return true
        } else {
            return false
        }
    }
    
    foreignConsume(consumer = hacks.argPanic(), res = hacks.argPanic()) {
        if (res.resClass != this.resClass) { throw new errs.Panic(`Tried to reserve invalid resource type ${res} from pool ${this}`) }

        let newReserveBids = []
        for (let bid of this._reserveBids) {
            let [bidder, bidRes] = bid
            if (bidder === consumer && res.eq(bidRes)) {
                this.quantity -= res.quantity
            } else {
                newReserveBids.push( [bidder, bidRes] )
            }
        }
        this._reserveBids = newReserveBids
        if (this.quantity < 0) { throw new errs.Panic(`Resource pool ${this} has impossible quantity ${this.quantity} after consume() call`) }
    }
}