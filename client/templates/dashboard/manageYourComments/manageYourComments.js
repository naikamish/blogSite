Template.manageYourComments.helpers({
	getComments: function(){
		return BlogComments.find({'commentUserID':Meteor.userId()})
	}
});

Template.manageYourComments.events({
	'submit form': function(event, template){
		event.preventDefault();
		var values = [];
		var cbs = document.forms['postsForm'].elements['posts'];
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
		Meteor.call('removeComments', values);
	}
});