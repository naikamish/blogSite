Template.addPost.onRendered( function () {
	var editor = CKEDITOR.replace("postContent");
}); 

Template.addPost.events({
	'click #addNewPost': function(event,template){
		event.preventDefault();
		let postTitle = template.find('#postTitle').value;
		$('#postTitle').val('');
		let postContent = CKEDITOR.instances.postContent.document.getBody().getHtml();
		CKEDITOR.instances.postContent.document.getBody().setHtml("");
		let currentUser = Meteor.userId();
		let postTimestamp = new Date();
  		Meteor.call('addPost', postTitle, postContent, currentUser, postTimestamp)
	}
});