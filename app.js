const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const getUsers = require('./routes/users');
const getCards = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.set('runValidators', true);

app.use((req, res, next) => {
  req.user = {
    _id: '5f67dc2270485bd023547399', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});
app.use('/users', getUsers);
app.use('/', getCards);
app.use('/', (req, res) => {
  res.set({ 'content-type': 'application/json; charset=utf-8' });
  res.status(404).end(JSON.stringify({ message: 'Запрашиваемый ресурс не найден' }), 'utf8');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
