Template.loginTemplate.helpers({
	loggedInUser: function(){
    	return Meteor.userId();
    },

	getUsers: function(){
		return Meteor.users.find();
    }
});