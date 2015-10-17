Template.topicForm.events({
	// handle the form submission
	'submit form': function(event) {
		// stop the form from submitting
		event.preventDefault();

		if(!Meteor.user()){
			return;
		}

		Meteor.call('insertNewPrompt', event.target.title.value, event.target.description.value, Meteor.userId(), Meteor.user().username);
		FlashMessages.sendSuccess("Prompt submitted. You're <em>dominating!</em>");
	}
});