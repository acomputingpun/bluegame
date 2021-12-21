class BlueprintWarning {
    toString() {
        return `WARN: ${this.text}`
    }

    get text() { return "(undefined blueprint warning)" }
}

class ComponentWarning extends BlueprintWarning {
    constructor (comp) {
        this.comp = comp
    }

    get text() { return `(undefined component warning - comp ${this.comp})` }
}

class OpenConnectorWarning extends ComponentWarning {
    get text() { return `component ${this.comp} has open connector` }
}

class BlockedOpeningtWarning extends ComponentWarning {
    get text() { return `component ${this.comp} has a blocked opening` }    
}