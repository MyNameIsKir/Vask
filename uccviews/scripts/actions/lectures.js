'use strict'

var Dispatcher = require('../dispatcher/dispatcher'),
	assign     = require('object-assign'),
	request    = require('superagent'),
	lecturesConstants = require('../constants/lectures');

module.exports = {

	// When ready, dispatch the lectures to the store
	setLectures: function(lectures){
		Dispatcher.handleViewAction({
			actionType: lecturesConstants.SET_LECTURES,
			lectures: lectures
		});
	},

	setQuestions: function(questions){
		Dispatcher.handleViewAction({
			actionType: lecturesConstants.SET_QUESTIONS,
			questions: questions
		});
	},

	getLectures: function(){
		var self = this,
			url = '/getlectures';
		// Request the API for the data (lectures)
		request.get(url)
			   .set('Accept', 'application/json')
			   .end(function(err, res){
			   	if (err) {
			   		console.log('Failed fetching the server');
			   		throw err;
			   	}
			   	console.log('response from the server', res);
			   	if(res.ok){
			   		// get the data from the response
			   		var lectures = res.body.result;
			   		// send the data to dispatcher
			   		self.setLectures(lectures);

			   	} else {
			   		// thow the error
			   		console.log('Response is not ok');
			   	}
			   });
	},

	getQuestions: function(videoId){
		var thiz = this,
			url = "/getquestions?video=" + videoId;

		request.get(url)
					 .set('Accept', 'application/json')
				   .end(function(err, res){
					   	if (err) {
					   		console.log('Failed fetching the server');
					   		throw err;
					   	}
					   	console.log('response from the server', res);
					   	if(res.ok){
					   		var questions = res.body.result;
					   		thiz.setQuestions(questions);
					   	} else {
					   		console.log('Response is not ok');
					   	}
				   });
	}
}