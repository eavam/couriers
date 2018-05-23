import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';

/**
 * Компонент "Фильтр"
 * обертка для полей фильтра с возможностью скрытия и откытия по клику
 */
class Filter extends Component {
  static defaultProps = {
    isOpen: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isOpen !== prevState.isOpen) {
      return { isOpen: nextProps.isOpen };
    }

    return prevState;
  }

  state = {
    isOpen: this.props.isOpen,
  };

  handlerToggle = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  };

  render() {
    const { children, style } = this.props;
    const { isOpen } = this.state;
    const icon = isOpen ? 'caret-up' : 'caret-down';

    return (
      <div
        style={{
          backgroundColor: 'rgba(0,0,0,0.05)',
        }}
      >
        {isOpen && (
          <Row
            type="flex"
            align="bottom"
            gutter={8}
            style={{ padding: '0.6rem 1rem', ...style }}
          >
            {React.Children.map(children, child => <Col span={4}>{child}</Col>)}
          </Row>
        )}
        <Row type="flex" justify="center" align="middle">
          <Col span={2} style={{ textAlign: 'center' }}>
            <Button
              style={{ padding: '0 1.4em' }}
              icon={icon}
              size="small"
              type="dashed"
              data-test="button"
              onClick={this.handlerToggle}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Filter;
