import { parseXmlAndFlatten } from './parsing/parse-xml'
import { createTree } from './taxonomy-tree/create-tree'
import { logExecutionTime } from './utils/execution-time'
import { writeToFile } from './utils/write-to-file'

const flattenedTaxonomy = parseXmlAndFlatten()

const tree = logExecutionTime(() => createTree(flattenedTaxonomy), 'Tree construction')

const filteredTree = logExecutionTime(() => tree!.filter('flora'), 'Tree filtering')

writeToFile(`${__dirname}/../resources/tree_filtered.json`, JSON.stringify(filteredTree, undefined, 2))
  .catch((err) => console.error('Error in writing file', err))
