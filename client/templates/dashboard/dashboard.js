Template.dashboard.onRendered( function () {
	Session.set('dashboardTemplate','dashboardHome');
	console.log(Session.get('dashboardTemplate'));
}); 

Template.dashboard.events({
	'click .dashboardPill': function(e,template){
		Session.set('dashboardTemplate', e.currentTarget.id);
		$('.dashboardPill').removeClass("active");
        $(e.currentTarget).addClass("active");
        console.log(Session.get('dashboardTemplate'));
	}
});

Template.dashboard.helpers({
	dashboardPill: function(templateName){
		console.log(Session.equals('dashboardTemplate', templateName));
    	return Session.equals('dashboardTemplate', templateName);
    }
});