const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /POSTS
router.get('/', postsCtrl.index);

router.get('/:id', postsCtrl.show);

router.post('/', ensureLoggedIn, postsCtrl.create);

module.exports = router;