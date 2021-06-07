const initialState = {
  message: '',
  timer: undefined,
  color: undefined
}

const notificationReducer = (state = initialState , action) => {

  switch(action.type) {
  case 'SET_NOTIFICATION':
    if(state.timer) {
      clearTimeout(state.timer)
    }
    return { timer: action.data.timer, message: action.data.message, color: action.data.color }
  case 'CLEAR_NOTIFICATION':
    return { initialState }
  default:
    return state
  }
}


export const setNotification = (message, time, color) => {
  return async dispatch => {
    const timer = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, time * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, timer, color }
    })
  }
}

export default notificationReducer