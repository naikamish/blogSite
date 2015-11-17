Template.blogPostPage.events({
	'submit form': function(event, template){
		event.preventDefault();
		let postComment = template.find('#postComment').value;
		let postID = this._id;
		Meteor.call('addComment', postID, postComment);
	}
})