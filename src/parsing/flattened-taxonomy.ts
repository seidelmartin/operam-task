import { TaxonomyRecord } from './interface/taxonomy-record'

export class FlattenedTaxonomy {
  private flattenTree: TaxonomyRecord[] = []
  private flattenTreeIndex: Record<string, number> = {}

  push (synsetName: string, synsetParent?: string) {
    const name = synsetParent ? `${synsetParent} > ${synsetName}` : synsetName
    this.flattenTreeIndex[name] = this.flattenTree.push({ name, size: 0 }) - 1

    synsetParent && this.incrementParentSize(synsetParent)
  }

  private incrementParentSize (synsetParent: string) {
    const splittedSynsetParent = synsetParent.split(' > ')

    this.flattenTree[this.flattenTreeIndex[synsetParent]].size++

    while (splittedSynsetParent.pop() && splittedSynsetParent.length) {
      this.flattenTree[this.flattenTreeIndex[splittedSynsetParent.join(' > ')]].size++
    }
  }

  forEach (fn: (item: TaxonomyRecord, index: number) => void) {
    this.flattenTree.forEach(fn)
  }

  toJSON () {
    return this.flattenTree
  }
}
