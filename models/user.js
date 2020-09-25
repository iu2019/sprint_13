const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: [true, 'Здесь нужна ссылка на аватар'],
    validate: (value) => validator.isURL(value, {
      message: 'Must be a Valid URL', protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true,
    }),
  },

});

module.exports = mongoose.model('user', userSchema);
