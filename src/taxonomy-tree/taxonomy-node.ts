export class TaxonomyNode {
  private children?: Record<string, TaxonomyNode>

  constructor (
    public readonly name: string,
    public readonly size: number
  ) {}

  addChild (node: TaxonomyNode, path: string[]) {
    this.children = this.children || {}

    const firstPath = path.shift() || ''

    if (firstPath === this.name && !path.length) {
      this.children[node.name] = node
      return
    }

    this.children[path[0]].addChild(node, path)
  }

  toJSON () {
    return {
      name: this.name,
      size: this.size,
      children: this.children ? Object.values(this.children) : undefined
    }
  }
}
