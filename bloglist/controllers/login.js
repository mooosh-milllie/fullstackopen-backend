const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/users');

loginRouter.post('/', async (request, response) => {
  const body = request.body;
  const userCheck = await User.findOne({username: body.username});

  const password = userCheck === null ? false : await bcrypt.compare(body.password, userCheck.passwordhash);

  if (!(userCheck && password)) {
    return response.status(400).json({error: "Invalid username or password"});
  }
  
  const userForToken = {
    username: userCheck.username,
    id: userCheck._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })

  response
    .status(200)
    .send({ token, username: userCheck.username, name: userCheck.name, id: userCheck.id })
})







module.exports = loginRouter;