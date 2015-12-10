Template.userPosts.onRendered( function () {
    template = BlogTemplate.findOne({'userID':Template.currentData()}).template;
    let blogUser = Template.currentData();
    let blogPosts = BlogPosts.find({'userID':blogUser}).fetch();
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
        tempEachLoop = tempEachLoop.replace("{{postTimestamp}}", value.postTimestamp);
        fullEachLoop += tempEachLoop;
    });
    let templateStart = template.substring(0, template.search("{{#each getPosts}}"));
    let templateEnd = template.substring(template.search("{{/each}}")+9);
    let fullTemplate = templateStart+fullEachLoop+templateEnd;
    Session.set('blogTemplate',fullTemplate);
    //console.log(templateStart);
    console.log(fullTemplate);
    //console.log(templateEnd);
    //console.log(Session.get('blogTemplate'));
}); 

Template.userPosts.helpers({
	getPosts: function(){
        return Session.get('blogTemplate');
    },
/*    headerTemplate: function(){
		return BlogTemplate.findOne().header;
    },
    postStartTemplate: function(){
		return BlogTemplate.findOne().postStart;
    },
    postLinksTemplate: function(){
		return BlogTemplate.findOne().postLinks;
    },
    postTitleTemplate: function(){
		return BlogTemplate.findOne().postTitle;
    },
    postContentTemplate: function(){
		return BlogTemplate.findOne().postContent;
    },
    postTimestampTemplate: function(){
		return BlogTemplate.findOne().postTimestamp;
    },
    footerTemplate: function(){
		return BlogTemplate.findOne().footer;
    }    */
});