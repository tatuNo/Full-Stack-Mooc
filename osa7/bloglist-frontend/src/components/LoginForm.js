import React,{ useState } from 'react'
import { userLogin } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { TextField, Button } from '@material-ui/core'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    const userObject = {
      username: username,
      password: password
    }
    dispatch(userLogin(userObject))
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h2>blogs</h2>
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
           <TextField
              label="username"
              type="text"
              name="Username"
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
          <TextField
              label="password"
              type="password"
              name="Password"
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <Button id="login-button" variant="contained" color="primary" type="submit">Login</Button>
        </form>
      </div>
    </>
  )
}

export default LoginForm