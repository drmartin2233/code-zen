const Post = require('../models/post');

module.exports = {
    index,
    show,
    new: newPost,
    create,
    delete: deletePost,
    update
  };

  function index(req, res) {
    Post.find({}, function(err, posts) {
      console.log(posts);
      res.render('posts/index', { title: 'All Posts', posts });
    });
  }
  
  function newPost(req, res) {
    res.render('posts/new', { title: 'Add Post' });
  }
  
  function create(req, res) {
    console.log(req.body);
    const post = new Post(req.body);
    post.save(function(err) {
      if (err) return res.redirect('/posts/new');
      console.log(post);
      res.redirect('/posts');
    });
  }

function show(req, res) {
  Post.findById(req.params.id, function(err, post) {
    let title = post.title
    console.log(post)
    res.render('posts/show', {
      post, title
    });

  })
};  
   


function deletePost(req, res) {
  Post.findOneAndDelete(
    
    {_id: req.params.id, userRecommending: req.user._id}, function(err) {
      
      res.redirect('/posts');
    }
  );
}

function update(req, res) {
  console.log(test)
  Post.findOneAndUpdate(
    {_id: req.params.id, userRecommending: req.user._id},
    // update object with updated properties
    req.body,
    // options object with new: true to make sure updated doc is returned
    {new: true},
    function(err, post) {
      if (err || !post) return res.redirect('/posts');
      res.redirect(`/posts/${post._id}`);
    }
  );
}