import React from 'react';
import { Icon } from 'antd';
import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { shape, arrayOf, func } from 'prop-types';

import api from '../api';
import { openModal } from '../ducks/CourierEditModal';

import Grid from './Grid';
import { getCouriersFilters } from '../selectors/filters';

const CourierContent = ({ style, columnDefs, fetching, couriersParams }) => (
  <Grid
    style={style}
    fetching={fetching}
    fetchingParams={couriersParams}
    columnDefs={columnDefs}
  />
);

CourierContent.defaultProps = {
  style: {},
  fetching: () => {},
  couriersParams: {},
};

CourierContent.propTypes = {
  style: shape(),
  columnDefs: arrayOf().isRequired,
  fetching: func,
  couriersParams: shape(),
};

const mapStateToProps = state => ({
  couriersParams: getCouriersFilters(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ openModal }, dispatch);

const renderActive = ({ value }) => (value ? <Icon type="check" /> : '');
const renderPhone = ({ value }) => {
  if (!Array.isArray(value)) return '';

  return value.reduce(
    (acc, current) => `${acc}${current.main} ${current.extra}, `,
    '',
  );
};

const mapColumnDefs = props => ({
  columnDefs: [
    {
      headerName: 'Активность',
      field: 'active',
      cellRendererFramework: renderActive,
    },
    {
      headerName: 'ФИО',
      field: 'name',
      onCellClicked: event => props.openModal(event.data),
    },
    {
      headerName: 'Номер телефона',
      field: 'phone',
      cellRendererFramework: renderPhone,
    },
    { headerName: 'Основной график работы', field: 'schedule' },
    { headerName: 'Назначен макрозоне', field: 'macrozone' },
  ],
});

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(mapColumnDefs),
  withProps(() => ({
    fetching: params =>
      api.get('/couriers', { params }).then(data => data.data),
  })),
);

export default enhancer(CourierContent);
