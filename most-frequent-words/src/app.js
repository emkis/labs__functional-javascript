import { join } from 'path'
import * as utils from './utils/functions'

const subtitlesDirectory = join(__dirname, '..', 'assets', 'subtitles')
const filesExtension = '.srt'
const patternsToRemove = [
  '.', '?', '-', ',', '"', '♪',
  '_', '<i>', '</i>', '\r',
  '[', ']', '(', ')'
]

function makeWordsGroup (words) {
  const initialState = {}

  return Object.values(words.reduce((groupedWords, word) => {
    const text = word.toLowerCase()
    const quantity = groupedWords[text] ? groupedWords[text].quantity + 1 : 1

    groupedWords[text] = { word: groupedWords[text], quantity }

    return groupedWords
  }, initialState))
}

async function getWordsFromSubtitles (directory, targetExtension) {
  const allFiles = await utils.getFilesFromDirectory(directory)
  const targetFiles = await utils.filesEndingWith(allFiles, targetExtension)
  const subtitles = await utils.readFiles(targetFiles)
  const mergedContent = utils.mergeContent(subtitles)
  const splittedContent = utils.splitStringByPattern(mergedContent, '\n')
  const stringsWithoutOnlySpaces = utils.deleteEmptyStrings(splittedContent.map(string => string))
  const stringsWithoutDuration = utils.deleteWhenIncludes(stringsWithoutOnlySpaces, '-->')
  const stringsWithoutNumbers = utils.deleteWhenHasOnlyNumber(stringsWithoutDuration)
  const sanitizedStrings = utils.deletePatternsFromTexts(stringsWithoutNumbers, patternsToRemove)
  const sanatizedMergedContent = utils.mergeContent(sanitizedStrings)
  const splittedWords = utils.splitStringByPattern(sanatizedMergedContent, ' ')
  const wordsNotEmpty = utils.deleteEmptyStrings(splittedWords)
  const wordsWithoutNumbers = utils.deleteWhenHasOnlyNumber(wordsNotEmpty)
  const groupedWords = makeWordsGroup(wordsWithoutNumbers)

  return groupedWords
}

getWordsFromSubtitles(subtitlesDirectory, filesExtension).then(console.log)
