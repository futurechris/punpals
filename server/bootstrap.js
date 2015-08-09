// run this when meteor app is started
Meteor.startup(function()
{

	// if there are no topics available create sample data
	if (Topics.find().count() === 0)
	{

		// create sample topics
		var sampleTopics = [
			{
				prompt: 'Signature cocktails for a Michael Jackson-themed wedding',
				responses: [
					{text: 'The Thriller Chiller', votes: 0 },
					{text: 'PYT (Pineapple, Yagermeister[sic], Tequila)', votes: 0 }
				]
			},
			{
				prompt: 'President\'s golf game that disrupted a wedding',
				responses: [
					{text: 'Let\'s see if we can drive this forward', votes:0},
					{text: 'Personally, I think calling the couple afterwards was the fairway to do it.', votes: 0},
					{text: 'I\'m really tee\'d off that they\'d just ban wordplay like that.', votes: 0},
					{text: 'The interesting bit was that the couple played the course after. The wife actually ended with the same score as Obama, tying him on her very last shot. She was so thrilled, she vowed that would be the last time she ever played: "A presidential par? Done!"', votes: 0},			
				]
			}
		];

		// loop over each sample poll and insert into database
		_.each(sampleTopics, function(topic) {
			Topics.insert(topic);
		});
	}

});

Meteor.publish("topics", function() {
	return Topics.find();
});

Meteor.publish("responses", function() {
	return Responses.find();
});