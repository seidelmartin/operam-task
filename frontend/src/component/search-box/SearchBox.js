import React from 'react'

export class SearchBox extends React.Component {
  onChange = (e) => {
    const value = e.target.value

    this.timeout && clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.props.onChange(value || undefined)
    }, 300)
  }

  render () {
    return (
      <div>
        <label htmlFor="search-box">Search</label>
        <input type="text" id="search-box" name="search-box" onChange={this.onChange}/>
      </div>
    )
  }
}
