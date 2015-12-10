Template.userPosts.onRendered( function () {
  /*  let template = '<div class="container-fluid container-userPosts"><div class="jumbotron"><h1>My Blog</h1></div>'+
                        '{{#each getPosts}}<div class="row"><div class="col-xs-10 col-xs-offset-1 postDiv">'+
                        '<a href="/{{userID}}/{{_id}}"><h3>{{postTitle}}</h3></a><br>{{postContent}}<br><br>'+
                        '<span class="post-footer">Posted on {{postTimestamp}}</span><br><br></div></div>'+
                        '<br><br><br>{{/each}}</div>';*/

    let template = "<div class=\"container-fluid container-userPosts\">\n    <div class=\"jumbotron\">\n        <h1 id='blogTitle'>{{blogTitle}}</h1>\n    </div>\n    {{#each getPosts}}\n    <div class=\"row\">\n        <div class=\"col-xs-10 col-xs-offset-1 postDiv\">\n            <a href=\"/{{userID}}/{{_id}}\">\n                <h3>{{postTitle}}</h3>\n            </a>\n            <br>{{postContent}}<br><br>\n            <span class=\"post-footer\">Posted on {{postTimestamp}}</span>\n            <br><br>\n        </div>\n    </div>\n    <br><br><br>\n    {{/each}}\n</div>"
    if(BlogTemplate.find({'userID':Template.currentData()}).fetch().length===0)
        BlogTemplate.insert({'userID':Template.currentData(), 'template':template});
    else
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