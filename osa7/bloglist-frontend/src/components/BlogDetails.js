import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { removeBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { likeABlog, commentBlog } from '../reducers/blogsReducer'
import { Card, makeStyles, CardHeader, CardContent,
CardActions, Collapse, Avatar, IconButton, Typography, TextField, ListItem, List, ListItemText } from '@material-ui/core/'
import { red } from '@material-ui/core/colors'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddCircle from '@material-ui/icons/AddCircle'
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt'
import Delete from '@material-ui/icons/Delete'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}))

const BlogDetails = ({ user }) => {
  const [comment, setComment] = useState('')
  const [expanded, setExpanded] = useState(false)
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()

  const likeBlog = async blog => {
    dispatch(likeABlog(blog))
  }

  const deleteBlog = async blog => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      dispatch(removeBlog(blog))
      dispatch(setNotification(`a blog ${blog.title} by ${blog.author} removed`, 5, 'green'))
      history.push('/')
    }
  }

  const createComment = async () => {
    const newComment = {
      comments: comment
    }
    dispatch(commentBlog(id, newComment))
    setComment('')
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  if(!blog) {
    return null
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            B
          </Avatar>
        }
        title={`${blog.title} by ${blog.author}`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {blog.url}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {blog.likes} likes
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          added by {blog.user[0].name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <ThumbUpAlt onClick={() => likeBlog(blog)}/>
        </IconButton>
        { user.username === blog.user[0].username ?
        <IconButton aria-label="delete">
          <Delete onClick={() => deleteBlog(blog)}/>
        </IconButton>
          : null
        }
        <IconButton>
          <AddCircle onClick={createComment}/>
        </IconButton>
        <TextField
        label="comment"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        />
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <List>
            {blog.comments.map(comment =>
              <ListItem key={comment} alignItems="flex-start">
                <ListItemText secondary={
                  <Typography variant="body2">
                    {comment}
                  </Typography>
                }
                />
                </ListItem>
            )}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default BlogDetails