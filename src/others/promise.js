const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

/*
enum PromiseState {
    PENDING,
    FULFILLED,
    REJECTED
}
*/

class Promise {
    constructor(executor) {
        this.onFulfilled = []
        this.onRejected = []
        this.state = PENDING
        this.value = executor
        const resolve = value => {
            this.state = FULFILLED
            this.value = value
            if (!this.onFulfilled.length) {
                return this
            }
            const nextExecutor = this.onFulfilled.shift()
            
        }
        this.value(resolve, reject)
    }

    then (onFulfilled, onRejected) {
        this.onFulfilled.push(onFulfilled)
        this.onRejected.push(onRejected)
    }

    catch (onRejected) {
        this.onRejected.push(onRejected)
    }

    finally ()
}