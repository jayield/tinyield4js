'use strict'

Array.prototype.oddLines = function() {
    const res = []
    for (let index = 0; index < this.length; index++) {
        if(index % 2 != 0)
            res.push(this[index])
    }
    return res
}

Array.prototype.max = function() {
    return Math.max.apply(null, this)
}