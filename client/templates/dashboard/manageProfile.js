Template.manageProfile.onRendered( function () {
	$('#firstName').val(Meteor.user().profile.firstName);
	$('#lastName').val(Meteor.user().profile.lastName);
	$('#blogTitle').val(Meteor.user().profile.blogTitle);
}); 

Template.manageProfile.events({
	'submit form': function(event,template){
		event.preventDefault();
		let firstName = template.find('#firstName').value;
		$('#firstName').val('');
		let lastName = template.find('#lastName').value;
		$('#lastName').val('');
		let blogTitle = template.find('#blogTitle').value;
		$('#blogTitle').val('');
		let currentUser = Meteor.userId();
		Meteor.call('editProfile', currentUser, firstName, lastName, blogTitle);
	}
});