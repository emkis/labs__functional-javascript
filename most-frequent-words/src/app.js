import { join } from 'path'
import * as utils from './utils/functions'

const subtitlesDirectory = join(__dirname, '..', 'assets', 'subtitles')
const patternsToRemove = ['.', '?', '-', ',', '"', '♪', '_', '<i>', '</i>', '\r', '[', ']', '(', ')']
const filesExtension = '.srt'

utils.getFilesFromDirectory(subtitlesDirectory)
  .then(utils.textsEndingWith(filesExtension))
  .then(utils.readFiles)
  .then(utils.mergeContent)
  .then(utils.splitStringByPattern('\n'))
  .then(utils.deleteEmptyStrings)
  .then(utils.deleteWhenIncludes('-->'))
  .then(utils.deleteWhenHasOnlyNumber)
  .then(utils.deletePatternsFromTexts(patternsToRemove))
  .then(utils.mergeContent)
  .then(utils.splitStringByPattern(' '))
  .then(utils.deleteEmptyStrings)
  .then(utils.deleteWhenHasOnlyNumber)
  .then(utils.groupWords)
  .then(utils.orderByAttrNumeric('quantity', 'desc'))
  .then(console.log)
