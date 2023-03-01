const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// All routes "starts with" / (root)

// POST /movies/:id/reviews
router.post('/posts/:id/comments', ensureLoggedIn, commentsCtrl.create);
// DELETE /reviews/:id
router.delete('/comments/:id', ensureLoggedIn, commentsCtrl.delete);





module.exports = router;