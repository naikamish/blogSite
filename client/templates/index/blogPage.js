Template.blogPage.helpers({
	getComments: function(){
		var currentList = this._id;
		return BlogPosts.find();
    }
});

Template.blogPage.events({
	'submit form': function(event, template){
		event.preventDefault();
		let postComment = template.find('#postComment').value;
		let postID = this._id;
		Meteor.call('addComment', postID, postComment);
		console.log("hello");
		console.log(BlogPosts.find().fetch());
	}
})