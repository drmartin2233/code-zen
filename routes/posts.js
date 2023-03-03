const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const ensureLoggedIn = require('../config/banana');


// GET /POSTS
router.get('/', postsCtrl.index);

router.get('/new', ensureLoggedIn, postsCtrl.new)

router.post('/new', ensureLoggedIn, postsCtrl.create);

router.get('/:id', postsCtrl.show);

router.delete('/:id', ensureLoggedIn, postsCtrl.delete);

router.put('/:id/update', ensureLoggedIn, postsCtrl.update);

router.get('/:id/edit', ensureLoggedIn, postsCtrl.edit);




module.exports = router;