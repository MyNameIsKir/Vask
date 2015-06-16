var React = require('react'),
    MaterialMixin = require('./../../../mixins/material-ui.js'),
    questionsActions  = require('../../../actions/questions'),
    lecturesStore  = require('../../../stores/lectures'),
    mui = require('material-ui'),
    IconButton = mui.IconButton;


var Voting = React.createClass({
  mixins: [MaterialMixin],
  voteUp: function(){
    this.setState({votes: (this.props.votes + 1)});
    questionsActions.voteUp(this.state.question);
  },
  voteDown: function(){
    this.setState({votes: (this.props.votes - 1)});
    questionsActions.voteDown(this.state.question);
  },
  getInitialState: function(){
    var questions = lecturesStore.getQuestions();
    var question;
    var votes = 0;
    for(var i = 0; i < questions.length; i++){
      if(questions[i]._id === this.props.questionId){
        votes = questions[i].votes;
        question = questions[i];
        break;
      }
    }
    return {
              votes: votes,
              question: question
           };
  },
  render: function(){
    return (<div
              className="media-left voting">
                <IconButton
                  iconClassName="mdi mdi-chevron-up vote-button"
                  tooltip="Vote Up"
                  onClick={this.voteUp} />
                <p
                  className="votes">
                    <span>{this.state.votes}</span>
                </p>
            </div>
            );
  }
});

module.exports = Voting;