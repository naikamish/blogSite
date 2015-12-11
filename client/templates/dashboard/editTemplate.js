Template.editTemplate.onRendered(function () {
	var postsEditor = ace.edit("postsEditor");
    postsEditor.setTheme("ace/theme/twilight");
    postsEditor.getSession().setMode("ace/mode/html");

    var individualPostEditor = ace.edit("individualPostEditor");
    individualPostEditor.setTheme("ace/theme/twilight");
    individualPostEditor.getSession().setMode("ace/mode/html");

    var cssEditor = ace.edit("cssEditor");
    cssEditor.setTheme("ace/theme/twilight");
    cssEditor.getSession().setMode("ace/mode/html");

	let template = BlogTemplate.findOne({'userID':Meteor.userId()});
	postsEditor.setValue(template.postsTemplate);
	individualPostEditor.setValue(template.individualPostTemplate);
	cssEditor.setValue(template.cssTemplate);

	$( "#saveCode" ).click(function() {
    	console.log(postsEditor.getValue());
  		Meteor.call('updateTemplate', Meteor.userId(), postsEditor.getValue(), individualPostEditor.getValue(), cssEditor.getValue());
	});
});
