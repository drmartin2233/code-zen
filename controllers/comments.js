const Post = require('../models/post')


module.exports = {
    create,
    delete: deleteComment
  };

//   function deleteComment(req, res, next) {
//     // Note the cool "dot" syntax to query for a movie with a
//     // review nested within an array
//     Post.findOne({
//       'comments._id': req.params.id,
//         "_comments.user": req.user._id,
//       get "comments.user"() {
//           return this["_comments.user"];
//       },
//       set "comments.user"(value) {
//           this["_comments.user"] = value;
//       },
//     }).then(function(post) {
//       if (!post) return res.redirect('/posts');
//       post.comments.remove(req.params.id);
//       post.save().then(function() {
//         res.redirect(`/posts/${post._id}`);
//       }).catch(function(err) {
//         return next(err);
//       });
//     });
//   }

// function deleteComment({params: {id}},res) {
//     Post.deleteOne({_id: id},function(err){
//       res.redirect('/posts');
//     });
//   }

function deleteComment(req, res) {
    Post.findOneAndDelete(
        {_id: req.params.id, userRecommending: req.user._id}, function(err) {
        res.redirect('/posts');
      }
    );
  }
  
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

  