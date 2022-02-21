describe('blog app', function() {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

  Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
    cy.request({
      url: 'http://localhost:3001/api/blogs',
      method: 'POST',
      body: { title, author, url, likes },
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('userLogBlogList')).token}`
      }
    })
  
    cy.visit('http://localhost:3000')
  })

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Salman Saddam',
      username: 'salman',
      password: 'qwerty'
    }
    const user1 = {
      name: 'John Doe',
      username: 'john',
      password: 'qwerty'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.request('POST', 'http://localhost:3001/api/users', user1)
    cy.visit('http://localhost:3000')
  })

  it('check default screen', function () {
    cy.contains('Login to use application')
    cy.contains('login').click()
  });

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('salman')
      cy.get('#password').type('qwerty')
      cy.get('#login-btn').click()
      cy.contains('Welcome Salman Saddam')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('salman')
      cy.get('#password').type('qwerty123')
      cy.get('#login-btn').click()
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {  
      cy.contains('login').click()
      cy.get('#username').type('salman')
      cy.get('#password').type('qwerty')
      cy.get('#login-btn').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('The day is bright, isn\'t it?')
      cy.get('#author').type('Salman Saddam')
      cy.get('#url').type('www.salman-inc.com')
      cy.get('#create-btn').click()
      cy.contains('The day is bright, isn\'t it?')
    })

    it('user can like a blog', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('The day is bright, isn\'t it?')
      cy.get('#author').type('Salman Saddam')
      cy.get('#url').type('www.salman-inc.com')
      cy.get('#create-btn').click()

      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('Likes: 1')
    })
  })

  describe('remove blog', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('#username').type('salman')
      cy.get('#password').type('qwerty')
      cy.get('#login-btn').click()
      cy.contains('create new blog').click()
      cy.get('#title').type('The day is bright, isn\'t it?')
      cy.get('#author').type('Salman Saddam')
      cy.get('#url').type('www.salman-inc.com')
      cy.get('#create-btn').click()
      cy.contains('logout').click()
    })

    it('only creator can delete a blog', function () {
      cy.contains('login').click()
      cy.get('#username').type('salman')
      cy.get('#password').type('qwerty')
      cy.get('#login-btn').click()
      cy.contains('view').click()
      cy.contains('remove').click() 
      cy.contains('create new blog').click()
      cy.get('#title').type('The day is bright, isn\'t it?')
      cy.get('#author').type('Salman Saddam')
      cy.get('#url').type('www.salman-inc.com')
      cy.get('#create-btn').click()
    })

    it('unapproved can\'t delete a blog', function () {
      cy.contains('login').click()
      cy.get('#username').type('john')
      cy.get('#password').type('qwerty')
      cy.get('#login-btn').click()
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('blog layout', function () {
    const blogs = [
      {
        title: 'The day is probably bright but we too tired to see',
        author: 'missing guy',
        url: 'www.missing.com',
        likes: 58
      },
      {
        title: 'is probably bright but we too tired to see',
        author: 'missing guy',
        url: 'www.missing.com',
        likes: 100
      },
      {
        title: 'probably bright but we too tired to see',
        author: 'missing guy',
        url: 'www.missing.com',
        likes: 900
      },
      {
        title: 'bright but we too tired to see',
        author: 'missing guy',
        url: 'www.missing.com',
        likes: 6900
      },
      {
        title: 'Pray it gets better, work like it\'s better',
        author: 'missing guy',
        url: 'www.missing.com',
        likes: 1000
      },
      {
        title: 'The day is probably bright but we too tired',
        author: 'missing guy',
        url: 'www.missing.com',
        likes: 579
      },
    ]
    beforeEach(function() { 
      cy.request('POST', 'http://localhost:3001/api/login', {
      username: 'salman', password: 'qwerty'
      }).then(response => {
        localStorage.setItem('userLogBlogList', JSON.stringify(response.body))
      })

      cy.createBlog({ title:blogs[0].title, author:blogs[0].author, url:blogs[0].url, likes:blogs[0].likes })
      cy.createBlog({ title:blogs[1].title, author:blogs[1].author, url:blogs[1].url, likes:blogs[1].likes })
      cy.createBlog({ title:blogs[2].title, author:blogs[2].author, url:blogs[2].url, likes:blogs[2].likes })
      cy.createBlog({ title:blogs[3].title, author:blogs[3].author, url:blogs[3].url, likes:blogs[3].likes })
      cy.createBlog({ title:blogs[4].title, author:blogs[4].author, url:blogs[4].url, likes:blogs[4].likes })
      cy.createBlog({ title:blogs[5].title, author:blogs[5].author, url:blogs[5].url, likes:blogs[5].likes })

      cy.visit('http://localhost:3000')
    })

    it('compare blogs by likes descending order', function () {
      cy.get('.likes-count').then(function(likes) {
        let likesToArray = Array.from(likes)
        const newLikes = likesToArray.map((like) => {
          let text = like.innerText;
          return Number(text.substring(7))
        });
        const newBlogs = blogs.map((blog) => blog.likes);

        expect(newLikes).to.deep.eq(newBlogs.sort((a, b) => b - a))
      })
    })
  })

});