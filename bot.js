var Twit = require('twit');

//authenticate with info after you create your Twitter app.
var T = new Twit({
	consumer_key: '',
	consumer_secret: '',
	access_token: '',
	access_token_secret: ''
});

//main function
function quoteTweet(){
	//get method of Twit. search all tweets for the query "namaste"
	T.get('search/tweets', {q: "namaste", result_type: "recent"},
	function (err, data, response){
		if (!err){
			
			//if there's no error, collect the first tweet from the array of results
			var tweet = data.statuses[0];
			
			//prepare a tweet...
			var retweetBody = 'namaste?? RT @' + tweet.user.screen_name + ' ' + tweet.text;
			
			//post it!
			T.post('statuses/update',{status:retweetBody}, function (err,response) {
	            if (response) {
	                    console.log('Quote Tweeted Tweet ID: ' + tweet.id_str);
	            }
	            if (err) {
	                console.log('Quote Tweet Error: ', err);
	            }
	        });
		} else {
	        console.log('Search Error: ', err);
	    }
	});
};

quoteTweet();
setInterval(quoteTweet, 900000);