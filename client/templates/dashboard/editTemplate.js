Template.editTemplate.onRendered(function () {
	var ace = AceEditor.instance("archy",{theme:"twilight", mode:"html"});
	let template = BlogTemplate.findOne({'userID':Meteor.userId()}).template;
    //console.log(template);
  /*  ace.getSession().on('change', function(e) {
    // update the File collection
	    File.update({_id: Session.get("file")}, 
	      { $set : 
	        { 
	          contents : editor.getValue()
	        }
	      });
	});*/

   // $('#templateCode').val(template);
    ace.setValue(template);


    $( "#saveCode" ).click(function() {
    	console.log(ace.getValue());
  		Meteor.call('updateTemplate', Meteor.userId(), ace.getValue());
	});
});
