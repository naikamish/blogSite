Template.newPost.helpers({
	getPosts: function(){
		return BlogPosts.find();
    }
});

Template.newPost.events({
	'click #addPost': function(event,template){
		event.preventDefault();
		let postTitle = template.find('#postTitle').value;
		let postContent = template.find('#postContent').value;
  		Meteor.call('addPost', postTitle, postContent)
	},

	'click #removePosts': function(event,template){
		Meteor.call('removeAllPosts')
	}
});