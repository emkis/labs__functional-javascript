'use strict'

function strBuilder (initialText) {
  return function next (complementText) {
    if (typeof complementText === 'string') {
      return strBuilder(initialText + complementText)
    }

    return initialText
  }
}

const hello = strBuilder('Hello, ')
const kyle = hello('Kyle')
const susan = hello('Susan')
const question = kyle('?')()
const greeting = susan('!')()

// tests
console.log(strBuilder('Hello, ')('')('Kyle')('.')('')() === 'Hello, Kyle.')
console.log(hello() === 'Hello, ')
console.log(kyle() === 'Hello, Kyle')
console.log(susan() === 'Hello, Susan')
console.log(question === 'Hello, Kyle?')
console.log(greeting === 'Hello, Susan!')
