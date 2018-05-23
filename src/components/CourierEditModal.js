import React from 'react';
import { Modal, Input, Row, Col, Spin, Checkbox } from 'antd';
import { compose, lifecycle, branch, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';

import {
  getVisableEditModal,
  getCourierLoading,
  getCourierData,
} from '../selectors/couriers';
import { closeModal, fetchCourierById } from '../ducks/CourierEditModal';
import Autocomplite from '../hocs/Autocomplite';
import { Select } from '../ui';

const CourierEditModal = ({ visible, closeModal, courierData }) => (
  <Formik
    onSubmit={values => (console.log('values', values), closeModal())}
    initialValues={courierData}
  >
    {({ handleChange, handleSubmit, values, setFieldValue }) => (
      <Modal
        visible={visible}
        title="Редактирование курьера"
        okText="Сохранить"
        cancelText="Закрыть"
        onOk={handleSubmit}
        onCancel={closeModal}
      >
        <Row
          type="flex"
          align="bottom"
          gutter={8}
          style={{ padding: '0.6rem 1rem' }}
        >
          <Col span={12}>
            <div>ФИО</div>
            <Input
              name="name"
              size="small"
              value={values.name}
              onChange={handleChange}
            />

            <Autocomplite url="/schedules" limit={100}>
              {({ loading, fetching, data }) => (
                <Select
                  allowClear
                  showSearch
                  // defaultValue={values.macrozone}
                  name="scheduleId"
                  label="График работы"
                  size="small"
                  data-test="schedules"
                  data={data}
                  filterOption={false}
                  value={values.scheduleId}
                  onChange={value => setFieldValue('scheduleId', value)}
                  onSearch={fetching}
                  onFocus={fetching}
                  notFoundContent={loading ? <Spin size="small" /> : null}
                />
              )}
            </Autocomplite>
            <div>Назначен макрозоне</div>
            <Input
              disabled
              value={values.macrozone}
              size="small"
              value="test"
            />
          </Col>

          <Col span={12}>
            <Checkbox
              name="active"
              checked={values.active}
              onChange={event => setFieldValue('active', event.target.checked)}
            >
              Активность
            </Checkbox>
          </Col>
        </Row>
      </Modal>
    )}
  </Formik>
);

const mapStateToProps = state => ({
  visible: getVisableEditModal(state),
  loading: getCourierLoading(state),
  courierData: getCourierData(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      fetchCourierById,
    },
    dispatch,
  );

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(props => props.loading, renderComponent(() => <Spin size="small" />)),
  lifecycle({
    componentDidMount() {
      // this.props.fetchCourierById();
    },
  }),
);

export default enhancer(CourierEditModal);
