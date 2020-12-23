const initialState = {
  message: '',
  timer: undefined
}

const notificatonReducer = (state = initialState , action) => {

  switch(action.type) {
    case 'SET_NOTIFICATION':
      if(state.timer) {
        clearTimeout(state.timer)
      }
      return { timer: action.data.timer, message: action.data.message } 
    case 'CLEAR_NOTIFICATION':
        return { timer: undefined , message: '' }
    default:
      return state
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    const timer = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, time * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, timer }
    }) 
  }
}

export default notificatonReducer