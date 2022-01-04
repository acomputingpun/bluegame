import * as errs from '/es/errs.js'

export function argPanic () {
    throw new errs.Panic(`Argument error!`)
}

export function dlog(flag, ...args) {
    if (flag) {
        console.log(...args)
    }
}
