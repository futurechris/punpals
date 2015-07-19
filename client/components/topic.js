// attach events to our topic template
Template.topic.events({
	// event to handle clicking a choice
	'click .vote': function(event) {
		// prevent the default behavior
		event.preventDefault();

		// get the parent (topic) id
		var topicID = $(event.currentTarget).parent().parent('.topic').data('id');
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
	}
});