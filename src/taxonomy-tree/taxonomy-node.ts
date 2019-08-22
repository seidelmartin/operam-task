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

  filter (text: string): TaxonomyNode | undefined {
    let filteredChildren: Record<string, TaxonomyNode> | undefined = undefined
    let filteredSize: number = 0

    if (this.children) {
      [filteredChildren, filteredSize] = Object
        .values(this.children)
        .reduce<[Record<string, TaxonomyNode> | undefined, number]>(([children, size], child) => {
          const filteredChild = child.filter(text)

          if (!filteredChild) {
            return [children, size]
          }

          children = children || {}
          children[filteredChild.name] = filteredChild

          return [children, size + filteredChild.size + 1]
        }, [undefined, filteredSize])
    }

    const matches = this.name.indexOf(text) !== -1

    if (!this.children && matches) {
      return this
    }

    if (!filteredChildren && !matches) {
      return undefined
    }

    return this.cloneFilteredNode({ children: filteredChildren, size: filteredSize })
  }

  private cloneFilteredNode (overrides: Partial<Pick<TaxonomyNode, 'size'> & { children: Record<string, TaxonomyNode> }>): TaxonomyNode {
    return Object.assign(new TaxonomyNode(this.name, 0), overrides)
  }

  toJSON () {
    return {
      name: this.name,
      size: this.size,
      children: this.children ? Object.values(this.children) : undefined
    }
  }
}
