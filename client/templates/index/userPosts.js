Template.userPosts.onRendered( function () {
    let template = '<div class="container-fluid container-userPosts"><div class="jumbotron"><h1>My Blog</h1></div>'+
                        '{{#each getPosts}}<div class="row"><div class="col-xs-10 col-xs-offset-1 postDiv">'+
                        '<a href="/{{userID}}/{{_id}}"><h3>{{postTitle}}</h3></a><br>{{postContent}}<br><br>'+
                        '<span class="post-footer">Posted on {{postTimestamp}}</span><br><br></div></div>'+
                        '<br><br><br>{{/each}}</div>';
    let eachLoop = template.substring(template.search("{{#each getPosts}}")+18, template.search("{{/each}}"));
    console.log(Template.currentData());
    Session.set('blogTemplate',eachLoop);
    //console.log(Session.get('blogTemplate'));
}); 

Template.userPosts.helpers({
	getPosts: function(){
        return Template.currentData();
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