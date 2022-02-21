import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import Blogform from './Blogform';


test('render specific part by default', () => {
  const blog = {
    title: 'The day is bright',
    url: 'http://missing.com',
    author: 'missing guy',
    likes: 10
  };

  const { container } = render(<Blog blog={blog} />);

  const result = container.querySelector('#blog-details');

  expect(result).toBeDefined();
  expect(result).toHaveStyle('display: none');
});

test('check if hidden part shows when button is clicked', () => {
  const blog = {
    title: 'The day is bright',
    url: 'http://missing.com',
    author: 'missing guy',
    likes: 10
  };

  const { container } = render(<Blog blog={blog} />);
  const button = container.querySelector('#button');

  userEvent.click(button);
  const result = container.querySelector('#blog-details');
  expect(result).toHaveStyle('display: block');

});

test('check when button is clicked twice', () => {
  const blog = {
    id: '64ruu4i45rujrti544',
    title: 'The day is bright yeah yeah yeah',
    url: 'http://missing.com',
    author: 'missing guy',
    likes: 10
  };
  const mockHandler = jest.fn();
  const { container } = render(<Blog blog={blog} likeBlog={mockHandler} />);
  const button = container.querySelector('#button');

  userEvent.click(button);

  const likeButton = container.querySelector('#like-button');
  userEvent.click(likeButton);
  userEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);

  // screen.debug(likeButton);
});

test('blog form event handler recieves the right details', () => {
  const createBlog = jest.fn();
  render(<Blogform createBlog={createBlog} />);
  const title = screen.getByPlaceholderText('title');
  const author = screen.getByPlaceholderText('author');
  const url = screen.getByPlaceholderText('url');
  const submit = screen.getByText('create');

  userEvent.type(title, 'The day is bright I guess');
  userEvent.type(author, 'missing guy');
  userEvent.type(url, 'www.missing.com');
  userEvent.click(submit);

  expect(createBlog.mock.calls[0][0].title).toBe('The day is bright I guess');
  expect(createBlog.mock.calls[0][0].author).toBe('missing guy');
  expect(createBlog.mock.calls[0][0].url).toBe('www.missing.com');
});