function hyphenate (str) {
    return str.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase()
}

module.exports = hyphenate