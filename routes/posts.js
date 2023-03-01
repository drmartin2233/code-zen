const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const ensureLoggedIn = require('../config/ensureLoggedIn');
//const commentsCtrl = require('../controllers/comments');

// GET /POSTS
router.get('/', postsCtrl.index);

router.get('/new', ensureLoggedIn, postsCtrl.new)

router.post('/new', ensureLoggedIn, postsCtrl.create);

router.get('/:id', postsCtrl.show);

router.delete('/:id', postsCtrl.delete);

router.put('/:id', postsCtrl.update);

module.exports = router;