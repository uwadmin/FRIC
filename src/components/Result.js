import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import Button from '@material-ui/core/Button';

function Result(props) {
  return (
    <CSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <Button variant="contained" onClick={(e) => { props.handleClick(e) }}
        style={
          {
            margin: 30,
            marginLeft: 300
          }
        }>
        Next
      </Button>

    </CSSTransitionGroup>
  );
}



Result.propTypes = {
  handleClick: PropTypes.func.isRequired
};

export default Result;
