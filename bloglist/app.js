const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('express-async-errors');
const blogRouter = require('./controllers/controllers');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const config = require('./utils/config');
const middleware = require('./utils/middlewares');

const url = config.MONGODB_URI;
console.log('connecting to DB')

async function connectDB(){
  await mongoose.connect(url);
  console.log("db connected")
}

connectDB();


const userExtractor = middleware.getTokenFrom;

app.use(cors());
app.use(express.json());

app.use('/api/blogs', userExtractor, blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(middleware.errorHandler);
app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);

module.exports = app;