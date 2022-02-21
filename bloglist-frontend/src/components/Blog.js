import React, { useState } from 'react';
const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [blogVisibity, setBlogVisibility] =  useState(false);

  const showDetails = {
    display: blogVisibity ? '' : 'none',
  };
  const mainDiv = {
    border: '2px solid black',
    padding: '20px',
    marginTop: '10px',
    borderRadius: '4px',
  };

  const toggleBlogVisibility = () => {
    setBlogVisibility(!blogVisibity);
  };

  return(
    <div style={mainDiv} className="blog-container">
      {blog.title} : {blog.author} <button id='button' onClick={(toggleBlogVisibility)} >{blogVisibity ? 'hide' : 'view'}</button>
      <div id='blog-details' style={showDetails}>
        <p>{blog.url}</p>
        <div>
          <span className='likes-count'>Likes: {blog.likes}</span> <button id='like-button' onClick={() => likeBlog(blog.id)}>like</button>
        </div>
        <button onClick={() => {
        // eslint-disable-next-line no-restricted-globals
          if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            deleteBlog(blog.id);
          }
        }}>remove</button>
      </div>
    </div>
  );};

export default Blog;