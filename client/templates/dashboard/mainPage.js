Template.mainPage.helpers({
	currentUser: function(){
		return Meteor.user();
		/*if(Meteor.user()==null){
			return false;
		}
		else
			return true;*/
    }
});