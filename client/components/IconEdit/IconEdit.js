// @flow
import React, { PureComponent } from "react";

type Props = {
  className: string,
};

class IconEdit extends PureComponent<Props> {
  static defaultProps = {
    className: "",
  };

  render() {
    const { className } = this.props;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 275.84 275.84"
        className={className}
      >
        <path d="M191.34 20.92L96.2 116.08c-.77.75-1.3 1.7-1.58 2.73l-8.16 31.5c-.54 2.06.06 4.25 1.56 5.76 1.14 1.13 2.67 1.75 4.24 1.75.5 0 1-.06 1.5-.2l31.47-8.16c1.03-.26 1.97-.8 2.73-1.55l95.14-95.2h.02l19.16-19.17c2.34-2.34 2.34-6.14 0-8.48l-23.3-23.3C217.9.65 216.35 0 214.76 0c-1.6 0-3.12.63-4.24 1.76L191.36 20.9v.02zm-70.7 117.3l-20 5.18 5.2-20 89.75-89.75 14.8 14.8-89.8 89.76zm94.1-123.73l14.8 14.8-10.66 10.62-14.8-14.8 10.67-10.68z" />
        <path d="M238.04 65.02c-3.32 0-6 2.7-6 6v192.8H43.8V34.42h111.06c3.32 0 6-2.7 6-6s-2.68-6-6-6H37.8c-3.3 0-6 2.7-6 6v241.43c0 3.3 2.7 6 6 6h200.24c3.3 0 6-2.7 6-6V71.02c0-3.3-2.7-6-6-6z" />
      </svg>
    );
  }
}

export default IconEdit;
