Template.loginPage.events({
	'click #loginButton' : function(event){
		event.preventDefault();
		let email = $('#inputEmail').val();
		let password = $('#inputPassword').val();
		Meteor.loginWithPassword(email, password, function(error){
			if(error){
				$('#errorMessage').text(error.reason);
			}
			if (Router.current().route.name === 'loginPage') {
		        // if we are on the login route, we want to redirect the user
		        return Router.go('dashboard');
		    }
		});
	},

	'click #registerButton' : function(event){
		event.preventDefault();
		let email = $('#inputEmail').val();
		let password = $('#inputPassword').val();
		if(password.length<6){
			$('#errorMessage').text("Password must be at least 6 characters in length");
		}
		else{
			Accounts.createUser({
	            email: email,
	            password: password
	        }, function(error){
	        	if (error) {
	            	$('#errorMessage').text(error.reason);
	        	}
	        });
		}
	}
});