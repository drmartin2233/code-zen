const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// All routes "starts with" / (root)

// POST /movies/:id/comments
router.post('/posts/:id/comments', ensureLoggedIn, commentsCtrl.create);
// DELETE /comments/:id
router.delete('/posts/:id/comments/:id', ensureLoggedIn, commentsCtrl.delete);

// router.put('posts/:id/update', ensureLoggedIn, commentsCtrl.update);

// router.get('posts/:id/edit', ensureLoggedIn, commentsCtrl.edit);




module.exports = router;