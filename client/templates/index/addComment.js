Template.addComment.events({
	'submit form': function(event, template){
		event.preventDefault();
		let commentContent = template.find('#postComment').value;
		$('#postComment').val('');
		let postID = this._id;
		let currentUser = Meteor.userId();
		let commentTimestamp = new Date();
		Meteor.call('addComment', postID, commentContent, currentUser, commentTimestamp);
	}
});