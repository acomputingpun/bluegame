import * as hacks from '/es/hacks.js'

class Resource {
    constructor(quantity) {
        this.quantity = quantity
    }

    get resName() { return "unknown resource" }
    get resClass() { return this.constructor }

    toString() { return `[rs ${this.resName} ${this.quantity}]` }

    eq(other) { return this.resClass == other.resClass && this.quantity == other.quantity }
    add(other) {
        if (this.resClass != other.resClass) { throw `PANIC: Tried to perform arithmetic operations on different resource types ${this} and ${other}` }
        return new this.resClass(this.quantity + other.quantity)
    }
    sub(other) {
        if (this.resClass != other.resClass) { throw `PANIC: Tried to perform arithmetic operations on different resource types ${this} and ${other}` }
        return new this.resClass(this.quantity + other.quantity)
    }
    gt(other) {
        if (this.resClass != other.resClass) { throw `PANIC: Tried to perform arithmetic operations on different resource types ${this} and ${other}` }
        return this.quantity > other.quantity
    }
    lt(other) {
        if (this.resClass != other.resClass) { throw `PANIC: Tried to perform arithmetic operations on different resource types ${this} and ${other}` }
        return this.quantity < other.quantity
    }
    ge(other) {
        if (this.resClass != other.resClass) { throw `PANIC: Tried to perform arithmetic operations on different resource types ${this} and ${other}` }
        return this.quantity >= other.quantity
    }
    le(other) {
        if (this.resClass != other.resClass) { throw `PANIC: Tried to perform arithmetic operations on different resource types ${this} and ${other}` }
        return this.quantity <= other.quantity
    }
}

export class Electric extends Resource {
    get resName() { return "electricity" }
}

export class Ammunition extends Resource {    
    get resName() { return "ammunition" }
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
        if (res.resClass != this.resClass) { throw `PANIC: Tried to reserve invalid resource type ${res} from pool ${this}` }

        if (res.quantity <= this._freeQuantity) {
            this._reserveBids.push ( [bidder, res] ) 
            this._freeQuantity -= res.quantity
            return true
        } else {
            return false
        }
    }
    
    foreignConsume(consumer = hacks.argPanic(), res = hacks.argPanic()) {
        if (res.resClass != this.resClass) { throw `PANIC: Tried to reserve invalid resource type ${res} from pool ${this}` }

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
        if (this.quantity < 0) { throw `PANIC: Resource pool ${this} has impossible quantity ${this.quantity} after consume() call` }
    }
}