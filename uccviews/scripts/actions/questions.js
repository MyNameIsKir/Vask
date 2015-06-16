'use strict'

var Dispatcher = require('../dispatcher/dispatcher'),
  assign     = require('object-assign'),
  request    = require('superagent'),
  questionsConstants = require('../constants/questions');

module.exports = {

  // When ready, dispatch the questions to the store
  setQuestions: function(questions){
    Dispatcher.handleViewAction({
      actionType: questionsConstants.SET_QUESTIONS,
      questions: questions
    });
  },

  getQuestions: function(videoId){
    // console.log('Updating the list of questions');
    var thiz = this,
        url = "/getquestions?video=" + videoId;

    request.get(url)
           .set('Accept', 'application/json')
           .end(function(err, res){
              if (err) {
                // console.log('Failed fetching the server');
                throw err;
              }
              // console.log('response from the server', res);
              if(res.ok){

                var questions = res.body.result;
                // console.log('All questions arrived.. sending to dispatcher');
                thiz.setQuestions(questions);
              } else {
                // console.log('Response is not ok');
              }
           });
  },

  addQuestion: function(question){
    // console.log('Submiting question..');
    var self = this,
        url = '/addquestion';
    // Request the API for the data (lectures)
    request.post(url)
         .send(question)
         .set('Accept', 'application/json')
         .end(function(err, res){
          if (err) {
            // console.log('Failed fetching the server: lectures');
            throw err;
          }
          // console.log('response from the server', res);
          if(res.ok){
            // console.log('Question successfuly added.');
            // after successfuly saved, update the questions passing the video ID
            self.getQuestions(question.video);


          } else {
            // thow the error
            // console.log('Ask question is not ok');
          }
         });

  },

  voteQuestion: function(question, inc, answerIndex){
    var data = {
      inc : inc,
      _id : question._id
    };
    var self = this;
    var url = '/votequestion';
    if (answerIndex!==undefined) {
      data.idx = answerIndex;
      url = '/voteanswer'
    }
    $.ajax({
      url: url,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      statusCode: {
        201: function (data) {
          self.getQuestions(question.video);
          console.log('win');
          console.log(data);
          },
        500: function (err) {
          console.log('lose')
        }
      }
    });
  },

  voteUp: function(question, answerIndex){
    console.log("vote up");
    var isAnswer = answerIndex !== undefined;
    if(isAnswer){
      console.log('vote answer');
      this.voteQuestion(question,1,answerIndex);
    } else {
      console.log('question up vote');
      this.voteQuestion(question,1);
    }
  },

  voteDown: function(question, answerIndex){
    console.log("vote down");
    var isAnswer = answerIndex !== undefined;
    if(isAnswer){
      console.log('vote answer');
      this.voteQuestion(question,-1,answerIndex);
    } else {
      this.voteQuestion(question,-1);
    }
  }
}