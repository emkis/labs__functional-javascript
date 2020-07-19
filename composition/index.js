function composition (...callbacks) {
  return function (value) {
    return callbacks.reduce((accumulator, callback) => {
      return callback(accumulator)
    }, value)
  }
}

function asyncComposition (...callbacks) {
  return function (value) {
    return callbacks.reduce(async (accumulator, callback) => {
      const isPromise = Promise.resolve(accumulator) === accumulator

      if (isPromise) return callback(await accumulator)
      else return callback(accumulator)
    }, value)
  }
}

function lowercaseText (text) {
  return text.toLowerCase()
}

function addEmojis (text) {
  return `${text} 🦆🐖🐄`
}

function separateText (text) {
  return text.split('').join(' ')
}

const makeNiceText = asyncComposition(lowercaseText, addEmojis, separateText)

console.log(makeNiceText('Hello there'))
console.log(makeNiceText('Composition is AWESOME'))
