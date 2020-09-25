const User = require('../models/user');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

const readUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const readUserById = (req, res) => {
  let errStatus = 400;
  User.findById(req.params.id)
    .orFail(() => {
      errStatus = 404;
      throw new ValidationError('Нет пользователя с таким id');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(errStatus).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Ошибка валидации полей пользователя' }));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  let errStatus = 400;
  User.findByIdAndUpdate(req.params.id, { name, about })
    .orFail(() => {
      errStatus = 404;
      throw new ValidationError('Нет пользователя с таким id');
    })
    .then(() => res.status(201).send({ data: { name, about } }))
    .catch((err) => res.status(errStatus).send({ message: err.message }));
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  let errStatus = 400;
  User.findByIdAndUpdate(req.params.id, { avatar })
    .orFail(() => {
      errStatus = 404;
      throw new ValidationError('Нет пользователя с таким id');
    })
    .then(() => res.status(201).send({ data: { avatar } }))
    .catch((err) => res.status(errStatus).send({ message: err.message }));
};

module.exports = {
  readUsers, readUserById, createUser, updateUser, updateUserAvatar,
};
