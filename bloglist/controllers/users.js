const userRouter = require('express').Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blog', {title: 1, author: 1, url: 1, likes: 1});
  response.status(200).json(users);
})

userRouter.get('/:id', async (request, response) => {
  const userID = request.user;
  if (!userID) {
    return response.status(401).json({
      error: 'Unauthorized request'
    });
  }
  if (userID === request.params.id) {
   const user = await User.findById(request.params.id).populate('blog', {author: 1, title:1, url: 1, likes: 1});
   return response.json(user);
  }
  return response.status(401).json({
    error: 'Unathorized request'
  })
})

userRouter.post('/', async (request, response) => {
  const body = request.body;
  const saltRound = 10;
  if (body.password.length < 3) {
    return response.status(400).json({
      error: "password too short"
    });
  }
  const hashedPassword = await bcrypt.hash(body.password, saltRound);
    const user = new User({
      name: body.name,
      username: body.username,
      passwordhash: hashedPassword,
    })
  
    const savedUser = await user.save();
    response.status(201).send(savedUser);
  
})

module.exports = userRouter;