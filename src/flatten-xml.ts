import { parseXmlAndFlatten } from './parsing/parse-xml'
import { logExecutionTime } from './utils/execution-time'
import { writeToFile } from './utils/write-to-file'

logExecutionTime(() => {
  const flattenedTaxonomy = parseXmlAndFlatten()

  return writeToFile(`${__dirname}/../resources/flattened.json`, JSON.stringify(flattenedTaxonomy, undefined, 2))
}, 'Total execution time')
