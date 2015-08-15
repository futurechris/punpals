// attach events to our topic template
Template.topic.events({
	// event to handle clicking a choice
	"click .vote": function(event) {
		// prevent the default behavior
		event.preventDefault();

		// get the parent (topic) id
		var topicID = $(event.currentTarget).parent().parent().parent('.topic').data('id');
		var voteID  = $(event.currentTarget).data('id');

		// create the incrementing object so we can add to the corresponding vote
		var voteString = 'votes';
		var action = {};
		action[voteString] = 1;

		Responses.update(
			{ _id: voteID },
			{ $inc: action }
		);
	},

	"click .winner": function(event) {
		// prevent the default behavior
		event.preventDefault();

		// get the parent (topic) id
		var topicID = $(event.currentTarget).parent().parent().parent('.topic').data('id');
		var responseID  = $(event.currentTarget).data('id');

		// create the incrementing object so we can add to the corresponding vote
		var winningString = 'winner';
		var action = {};
		action[winningString] = responseID;

		// set the suggestion to winner
		Topics.update(
			{ _id: topicID },
			{ $set: action }
		);
	},

	"click .deletePrompt": function(){
		if(confirm("Deleting your fantastic pun topic can't be undone! Are you sure you want to live in a world without that topic?"))
		{
			Topics.remove(this._id);
		}
	},

	"click .deleteResponse": function(){
		if(confirm("Are you really the type of person who deletes awesome suggestions, even though it can't be undone?"))
		{
			Responses.remove(this._id);
		}
	},

	"submit form": function(event){
		event.preventDefault();
		if(!Meteor.user()){
			return;
		}

		var topicID = $(event.currentTarget).children('.form-control').data('id');
		var suggestionText = event.target.suggest.value;

		var newSuggestion = {
				text: suggestionText,
				votes: 0,
				createdAt: new Date(), // current time
				owner: Meteor.userId(), // _id of logging in user
				username: Meteor.user().username,
				_topicID: topicID
			};

		newSuggestion._id = Responses.insert(newSuggestion);

		event.target.suggest.value = "";
	}
});

Template.topic.helpers({
	topicResponses: function(id){
		return Responses.find({_topicID:id}, {sort: [[ "votes", "desc" ]]});
	} 
});