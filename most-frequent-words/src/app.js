import { join } from 'path'
import { getFilesFromDirectory } from './utils/functions'

const subtitlesPath = join(__dirname, '..', 'assets', 'subtitles')

const files = getFilesFromDirectory(subtitlesPath).then(console.log)
