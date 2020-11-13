import React from 'react'

const Filter = (props) => {
    return(
      <div>
      search <input
        value={props.filter}
        onChange={props.onChange} />
        </div>
    )
  }

  export default Filter