function taggedTemplate (fn) {
    return function taggedFunction (...args) {
        return fn(
            Array.isArray(args[0])
                ? args[0].reduce((resule, str, index) =>
                    result + args[index] + str
                )
                : args[0]
        )
    }
}

module.exports = taggedTemplate