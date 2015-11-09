Meteor.startup(function () {
  return Meteor.methods({
    addPost: function(postTitle, postContent) {
      let blogPost = {
        'postTitle': postTitle,
        'postContent': postContent
      };

      BlogPosts.insert(blogPost);
    }
  });
});