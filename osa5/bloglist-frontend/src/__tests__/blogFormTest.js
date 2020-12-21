import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../components/BlogFrom'

describe('<BlogForm />', () => {

  test('updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const title = component.container.querySelector('.title')
    const author = component.container.querySelector('.author')
    const url = component.container.querySelector('.url')
    const form = component.container.querySelector('form')

    const expectedObject = {
      title: 'Fishing',
      author: 'Matti',
      url: 'www.fishing.com'
    }

    fireEvent.change(title, {
      target: { value: expectedObject.title }
    })
    fireEvent.change(author, {
      target: { value: expectedObject.author }
    })
    fireEvent.change(url, {
      target: { value: expectedObject.url }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual(expectedObject)
  })
})