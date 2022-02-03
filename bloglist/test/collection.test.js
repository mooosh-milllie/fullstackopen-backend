const listHelper = require('../utils/list_helper');


describe('returns 1', () => {

  test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})




describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithMoreThanOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('when list has more than one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithMoreThanOneBlog)
    expect(result).toBe(15)
  })
})





describe('Highest likes', () => {
  

  const listWithMoreThanOneBlog = [
    {
      _id: 'ppp22aa71b54a676234d17f8',
      title: 'teuei Considered Harmful',
      author: 'Edsger Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 990,
      __v: 0
    },
    {
      _id: '42622aa71b54a676234d17f8',
      title: 'Statement Considered Harmful',
      author: 'Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 50,
      __v: 0
    },
    {
      _id: '67722aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 500,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '4fffggfaa71b54a676234d17f8',
      title: 'A Day Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 499,
      __v: 0
    },
    {
      _id: '4fffggfaa71b54a676234d17f8',
      title: 'A Day Considered Harmful',
      author: 'Edsger Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1000,
      __v: 0
    },
    {
      _id: '4fffggfaa71b54a676234d17f8',
      title: 'A Day Considered Harmful',
      author: 'Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 499,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    }
  ]

  test('Get blog with the highest number of likes', () => {
    const result = listHelper.favoriteBlog(listWithMoreThanOneBlog)
    expect(result).toEqual(1000)
  })
  

  test('Author with most cumulative likes', () => {
    const result = listHelper.authorMostLikes(listWithMoreThanOneBlog);

    expect(result).toEqual({author: 'Edsger Dijkstra', likes: 1990})

  })

  test('Author with most blogs', () => {
    const result = listHelper.authorMostBlogs(listWithMoreThanOneBlog);

    expect(result).toEqual({author: 'Edsger W. Dijkstra', blogs: 5})
  })
})