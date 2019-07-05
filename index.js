'use strict'

const maxTemp = require('./queryMaxTemperature')
const bench = require('benchmark')

let max = maxTemp.withArrays()
console.log(max)

max = maxTemp.withLodash()
console.log(max)

max = maxTemp.withIxJs()
console.log(max)

max = maxTemp.withBulk()
console.log(max)


const suite = new bench.Suite

const test = suite
    .add('MaxTemp with Bulk', maxTemp.withBulk)
    .add('MaxTemp with IxJs', maxTemp.withIxJs)
    .add('MaxTemp with Arrays', maxTemp.withArrays)
    .add('MaxTemp with lodash', maxTemp.withLodash)
    .on('cycle', function(event) {
        console.log(String(event.target))
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'))
    })
test.run()
test.run()

