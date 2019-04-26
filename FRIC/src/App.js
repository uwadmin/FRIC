import React, {Component} from 'react';
import quizQuestions from './api/quizQuestions';
import MultiChoice from './components/MultiChoice';
import TextInput from './components/TextInput'
import Result from './components/Result';
import './App.css';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssLabel: {
    '&$cssFocused': {
      color: purple[500],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: purple[500],
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: purple[500],
    },
  },
  notchedOutline: {},
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      result: '',
      goto: 0,
      text: '',
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleAnswerInput = this.handleAnswerInput.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  componentWillMount() {
    const AnswerOptions = quizQuestions.map(question =>
        question.answers
    );
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: AnswerOptions[0],
    });
  }

  handleAnswerSelected(event) {
    // console.log(event.currentTarget.value)
    this.setUserAnswer(event.currentTarget.value);
    console.log(typeof this.state.goto)
    if (typeof this.state.goto !== 'number') {
      console.log("type3" + typeof this.state.goto)
      setTimeout(() => this.setResults(this.getResults()), 300);
    } else {
      console.log("type3" + typeof this.state.goto)
      setTimeout(() => this.setNextQuestion(), 300);
    }
  }

  handleTextChange(event) {
    this.setState({
      text: event.currentTarget.value
    });
 }

  handleAnswerInput(event) {
    document.getElementById('phone').value = this.state.text
    this.setNextQuestion()
  }

  setUserAnswer(answer) {
    this.setState({
      goto: answer
    });
  }

  setNextQuestion() {
    let counter = parseInt(this.state.counter) + 1;
    console.log("counter1: " + counter)
    if (this.state.goto != null) {
      counter = this.state.goto;
    }
    console.log("counter2: " + counter) 
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: '',
      goto: null,
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
  }

  setResults(result) {
    this.setState({result: this.state.goto})
  }

  renderQuiz() {
    if (this.state.answerOptions.length === 0) {
      return (
          <TextInput
            answer={this.state.answer}
            answerOptions={this.state.answerOptions}
            questionId={this.state.questionId}
            question={this.state.question}
            questionTotal={quizQuestions.length}
            onAnswerInput={this.handleAnswerInput}
            onValueChange={this.handleTextChange}
          />
      );
    } else {
      return (
          <MultiChoice
              answer={this.state.answer}
              answerOptions={this.state.answerOptions}
              questionId={this.state.questionId}
              question={this.state.question}
              questionTotal={quizQuestions.length}
              onAnswerSelected={this.handleAnswerSelected}
          />
      );
    }
  }

  renderResult() {
    return <Result quizResult={this.state.result}/>;
  }

  renderPhone() {
    return "hello"
  }

  render() {
    const {classes} = this.props;
    return (
        <div className="App">
          <div className="App-header">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <h1> F.R.I.C </h1>
            <TextField
                className={classes.margin}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                  readOnly: true
                }}
                label="Phone"
                defaultValue="Phone Number"
                variant="outlined"
                style={
                  {
                    width: 190
                  }
                }
                id="phone"
            />
            <TextField
                className={classes.margin}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                  readOnly: true
                }}
                label="Caller"
                defaultValue="Caller Name"
                variant="outlined"
                style={
                  {
                    width: 190
                  }
                }
                id="caller"
            />
            <br/>
            <TextField
                className={classes.margin}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                  readOnly: true
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                  readOnly: true
                }}
                multiline
                rowsMax="4"
                label="Location"
                defaultValue="Emergency Location"
                variant="outlined"
                style={
                  {
                    width: 400
                  }
                }
                id="location"
            />
            <br/>
            <TextField
                className={classes.margin}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                  readOnly: true
                }}
                label="Report Incident"
                defaultValue="Details"
                variant="outlined"
                style={
                  {
                    width: 400
                  }
                }
                // fullWidth
                id="report"
            />
          </div>
          {this.state.result ? this.renderResult() : this.renderQuiz()}
        </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
