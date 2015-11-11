Meteor.startup(function () {
  return Meteor.methods({
    addPost: function(postTitle, postContent) {
      let blogPost = {
        'postTitle': postTitle,
        'postContent': postContent
      };

      BlogPosts.insert(blogPost);
    },

    removeAllPosts: function() {
      return BlogPosts.remove({});
    },

    addComment: function(postID, postComment){
      let comment = {
      	'comment':postComment
      };

      BlogPosts.update(
		{_id:postID},
		{$push:
		  {'postComments':comment}
		}
	  );
    }
  });
});