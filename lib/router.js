Router.configure({ layoutTemplate: 'layout'});

Router.route('/', {name: "mainPage"});

Router.route('/:_uid', {
    template: 'userPosts',
    data: function(){
        var currentUser = this.params._uid;
        //return BlogPosts.findOne({'userID':currentUser}, {sort: {postTimestamp: -1}});
        return currentUser;
    }
});

Router.route('/:_uid/:_id', {
    template: 'addComment',
    data: function(){
        var currentPost = this.params._id;
        var currentUser = this.params._uid;
        return BlogPosts.findOne({ _id: currentPost, 'userID':currentUser });
        //return currentPost;
    }
});