import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');

  const addBlogInfo = async(e) => {
    e.preventDefault();

    createBlog({
      title: title,
      author: author,
      url: url
    });

    setTitle('');
    setAuthor('');
    setURL('');
  };

  return (
    <div>
      <form onSubmit={addBlogInfo}>
        <p>add new whatever this is</p>
        <input
          id='title'
          type={'text'}
          placeholder='title'
          onChange={({ target }) => setTitle(target.value)}
        />
        <input
          id='author'
          type={'text'}
          placeholder='author'
          onChange={({ target }) => setAuthor(target.value)}
        />
        <input
          id='url'
          type={'text'}
          placeholder='url'
          onChange={({ target }) => setURL(target.value)}
        />
        <button id='create-btn' type="submit">create</button>
      </form>
    </div>
  );
};


export default BlogForm;