import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import Question from './Question';
import TextField from '@material-ui/core/TextField';
import AnswerOption from '../components/AnswerOption';
import purple from '@material-ui/core/colors/purple';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
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

function TextInput(props) {
      // return (
        // <AnswerOption
  //         key={key.content}
  //         answerContent={key.content}
  //         answerType={key.type}
  //         answer={props.answer}
  //         questionId={props.questionId}
          // onAnswerSelected={props.onAnswerSelected}
        // />
      // );
  return (
    <CSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div>
        {/* <QuestionCount counter={props.questionId} total={props.questionTotal} /> */}
        <Question content={props.question} />
        {/* <ul className="answerOptions">
          {props.answerOptions.map(renderAnswerOptions)}
        </ul> */}
        <form>
         <TextField
            className={styles.margin}
            InputLabelProps={{
              styles: {
                root: styles.cssLabel,
                focused: styles.cssFocused,
              },
            }}
            InputProps={{
              styles: {
                root: styles.cssOutlinedInput,
                focused: styles.cssFocused,
                notchedOutline: styles.notchedOutline,
              },
            }}
            multiline
            rowsMax="4"
            label="txt"
            variant="outlined"
            style={
              {
                readOnly: true,
                marginLeft: '2.5rem',
                width: 400,
              }
            }
            onChange={props.onValueChange}
            id="txt"
            defaultValue=""
          />
          <br />
          <Button variant="contained" className={styles.button} onClick={props.onAnswerInput}
          style={
            {
              margin: 20,
              marginLeft: '2.5rem',
            }
          }>
            Submit
          </Button>
          </form>
      </div>
    </CSSTransitionGroup>
  );
}

TextInput.propTypes = {
  answer: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerInput: PropTypes.func.isRequired,
  onValueChange: PropTypes.func.isRequired
};

export default TextInput;
//   function renderAnswerOptions(key) {
//     return (
//       <AnswerOption
//         key={key.content}
//         answerContent={key.content}
//         answerType={key.type}
//         answer={props.answer}
//         questionId={props.questionId}
//         onAnswerSelected={props.onAnswerSelected}
//       />
//     );
//   }
