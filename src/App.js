import React, { Component, Fragment } from 'react';
import { Menu } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';

import './App.css';
import CourierFilters from './components/CourierFilters';
import CourierContent from './components/CourierContent';
import CourierEditModal from './components/CourierEditModal';

const Couriers = () => (
  <Fragment>
    <CourierFilters style={{ flex: '0 1 auto' }} />
    <CourierContent style={{ flex: '1 1 0' }} />
    <CourierEditModal />
  </Fragment>
);

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Menu
            theme="dark"
            mode="horizontal"
            // defaultSelectedKeys={['2']}
            style={{ lineHeight: '40px' }}
          >
            <Menu.Item key="1">
              <Link to="/couriers">Курьеры</Link>
            </Menu.Item>
          </Menu>
          <Route exact path="/" component={() => <div />} />
          <Route path="/couriers" component={Couriers} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
