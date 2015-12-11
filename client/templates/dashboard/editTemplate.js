Template.editTemplate.onRendered(function () {
	var postsEditor = ace.edit("postsEditor");
    postsEditor.setTheme("ace/theme/twilight");
    postsEditor.getSession().setMode("ace/mode/html");
	let template = BlogTemplate.findOne({'userID':Meteor.userId()}).template;
	postsEditor.setValue(template);

/*	var ace = AceEditor.instance("archy",{theme:"twilight", mode:"html"});
	let template = BlogTemplate.findOne({'userID':Meteor.userId()}).template;
	ace.setValue(template);*/


    $( "#saveCode" ).click(function() {
    	console.log(postsEditor.getValue());
  		Meteor.call('updateTemplate', Meteor.userId(), postsEditor.getValue());
	});
});
