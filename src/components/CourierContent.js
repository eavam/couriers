import React from 'react';
import { Icon } from 'antd';
import { compose, mapProps } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCouriers, getCouriersLoading } from '../selectors/couriers';
import { fetchCouriersList } from '../ducks/CourierContent';
import { openModal } from '../ducks/CourierEditModal';

import Grid from './Grid';

const CourierContent = ({ style, couriers, columnDefs, fetching, loading }) => (
  <Grid
    style={style}
    fetching={fetching}
    loading={loading}
    gridData={couriers}
    columnDefs={columnDefs}
  />
);

const mapStateToProps = state => ({
  couriers: getCouriers(state),
  loading: getCouriersLoading(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetching: fetchCouriersList, openModal }, dispatch);

const renderActive = ({ value }) => (value ? <Icon type="check" /> : '');
const renderPhone = ({ value }) => {
  if (!Array.isArray(value)) return '';

  return value.reduce(
    (acc, current) => `${acc}${current.main} ${current.extra}, `,
    '',
  );
};

const mapColumnDefs = props => [
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
];

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapProps(props => {
    const columnDefs = mapColumnDefs(props);
    return { ...props, columnDefs };
  }),
);

export default enhancer(CourierContent);
