Router.configure({ layoutTemplate: 'layout'});

Router.route('/', {name: "loginTemplate"});
Router.route('/newPost', {name: "newPost"});
//Router.route('/:_id', {name: "newPost"});

Router.route('/:_uid', {
    template: 'userPosts',
    data: function(){
        var currentUser = this.params._uid;
        return BlogPosts.find({'userID':currentUser});
    }
});

Router.route('/:_uid/:_id', {
    template: 'blogPostPage',
    data: function(){
        var currentPost = this.params._id;
        var currentUser = this.params._uid
        return BlogPosts.findOne({ _id: currentPost, 'userID':currentUser });
    }
});