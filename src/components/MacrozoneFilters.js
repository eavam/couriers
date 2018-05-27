import React, { Fragment } from 'react';
import { Checkbox, Spin } from 'antd';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';

import FilterBar from './FilterBar';
import CustomSelect from './CustomSelect';

import { setMacrozoneFilters } from '../ducks/filters';
import { fetchCountries, fetchOffices, fetchLayers } from '../ducks/lists';
import { getCountries, getOffices, getLayers } from '../selectors/filters';

import AutoSave from '../hocs/AutoSave';

export const MacrozoneFilters = ({
  style,
  countries,
  offices,
  layers,
  onSearchCountries,
  onSearchOffices,
  onSearchLayers,
  onSubmit,
  onAutoSave,
  // filters,
}) => (
  <Formik onSubmit={onSubmit} initialValues={{}}>
    {({ handleSubmit, handleReset, setFieldValue, values }) => (
      <Fragment>
        <AutoSave values={values} onSave={onAutoSave} />
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
              if (!id) setFieldValue('officeId', '');
            }}
            onSearch={onSearchCountries}
            onFocus={onSearchCountries}
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
            onSearch={onSearchOffices}
            onFocus={onSearchOffices}
            notFoundContent={<Spin size="small" />}
          />

          <CustomSelect
            showSearch
            allowClear
            mode="multiple"
            data={layers}
            label="Слой"
            data-test="layaer"
            size="small"
            filterOption={false}
            value={values.layers}
            onChange={layers => setFieldValue('layers', layers)}
            onSearch={onSearchLayers}
            onFocus={onSearchLayers}
            notFoundContent={<Spin size="small" />}
          />

          <Checkbox
            checked={values.courierIsEmpty}
            onChange={event =>
              setFieldValue('courierIsEmpty', event.target.checked)
            }
          >
            Только без курьера
          </Checkbox>
          <Checkbox
            checked={values.showDeleted}
            onChange={event =>
              setFieldValue('showDeleted', event.target.checked)
            }
          >
            Показать удаленные
          </Checkbox>
        </FilterBar>
      </Fragment>
    )}
  </Formik>
);

const mapStateToProps = state => ({
  countries: getCountries(state),
  offices: getOffices(state),
  layers: getLayers(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onSearchCountries: fetchCountries,
      onSearchOffices: fetchOffices,
      onSearchLayers: fetchLayers,
      onAutoSave: setMacrozoneFilters,
    },
    dispatch,
  );

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onSubmit: props => values => props.onAutoSave(values),
  }),
);

export default enhancer(MacrozoneFilters);
