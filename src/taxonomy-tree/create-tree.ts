import { FlattenedTaxonomy } from '../parsing/flattened-taxonomy'
import { TaxonomyNode } from './taxonomy-node'

export function createTree (flattenedTaxonomy: FlattenedTaxonomy): TaxonomyNode | undefined {
  let tree: TaxonomyNode | undefined = undefined

  flattenedTaxonomy.forEach((item, index) => {
    if (index === 0) {
      tree = new TaxonomyNode(item.name, item.size)
      return
    }

    const nodePath = item.name.split(' > ')
    tree!.addChild(new TaxonomyNode(nodePath.pop()!, item.size), nodePath)
  })

  return tree
}
