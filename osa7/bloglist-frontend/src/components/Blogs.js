import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'
import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {

  const sortedBlogs = blogs => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  return(
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {sortedBlogs(blogs).map(blog => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Blogs