import * as errs from '/es/errs.js'

class BlueprintWarning extends errs.CustomException {
    constructor(grid) {
        super()
        this.grid = grid
    }

    toString() {
        return `WARN: ${this.text}`
    }

    get isFatal() { return false }
    get text() { return "(undefined blueprint warning)" }
}

export class HillPropertyError extends BlueprintWarning {
    get isFatal() { return true }

    get text() { return "WARN: hill property error!" }
}

class ComponentWarning extends BlueprintWarning {
    constructor (comp) {
        this.comp = comp
    }

    get text() { return `(undefined component warning - comp ${this.comp})` }
}

class ConnectorWarning extends BlueprintWarning {
    constructor (conn) {
        this.conn = conn
    }
}

export class InvalidConnectorWarning extends ConnectorWarning {
    constructor (comp) {
        this.connector = connector
    }

    get text() { return `component ${this.comp} has open connector` }
}

export class OpenConnectorWarning extends ConnectorWarning {
    get text() { return `component ${this.comp} has open connector` }
}

export class BlockedOpeningtWarning extends ConnectorWarning {
    get text() { return `component ${this.comp} has a blocked opening` }    
}