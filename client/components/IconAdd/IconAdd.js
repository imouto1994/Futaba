// @flow
import React, { PureComponent } from "react";

type Props = {
  className: string,
};

class IconAdd extends PureComponent<Props> {
  static defaultProps = {
    className: "",
  };

  render() {
    const { className } = this.props;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 294.77 294.77"
        className={className}
      >
        <path d="M251.63 43.18c-11.3-11.3-23.93-20.47-37.56-27.28-2.96-1.48-6.56-.27-8.04 2.7-1.48 2.96-.28 6.56 2.68 8.04 12.5 6.22 24.1 14.64 34.48 25.02 52.8 52.8 52.8 138.72 0 191.52s-138.72 52.8-191.52 0-52.8-138.72 0-191.52C77.2 26.1 111.22 12 147.4 12c3.3 0 6-2.7 6-6s-2.7-6-6-6C108 0 71 15.33 43.13 43.18c-57.47 57.48-57.47 151 0 208.48 28.74 28.74 66.5 43.1 104.25 43.1s75.5-14.36 104.23-43.1c57.5-57.47 57.5-151 0-208.48z" />
        <path d="M147.4 52c-3.33 0-6 2.68-6 6v178.85c0 3.32 2.67 6 6 6s6-2.68 6-6V58c0-3.32-2.7-6-6-6zm24 101.42h65.42c3.3 0 6-2.7 6-6s-2.7-6-6-6H171.4c-3.33 0-6 2.7-6 6s2.67 6 6 6zm-113.44-12c-3.32 0-6 2.7-6 6s2.68 6 6 6h63.43c3.3 0 6-2.7 6-6s-2.7-6-6-6H57.92z" />
      </svg>
    );
  }
}

export default IconAdd;
