var React = require('react'),
    MaterialMixin = require('./../../mixins/material-ui.js'),
    questionsActions  = require('./../../actions/questions'),
    lecturesStore       = require('../../stores/lectures'),
    ViewQuestionAndAnswers = require('./viewQuestionElements/viewQuestionsAndAnswers.jsx'),
    mui = require('material-ui'),
    FlatButton = mui.FlatButton,
    Dialog = mui.Dialog;

var ViewQuestionDialog = React.createClass({
  mixins: [MaterialMixin],
  getInitialState: function(){
    var questions = lecturesStore.getQuestions();
    var question;
    for(var i = 0; i < questions.length; i++){
      if(questions[i]._id === this.props.question._id){
        question = questions[i];
        break;
      }
    }
    return {question: question};
  },
  openModal: function(){
    this.refs['ViewQuestionDialog' + this.state.question._id].show();
  },
  closeDialog: function(){
    console.log("View Question Dialog Close");
    this.refs['ViewQuestionDialog' + this.state.question._id].dismiss();
  },
  render: function(){
    var actions = [
      <FlatButton
        key={1}
        label="Close"
        secondary={true}
        onTouchTap={this.closeDialog} />
    ];

    var result;
    if(this.state.question){
      result = (<div
                  className="dialog-box">
                    <Dialog
                      ref={"ViewQuestionDialog" + this.state.question._id}
                      title="Question"
                      actions={actions} >
                        <ViewQuestionAndAnswers
                          shortUrl={this.props.shortUrl}
                          votes={this.state.question.votes}
                          user={this.state.question.username}
                          question={this.state.question.title}
                          questionText={this.state.question.text}
                          questionId={this.state.question._id}
                          videoTime={this.state.question.time}
                          questionTime={this.state.question.createdAt}
                          answers={this.state.question.answers} />
                    </Dialog>
                </div>);
    }
    return (<div>
              {result}
            </div>);
  },
  componentDidMount: function(){
    if(!window.questionDialogs){ window.questionDialogs = {}; }
    window.questionDialogs[this.state.question._id] = this.refs["ViewQuestionDialog" + this.state.question._id];
  }
});

module.exports = ViewQuestionDialog;