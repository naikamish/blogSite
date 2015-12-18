Template.editTemplate.onRendered(function () {
    Session.set('blogPostsPage',1);
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
  		Meteor.call('updateTemplate', Meteor.userId(), postsEditor.getValue(), individualPostEditor.getValue(), cssEditor.getValue());
	});

    $( "#preview" ).click(function() {
        Session.set('cssTemplate',cssEditor.getValue());
        Session.set('postsTemplate', postsEditor.getValue());
    });
});

Template.editTemplate.helpers({
    getPosts: function(){
        let template = Session.get('cssTemplate')+Session.get('postsTemplate');
        let blogUser = Meteor.userId();
        let blogPosts = BlogPosts.find({'userID':blogUser}, {sort: {postTimestamp: -1}}).fetch();
        let numberOfPages = blogPosts.length;
        let blogTitle = Meteor.users.findOne({'_id':blogUser}).profile.blogTitle;
        template = template.replace("{{blogTitle}}", blogTitle);
        let eachLoop = template.substring(template.search("{{#each BlogPost}}")+18, template.search("{{/each BlogPost}}"));
        let fullEachLoop = "";
        let page = Session.get('blogPostsPage');
        blogPosts = blogPosts.slice(page-1, page);
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
        let templateStart = template.substring(0, template.search("{{#each BlogPost}}"));
        let templateEnd = template.substring(template.search("{{/each BlogPost}}")+18);
        let fullTemplate = templateStart+fullEachLoop+templateEnd;

        let pagesLoop = template.substring(template.search("{{#each BlogPage}}")+18, template.search("{{/each BlogPage}}"));
        let fullPagesLoop = "";
        fullPagesLoop += numberOfPages>0 ? pagesLoop.replace("{{page#}}",1):"";
        fullPagesLoop += numberOfPages>1 ? pagesLoop.replace("{{page#}}",2):"";
        fullPagesLoop += numberOfPages>2&&(page<5||numberOfPages<8) ? pagesLoop.replace("{{page#}}",3):"";
        fullPagesLoop += numberOfPages>3&&(page<5||numberOfPages<8) ? pagesLoop.replace("{{page#}}",4):"";
        fullPagesLoop += numberOfPages>4&&(page<5||numberOfPages<8) ? pagesLoop.replace("{{page#}}",5):"";
        fullPagesLoop += numberOfPages>5&&numberOfPages<8 ? pagesLoop.replace("{{page#}}",6):"";
        fullPagesLoop += numberOfPages>6&&numberOfPages<8 ? pagesLoop.replace("{{page#}}",7):"";
        fullPagesLoop += numberOfPages>7&&page>4 ? "...":"";

        fullPagesLoop += page>4&&page<numberOfPages-3 ? pagesLoop.replace("{{page#}}",page-1):"";
        fullPagesLoop += page>4&&page<numberOfPages-3 ? pagesLoop.replace("{{page#}}",page):"";
        fullPagesLoop += page>4&&page<numberOfPages-3 ? pagesLoop.replace("{{page#}}",page+1):"";

        fullPagesLoop += numberOfPages>7&&page<numberOfPages-3 ? "...":"";
        fullPagesLoop += numberOfPages>7&&page>numberOfPages-4 ? pagesLoop.replace("{{page#}}",numberOfPages-4):"";
        fullPagesLoop += numberOfPages>7&&page>numberOfPages-4 ? pagesLoop.replace("{{page#}}",numberOfPages-3):"";
        fullPagesLoop += numberOfPages>7&&page>numberOfPages-4 ? pagesLoop.replace("{{page#}}",numberOfPages-2):"";
        fullPagesLoop += numberOfPages>7 ? pagesLoop.replace("{{page#}}",numberOfPages-1):"";
        fullPagesLoop += numberOfPages>7 ? pagesLoop.replace("{{page#}}",numberOfPages):"";
        fullPagesLoopActive = fullPagesLoop.substring(0,fullPagesLoop.search(page)-1)+" class='active'"+fullPagesLoop.substring(fullPagesLoop.search(page)-1);
        templateStart = fullTemplate.substring(0, fullTemplate.search("{{#each BlogPage}}"));
        templateEnd = fullTemplate.substring(fullTemplate.search("{{/each BlogPage}}")+18);
        fullTemplate = templateStart+fullPagesLoopActive+templateEnd;
        return fullTemplate;
    }
});