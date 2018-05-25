import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Spin } from 'antd';
import api from '../api';
import 'ag-grid-enterprise';

const OverLay = () => <Spin size="small" />;

class Grid extends Component {
  componentDidUpdate() {
    const { loading } = this.props;
    if (!this.gridAPI) return;

    if (loading) {
      this.gridAPI.showLoadingOverlay();
    } else {
      this.gridAPI.hideOverlay();
      this.gridAPI.ensureIndexVisible(this.lastRowIndex);
    }
  }

  getRowsProps = null;
  gridAPI = null;
  lastRowIndex = 0;

  frameworkComponents = {
    customLoadingOverlay: OverLay,
  };

  handleScroll = event => {
    if (event.direction !== 'vertical') return;

    const { fetching, gridData } = this.props;
    this.lastRowIndex = this.gridAPI.getLastDisplayedRow();
    if (gridData.length <= this.lastRowIndex + 1) fetching();
  };

  handelScrollChanged = () => {
    this.gridAPI.setFocusedCell(this.lastRowIndex);
  };

  fetchData = params => {
    const { fetching } = this.props;
    this.gridAPI = params.api;

    // Делаем колонки по ширине станицы
    this.gridAPI.sizeColumnsToFit();
    fetching();
  };

  render() {
    const { style, columnDefs, gridData } = this.props;
    return (
      <div className="ag-theme-balham" style={style}>
        <AgGridReact
          id="myGrid"
          enableColResize
          enableServerSideSorting
          onBodyScroll={this.handleScroll}
          onModelUpdated={this.handelScrollChanges}
          columnDefs={columnDefs}
          rowData={gridData}
          frameworkComponents={this.frameworkComponents}
          loadingOverlayComponent="customLoadingOverlay"
          onGridReady={this.fetchData}
        />
      </div>
    );
  }
}

export default Grid;
