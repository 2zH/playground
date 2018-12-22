function notify (promise, isReject) {
    if (promise.notified) {
        return
    }
    promise.notified = true
    microtask(() => {
        const value = promise.value
        const ok = promise.state == FULFILLED
        const runTask = reaction => {
            const handler = ok ? reaction.ok : reaction.fail
            const { resolve, reject, domain } = reaction
            let result, exited
            try {
                if (handler) {
                    if (!ok) {
                        onRejected(promise)
                    }
                    onFulfilled(reaction)
                    if (result === reaction.promise) {
                        reject(TypeError('Promise-chain cycle'))
                    } else if (isThenable(result)) {
                        result.then(resolve, reject)
                    } else {
                        resolve(result)
                    }
                } else {
                    reject(value)
                }
            } catch (e) {
                if (domain && !exited) {
                    domain.exit()
                }
                reject(e)
            }
        }
        while (promise.reactions.length) {
            runTask(promise.reactions.shift())
        }
        promise.notified = false
        if (isReject && !promise.rejection) {
            onUnhandled(promise)
        }
    })
}

function onRejected (promise) {
    if (promise.rejection === UNHANDLED) {
        onHandUnhandled(promise)
    }
    promise.rejection = HANDLED
}

function onFulfilled (reaction) {
    const handler = reaction.ok
    const domain = reaction.domain
    if (handler === true) {
        result = value
    } else {
        if (domain) {
            domain.enter()
        }
        result = handler(value)
        if (domain) {
            domain.exit()
            exited = true
        }
    }
}

function runTask (promise) {
    const value = promise.value
    const ok = promise.state == FULFILLED
    const reactionRunner = reaction => {
        const handler = ok ? reaction.ok : reaction.fail
        const { resolve, reject, domain } = reaction
    }

}

function onUnhandled (promise) {
    task.call(global, () => {
        const value = promise.value
        const IS_UNHANDLED = isUnhandled(promise)
        let result
        if (IS_UNHANDLED) {
            result = perform(() => {
                if (IS_NODE) {
                    process.emit('unhandledRejection', value, promise)
                } else {
                    dispatchEvent(UNHANDLED_REJECTION, promise, value)
                }
            })
            promise.rejection = IS_NODE || isUnhandled(promise) ? UNHANDLED : HANDLED
        }
        if (IS_UNHANDLED && result.e) {
            throw result.v
        }
    })
}

function isUnhandled (promise) {
    return promise.rejection !== HANDLED && !promise.parent
}

function onHandleUnhandled (promise) {
    task.call(global, () => {
        if (IS_NODE) {
            process.emit('rejectionHandled', promise)
        } else {
            dispatchEvent(REJECTION_HANDLED, promise, promise.value)
        }
    })
}