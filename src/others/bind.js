function isObject (item) {
	return typeof item === 'object'
		? it !== null
		: typeof item === 'function'
}

const factories = {}
const construct = function (fn, len, args) {
	if (!Reflect.has(factories, len)) {
		const functionBody = `return new fn(${
			Array.from({ length: len }, (_, i) => {
				return `a[${i}]`
			})
				.join(',')
		})`
		factories[len] = Function('fn, args', functionBody)
	}
	return factories[len](fn, args)
}

function bind (fn, ctx, ...partArgs) {
	if (typeof fn !== 'function') {
		throw TypeError(`${String(fn)} is not a function!`)
	}
	const boundFunction = function bound (...anotherPartArgs) {
		const args = partArgs.concat(anotherPartArgs)
		return this instanceof boundFunction
			? construct(fn, args.length, args)
			: fn.apply(ctx, args)
	}
	if (isObject(fn.prototype)) {
		boundFunction.prototype = fn.prototype
	}
	return boundFunction
}