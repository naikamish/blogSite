Template.mainPage.helpers({
	currentUser: function(){
		if(Meteor.user()==null){
			return false;
		}
		else
			return true;
    }
});