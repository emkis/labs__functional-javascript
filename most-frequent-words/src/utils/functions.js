import fs from 'fs'
import path from 'path'

export function getFilesFromDirectory (folderPath) {
  return new Promise((resolve, reject) => {
    try {
      const fileNames = fs.readdirSync(folderPath)
      const pathToFiles = fileNames.map(file => path.join(folderPath, file))

      resolve(pathToFiles)
    } catch (error) {
      reject(error)
    }
  })
}

export function readFile (filePath) {
  const configs = { encoding: 'utf-8' }

  return new Promise((resolve, reject) => {
    try {
      const fileContent = fs.readFileSync(filePath, configs)
      resolve(fileContent.toString())
    } catch (error) {
      reject(error)
    }
  })
}

export function readFiles (filesPath) {
  return Promise.all(filesPath.map(path => readFile(path)))
}

export function textsEndingWith (pattern) {
  return function (files) {
    return files.filter(file => file.endsWith(pattern))
  }
}

export function mergeContent (array) {
  return [...array].join(' ')
}

export function orderByAttrNumeric (attribute, order = 'asc') {
  return function (array) {
    const ascOrder = (objectA, objectB) => objectA[attribute] - objectB[attribute]
    const descOrder = (objectA, objectB) => objectB[attribute] - objectA[attribute]
    const definedOrder = order === 'asc' ? ascOrder : descOrder

    return [...array].sort(definedOrder)
  }
}

export function groupWords (words) {
  const initialState = {}

  return Object.values(words.reduce((groupedWords, word) => {
    const text = word.toLowerCase()
    const quantity = groupedWords[text] ? groupedWords[text].quantity + 1 : 1

    groupedWords[text] = { word: text, quantity }

    return groupedWords
  }, initialState))
}
export function splitStringByPattern (pattern) {
  return function (text) {
    return text.split(pattern)
  }
}

export function deleteEmptyStrings (array) {
  return array.filter(item => !!item.trim())
}

export function deletePatternsFromTexts (patterns) {
  return function (array) {
    return array.map(item => {
      return patterns.reduce((accumulator, pattern) => {
        return accumulator.split(pattern).join('')
      }, item)
    })
  }
}

export function deleteWhenIncludes (pattern) {
  return function (array) {
    return array.filter(item => !item.includes(pattern))
  }
}

export function deleteWhenHasOnlyNumber (array) {
  return array.filter(item => {
    const currentItem = item.trim()
    return !(Number(currentItem) || Number(currentItem) === 0)
  })
}
