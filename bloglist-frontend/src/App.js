import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import notification from './components/Notification';
import Togglable from './components/Togglable';
import LoginForm from './components/Loginform';
import BlogForm from './components/Blogform';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errnotif, setErrNotif] = useState(null);
  const [notif, setNotif] = useState(null);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('userLogBlogList');
    if (loggedInUser) {
      const storedUser = JSON.parse(loggedInUser);
      setUser(storedUser);
      blogService.getAll().then(blogs => {
        const sortedByLikes = blogs.sort((a, b) => b.likes - a.likes);
        setBlogs(sortedByLikes);
      }).catch(error => {
        console.log(error.message);
      });
      blogService.setToken(storedUser.token);
      // (function () {
      //   blogService.getUserBlogs(storedUser.id).then(blogs => {
      //     setTimeout(() => {
      //       setBlogs(blogs.blog);
      //     }, 1000)
      //   })
      // })()
    }
  },[]);

  const blogFormRef = useRef();


  const loginHandler = async (loginObject) => {
    console.log('about to sign you in');

    try {
      const user = await loginService.login(loginObject);
      window.localStorage.setItem(
        'userLogBlogList', JSON.stringify(user)
      );

      setUser(user);
      blogService.setToken(user.token);
      blogService.getAll().then( blogs => {
        const sortedByLikes = blogs.sort((a, b) => b.likes - a.likes);
        setBlogs(sortedByLikes);
      });
      // blogService.getUserBlogs(user.id).then(blogs => {
      //     setBlogs(blogs.blog)
      // })
    } catch (exception) {
      console.log(exception.message);
      setErrNotif('Wrong username or password');
      setTimeout(() => {
        setErrNotif(null);
      },5000);
    }

  };

  const addBlogInfo = async(blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();

      const result = await blogService.addNewBlog(blogObject);
      setNotif( `A new blog ${result.title} by ${result.author} added`);
      setBlogs(blogs.concat(result));
      setTimeout(() => {
        setNotif(null);
      }, 2000);
    } catch (error) {
      setErrNotif('unable to complete request, fill all required fields');
      setTimeout(() => {
        setErrNotif(null);
      },5000);
    }
  };
  const likeBlog = async(id) => {
    const blogList = blogs.find(blog => {
      return blog.id === id;
    });
    const likedBlog = { ...blogList, likes: ++blogList.likes };

    try {
      const result = await blogService.updatelikes(id, likedBlog);

      setBlogs(blogs.map(blog => blog.id !== id ? blog : result));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async(id) => {
    try {
      await blogService.deleteBlog(id);
      setBlogs(blogs.filter(blog => blog.id !== id));
      setNotif('blog has been');
    } catch (error) {
      setErrNotif('can\'t complete delete request');
      setTimeout(() => {
        setErrNotif(null);
      }, 3000);
    }
  };



  if (user === null) {
    return (
      <div>
        <h2>Login to use application</h2>
        <notification.ErrorNotification message={errnotif}/>
        <Togglable buttonLabel="login">
          <LoginForm
            loginUser={loginHandler}
          />
        </Togglable>

      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>

      <div>
        <h4>Welcome {user.name}</h4>
        <button onClick={() => {
          window.localStorage.removeItem('userLogBlogList');
          setUser(null);
        }}>logout</button>
      </div>
      <notification.Notification message={notif}/>
      <notification.ErrorNotification message={errnotif}/>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlogInfo} />
      </Togglable>

      {blogs.map((blog) => {
        return <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog}/>;
      })}
    </div>
  );
};

export default App;