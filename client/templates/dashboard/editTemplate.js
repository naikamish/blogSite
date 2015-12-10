Template.editTemplate.onRendered(function () {
	var editor = ace.edit("editor");
    editor.setTheme("ace/theme/twilight");
    editor.getSession().setMode("ace/mode/html");
	let template = BlogTemplate.findOne({'userID':Meteor.userId()}).template;
	editor.setValue(template);

/*	var ace = AceEditor.instance("archy",{theme:"twilight", mode:"html"});
	let template = BlogTemplate.findOne({'userID':Meteor.userId()}).template;
	ace.setValue(template);*/


    $( "#saveCode" ).click(function() {
    	console.log(editor.getValue());
  		Meteor.call('updateTemplate', Meteor.userId(), editor.getValue());
	});
});
