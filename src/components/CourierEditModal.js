import React, { Fragment } from 'react';
import { Modal, Input, Row, Col, Spin, Checkbox } from 'antd';
import { compose, lifecycle, branch, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';

import {
  getVisableEditModal,
  getCourierLoading,
  getCourierData,
  getSchedules,
} from '../selectors/couriers';
import {
  closeModal,
  fetchCourierById,
  fetchSchedulesList,
} from '../ducks/CourierEditModal';

import CustomSelect from './CustomSelect';

const CourierEditModal = ({
  visible,
  closeModal,
  courierData,
  fetchSchedules,
  schedules,
}) => (
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

            <CustomSelect
              allowClear
              showSearch
              name="scheduleId"
              label="График работы"
              size="small"
              data-test="schedules"
              data={schedules}
              filterOption={false}
              value={values.scheduleId}
              onChange={value => setFieldValue('scheduleId', value)}
              onSearch={fetchSchedules}
              onFocus={fetchSchedules}
              notFoundContent={<Spin size="small" />}
            />

            <div>Назначен макрозоне</div>
            <Input disabled value={values.macrozone} size="small" />
          </Col>

          <Col span={12}>
            <div>
              {values.phone.map((el, i) => (
                <Fragment>
                  <Input
                    size="small"
                    value={el.main}
                    onChange={event =>
                      setFieldValue(`phone[${i}].main`, event.target.value)
                    }
                  />
                  <Input
                    size="small"
                    value={el.extra}
                    onChange={event =>
                      setFieldValue(`phone[${i}].extra`, event.target.value)
                    }
                  />
                </Fragment>
              ))}
            </div>
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
  schedules: getSchedules(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      fetchCourierById,
      fetchSchedules: fetchSchedulesList,
    },
    dispatch,
  );

const styleSpin = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000,
  backgroundColor: 'rgba(0,0,0,0.65)',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
};

const SpinFullScreen = () => (
  <div style={styleSpin}>
    <Spin />
  </div>
);

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(props => props.loading, renderComponent(SpinFullScreen)),
  lifecycle({
    componentDidMount() {
      // this.props.fetchCourierById();
    },
  }),
);

export default enhancer(CourierEditModal);
