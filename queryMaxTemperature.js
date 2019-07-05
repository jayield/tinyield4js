'use strict'

require('./queries/arrays') // Add auxiliary functions to array prototype

const _ = require('lodash')
const Iterable = require('ix').Iterable
const Bulk = require('./bulk')

const fs = require('fs')
const EOL = require('os').EOL
const csv = fs
            .readFileSync('./data/past-weather.ashx-q-41.15--8.6167-date-2017-02-01-enddate-2017-04-30')
            .toString()
            .split(EOL)
            
module.exports = {
    withArrays,
    withLodash,
    withIxJs,
    withBulk
}

function withArrays() {
    return csv
        .filter(line => line.charAt(0) != '#')
        .slice(1)
        .oddLines()
        .map(line => Number.parseInt(line.substring(14, 16)))
        .max()
}

function withLodash() {
    let count = 0
    return _(csv)
        .filter(line => line.charAt(0) != '#')
        .drop(1)
        .filter(() => count++ % 2 != 0)
        .map(line => Number.parseInt(line.substring(14, 16)))
        .max()
}

function withIxJs() {
    return Iterable.from(csv)
        .filter(line => line.charAt(0) != '#')
        .skip(1)
        .oddLines()
        .map(line => Number.parseInt(line.substring(14, 16)))
        .max()
}

function withBulk() {
    return Bulk.of(csv)
        .filter(line => line.charAt(0) != '#')
        .skip(1)
        .oddLines()
        .map(line => Number.parseInt(line.substring(14, 16)))
        .max()
}

Iterable.prototype.oddLines = function () {
    const self = this
    const res = {
        [Symbol.iterator]: function () {
            const iter = self[Symbol.iterator]()
            return {
                next: function() {
                    const curr = iter.next()
                    if(curr.done) return curr
                    return iter.next()
                }
            }
        }
    }
    return Iterable.from(res)
}
