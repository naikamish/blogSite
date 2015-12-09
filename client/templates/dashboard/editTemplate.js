Template.editTemplate.onRendered(function () {
	var ace = AceEditor.instance("archy",{theme:"dawn", mode:"html"});

    let template = BlogTemplate.findOne({'userID':Meteor.userId()}).template;
    console.log(template);
    $('#templateCode').val(template);
});

Template.editTemplate.events({
	'click #saveCode': function(event,template){
		Meteor.call('updateTemplate', Meteor.userId(), $('#templateCode').val());
		//BlogTemplate.update({'userID':Meteor.userId()},{ $set: {'template':$('#templateCode').val()}});
	}
});