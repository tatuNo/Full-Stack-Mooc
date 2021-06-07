import React, { useRef, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogFrom'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import { useDispatch } from 'react-redux'
import { userLogout } from './reducers/userReducer'
import { useSelector } from 'react-redux'
import {
  Switch, Route, Link, useRouteMatch
} from 'react-router-dom'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import { getAllUsers } from './reducers/usersReducer'
import { initBlogs } from './reducers/blogsReducer'
import { Container, AppBar, Toolbar, Button } from '@material-ui/core/'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch, blogs])

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  const matchUser = useRouteMatch('/users/:id')
  const matchedUser = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const loginForm = () => (
    <LoginForm />
  )

  const blogForm = () => (
    <Togglable buttonLabel="new post" ref={blogFormRef}>
      <BlogForm blogFormRef={blogFormRef} />
    </Togglable>
  )

  return (
    <Container>
      <Notification />
      {user === null ?
        loginForm() :
        <div>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to="/">blogs</Button>
              <Button color="inherit" component={Link} to="/users">users</Button>
              <em>{user.name} logged in </em> 
              <Button color="inherit" onClick={() => dispatch(userLogout())}>logout</Button>
            </Toolbar>
          </AppBar>
          <h2>blog app</h2>
          <Switch>
            <Route path="/users/:id">
              <User user={matchedUser} />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails user={user} />
            </Route>
            <Route path="/users">
              <Users users={users} />
            </Route>
            <Route path="/">
              {blogForm()}
              <div id="blogdiv">
                <Blogs blogs={blogs} />
              </div>
            </Route>
          </Switch>
        </div>
      }
    </Container>
  )
}

export default App