Template.addComment.helpers({
	postComments: function(){
		return BlogComments.find({'postID': this._id});
	}
});

Template.addComment.events({
	'submit form': function(event, template){
		event.preventDefault();
		let commentContent = template.find('#postComment').value;
		$('#postComment').val('');
		let postID = this._id;
		let currentUser = Meteor.userId();
		let postUserID = this.userID;
		let commentTimestamp = new Date();
		Meteor.call('addComment', postID, postUserID, commentContent, currentUser, commentTimestamp);
	}
});