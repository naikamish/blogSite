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

    Session.set('cssTemplate',cssEditor.getValue());
    Session.set('postsTemplate', postsEditor.getValue());

	$( "#saveCode" ).click(function() {
    	console.log(postsEditor.getValue());
  		Meteor.call('updateTemplate', Meteor.userId(), postsEditor.getValue(), individualPostEditor.getValue(), cssEditor.getValue());
	});

    $( "#preview" ).click(function() {
        Session.set('cssTemplate',cssEditor.getValue());
        Session.set('postsTemplate', postsEditor.getValue());
    });
});

Template.editTemplate.helpers({
    getPosts: function(){
        template = Session.get('cssTemplate')+Session.get('postsTemplate');
        let blogUser = Meteor.userId();
        let blogPosts = BlogPosts.find({'userID':blogUser}, {sort: {postTimestamp: -1}}).fetch();
        let blogTitle = Meteor.users.findOne({'_id':blogUser}).profile.blogTitle;
        template = template.replace("{{blogTitle}}", blogTitle);
        let eachLoop = template.substring(template.search("{{#each getPosts}}")+18, template.search("{{/each}}"));
        let fullEachLoop = "";
        $.each(blogPosts, function( index, value ) {
            let tempEachLoop = eachLoop;
            tempEachLoop = tempEachLoop.replace("{{userID}}", value.userID);
            tempEachLoop = tempEachLoop.replace("{{_id}}", value._id);
            tempEachLoop = tempEachLoop.replace("{{postTitle}}", value.postTitle);
            tempEachLoop = tempEachLoop.replace("{{postContent}}", value.postContent);
            formattedDate = moment(value.postTimestamp).format('[Posted on] MMMM Do, YYYY [at] h:mm:ss a');
            tempEachLoop = tempEachLoop.replace("{{postTimestamp}}", formattedDate);
            fullEachLoop += tempEachLoop;
        });
        let templateStart = template.substring(0, template.search("{{#each getPosts}}"));
        let templateEnd = template.substring(template.search("{{/each}}")+9);
        let fullTemplate = templateStart+fullEachLoop+templateEnd;
        return fullTemplate;
    }
});