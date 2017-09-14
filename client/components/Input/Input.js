// @flow
import React, { PureComponent } from "react";

import styles from "./Input.css";

type Props = {
  label: string,
  onInputChange: (value: string) => void,
};

class Input extends PureComponent<Props> {
  onInputChange = (e: SyntheticEvent<*>) => {
    const { onInputChange } = this.props;
    if (onInputChange) {
      onInputChange(e.target.value);
    }
  };

  render() {
    const { label } = this.props;

    return (
      <span className={styles.input}>
        <input className={styles.inputField} onChange={this.onInputChange} />
        <label className={styles.inputLabel} data-content={label}>
          <span className={styles.inputLabelContent}>{label}</span>
        </label>
      </span>
    );
  }
}

export default Input;
