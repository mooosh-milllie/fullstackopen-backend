const dummy = (blogs) => {
  if (Array.isArray(blogs)) {
    return 1
  }
  return 'nada';
}

const totalLikes = (blogPosts) => {
  
  const arr = [];
  blogPosts.map((blog) => {
    arr.push(blog.likes)
  })

  return arr.reduce((a, b) => a + b);
}

const favoriteBlog = (blogs) => {

  const arr = [];
  blogs.map((blog) => {
    arr.push(blog.likes)
  })

  const favorite = blogs.find(blog => {

    return blog.likes === Math.max(...arr);
  })
  return favorite.likes;
}

const authorMostLikes = (blogs) => {
  const arrr = [];

  let authors = blogs.map(blog => blog.author);

  authors = authors.filter((author, index) => {
    return authors.indexOf(author) === index
  })

  for (let i = 0; i < authors.length; i++) {
    let list = blogs.filter(blog => blog.author === authors[i]);
    arrr.push({author: authors[i], likes:list.map(n => n.likes).reduce((a, b)=> a + b) });
  }
  let numOfLikes = arrr.map(arr => arr.likes);
  let maxLikes = Math.max(...numOfLikes);
  
  return arrr.find(arr => arr.likes === maxLikes);
}

const authorMostBlogs = (blogs) => {
  const authornames = blogs.map(authorname => authorname.author);

  const authornamescount = {};
  for (let name of authornames) {
    if (authornamescount[name]) {
      authornamescount[name] += 1
    } else {
      authornamescount[name] = 1
    }
  }

  const maxNumberOfBlogs = Math.max(...Object.values(authornamescount));

  for ([key, value] of Object.entries(authornamescount)) {
    if (value === maxNumberOfBlogs) {
      return {author: key, blogs: value}
    }
  }
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  authorMostLikes,
  authorMostBlogs
}