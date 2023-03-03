const Post = require('../models/post')


module.exports = {
    create,
    delete: deleteComment,
    // update,
    // edit
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

  // function update(req, res) {
  //   console.log("test")
  //   Post.findOneAndUpdate(
  //     {_id: req.params.id},
  //     // update object with updated properties
  //     req.body,
  //     // options object with new: true to make sure updated doc is returned
  //     {new: true},
  //     function(err, post) {
  //       if (err || !post) return res.redirect('/posts');
  //       res.redirect(`/posts/${post._id}`);
  //     }
  //   );
  // }
  
  // function edit(req, res) {
  //   Post.findOne({'comments._id': req.params.id}, function(err, post) {
  //     let title = post.title
  //     if (err || !post) return res.redirect('/posts');
  //     res.render('posts/edit', {post, title});
  //   });
  // } 