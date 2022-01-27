const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

mongoose.connect(url)
  .then(() => {
  })
  .catch(() => {
  });

const phoneSchema = new mongoose.Schema({
  name: {
    type: String, minlength: 3, unique: true, required: true,
  },
  number: {
    type: String, minlength: 8, unique: true, required: true,
  },
});

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

phoneSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Phone', phoneSchema);
