Template.topicForm.events({
	// handle the form submission
	'submit form': function(event) {
		// stop the form from submitting
		event.preventDefault();

		if(!Meteor.user()){
			return;
		}

		Meteor.call('insertNewPrompt', event.target.title.value.substring(0,140), event.target.description.value.substring(0,1000), Meteor.userId(), Meteor.user().username);
		FlashMessages.sendSuccess("Prompt submitted. You're <em>dominating!</em>");
	}
});

// I'm sure there's some way to DRY these together but one copy isn't too terrible.
Template.titleCounter.onRendered(function(){
  this.$('#titlecounter').textCounter({
    target: '#titlefield',// required: string
    count: 140, 					// optional: if string, specifies attribute of target to use as value
               						//           if integer, specifies value. [defaults 140]
    alertAt: 20, 					// optional: integer [defaults 20]
    warnAt: 10,						// optional: integer [defaults 0]
    stopAtLimit: false 		// optional: defaults to false
  });
})


Template.descCounter.onRendered(function(){
  this.$('#desccounter').textCounter({
    target: '#descfield', // required: string
    count: 1000, 					// optional: if string, specifies attribute of target to use as value
               						//           if integer, specifies value. [defaults 140]
    alertAt: 50, 					// optional: integer [defaults 20]
    warnAt: 10, 					// optional: integer [defaults 0]
    stopAtLimit: false 		// optional: defaults to false
  });
})