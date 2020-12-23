import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={(e) => props.setFilter(e.target.value)} />
    </div>
  )
}

export default connect(
  null,
  { setFilter }
)(Filter)