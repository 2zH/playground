function reject (promise, value, isOnReject) {
    if (promise.done && !isOnReject) {
        return
    }
    promise.done = true
    promise.value = value
    promise.state = REJECTED
    notify(promise, true)
}