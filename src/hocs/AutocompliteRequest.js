import React from 'react';
import debounce from 'lodash.debounce';
import api from '../api';

class AutocompliteRequest extends React.Component {
  state = {
    loading: false,
    error: false,
    data: [],
  };

  fetching = async (q = '') => {
    const { url, limit } = this.props;
    this.setState({ data: [], loading: true });
    const response = await api.get(url, {
      params: { q, limit },
    });
    this.setState({ data: response.data, loading: false });
  };

  render() {
    return this.props.children({
      ...this.state,
      fetching: debounce(this.fetching, 800),
    });
  }
}

export default AutocompliteRequest;
