Meteor.methods({
  insertNewPrompt: function (promptText, user, username) {
    
  	// get the data we need from the form
		var newTopic = {
			prompt: promptText,
			createdAt: new Date(), // current time
			owner: user, // _id of logging in user
			username: username,
			winner: "",
			modifyDate: new Date()
		};

		Topics.insert(newTopic);
  }
});