Template.managePosts.helpers({
	getPosts: function(){
		return BlogPosts.find({'userID': Meteor.userId()});
	}
});

Template.managePosts.events({
	'submit form': function(event, template){
		event.preventDefault();
		var values = [];
		cbs = document.forms['postsForm'].elements['posts'];
		if(!cbs.length){
			values.push(cbs.value);
		}
		else{
			for(var i=0,cbLen=cbs.length;i<cbLen;i++){
	  			if(cbs[i].checked){
	    			values.push(cbs[i].value);
	  			} 
			}
		}
		Meteor.call('removePosts', values);
	},

	'click .editPostButton': function(event,template){
		event.preventDefault();
		Session.set('editPostId', event.currentTarget.id);
		Session.set('dashboardTemplate', 'editPostTemplate');
	}
});