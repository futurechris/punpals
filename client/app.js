// Router.route('/', function() {
// 	this.layout('app');
// 	this.render('front', {to: 'content'});
// });


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


Router.route('/topic/:_id', function() {
	this.layout('app');
	// this.layout('app', {
	// 	data: function(){
	// 	 return Topics.findOne({_id: this.params._id });
	// 	}
	// });
	var item = Topics.findOne({_id: this.params._id });
	this.render('topicDetail', 
	{
		to: 'content',
		data: item
	});
});

Template.body.helpers({
	topics: function(){
		return Topics.find({}, {sort: [["createdAt", "desc"]]});
	}	
});

// adds index to each item
UI.registerHelper('indexedArray', function(context, options) {
	if(context)	{
		return context.map(function(item, index) {
			item._index = index;
			return item;
		});
	}
});

UI.registerHelper('checkTopicOwner', function(topicID){
	if(!Meteor.user()){
		return false;
	}
	var topic = Topics.findOne({_id:topicID}, {fields: {username:1}});
	if(!topic){
		return false;
	}
	if(typeof topic.username === "undefined"){
		return false;
	}
	// Would be good to find a more graceful way to do this, as we move to having more than just local&facebook logins
	return (topic.username === Meteor.user().username)
	 || (Meteor.user().profile != null && (topic.username === Meteor.user().profile.name));
});

UI.registerHelper('checkResponseOwner', function(responseID){
	if(!Meteor.user()){
		return false;
	}
	var response = Responses.findOne({_id:responseID}, {fields: {username:1}});
	if(!response){
		return false;
	}
	if(typeof response.username === "undefined"){
		return false;
	}

	// Would be good to find a more graceful way to do this, as we move to having more than just local&facebook logins
	return (response.username === Meteor.user().username)
	 || (Meteor.user().profile != null && (response.username === Meteor.user().profile.name));
});

UI.registerHelper('checkResponseWinner', function(winningID, responseID){
	if (typeof(winningID) === "undefined"){
		return false;
	}
	return winningID === responseID;
});

UI.registerHelper('userHasVoted', function(responseID){
	var userID = Meteor.userId();
	var voteFound = UserVotes.findOne({_responseID: responseID, _userID: userID});
	if(!voteFound){
		return false;
	}
	return true;
});

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
