import * as fs from 'fs'
import * as xmlJs from 'xml-js'
import { ElementCompact } from 'xml-js'
import { logExecutionTime } from '../utils/execution-time'
import { FlattenedTaxonomy } from './flattened-taxonomy'
import { Synset } from './interface/synset'

export function parseXmlAndFlatten (): FlattenedTaxonomy {
  const parsedXml: ElementCompact = logExecutionTime(() => xmlJs
    .xml2js(
      fs.readFileSync(`${__dirname}/../../resources/data.xml`).toString(),
      {
        compact: true,
        ignoreText: true,
        ignoreCdata: true,
        ignoreComment: true,
        ignoreDeclaration: true,
        ignoreDoctype: true,
        ignoreInstruction: true
      }
    ), 'XML parsing')

  const flattenedTaxonomy = new FlattenedTaxonomy()
  logExecutionTime(() => goThruSynsetTree(flattenedTaxonomy, parsedXml['ImageNetStructure']['synset']), 'Flattening')

  return flattenedTaxonomy
}

function goThruSynsetTree (flattenedTaxonomy: FlattenedTaxonomy, synset: Synset, parent?: string) {
  const name = synset._attributes.words
  const nameWithParent = parent ? `${parent} > ${name}` : name

  flattenedTaxonomy.push(name, parent)

  if (!synset.synset) {
    return
  }

  if (!Array.isArray(synset.synset)) {
    synset.synset = [synset.synset]
  }

  synset.synset
    .forEach((childSynset) => goThruSynsetTree(flattenedTaxonomy, childSynset, nameWithParent))
}
