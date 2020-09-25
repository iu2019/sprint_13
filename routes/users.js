const router = require('express').Router();

const {
  readUsers, readUserById, createUser, updateUser, updateUserAvatar,
} = require('../controllers/users');

router.post('/', createUser);

router.get('/:id', readUserById);

router.get('/', readUsers);

router.patch('/:id', updateUser);

router.patch('/:id/avatar', updateUserAvatar);

module.exports = router;
