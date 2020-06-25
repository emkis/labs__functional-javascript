function composition (...callbacks) {
  return function (value) {
    return callbacks.reduce((accumulator, callback) => {
      return callback(accumulator)
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

const makeNiceText = composition(lowercaseText, addEmojis, separateText)

console.log( makeNiceText('Hello there') )
console.log( makeNiceText('Composition is AWESOME') )
