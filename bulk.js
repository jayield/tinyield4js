'use strict'

const Bulk = {
    of,
    filter,
    map,
    skip,
    oddLines,
    max,
    forEach
}

module.exports = Bulk

/**
 * @param {*} source T[]
 */
function of(source){
    const res = yld => {
        for (let i = 0; i < source.length; i++) { 
            yld(source[i]) 
        }
    }
    return Object.setPrototypeOf(res, Bulk)
}

/**
 * @param {*} predicate (T) => boolean
 */
function filter(predicate) {
    const src = this
    const res = yld => src(e => { if (predicate(e)) yld(e) })
    return Object.setPrototypeOf(res, Bulk)
}

/**
 * @param {*} mapper (T) => R
 */
function map(mapper) {
    const src = this
    const res = yld => src(e => yld(mapper(e)))
    return Object.setPrototypeOf(res, Bulk)
}

/**
 * @param {*} n Number of items to skip. 
 */
function skip(n) {
    const src = this
    const res = yld => {
        let count = 0
        src(e => { if(count >= n) yld(e); else count++})
    }
    return Object.setPrototypeOf(res, Bulk)
}

function oddLines() {
    const src = this
    const res = yld => {
        let odd = false
        src(e => { 
            if(odd) yld(e) // else discard element
            odd = !odd
        })
    }
    return Object.setPrototypeOf(res, Bulk)
}

function max() {
    let nr = Number.MIN_VALUE
    this(e => { if(e > nr) nr = e })
    return nr
}


/**
 * @param {*} cons T => void
 */
function forEach(cons) {
    this(cons)
}
