import React, { Fragment } from 'react';
import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { shape, arrayOf, func } from 'prop-types';

import api from '../api';
import { openModal } from '../ducks/CourierEditModal';

import Grid from './Grid';
import MacrozoneBar from './MacrozoneBar';
import { getMacrozoneFilters } from '../selectors/filters';

const MacrozoneContent = ({ style, columnDefs, fetching, macrozoneParams }) => (
  <Fragment>
    <MacrozoneBar />
    <Grid
      style={style}
      fetching={fetching}
      fetchingParams={macrozoneParams}
      columnDefs={columnDefs}
    />
  </Fragment>
);

MacrozoneContent.defaultProps = {
  style: {},
  fetching: () => {},
  macrozoneParams: {},
};

MacrozoneContent.propTypes = {
  style: shape(),
  columnDefs: arrayOf().isRequired,
  fetching: func,
  macrozoneParams: shape(),
};

const mapStateToProps = state => ({
  macrozoneParams: getMacrozoneFilters(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ openModal }, dispatch);

const mapColumnDefs = props => ({
  columnDefs: [
    {
      headerName: 'Слой',
      field: 'layer',
      rowGroup: true,
    },
    {
      headerName: 'Название',
      field: 'name',
    },
    {
      headerName: 'Курьер',
      field: 'courier',
    },
    { headerName: 'Примечания', field: 'comment' },
    { headerName: 'Задан на карте', field: 'markedInMap' },
  ],
});

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(mapColumnDefs),
  withProps(() => ({
    fetching: params =>
      api.get('/macrozones', { params }).then(data => data.data),
  })),
);

export default enhancer(MacrozoneContent);
