import React, { Component, Fragment } from 'react';
import { Menu } from 'antd';
import { Route, Link, withRouter } from 'react-router-dom';

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';

import './App.css';
import CourierFilters from './components/CourierFilters';
import CourierContent from './components/CourierContent';
import CourierEditModal from './components/CourierEditModal';

import MacrozoneFilters from './components/MacrozoneFilters';
import MacrozoneContent from './components/MacrozoneContent';

const Couriers = () => (
  <Fragment>
    <CourierFilters style={{ flex: '0 1 auto' }} />
    <CourierContent style={{ flex: '1 1 0' }} />
    <CourierEditModal />
  </Fragment>
);

const Macrozones = () => (
  <Fragment>
    <MacrozoneFilters style={{ flex: '0 1 auto' }} />

    <MacrozoneContent style={{ flex: '1 1 0' }} />
  </Fragment>
);

class App extends Component {
  render() {
    const { location } = this.props;
    return (
      <Fragment>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[location.pathname]}
          style={{ lineHeight: '40px' }}
        >
          <Menu.Item key="/couriers">
            <Link to="/couriers">Курьеры</Link>
          </Menu.Item>
          <Menu.Item key="/macrozones">
            <Link to="/macrozones">Макрозоны</Link>
          </Menu.Item>
        </Menu>
        <Route exact path="/" component={() => <div />} />
        <Route path="/couriers" component={Couriers} />
        <Route path="/macrozones" component={Macrozones} />
      </Fragment>
    );
  }
}

export default withRouter(App);
