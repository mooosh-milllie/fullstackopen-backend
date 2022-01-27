const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const Phone = require('./models/phonebook');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static('build'));

morgan.token('postInfo', (request) => (request.method === 'POST' ? ` ${JSON.stringify(request.body)}` : ' '));

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :postInfo',
  ),
);

app.get('/', (request, response) => {
  response.send('<h1> HELLO WORLD </h1>');
});

app.get('/api/persons', (request, response) => {
  Phone.find({}).then((result) => {
    response.json(result);
  });
});
app.get('/api/persons/:id', (request, response, next) => {
  Phone.findById(request.params.id)
    .then((contact) => {
      if (contact) {
        response.json(contact);
      } else {
        response.status(400).end();
      }
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const { body } = request;

  const newContact = new Phone({
    name: body.name,
    number: body.number,
  });
  newContact.save().then(() => {
    response.json(newContact);
  })
    .catch((error) => {
      next(error);
    });
});

app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request;

  const contactToUpdate = {
    name: body.name,
    number: body.number,
  };

  Phone.findByIdAndUpdate(request.params.id, contactToUpdate, { new: true })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      next(error);
    });
});

app.delete('/api/persons/:id', (request, response, next) => {
  Phone.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.get('/info', (request, response) => {
  Phone.find({})
    .then((result) => {
      const numberOfContacts = result.length;
      const today = new Date();
      const display = `<div>
      <p> Phonebook has info for ${numberOfContacts} people</p>
      <p> ${today} </p>
      </div>
      `;
      response.send(display);
    });
});
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    response.status(400).send({
      error: 'Unexpected data-type',
    });
  } else if (error.name === 'ValidatorError') {
    response.status(400).json({
      error: error.message,
    });
  } else {
    return response.status(400).json({
      error: error.message,
    });
  }

  return next(error);
};
app.use(errorHandler);
const PORT = process.env.PORT || 3001;

app.listen(PORT);
