Template.newPost.helpers({
	getPosts: function(){
		return this;
    }
});

Template.newPost.events({
	'click #addPost': function(event,template){
		event.preventDefault();
		let postTitle = template.find('#postTitle').value;
		let postContent = template.find('#postContent').value;
		let currentUser = Meteor.userId();
  		Meteor.call('addPost', postTitle, postContent, currentUser)
	},

	'click #removePosts': function(event,template){
		Meteor.call('removeAllPosts')
	}
});