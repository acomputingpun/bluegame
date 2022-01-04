export class CustomException extends Error {
}

export class Panic extends CustomException {
    constructor(msg) {
        super()
        console.trace()
        this.message = `PANIC: ${msg}`
    }
}

export class ToBeOverridden extends Panic {
    constructor(msg) {
        super(`Call to unimplemented to-be-overridden function!`)
    }
}