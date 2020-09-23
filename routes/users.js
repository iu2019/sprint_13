const router = require('express').Router();
// const bodyParser = require('body-parser');
const {
  readUsers, readUserById, createUser, updateUser, updateUserAvatar,
} = require('../controllers/users');

// router.use(bodyParser.json());

router.post('/', createUser);

router.get('/:id', readUserById);

router.get('/', readUsers);

router.patch('/:id', updateUser);

router.patch('/:id/avatar', updateUserAvatar);

module.exports = router;
