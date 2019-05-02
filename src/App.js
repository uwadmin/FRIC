import React, { Component } from 'react';
import quizQuestions from './api/quizQuestions';
import MultiChoice from './components/MultiChoice';
import TextInput from './components/TextInput'
import Result from './components/Result';
import './App.css';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import PopOver from './components/PopOver';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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
      goto: '',
      text: '',
      open: false,
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
    // if (document.getElementById('txt') !== undefined) {
      //  document.getElementById('txt').value = ""
    // }
  }

  checkReturn(str) {
    return String(str).match(/[a-z]/i)
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAnswerSelected(event) {
    // console.log(event.currentTarget.value)
    this.setUserAnswer(event.currentTarget.value);
    console.log("type: " + typeof this.state.goto)
    console.log("value1 " + this.state.goto)
    if (this.checkReturn(event.currentTarget.value)) {
      console.log("type2 " + typeof this.state.goto)
      setTimeout(() => this.setResults(), 300);
    } else {
      console.log("type3 " + typeof this.state.goto)
      console.log("value: " + this.state.goto)
      setTimeout(() => this.setNextQuestion(), 300);
    }
  }

  handleTextChange(event) {
    this.setState({
      text: event.currentTarget.value
    });
  }


  handleAnswerInput(event) {

    if (this.state.question.match(/What is the emergency/i)) {
      document.getElementById('report').value = this.state.text
      document.getElementById('txt').value = ""
    }
    if (this.state.question.match(/telephone/i)) {
      document.getElementById('phone').value = this.state.text
      document.getElementById('txt').value = ""
    }
    if (this.state.question.match(/where/i)) {
      document.getElementById('location').value = this.state.text
      document.getElementById('txt').value = ""
    }

    if (this.state.question.match(/sex/i)) {
      document.getElementById('sex').value = this.state.text
      document.getElementById('txt').value = ""
    }

    this.setNextQuestion()
  }

  setUserAnswer(answer) {
    this.setState({
      goto: answer
    });
  }

  setNextQuestion() {
    let counter = parseInt(this.state.counter) + 1;
    console.log("goto1: " + this.state.goto)
    console.log("counter1: " + counter)
    if (this.state.goto.length !== 0) {
      counter = parseInt(this.state.goto);
    }
    console.log("goto2: " + this.state.goto)
    console.log("counter2: " + counter)
    const questionId = this.state.questionId + 1;

    console.log("counter3: " + counter)
    console.log("goto3: " + this.state.goto)

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: '',
      goto: '',
    });
  }

  setResults() {
    this.setState({ result: this.state.goto })
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
    document.getElementById('code').value = this.state.goto
  }

  renderHintHelper(content, title) {
    return <Dialog
      open={this.state.open}
      onClose={this.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      children={<PopOver content={content} title={title} handleClose={this.handleClose}/>}
    >
    </Dialog>
  }

  renderHint() {
    if (this.state.question.match(/What is the emergency/i)) {
      return this.renderHintHelper("hello", "world");
    }

    if (this.state.question.match(/department/i)) {
      return this.renderHintHelper("hello1", "world1");
    }

    if (this.state.question.match(/where/i)) {
      return this.renderHintHelper("hello2", "world2");
    }

    if (this.state.question.match(/sex/i)) {
      return this.renderHintHelper("hello3", "world3");
    }

    if (this.state.question.match(/conscious/i)) {
      return this.renderHintHelper("hello4", "world4");
    }
    if (this.state.question.match(/telephone/i)) {
      return this.renderHintHelper("hello5", "world5");
    }

    return this.renderHintHelper("Sorry", "No hint here");
  }

  render() {
    const { classes } = this.props;
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
            rowsMax="4"
            label="Sex"
            defaultValue="Sex"
            variant="outlined"
            style={
              {
                width: 190
              }
            }
            id="sex"
          />
          <br />
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
                width: 600
              }
            }
            id="location"
          />
          <br />
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
                width: 600
              }
            }
            // fullWidth
            id="report"
          />
          <br />
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
            label="Code"
            defaultValue="Code"
            variant="outlined"
            style={
              {
                width: 300,
              }
            }
            id="code"
          />
       </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
        <div style = {{
          display: "flex",
          justifyContent: "flex-end"
        }
        }>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen} style={
            {
              margin: 20,
            }
          }>
            About This Question
        </Button>
        {this.renderHint()}
        </div>

      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
