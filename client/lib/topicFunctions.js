Meteor.topicFunctions = {
	clickVoteFunction: function(event) {
		// prevent the default behavior
		event.preventDefault();

		if(!Meteor.user()){
			return;
		}

		// get IDs needed to create vote object
		var topicID 		= $(event.currentTarget).parent().parent().parent('.topic').data('id');
		var responseID  = $(event.currentTarget).data('id');
		var userID 			= Meteor.userId();

		Meteor.call('voteOnResponse', topicID, responseID, userID);
	},

	clickUnvoteFunction: function(event) {
		event.preventDefault();

		if(!Meteor.user()){
			return;
		}

		var topicID 		= $(event.currentTarget).parent().parent().parent('.topic').data('id');
		var responseID  = $(event.currentTarget).data('id');
		var userID 			= Meteor.userId();

		Meteor.call('removeVoteFromResponse', topicID, responseID, userID);
	},

	clickWinnerFunction: function(event) {
		// prevent the default behavior
		event.preventDefault();

		if(!Meteor.user()){
			return;
		}

		// get the parent (topic) id
		// There has to be a better way than this. :)
		var topicID 		= $(event.currentTarget).parent().parent().parent().parent().parent('.responseParent').data('id');
		var responseID  = $(event.currentTarget).data('id');
		var userID 			= Meteor.userId();

		Meteor.call('selectWinningResponse', topicID, responseID, userID);
	},

	clickDeletePromptFunction: function(){
		if(confirm("Deleting your fantastic pun topic can't be undone! Are you sure you want to live in a world without that topic?"))
		{
			var userID			= Meteor.userId();
			var topicID			= this._id;

			Meteor.call('deletePrompt', userID, topicID);
			Router.go('/');
			FlashMessages.sendSuccess("Prompt deleted.");
		}
	},

	clickDeleteReponseFunction: function(){
		if(confirm("Are you really the type of person who deletes awesome suggestions, even though it can't be undone?"))
		{
			var userID 			= Meteor.userId();
			var responseID	= this._id;
			
			Meteor.call('deleteResponse', userID, responseID);
		}
	},

	submitFormFunction: function(event){
		event.preventDefault();
		if(!Meteor.user()){
			return;
		}

		var topicID = $(event.currentTarget).children('.form-control').data('id');
		var suggestionText = event.target.suggest.value;
		var userID = Meteor.userId();

		var username = Meteor.user().username || Meteor.user().profile.name;

		Meteor.call('insertNewResponse', topicID, suggestionText, userID, username);

		event.target.suggest.value = "";
		FlashMessages.sendSuccess("Response submitted. You're fully <em>responsible</em> for any groans it causes.");
	},

	topicWinnerHelper: function(id){
		var topic = Topics.findOne({_id:id});
		if(topic === null || typeof topic === "undefined")
		{
			return null;
		}
		if (typeof topic.winner === "undefined")
		{
			return null;
		}
		return Responses.findOne({_id:topic.winner});
	},

	topicNonWinnerHelper: function(id, limit){
		var topic = Topics.findOne({_id:id});

		if(topic === null || typeof topic === "undefined")
		{
			return null;
		}
		var topicWinnerID = topic.winner;

		if(typeof limit === "undefined" || limit === null || limit == 0)
		{
			return Responses.find({_topicID:id, _id: {$ne: topic.winner}}, {sort: [[ "votes", "desc" ]]});
		}
		else
		{
			return Responses.find({_topicID:id, _id: {$ne: topic.winner}}, {sort: [[ "votes", "desc" ]], limit: limit});	
		}
	},

	topicResponsesHelper: function(id, limit){
		if(typeof limit === "undefined" || limit === null || limit == 0)
		{
			return Responses.find({_topicID:id}, {sort: [[ "votes", "desc" ]]});
		}
		else
		{
			return Responses.find({_topicID:id}, {sort: [[ "votes", "desc" ]], limit: limit});	
		}
	}
}