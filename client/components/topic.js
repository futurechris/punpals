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
		var voteString = 'responses.' + voteID + '.votes';
		var action = {};
		action[voteString] = 1;

		// increment the number of votes for this choice
		Topics.update(
			{ _id: topicID },
			{ $inc: action }
		);

	},
	"click .delete": function(){
		Topics.remove(this._id);
	},
	"submit form": function(event){
		event.preventDefault();

		var topicID = $(event.currentTarget).children('.form-control').data('id');
		var suggestionText = event.target.suggest.value;

		var action = {
			"responses": {
				text: suggestionText,
				votes: 0,
				createdAt: new Date(), // current time
				owner: Meteor.userId(), // _id of logging in user
				username: Meteor.user().username
			}
		};

		Topics.update(
			{ _id: topicID },
			{ $push: action }
		);

		event.target.suggest.value = "";
	}
});