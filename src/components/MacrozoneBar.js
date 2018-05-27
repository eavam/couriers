import React from 'react';
import { Button, Row } from 'antd';

const MacrozoneBar = () => (
  <Row style={{ padding: '0.6rem 1rem' }} type="flex" justify="space-between">
    <Button>Новая макрозона</Button>
    <Button icon="picture">Карта</Button>
  </Row>
);

export default MacrozoneBar;
