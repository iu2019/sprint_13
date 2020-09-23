const Card = require('../models/card');

const readCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Ошибка чтения карточек' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Ошибка создания карточки' }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Ошибка удаления карточки' }));
};

const setLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { // добавить _id в массив, если его там нет
        likes: req.user._id,
      },
    },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Ошибка удаления лайка' }));
};

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { // убрать _id из массива
        likes: req.user._id,
      },
    },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Ошибка удаления лайка' }));
};

module.exports = {
  readCards, createCard, deleteCard, setLike, removeLike,
};
