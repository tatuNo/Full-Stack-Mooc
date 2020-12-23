import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  
  const addAnec = async event => {
    event.preventDefault()
    const content = event.target.anec.value
    event.target.anec.value = ''
    props.addAnecdote(content)
    props.setNotification(`added ${content}`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnec}> <input name='anec' />
      <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addAnecdote,
  setNotification  
}

export default connect (
  null,
  mapDispatchToProps
)(AnecdoteForm)