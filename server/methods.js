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
  },

  insertNewResponse: function(topicID, suggestionText, userID, username)
  {
		var newSuggestion = {
				text: suggestionText,
				votes: 0,
				createdAt: new Date(), // current time
				owner: Meteor.userId(), // _id of logged in user
				username: Meteor.user().username,
				_topicID: topicID
			};

		newSuggestion._id = Responses.insert(newSuggestion);
  },

  selectWinningResponse: function(topicID, responseID, userID)
  {
		// create the incrementing object so we can add to the corresponding vote
		var winningString = 'winner';
		var action = {};
		action[winningString] = responseID;

		// set the suggestion to winner
		Topics.update(
			{ _id: topicID, owner:userID },
			{ $set: action }
		);
  },

  voteOnResponse: function(topicID, responseID, userID)
  {
		var userVoteQuery = {
			_responseID:	responseID,
			_userID: 			userID,
			_topicID: 		topicID,
		};

		var userVote = UserVotes.findOne(userVoteQuery);

		if(userVote)
		{
			// update the vote's createdAt field
			var updateResult = UserVotes.update(
				{
					_id: userVote._id
				},
				{
					$set: {
						createdAt: new Date()
					}
				}
			);
		}
		else
		{
			userVoteQuery["createdAt"] = new Date();
			UserVotes.insert(userVoteQuery);

			// create the incrementing object so we can add to the corresponding vote
			var action = {
				'votes': 1
			};

			Responses.update(
				{ _id: 	responseID },
				{ $inc: action }
			);
		}
  },

  deletePrompt: function(userID, topicID)
  {
		Topics.remove({_id:topicID, owner:userID});
  },

  deleteResponse: function(userID, responseID)
  {
		Responses.remove({_id:responseID, owner:userID});
  },

  removeVoteFromResponse: function(topicID, responseID, userID)
  {
		var foundVote		= UserVotes.findOne({_topicID:topicID, _responseID:responseID, _userID:userID});

		if(!foundVote)
		{
			// Couldn't find the vote for some reason - exit.
			return;
		}
		var deleteResult = UserVotes.remove(foundVote._id);

		var action = {
				'votes': -1
			};
		Responses.update(
			{ _id: 	responseID },
			{ $inc: action }
		);
  }

});