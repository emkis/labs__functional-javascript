// sample usage of lazy evaluation concept

function eagerRobustCalculation (valueA, valueB) {
  const timeToEnd = Date.now() + 2500
  const poweredValue = Math.pow(valueA, 3)

  // just for slow things out for better demonstration
  while (Date.now() < timeToEnd) continue

  return poweredValue + valueB
}

function lazyRobustCalculation (valueA) {
  const timeToEnd = Date.now() + 2500
  const poweredValue = Math.pow(valueA, 3)

  // just for slow things out for better demonstration
  while (Date.now() < timeToEnd) continue

  return function (valueB) {
    return poweredValue + valueB
  }
}

console.time('#eager function')

console.log(eagerRobustCalculation(3, 100)) // 127
console.log(eagerRobustCalculation(3, 200)) // 227
console.log(eagerRobustCalculation(3, 300)) // 327

console.timeEnd('#eager function') // 7507.036ms

/**
 * in the lazy function, the idea is that we calculate
 * all the values only when necessary, and we can reuse
 * the first function result for another cases
 */

console.time('#lazy evaluation')

const lazyPoweredThree = lazyRobustCalculation(3)

console.log(lazyPoweredThree(100)) // 127
console.log(lazyPoweredThree(200)) // 227
console.log(lazyPoweredThree(300)) // 327

console.timeEnd('#lazy evaluation') // 2499.923ms
