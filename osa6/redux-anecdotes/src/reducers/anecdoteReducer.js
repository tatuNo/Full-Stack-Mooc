import anecdoteService from '../services/anecdotes'

const sorting = (anecdotes) => {
  return anecdotes.sort((a , b) => b.votes - a.votes)
}

const anecdoteReducer = (state = [], action) => {
  
  switch(action.type) {
    case 'ADD':
      return sorting([...state, action.data])
    case 'VOTE':
      return sorting(state.map(a => a.id !== action.data.id ? a : action.data))
      case 'INIT':
      return sorting(action.data)
    default:
      return state 
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    anecdote.votes++
    const returnobj = await anecdoteService.update(anecdote)
    dispatch({
    type: 'VOTE',
    data: returnobj
    })
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.create(content)
    dispatch({
    type: 'ADD',
    data: anecdote
    })
  }
}

export const intializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
    type: 'INIT',
    data: anecdotes
    })
  }
}

export default anecdoteReducer