Template.userPosts.helpers({
	getPosts: function(){
		return this;
    },
    headerTemplate: function(){
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
    }    
});