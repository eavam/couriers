import React from 'react';
import { Checkbox, Spin } from 'antd';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';

import FilterBar from './FilterBar';
import CustomSelect from './CustomSelect';

import {
  setCountry,
  setOffice,
  toggleActive,
  fetchCountriesList,
  fetchOfficesList,
} from '../ducks/CourierFilters';
import {
  getCountries,
  getOffices,
  getCountry,
  getOffice,
  getOnlyActive,
} from '../selectors/filters';

import { fetchCouriersList } from '../ducks/CourierContent';

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
  fetchCountries,
  fetchOffices,
  onSubmit,
}) => (
  <Formik onSubmit={onSubmit} initialValues={{}}>
    {({ handleSubmit, handleReset, setFieldValue, values }) => (
      <FilterBar
        isOpen
        style={style}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <CustomSelect
          allowClear
          showSearch
          data={countries}
          label="Страна"
          size="small"
          data-test="country"
          filterOption={false}
          value={values.countryId}
          onChange={id => {
            setFieldValue('countryId', id);
            onChangeCountry(id);
            if (!id) setFieldValue('officeId', '');
          }}
          onSearch={fetchCountries}
          onFocus={fetchCountries}
          notFoundContent={<Spin size="small" />}
        />

        <CustomSelect
          allowClear
          showSearch
          disabled={!values.countryId}
          data={offices}
          label="Офис"
          data-test="office"
          size="small"
          filterOption={false}
          value={values.officeId}
          onChange={id => setFieldValue('officeId', id)}
          onSearch={fetchOffices}
          onFocus={fetchOffices}
          notFoundContent={<Spin size="small" />}
        />

        <Checkbox
          checked={values.active}
          onChange={event => setFieldValue('active', event.target.checked)}
        >
          Только активные
        </Checkbox>
      </FilterBar>
    )}
  </Formik>
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
      fetchCountries: fetchCountriesList,
      fetchOffices: fetchOfficesList,
      onChangeCountry: setCountry,
      onChangeOffice: setOffice,
      onChangeActive: toggleActive,
      onSubmit: fetchCouriersList,
    },
    dispatch,
  );

const enhancer = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhancer(Filters);
