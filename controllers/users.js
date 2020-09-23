/* eslint-disable linebreak-style */
const User = require('../models/user');

const readUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const readUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Ошибка чтения пользователя по идентификатору' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Ошибка создания пользователя' }));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then(() => res.send({ data: { name, about } }))
    .catch(() => res.status(400).send({ message: 'Ошибка редактирования пользователя' }));
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then(() => res.send({ data: { avatar } }))
    .catch(() => res.status(400).send({ message: 'Ошибка редактирования аватара' }));
};

module.exports = {
  readUsers, readUserById, createUser, updateUser, updateUserAvatar,
};
