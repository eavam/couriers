import React from 'react';
import { Spin, Icon } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import { compose, withHandlers, lifecycle, mapProps } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCouriers, getCouriersFetching } from '../selectors/couriers';
import { fetchCouriersList } from '../ducks/CourierContent';
import { openModal } from '../ducks/CourierEditModal';

let gridAPI = null;
let getRowsProps = null;

const OverLay = () => <Spin size="small" />;

const frameworkComponents = {
  customLoadingOverlay: OverLay,
};

const CourierContent = ({ style, fetchCouriers, columnDefs }) => (
  <div className="ag-theme-balham" style={style}>
    <AgGridReact
      enableServerSideSorting
      enableColResize
      rowModelType="infinite"
      frameworkComponents={frameworkComponents}
      loadingOverlayComponent="customLoadingOverlay"
      columnDefs={columnDefs}
      onGridReady={fetchCouriers}
    />
  </div>
);

const mapStateToProps = state => ({
  couriers: getCouriers(state),
  fetchingCouriers: getCouriersFetching(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchCouriersList, openModal }, dispatch);

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    fetchCouriers: props => params => {
      gridAPI = params.api;

      // Делаем колонки по ширине станицы
      gridAPI.sizeColumnsToFit();
      gridAPI.setDatasource({
        rowCount: null,
        getRows: rowProps => {
          getRowsProps = rowProps;
          props.fetchCouriersList('add');
        },
      });
    },
  }),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (this.props.fetchingCouriers) {
        gridAPI.showLoadingOverlay();
      } else {
        gridAPI.hideOverlay();
      }

      if (prevProps.couriers !== this.props.couriers) {
        let lastRow = -1;
        if (this.props.couriers.length <= getRowsProps.endRow) {
          lastRow = this.props.couriers.length;
        }
        if (getRowsProps.successCallback)
          getRowsProps.successCallback(this.props.couriers, lastRow);
      }
    },
  }),
  mapProps(props => {
    const columnDefs = [
      {
        headerName: 'Активность',
        field: 'active',
        cellRendererFramework: ({ value }) =>
          value ? <Icon type="check" /> : '',
      },
      {
        headerName: 'ФИО',
        field: 'name',
        onCellClicked: event => props.openModal(event.data),
      },
      {
        headerName: 'Номер телефона',
        field: 'phone',
        cellRendererFramework: ({ value }) => {
          if (!Array.isArray(value)) return '';

          return value.reduce(
            (acc, current) => `${acc}${current.main} ${current.extra}, `,
            '',
          );
        },
      },
      { headerName: 'Основной график работы', field: 'schedule' },
      { headerName: 'Назначен макрозоне', field: 'macrozone' },
    ];
    return { ...props, columnDefs };
  }),
);

export default enhancer(CourierContent);
