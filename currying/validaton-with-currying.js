/**
 * regular function to validate some text
 * BUT, using currying to make more reusable
 */

function validateTextBetween (minSize) {
  return function (maxSize) {
    return function (errorMessage) {
      return function (text) {
        const textSize = (text || '').trim().length

        if (textSize < minSize || textSize > maxSize) {
          throw errorMessage
        }

        return true
      }
    }
  }
}

function applyValidation (callback) {
  return function (value) {
    try {
      callback(value)
    } catch (error) {
      return error
    }
  }
}

const MIN_SIZE = 4
const MAX_SIZE = 12
const ERROR_MESSAGE = 'Input is invalid'

const forceDefaultProductNameSize = validateTextBetween(MIN_SIZE)(MAX_SIZE)
const forceValidProductName = forceDefaultProductNameSize(ERROR_MESSAGE)
const validateProductName = applyValidation(forceValidProductName)

const text = 'Lorem ipsum sit dollor'
const isValid = validateProductName(text)

console.log(isValid)
