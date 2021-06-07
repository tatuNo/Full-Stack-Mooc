import usersService from '../services/users'

const usersReducer = (state = [], action) => {
  switch(action.type) {
  case 'GET_ALL':
    return action.data
  default:
    return state
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type:'GET_ALL',
      data: users
    })
  }
}

export default usersReducer