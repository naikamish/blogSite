Template.addComment.onRendered( function () {

});

Template.addComment.helpers({
	postComments: function(){
	    templateObject = BlogTemplate.findOne({'userID':Template.currentData().userID});
	    template = templateObject.cssTemplate+templateObject.individualPostTemplate;

	    template = template.replace("{{postTitle}}", Template.currentData().postTitle);
	    template = template.replace("{{postContent}}", Template.currentData().postContent);

	    let postComments = BlogComments.find({'postID': Template.currentData()._id}).fetch();

	    let eachLoop = template.substring(template.search("{{#each postComments}}")+22, template.search("{{/each}}"));
	    let fullEachLoop = "";
	    $.each(postComments, function( index, value ) {
	        let tempEachLoop = eachLoop;
	        tempEachLoop = tempEachLoop.replace("{{commentUserID}}", value.commentUserName);
	        tempEachLoop = tempEachLoop.replace("{{commentContent}}", value.commentContent);
	        formattedDate = moment(value.commentTimestamp).format('[Posted on] MMMM Do, YYYY [at] h:mm:ss a');
	        tempEachLoop = tempEachLoop.replace("{{commentTimestamp}}", formattedDate);
	        fullEachLoop += tempEachLoop;
	    });
	    let templateStart = template.substring(0, template.search("{{#each postComments}}"));
	    let templateEnd = template.substring(template.search("{{/each}}")+9);
	    let fullTemplate = templateStart+fullEachLoop+templateEnd;
		return fullTemplate;
	}
});

Template.addComment.events({
	'submit form': function(event, template){
		event.preventDefault();
		let commentContent = template.find('#postComment').value;
		$('#postComment').val('');
		let postID = this._id;
		let currentUser = Meteor.userId();
		let currentUserName = Meteor.user().profile.firstName;
		let postUserID = this.userID;
		let commentTimestamp = new Date();
		Meteor.call('addComment', postID, postUserID, commentContent, currentUser, commentTimestamp, currentUserName);
	}
});