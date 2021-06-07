import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const initialState = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  if(loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    return user
  }
  return null
}

const userReducer = (state = initialState(), action) => {
  switch(action.type) {
  case 'LOGIN':
    return state = action.data
  case 'LOGOUT':
    return state = initialState()
  default:
    return state
  }
}

export const userLogin = userObject => {
  return async dispatch => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem (
        'loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 5, 'red'))
    }
  }
}

export const userLogout = () => {
  window.localStorage.removeItem('loggedUser')
  blogService.setToken(null)
  return {
    type: 'LOGOUT',
    data: null
  }
}

export default userReducer