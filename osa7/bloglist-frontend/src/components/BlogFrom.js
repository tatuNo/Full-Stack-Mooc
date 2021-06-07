import React, { useState  } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { TextField, Button } from '@material-ui/core'

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const addBlog = async event => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    try {
      dispatch(createBlog(blogObject))
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 5, 'green'))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 5, 'red'))
    }

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            variant="filled"
            label="title"
            className="title"
            id="title"
            type="text"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          <TextField
            variant="filled"
            label="author"
            className="author"
            id="author"
            type="text"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
          <TextField
            variant="filled"
            label="url"
            className="url"
            id="url"
            type="text"
            name="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <Button color="primary" variant="contained" id="createblog" type="submit">create</Button>
      </form>
    </div>
  )
}

export default BlogForm