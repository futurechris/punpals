// run this when meteor app is started
Meteor.startup(function(){});

Meteor.publish("topics", function() {
	return Topics.find();
});

Meteor.publish("responses", function() {
	return Responses.find();
});

Meteor.publish("uservotes", function() {
	return UserVotes.find();
});