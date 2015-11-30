Meteor.startup(function () {
  return Meteor.methods({
    addPost: function(postTitle, postContent, userID, postTimestamp) {
      let blogPost = {
        'userID': userID,
        'postTitle': postTitle,
        'postContent': postContent,
        'postTimestamp':postTimestamp
      };

      BlogPosts.insert(blogPost);
    },

    removeAllPosts: function() {
      return BlogPosts.remove({});
    },

    removePosts: function(postID){
      return BlogPosts.remove({'_id':{'$in':postID}});
    },

    addComment: function(postID, commentContent, commentUserID, commentTimestamp){
      let comment = {
        'commentUserID':commentUserID,
      	'commentContent':commentContent,
        'commentTimestamp':commentTimestamp
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