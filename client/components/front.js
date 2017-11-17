/*
 * Helper to get list of all topics
 */
Template.front.helpers({
	topics: function(){
		return Topics.find({}, {sort: [["createdAt", "desc"]]});
	}
});