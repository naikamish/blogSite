Router.configure({ layoutTemplate: 'layout'});

Router.route('/', {name: "loginTemplate"});
Router.route('/addPost', {name: "addPost"});

Router.route('/:_uid', {
    template: 'userPosts',
    data: function(){
        var currentUser = this.params._uid;
        return BlogPosts.find({'userID':currentUser}, {sort: {postTimestamp: -1}});
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