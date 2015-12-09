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

    removeComments: function(commentID){
      return BlogComments.remove({'_id':{'$in':commentID}});
    },

    addComment: function(postID, postUserID, commentContent, commentUserID, commentTimestamp){
      let comment = {
        'commentUserID':commentUserID,
        'postUserID':postUserID,
        'postID':postID,
      	'commentContent':commentContent,
        'commentTimestamp':commentTimestamp
      };

      /*BlogPosts.update(
		    {_id:postID},
		    {$push:
		      {'postComments':comment}
		    }
	    );*/
      BlogComments.insert(comment);
    },

    editProfile: function(userID, firstName, lastName, blogTitle){
      Meteor.users.update(userID,{$set:{'profile.firstName': firstName, 'profile.lastName':lastName, 'profile.blogTitle':blogTitle  }});
    },

    updateTemplate: function(userID, template){
      BlogTemplate.update({'userID':userID},{ $set: {'template':template}});
    }
  });
});

if (Meteor.isServer) {
  Accounts.onCreateUser(function(options, user) {
    if(!options.profile){
      options.profile = {}
    }
   //options.profile.permission = 'default'
    if (options.profile)
      user.profile = options.profile;
    return user;
  });
}