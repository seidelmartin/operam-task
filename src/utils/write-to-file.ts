import * as fs from 'fs'

export const writeToFile = (fileName: string, data: string) => {
  const stream = fs.createWriteStream(fileName)
  return new Promise<void>((resolve, reject) => {
    stream.once('error', (err) => reject(err))
    stream.end(data, () => resolve())
  })
}
