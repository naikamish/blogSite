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
      BlogComments.insert(comment);
    },

    editProfile: function(userID, firstName, lastName, blogTitle){
      Meteor.users.update(userID,{$set:{'profile.firstName': firstName, 'profile.lastName':lastName, 'profile.blogTitle':blogTitle  }});
    },

    updateTemplate: function(userID, template){
      BlogTemplate.update({'userID':userID},{ $set: {'template':template}});
    },

    setDefaultTemplate: function(userID){
      let template = "<div class=\"container-fluid container-userPosts\">\n    <div class=\"jumbotron\">\n        <h1 id='blogTitle'>{{blogTitle}}</h1>\n    </div>\n    {{#each getPosts}}\n    <div class=\"row\">\n        <div class=\"col-xs-10 col-xs-offset-1 postDiv\">\n            <a href=\"/{{userID}}/{{_id}}\">\n                <h3>{{postTitle}}</h3>\n            </a>\n            <br>{{postContent}}<br><br>\n            <span class=\"post-footer\">Posted on {{postTimestamp}}</span>\n            <br><br>\n        </div>\n    </div>\n    <br><br><br>\n    {{/each}}\n</div>"
      BlogTemplate.insert({'userID':userID, 'template':template})
    }
  });
});

if (Meteor.isServer) {
  Accounts.onCreateUser(function(options, user) {
    Meteor.call('setDefaultTemplate', user._id);
    if(!options.profile){
      options.profile = {'firstName':"Anonymous", 'blogTitle':"My First Blog Site"};
    }
   //options.profile.permission = 'default'
    if (options.profile)
      user.profile = options.profile;
    return user;
  });
}