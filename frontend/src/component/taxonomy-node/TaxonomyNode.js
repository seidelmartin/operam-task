import React from 'react'

export class TaxonomyNode extends React.Component {
  constructor (props) {
    super(props)
    this.state = { open: false }
  }

  toggleNode = (e) => {
    e.stopPropagation()
    this.setState({ open: !this.state.open })
  }

  render () {
    const { tree } = this.props

    if (!tree.size) {
      return (
        <li key={tree.name} onClick={(e) => e.stopPropagation()}>
          {tree.name} ({tree.size})
        </li>
      )
    }

    return (
      <li key={tree.name} onClick={this.toggleNode}>
        {tree.name} ({tree.size})
        {tree.children && this.state.open && this.renderChildren(tree)}
      </li>
    )
  }

  renderChildren (tree) {
    return <ul>{tree.children.map((child) => (<TaxonomyNode tree={child}/>))}</ul>
  }
}
