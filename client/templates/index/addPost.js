Template.addPost.events({
	'click #addPost': function(event,template){
		event.preventDefault();
		let postTitle = template.find('#postTitle').value;
		$('#postTitle').val('');
		let postContent = template.find('#postContent').value;
		$('#postContent').val('');
		let currentUser = Meteor.userId();
		let postTimestamp = new Date();
  		Meteor.call('addPost', postTitle, postContent, currentUser, postTimestamp)
	},

	'click #removePosts': function(event,template){
		Meteor.call('removeAllPosts')
	}
});