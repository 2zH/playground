function isThenable (it) {
    const then = it.then
    return isObject(it) && typeof then == 'function'
        ? then
        : false
}

function resolve (promise, value, isOnFulfill) {
    if (promise.done && !isOnFulfill) {
        return
    }
    promise.done = true
    try {
        if (promise === value) {
            throw TypeError('Promise can\'t be resolved itself!')
        }
        if (isThenable(value)) {
            microtask(() => {
                const onFulfilled = value => resolve(promise, value, true)
                const onRejected = value => reject(promise, value, true)
                try {
                    value.then(onFulfilled, onRejected)
                } catch (errorMessage) {
                    reject(promise, errorMessage, true)
                }
            })
        } else {
            promise.value = value
            promise.state = FULFILLED
            notify(promise, false)
        }
    } catch (errorMessage) {
        reject(promise, errorMessage, true)
    }
}