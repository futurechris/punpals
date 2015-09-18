Template.front.helpers({
	topics: function(){
		return Topics.find({}, {sort: [["createdAt", "desc"]]});
	}
});