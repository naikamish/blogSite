Template.userPosts.onRendered( function () {

}); 

Template.userPosts.helpers({
	getPosts: function(){
        templateObject = BlogTemplate.findOne({'userID':Template.currentData()});
        template = templateObject.cssTemplate+templateObject.postsTemplate;
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
        return fullTemplate;
    }
});