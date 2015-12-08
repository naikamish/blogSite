Template.editTemplate.onRendered(function () {
	var header = '<div class="container-fluid container-userPosts"><div class="jumbotron"><h1>My Blog</h1></div>';
	var postStart = '<div class="row"><div class="col-xs-10 col-xs-offset-1 postDiv"><a href="#">';
	var postLinks = '<h3>';
	var postTitle = '</h3></a><br>';
	var postContent = '<br><br><span class="post-footer">Posted on ';
	var postTimestamp = '</span><br><br></div></div><br><br><br>';
	var footer = '</div>';
	let blogTemplate = {
		'header':header,
		'postStart':postStart,
		'postLinks':postLinks,
		'postTitle':postTitle,
		'postContent':postContent,
		'postTimestamp':postTimestamp,
		'footer':footer
	};
	BlogTemplate.insert(blogTemplate);

    var ace = AceEditor.instance("archy",{theme:"dawn", mode:"html"});
});
