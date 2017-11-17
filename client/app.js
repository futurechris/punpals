Router.map(function(){
	this.route('home',
	{
		path: '/',

		action: function(){
			if(this.ready()){
				this.layout('app');
				this.render('front', {to: 'content'});
			}
		}
	});
});

/*
 * Route for looking at details of a specific topic
 */
Router.route('/topic/:_id', function() {
	this.layout('app');

	var item = Topics.findOne({_id: this.params._id });
	this.render('topicDetail', 
	{
		to: 'content',
		data: item
	});
});

/*
 * Helper for getting username for display, works with Facebook user profile as well.
 * TODO: Expand to include other login options' data structure, as we add them.
 */
UI.registerHelper('getUsername', function(userID){
	var user = Meteor.users.findOne({_id:userID});
	if(typeof(user) !== "undefined" && user)
	{
		return user.username || user.profile.name
	}
	return "";
});

/*
 * Helper to check if the logged-in user is the owner of the topic in question
 */
UI.registerHelper('checkTopicOwner', function(topicID){
	if(!Meteor.user()){
		return false;
	}
	var topic = Topics.findOne({_id:topicID}, {fields: {owner:1}});
	if(!topic){
		return false;
	}

	return topic.owner === Meteor.userId();
});

/*
 * Helper to check if the logged-in user is the owner of the response in question
 */
UI.registerHelper('checkResponseOwner', function(responseID){
	if(!Meteor.user()){
		return false;
	}
	var response = Responses.findOne({_id:responseID}, {fields: {owner:1}});
	if(!response){
		return false;
	}

	return response.owner === Meteor.userId();
});

/*
 * Helper to check whether the passed-in "winning" id is equal to the current response ID
 */
UI.registerHelper('checkResponseWinner', function(winningID, responseID){
	if (typeof(winningID) === "undefined"){
		return false;
	}
	return winningID === responseID;
});

/*
 * Helper to check if the user has a vote on the response in question
 */
UI.registerHelper('userHasVoted', function(responseID){
	var userID = Meteor.userId();
	var voteFound = UserVotes.findOne({_responseID: responseID, _userID: userID});
	if(!voteFound){
		return false;
	}
	return true;
});

/*
 * Hackaround for the avatar library, to get the avatar's user in a lib-friendly format
 */
UI.registerHelper('getAvatarUser', function(userID)
{
	var user = Meteor.users.findOne({_id: userID});
	if(user == null)
	{
		// This value is a bit of a hack, to force the avatar library to show default image
		// Would be nice if I could figure out how to make it fall through correctly when the userId was invalid
		return "0";
	}
	return user;
});

Meteor.subscribe("topics");
Meteor.subscribe("responses");
Meteor.subscribe("uservotes");
Meteor.subscribe("userData");

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});

Avatar.setOptions({
	fallbackType: "default image",
	gravatarDefault: "mm",
  defaultImageUrl: "http://i1.wp.com/www.techrepublic.com/bundles/techrepubliccore/images/icons/standard/icon-user-default.png"
});
