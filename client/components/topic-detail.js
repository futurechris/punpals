// attach events to our topic template
Template.topicDetail.events({
	"click .vote": Meteor.topicFunctions.clickVoteFunction,
	"click .unvote": Meteor.topicFunctions.clickUnvoteFunction,
	"click .winner": Meteor.topicFunctions.clickWinnerFunction,
	"click .deletePrompt": Meteor.topicFunctions.clickDeletePromptFunction,
	"click .deleteResponse": Meteor.topicFunctions.clickDeleteReponseFunction,
	"submit form": Meteor.topicFunctions.submitFormFunction
});

Template.topicDetail.helpers({
	topicWinner: Meteor.topicFunctions.topicWinnerHelper,
	topicResponses: Meteor.topicFunctions.topicResponsesHelper,
	topicNonWinners: Meteor.topicFunctions.topicNonWinnerHelper,
});