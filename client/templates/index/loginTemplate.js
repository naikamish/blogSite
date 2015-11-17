Template.loginTemplate.helpers({
	getUsers: function(){
		return Meteor.users.find();
    }
});