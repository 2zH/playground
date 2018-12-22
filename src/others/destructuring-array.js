function destructuringArray (data, str) {
    const keys = typeof str === 'string'
        ? JSON.parse(str.replace(/\w+/g, '"$&"'))
        : str
    return keys.reduce((result, it, index) => {
        if (Array.isArray(it) && Array.isArray(data[index])) {
            Object.assign(result, destructuringArray(data[index], it))
        } else if (!data[index]){
            result[it] = null
        } else {
            result[it] = data[index]
        }
        return result
    }, {})
}

module.exports = destructuringArray