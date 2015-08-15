Template.topicForm.events({
	// handle the form submission
	'submit form': function(event) {
		// stop the form from submitting
		event.preventDefault();

		if(!Meteor.user()){
			return;
		}

		// get the data we need from the form
		var newTopic = {
			prompt: event.target.prompt.value,
			createdAt: new Date(), // current time
			owner: Meteor.userId(), // _id of logging in user
			username: Meteor.user().username,
			winner: ""

		};

		Topics.insert(newTopic);
	}
});