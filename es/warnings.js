import * as errs from '/es/errs.js'

class BlueprintWarning extends errs.CustomException {
    toString() {
        return `WARN: ${this.text}`
    }

    get isFatal() { return false }
    get text() { return "(undefined blueprint warning)" }
}

class GridWarning extends BlueprintWarning {
    constructor(grid) {
        super()
        this.grid = grid
    }
}

export class HillPropertyError extends GridWarning {
    get isFatal() { return true }

    get text() { return "WARN: hill property error!" }
}

class ComponentWarning extends BlueprintWarning {
    constructor (comp) {
        super()
        this.comp = comp
    }

    get text() { return `(undefined component warning - comp ${this.comp})` }
}

class ConnectorWarning extends BlueprintWarning {
    constructor (conn) {
        super()
        this.conn = conn
    }
    get comp() { return this.conn.comp }
}

export class InvalidConnectorWarning extends ConnectorWarning {
    get text() { return `component ${this.comp} has an invalid connector ${this.conn}` }
}

export class OpenConnectorWarning extends ConnectorWarning {
    get text() { return `component ${this.comp} has open connector ${this.conn}` }
}

export class BlockedOpeningtWarning extends ConnectorWarning {
    get text() { return `component ${this.comp} has a blocked opening ${this.conn}` }    
}
