function curryWith (func, args, ensure) {
    if (!ensure(args.length)) {
        return function subCurry (...subArgs) {
            return curryWith(func, args.concat(subArgs), ensure)
        }
    }
    return func(...args)
}

function curry (func, ...args) {
    return curryWith(func, args, argsLength => {
        if (argsLength < func.length) {
            return false
        }
        return true
    })
}

module.exports = curry