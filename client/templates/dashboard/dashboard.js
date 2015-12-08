Template.dashboard.onRendered( function () {
	Session.set('dashboardTemplate','dashboardHome');
}); 

Template.dashboard.events({
	'click .dashboardPill': function(e,template){
		Session.set('dashboardTemplate', e.currentTarget.id);
		$('.dashboardPill').removeClass("active");
        $(e.currentTarget).addClass("active");
	}
});

Template.dashboard.helpers({
	dashboardPill: function(templateName){
    	return Session.equals('dashboardTemplate', templateName);
    }
});