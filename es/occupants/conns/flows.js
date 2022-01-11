export class Inflow {
    static compatibleTo(other) {
        return (other == Anyflow) || (other == Outflow)
    }
}
export class Outflow {   
    static compatibleTo(other) {
        return (other == Anyflow) || (other == Inflow)
    }
}
export class Anyflow {
    static compatibleTo(other) {
        return true
    }
}