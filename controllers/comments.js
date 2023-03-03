const Post = require('../models/post')


module.exports = {
    create,
    delete: deleteComment,
    update,
    edit
  };





function deleteComment(req, res) {
    Post.findOne({'comments._id':req.params.id}, function(err, post) {
      console.log(post)
      if (!post || err) return res.redirect(`/posts`);
      post.comments.remove(req.params.id)
         post.save(function(err) {
        if (err) {
            console.log(err)
        }
        res.redirect(`/posts/${post._id}`);
      }
    );
  })}
  
  function create(req, res) {
    Post.findById(req.params.id, function(err, post) {
      req.body.user = req.user._id;
      req.body.userName = req.user.name;
      req.body.userAvatar = req.user.avatar;
      console.log(req.body)
      // We push an object with the data for the
      // review subdoc into Mongoose arrays
      post.comments.push(req.body);
      post.save(function(err) {
        if (err) {
            console.log(err)
        }
        // Step 5: Respond with a redirect because we've mutated data
        res.redirect(`/posts/${post._id}`);
      });
    });
  }

  function update(req, res) {
    // Note the cool "dot" syntax to query on the property of a subdoc
    Post.findOne({'comments._id': req.params.id}, function(err, post) {
      // Find the comment subdoc using the id method on Mongoose arrays
      // https://mongoosejs.com/docs/subdocs.html
      const commentSubdoc = post.comments.id(req.params.id);
      console.log(commentSubdoc, req.user, "<<<<<<<<!!")
      // Ensure that the comment was created by the logged in user
      // if (!commentSubdoc.user.equals(req.user._id)) return res.redirect(`/posts/${post._id}`);
      // Update the text of the comment
      commentSubdoc.content = req.body.content;
      // Save the updated book
      post.save(function(err) {
        // Redirect back to the book's show view
        res.redirect(`/posts/${post._id}`);
      });
    });
  }
  
  function edit(req, res) {
    Post.findOne({'comments._id': req.params.id}, function(err, post) {
      const comment = post.comments.id(req.params.id);
      if (err || !comment) return res.redirect('/posts');
      console.log(comment)
      res.render('posts/comments/edit', {comment, title: "comment"});
    });
  } 