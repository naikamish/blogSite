Template.loginPage.events({
	'click #loginButton' : function(event){
		event.preventDefault();
		let email = $('#inputEmail').val();
		let password = $('#inputPassword').val();
		Meteor.loginWithPassword(email, password);
	},

	'click #registerButton' : function(event){
		event.preventDefault();
		let email = $('#inputEmail').val();
		let password = $('#inputPassword').val();
		Accounts.createUser({
            email: email,
            password: password
        });
	}
});