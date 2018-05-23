import React, { Fragment } from 'react';
import { Select } from 'antd';

const { Option } = Select;

const CustomSelect = ({ data, label, ...props }) => (
  <Fragment>
    {label && <div>{label}</div>}
    <Select style={{ width: '100%' }} {...props}>
      {data.map(({ id, name }) => (
        <Option key={id} value={id}>
          {name}
        </Option>
      ))}
    </Select>
  </Fragment>
);

CustomSelect.defaultProps = {
  data: [],
};

export default CustomSelect;
