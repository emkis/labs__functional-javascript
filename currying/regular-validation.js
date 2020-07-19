// regular function to validate some text
function validateTextBetween (minSize, maxSize, errorMessage, text) {
  const textSize = (text || '').trim().length

  if (textSize < minSize || textSize > maxSize) {
    throw Error(errorMessage)
  }

  return true
}

const MIN_SIZE = 4
const MAX_SIZE = 12
const ERROR_MESSAGE = 'Input is invalid'

const text = 'Lorem ipsum sit dollor'

/**
 * in this way, we need to pass all the arguments to the function to run it
 * so it cannot be reused in any other way
 *
 * in case our application needs to do this type of validation in many places,
 * we would have a lot of code repetition to always have to recreate this
 * entire validation
 */
const isValid = validateTextBetween(MIN_SIZE, MAX_SIZE, ERROR_MESSAGE, text)

console.log(isValid)
