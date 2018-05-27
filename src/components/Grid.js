import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Spin } from 'antd';
import 'ag-grid-enterprise';

class Grid extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.fetchingParams !== this.props.fetchingParams) {
      this.updateData();
    }
  }
  onGridReady = gridParam => {
    this.gridApi = gridParam.api;
    // Делаем колонки по ширине станицы
    this.gridApi.sizeColumnsToFit();
    this.updateData();
  };

  updateData = () => {
    this.gridApi.setDatasource({
      rowCount: null,
      getRows: params => {
        this.props.fetching(this.props.fetchingParams).then(data => {
          params.successCallback(data, -1);
        });
      },
    });
  };

  gridApi = null;
  frameworkComponents = {
    customLoadingOverlay: () => <Spin size="small" />,
  };

  render() {
    const { style, columnDefs } = this.props;

    return (
      <div className="ag-theme-balham" style={style}>
        <AgGridReact
          enableColResize
          enableServerSideSorting
          rowModelType="infinite"
          columnDefs={columnDefs}
          onGridReady={this.onGridReady}
        />
      </div>
    );
  }
}

export default Grid;
