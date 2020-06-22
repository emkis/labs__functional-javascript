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
