const { PENDING, FULFILLED, REJECTED, PROMISE, IS_NODE } = require('./constant')
const notify = require('./notify')

const metadata = new WeakMap()

class Reaction {
    constructor() {
        const promise = new Promise()
        this.promise = promise
        this.resolve = value => resolve(promise, value)
        this.reject = value => reject(promise, value)
    }
}

class Promise {
    constructor() {
        Object.assign(this, {
            done: false,
            notified: false,
            parent: false,
            reactions: [],
            rejection: false,
            state: PENDING,
            value: null
        })
    }

    then(onFulfilled, onRejected) {
        const reaction = new Reaction()
        reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true
        reaction.fail = typeof onRejected == 'function' && onRejected
        reaction.domain = IS_NODE ? process.domain : null
        if (this.state != PENDING) {
            notify(this, false)
        }
        return reaction.promise
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }
}

function bind (fn, promise, state, unwrap) {
    return value => fn(promise, state, value, unwrap)
}
