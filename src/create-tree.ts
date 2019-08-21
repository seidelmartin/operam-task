import { parseXmlAndFlatten } from './parsing/parse-xml'
import { createTree } from './taxonomy-tree/create-tree'
import { logExecutionTime } from './utils/execution-time'
import { writeToFile } from './utils/write-to-file'

const flattenedTaxonomy = parseXmlAndFlatten()

const tree = logExecutionTime(() => createTree(flattenedTaxonomy), 'Tree construction')

writeToFile(`${__dirname}/../resources/tree.json`, JSON.stringify(tree, undefined, 2))
