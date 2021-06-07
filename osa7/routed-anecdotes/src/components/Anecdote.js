import React from 'react'
import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdoteById }) => {
  const anecdote = anecdoteById(useParams().id)
  return(
    <div>
      <h2>{anecdote.content}</h2>
      <div>
        <p>has {anecdote.votes} votes </p>
      </div>
      <div>
        <p>for more info see <a href={anecdote.info}>{anecdote.info}</a>
        </p>
      </div>
    </div>
  )
}

export default Anecdote