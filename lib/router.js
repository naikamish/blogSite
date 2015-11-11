Router.configure({ layoutTemplate: 'layout'});

Router.route('/', {name: "newPost"});

Router.route('/post/:_id', {
    template: 'blogPage',
    data: function(){
        var currentPost = this.params._id;
        return BlogPosts.findOne({ _id: currentPost });
    }
});