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

// server
Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'services.facebook.id': 1}});
  } else {
    this.ready();
  }
});
