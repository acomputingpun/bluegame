export function argPanic () {
    console.log("Argument error - panicking!")
    console.trace()
    throw `PANIC: Argument error!`
}

export function dlog(flag, ...args) {
    if (flag) {
        console.log(...args)
    }
}
