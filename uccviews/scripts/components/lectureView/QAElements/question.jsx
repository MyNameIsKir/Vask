var React = require('react'),
    questionsActions  = require('../../../actions/questions'),
    lecturesStore  = require('../../../stores/lectures'),
    Voting = require('./voting.jsx'),
    QuestionEntry = require('./questionEntry.jsx');

var Question = React.createClass({
  getInitialState: function(){
    var questions = lecturesStore.getQuestions();
    var votes = 0;
    for(var i = 0; i < questions.length; i++){
      if(questions[i]._id === this.props.questionId){
        votes = questions[i].votes;
        break;
      }
    }
    return { votes: votes };
  },
  render: function(){
    return (<div
              className="row question">
              <div
                className="col-lg-1 col-md-1 col-sm-1 col-xs-1 text-center">
                  <Voting
                    votes={this.state.votes}
                    questionId={this.props.questionId} />
              </div>
              <QuestionEntry
                user={this.props.user}
                question={this.props.question}
                videoTime={this.props.videoTime}
                questionTime={this.props.questionTime}/>
            </div>);
  }
});

module.exports = Question;