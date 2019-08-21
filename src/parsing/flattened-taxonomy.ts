export class FlattenedTaxonomy {
  private flattenTree: { name: string, size: number }[] = []
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

  toJSON () {
    return this.flattenTree
  }
}
