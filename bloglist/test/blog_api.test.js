const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blogs')
const api = supertest(app);

const firstBlogs = [
  {
    title: "Learn the everything way",
    author: "Everything Guy",
    url: "www.everything.com",
    likes: 508
  },
  {
    title: "Learn the crazy way",
    author: "Crazy Guy",
    url: "www.crazy.com",
    likes: 10
  },
  {
    title: "Learn the anyhow way",
    author: "Anyhow Guy",
    url: "www.anyhow.com",
    likes: 73
  }
]
let token;
beforeAll( async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(firstBlogs);

  await api
  .post('/api/login')
  .send({
    username: 'qwerty',
    password: 'qwerty',
  })
  .then((res) => {
    token = res.body.token;
  })
  
  // for (blog of firstBlogs) {
  //   let blogObj = new Blog(blog);
  //   await blogObj.save();
  // }
})

test('verify the correct amount of blog posts in the JSON format', async () => {
  let blog =  await api.get('/api/blogs');
  expect(blog.headers["content-type"]).toMatch(/application\/json/);
  expect(blog.body).toHaveLength(3);
})

test('verify that the identifier returns id and not _id', async () => {
  let blog = await Blog.find({});
  const verifier = blog[0].id;
  expect(verifier).toBeDefined();
})

test('to post and and return correct number of posts plus 1', async () => {

  const newBlog = {
    title: "Learn the right way",
    author: "Right Guy",
    url: "www.rightway.com",
    likes: 100,
    userId: "61fb107e22eeadde5e247f1d"
  }
  const currentBlogs = await Blog.find({});

  const blog = await api
  .post('/api/blogs')
  .set('Authorization', 'bearer ' + token)
  .send(newBlog)
  

  const recentBlogs = await Blog.find({});
  expect(blog.statusCode).toEqual(201);
  expect(recentBlogs.length).toEqual(currentBlogs.length + 1);
  
})

test('check if likes is empty and return 0', async () => {
  const data = {
    title: "Learn the everything",
    author: "Everything Guy",
    url: "www.everything.com"
  }

  const blog = await api
  .post('/api/blogs')
  .set('Authorization', 'bearer ' + token)
  .send(data)

  expect(blog.body.likes).toEqual(0);
  
})

test('that verifies that if the title and url properties are missing, responds with status 400', async () => {
  const newBlog = {
    title: "Missing for life",
    author: "Missing Guy",
    likes: 898
  }
  const blog = await api
  .post('/api/blogs')
  .set('Authorization', 'bearer ' + token)
  .send(newBlog)

  expect(blog.statusCode).toBe(400);
})

afterAll(() => {
  mongoose.connection.close()
})