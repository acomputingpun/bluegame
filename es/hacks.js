export function argPanic () {
    console.log("Argument error - panicking!")
    console.trace()
    throw `PANIC: Argument error!`
}
