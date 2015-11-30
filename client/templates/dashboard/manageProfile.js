Template.manageProfile.events({
	'submit form': function(event,template){
		event.preventDefault();
		let firstName = template.find('#firstName').value;
		let lastName = template.find('#lastName').value;
		let blogTitle = template.find('#blogTitle').value;
		let currentUser = Meteor.userId();
		Meteor.call('editProfile', currentUser, firstName, lastName, blogTitle);
	}
});