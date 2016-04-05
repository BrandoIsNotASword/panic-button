import React from 'react';
import classNames from 'classnames';

const { Component, PropTypes } = React;

const propTypes = {
  text: PropTypes.string,
  textColor: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object
};

const defaultProps = {
  text: 'Button',
  disabled: false,
  onClick: () => {}
};

class Button extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(e) {
    if (!this.props.disabled) this.props.onClick(e);
  }

  render() {
    const style = {
      color: this.props.textColor
    };
    const className = classNames('Button', { 'Button--disabled': this.props.disabled });

    return (
      <div
        className={className}
        style={{ ...style, ...this.props.style }}
        onClick={this.handleClick.bind(this)}
      >
        <div className="Button__hover" />
        {this.props.text.toUpperCase()}
      </div>
    );
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
