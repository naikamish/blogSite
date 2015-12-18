Router.configure({ layoutTemplate: 'layout'});

var OnBeforeActions;

OnBeforeActions = {
    loginRequired: function(pause) {
      if (!Meteor.userId()) {
        this.render('loginPage');
      }
      else {
        this.next();
      }
    }
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
    only: ['dashboard']
});

Router.route('/', {name: "dashboard"});

Router.route('/:_uid', {
    template: 'userPosts',
    data: function(){
        var currentUser = this.params._uid;
        return currentUser;
    }
});

Router.route('/:_uid/:_id', {
    template: 'addComment',
    data: function(){
        var currentPost = this.params._id;
        var currentUser = this.params._uid;
        return BlogPosts.findOne({ _id: currentPost, 'userID':currentUser });
    }
});