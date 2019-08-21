import * as fs from 'fs'

export const writeToFile = (fileName: string, data: string) => {
  const stream = fs.createWriteStream(fileName)
  return new Promise<void>((resolve) => stream.end(data, () => resolve()))
}
