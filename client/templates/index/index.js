Template.newPost.helpers({
	getPosts: function(){
		return BlogPosts.find();
    }
});

Template.newPost.events({
	'submit form': function(event, template){
		event.preventDefault();
		let postTitle = template.find('#postTitle').value;
		let postContent = template.find('#postContent').value;
		Meteor.call('addPost', postTitle, postContent)
	}
})