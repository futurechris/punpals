Template.body.helpers({
	topics: function(){
		return Topics.find({}, {sort: [["createdAt", "desc"]]});
	}	
});

// adds index to each item
UI.registerHelper('indexedArray', function(context, options) {
	if(context)	{
		return context.map(function(item, index) {
			item._index = index;
			return item;
		});
	}
})
UI.registerHelper('checkTopicOwner', function(topicID){
	var topic = Topics.findOne({_id:topicID}, {fields: {username:1}});
	if(!topic){
		return false;
	}
	if(typeof topic.username === "undefined"){
		return false;
	}
	return topic.username === Meteor.user().username;
})

UI.registerHelper('checkResponseWinner', function(winningID, responseID){
	if (typeof(winningID) === "undefined"){
		return false;
	}
	return winningID === responseID;
})

Meteor.subscribe("topics");
Meteor.subscribe("responses");

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});