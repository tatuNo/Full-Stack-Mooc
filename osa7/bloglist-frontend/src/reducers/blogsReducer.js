import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  case 'UPDATE_BLOG':
    return state.map(blog => blog.id === action.data.id ? action.data : blog)
  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeABlog = blog => {
  return async dispatch => {
    blog.likes += 1
    const likedBlog = await blogService.update(blog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: likedBlog
    })
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog
    })
  }
}

export const commentBlog = (id, comment) => {
  return async dispatch => {
    const commentedBlog = await blogService.comment(id, comment)
    dispatch({
      type: 'UPDATE_BLOG',
      data: commentedBlog
    })
  }
}

export default blogsReducer