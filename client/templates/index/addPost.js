Template.addPost.onRendered( function () {
	var editor = CKEDITOR.replace("postContent");
/*	$( "#addNewPost" ).click(function() {
		htmldata = CKEDITOR.instances.postContent.document.getBody().getHtml();
    	console.log(htmldata);
  		//Meteor.call('updateTemplate', Meteor.userId(), editor.getValue());
	});*/
}); 

Template.addPost.events({
	'click #addNewPost': function(event,template){
		event.preventDefault();
		let postTitle = template.find('#postTitle').value;
		$('#postTitle').val('');
		let postContent = CKEDITOR.instances.postContent.document.getBody().getHtml();
		//let postContent = template.find('#postContent').value;
		//$('#postContent').val('');
		let currentUser = Meteor.userId();
		let postTimestamp = new Date();
  		Meteor.call('addPost', postTitle, postContent, currentUser, postTimestamp)
	}
});