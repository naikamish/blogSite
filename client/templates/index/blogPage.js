Template.blogPage.helpers({
	getComments: function(){
		var currentList = this._id;
		return BlogPosts.find();
    }
});
