function camelCase (str) {
    return str.replace(/(-[a-z])/g, a => a[1].toUpperCase())
}

module.exports = camelCase