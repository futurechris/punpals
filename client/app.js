Template.body.helpers({
	topics: function(){
		return Topics.find();
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
})

Meteor.subscribe("topics");

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});