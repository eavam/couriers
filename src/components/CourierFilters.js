import React from 'react';
import { Checkbox, Row, Col, Spin } from 'antd';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Autocomplite from '../hocs/Autocomplite';
import { setCountry, setOffice, toggleActive } from '../ducks/CourierFilters';
import {
  getCountries,
  getOffices,
  getCountry,
  getOffice,
  getOnlyActive,
} from '../selectors/filters';
import { Filter, Select } from '../ui';

export const Filters = ({
  countries,
  currentCountry,
  onChangeCountry,
  offices,
  currentOffice,
  onChangeOffice,
  onChangeActive,
  onlyActive,
  style,
}) => (
  <Filter isOpen style={style}>
    <Autocomplite url="/countries" limit={100}>
      {({ loading, fetching, data }) => (
        <Select
          allowClear
          showSearch
          data={data}
          label="Страна"
          size="small"
          data-test="country"
          filterOption={false}
          value={currentCountry}
          onChange={onChangeCountry}
          onSearch={fetching}
          onFocus={fetching}
          notFoundContent={loading ? <Spin size="small" /> : null}
        />
      )}
    </Autocomplite>

    <Autocomplite url={`/countries/${currentCountry}/offices`} limit={100}>
      {({ loading, fetching, data }) => (
        <Select
          allowClear
          showSearch
          disabled={!currentCountry}
          data={data}
          label="Офис"
          data-test="office"
          size="small"
          filterOption={false}
          value={currentOffice}
          onChange={onChangeOffice}
          onSearch={fetching}
          onFocus={fetching}
          notFoundContent={loading ? <Spin size="small" /> : null}
        />
      )}
    </Autocomplite>

    <Checkbox checked={onlyActive} onChange={onChangeActive}>
      Только активные
    </Checkbox>
  </Filter>
);

const mapStateToProps = state => ({
  countries: getCountries(state),
  currentCountry: getCountry(state),
  offices: getOffices(state),
  currentOffice: getOffice(state),
  onlyActive: getOnlyActive(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onChangeCountry: setCountry,
      onChangeOffice: setOffice,
      onChangeActive: toggleActive,
    },
    dispatch,
  );

const enhancer = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhancer(Filters);
