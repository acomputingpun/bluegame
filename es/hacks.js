import * as errs from '/es/errs.js'

export function argPanic () {
    throw new errs.Panic(`Argument error!`)
}

export function dlog(flag, ...args) {
    if (flag) {
        console.log(...args)
    }
}

export function cachedLookup(caller=argPanic(), eff=argPanic()) {
    return () => {
        if (eff.__dirtyID !== caller._dirtyID) {
            eff.__dirtyID = caller._dirtyID
            eff.__cachedValue = eff()
        }
        return eff.__cachedValue
    }
}
