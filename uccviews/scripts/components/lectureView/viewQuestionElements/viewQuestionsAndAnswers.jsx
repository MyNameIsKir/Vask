var React = require('react'),
    questionsActions  = require('../../../actions/questions'),
    lecturesStore  = require('../../../stores/lectures'),
    Question = require('./../QAElements/question.jsx'),
    AnswerForm = require('./answerForm.jsx'),
    Answer = require('./../QAElements/answer.jsx');

var ViewQuestionAndAnswers = React.createClass({
  getInitialState: function(){
    var questions = lecturesStore.getQuestions();
    var question;
    for(var i = 0; i < questions.length; i++){
      if(questions[i]._id === this.props.questionId){
        question = questions[i];
        break;
      }
    }
    return {question: question};
  },
  render: function(){
    var qID = this.props.questionId;
    return (<div>
              <Question
                votes={this.props.votes}
                imgUrl={this.props.imgUrl}
                user={this.props.user}
                question={this.props.question}
                videoTime={this.props.videoTime}
                questionTime={this.props.questionTime}
                questionId={qID}/>
              <AnswerForm
                shortUrl={this.props.shortUrl}
                questionId={qID}/>
              {this.props.answers.map(function(answer, index){
                return (<Answer
                          key={answer.key}
                          votes={answer.votes}
                          imgUrl={answer.imgUrl}
                          user={answer.user || "Anonymous"}
                          answer={answer.text}
                          answerTime={answer.answerTime}
                          answerIndex={index}
                          questionId={qID}/>
                        );
              })}
            </div>);
  }
});

module.exports = ViewQuestionAndAnswers;