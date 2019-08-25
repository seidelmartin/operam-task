import React from 'react'
import { getTree } from '../../tree-service'
import { TaxonomyNode } from '../taxonomy-node/TaxonomyNode'
import { SearchBox } from '../search-box/SearchBox'

export class TaxonomyTree extends React.Component {

  constructor (props) {
    super(props)
    this.state = { tree: {} }
  }

  async componentDidMount () {
    const tree = await getTree()
    this.setState({ tree })
  }

  filterTree = async (text) => {
    const filteredTree = await getTree(text)
    this.setState({ tree: filteredTree })
  }

  render () {
    const { tree } = this.state

    if (!tree.name) {
      return (
        <div>
          <SearchBox onChange={this.filterTree}/>
          <p>Empty result</p>
        </div>
      )
    }

    return (
      <div>
        <SearchBox onChange={this.filterTree}/>
        <ul><TaxonomyNode tree={tree}/></ul>
      </div>
    )
  }
}
