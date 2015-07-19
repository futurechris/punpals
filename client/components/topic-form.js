Template.topicForm.events({
	// handle the form submission
	'submit form': function(event) {
		// stop the form from submitting
		event.preventDefault();

		// get the data we need from the form
		var newTopic = {
			prompt: event.target.prompt.value,
			responses: [
				{ text: event.target.response1.value, votes: 0},
				{ text: event.target.response2.value, votes: 0},
				{ text: event.target.response3.value, votes: 0}
			],
			createdAt: new Date(), // current time
			owner: Meteor.userId(), // _id of logging in user
			username: Meteor.user().username
		};

		Topics.insert(newTopic);
	}
});