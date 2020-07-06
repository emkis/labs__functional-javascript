// a functor is nothing more than a data structure you can map functions over
// in other words, is any object we can map and apply a function generating another object instance of the same type and connections

const numbers = [1, 2, 3, 4]

const poweredNumbers = numbers
  .map(number => number + 10)
  .map(number => number * 2)

console.log('original value:', numbers) // [1, 2, 3, 4]
console.log('new value:', poweredNumbers) // [22, 24, 26, 28]

// we can see in this example above that Array is a functor, because it respects
// the same type (results in other Array instance) and
// the connections too (have the same number of items).

// now lets create our own functor

function ourFunctor(value) {
  return {
    value,
    invalid() {
      return this.value === null || this.value === undefined
    },
    map(callback) {
      if (this.invalid()) return ourFunctor(null)

      const newValue = callback(this.value)
      return ourFunctor(newValue)
    }
  }
}

const coolName = 'emkis'

const newName = ourFunctor(coolName)
  .map(letter => letter.toUpperCase())
  .map(letter => letter.split('').join('_'))

console.log('original name:', coolName) // emkis
console.log('new name:', newName.value) // E_M_K_I_S
