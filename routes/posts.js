const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /POSTS
router.get('/', postsCtrl.index);

router.get('/new', ensureLoggedIn, postsCtrl.new)

router.get('/:id/show', postsCtrl.show);

router.post('/new', ensureLoggedIn, postsCtrl.create);

module.exports = router;