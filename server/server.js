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

    addComment: function(postID, postUserID, commentContent, commentUserID, commentTimestamp, currentUserName){
      let comment = {
        'commentUserID':commentUserID,
        'commentUserName':currentUserName,
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

    updateTemplate: function(userID, postsTemplate, individualPostTemplate, cssTemplate){
      BlogTemplate.update({'userID':userID},{ $set: {'postsTemplate':postsTemplate, 'individualPostTemplate':individualPostTemplate, 'cssTemplate':cssTemplate}});
    },

    setDefaultTemplate: function(userID){
      let postsTemplate = "<div class=\"container-fluid\" id=\"container-userPosts\">\n    <div class=\"jumbotron\">\n        <h1 id='blogTitle'>{{blogTitle}}</h1>\n    </div>\n    {{#each getPosts}}\n    <div class=\"row\">\n        <div class=\"col-xs-10 col-xs-offset-1 postDiv\">\n            <a href=\"/{{userID}}/{{_id}}\">\n                <h3>{{postTitle}}</h3>\n            </a>\n            <br>{{postContent}}<br><br>\n            <span class=\"post-footer\">{{postTimestamp}}</span>\n            <br><br>\n        </div>\n    </div>\n    <br><br><br>\n    {{/each}}\n</div>"
      let individualPostTemplate = "<div class=\"container-fluid\" id=\"container-userPosts\">\n    <div class=\"row\">\n        <div class=\"col-xs-10 col-xs-offset-1 postDiv\">\n            <h3 id=\"postTitle\">{{postTitle}}</h3>\n            <br>\n            {{postContent}}\n        </div>\n    </div>\n    <br><br><br>\n    <div class=\"row\">\n        <div class=\"col-xs-10 col-xs-offset-1 postDiv\">\n            <h2>Comments</h2>\n            {{#each postComments}}\n                <span class=\"bold-span\">{{commentUserID}}</span>\n                <br>\n                {{commentContent}}\n                <br>\n                <span class=\"comment-footer\">{{commentTimestamp}}</span>\n                <br><br><br>\n            {{/each}}\n            <h4>Add Comment</h4>\n            <form>\n                <textarea id=\"postComment\"></textarea>\n                <br>\n                <input type=\"submit\" value=\"Submit\">\n            </form>\n        </div>\n    </div>\n</div>";
      let cssTemplate = "<!--enter css code here-->\n<style>\n#container-userPosts {\n    background: url(\"/images/background.png\") fixed no-repeat 100% 100% !important;\n    min-height: 100vh;\n}\n</style>";
      BlogTemplate.insert({'userID':userID, 'postsTemplate':postsTemplate, 'individualPostTemplate':individualPostTemplate, 'cssTemplate':cssTemplate});
    },

    validateLogin: function(email, password){
      var valid = Meteor.users.find({"emails.address": email}, {limit: 1}).count()>0;
      return "hi";
    }
  });
});

if (Meteor.isServer) {
  Accounts.onCreateUser(function(options, user) {
    let newEmail = user.emails[0].address
    let validEmail = newEmail.match(/.+@.+\..+/i);
    if(!validEmail){
      throw new Meteor.Error(403, "Invalid Email");
    }
    else{
      Meteor.call('setDefaultTemplate', user._id);
      if(!options.profile){
        options.profile = {'firstName':"Anonymous", 'blogTitle':"My First Blog Site"};
      }
      if (options.profile)
        user.profile = options.profile;
      return user;
    }
  });
}