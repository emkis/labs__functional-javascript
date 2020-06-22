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

export function filesEndingWith (files, pattern) {
  return files.filter(file => file.endsWith(pattern))
}

export function mergeContent (array) {
  return array.join(' ')
}

export function splitStringByPattern (text, pattern) {
  return text.split(pattern)
}

export function deleteEmptyStrings (array) {
  return array.filter(item => !!item.trim())
}

export function deletePatternsFromTexts (array, patterns) {
  return array.map(item => {
    let text = item

    patterns.forEach(pattern => {
      text = text.split(pattern).join('')
    })

    return text
  })
}

export function deleteWhenIncludes (array, pattern) {
  return array.filter(item => !item.includes(pattern))
}

export function deleteWhenHasOnlyNumber (array) {
  return array.filter(item => {
    const currentItem = item.trim()
    return !(Number(currentItem) || Number(currentItem) === 0)
  })
}
