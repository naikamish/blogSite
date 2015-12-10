Template.dashboardHome.helpers({
	loggedInUser: function(){
    	return Meteor.user() && Meteor.user().profile.firstName;
    },

	getUsers: function(){
		return Meteor.users.find();
    }
});