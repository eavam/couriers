import React from 'react';
// import PropTypes from 'prop-types';
import debounce from 'lodash/debounce'; // or whatevs
import isEqual from 'lodash/isEqual';

class AutoSave extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.values, this.props.values)) {
      this.save();
    }
  }

  save = debounce(() => {
    this.props.onSave(this.props.values);
  }, 300);

  render() {
    return null;
  }
}

export default AutoSave;
