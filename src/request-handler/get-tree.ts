import { Request, Response } from 'express'
import { parseXmlAndFlatten } from '../parsing/parse-xml'
import { createTree } from '../taxonomy-tree/create-tree'
import { logExecutionTime } from '../utils/execution-time'

const flattenedTaxonomy = parseXmlAndFlatten()
const taxonomyTree = createTree(flattenedTaxonomy)

export const getTreeHandler = (req: Request, res: Response) => {
  if (req.query.filter) {
    const filteredTree = taxonomyTree && logExecutionTime(() => taxonomyTree.filter(req.query.filter), 'Filtering')

    return res.json(filteredTree || {})
  }

  return res.json(taxonomyTree || {})
}
