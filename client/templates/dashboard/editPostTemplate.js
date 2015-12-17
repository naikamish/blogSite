Template.editPostTemplate.onRendered( function () {
	let editBlogPost = BlogPosts.findOne({'_id': Session.get('editPostId')});
	$('#postTitle').val(editBlogPost.postTitle);
	$('#editPostContent').text(editBlogPost.postContent);
	var editor = CKEDITOR.replace("editPostContent");
});

Template.editPostTemplate.events({
	'click #addNewPost': function(e,template){
		Meteor.call('updatePost', Session.get('editPostId'), $('#postTitle').val(), CKEDITOR.instances.editPostContent.document.getBody().getHtml());
		CKEDITOR.instances.editPostContent.document.getBody().setHtml("");
		$('#postTitle').val("");
	}
});
