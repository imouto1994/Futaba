// @flow
import type { Dispatch } from "redux";

import React, { PureComponent } from "react";

import styles from "./EditCoinsForm.css";
import {
  shiftUpMarket,
  shiftDownMarket,
  removeMarket,
} from "../../actions/market";

type Props = {
  dispatch: Dispatch<*>,
  marketIds: Array<string>,
};

class EditCoinsForm extends PureComponent<Props> {
  onShiftUpButtonClick = (marketId: string) => {
    const { dispatch } = this.props;
    dispatch(shiftUpMarket(marketId));
  };

  onShiftDownButtonClick = (marketId: string) => {
    const { dispatch } = this.props;
    dispatch(shiftDownMarket(marketId));
  };

  onRemoveButtonClick = (marketId: string) => {
    const { dispatch } = this.props;
    dispatch(removeMarket(marketId));
  };

  render() {
    const { marketIds } = this.props;
    return (
      <div className={styles.form}>{marketIds.map(this.renderMarketEntry)}</div>
    );
  }

  renderMarketEntry = (marketId: string, index: number) => {
    const { marketIds } = this.props;

    return (
      <div key={marketId} className={styles.entry}>
        <span className={styles.title}>{marketId}</span>
        {index > 0 && this.renderShiftUpButton(marketId)}
        {index < marketIds.length - 1 && this.renderShiftDownButton(marketId)}
        {marketId !== "BTC-ETH" && marketId !== "USDT-BTC" ? (
          this.renderRemoveButton(marketId)
        ) : null}
      </div>
    );
  };

  renderShiftUpButton(marketId: string) {
    return (
      <span
        className={styles.button}
        onClick={() => this.onShiftUpButtonClick(marketId)}
      >
        ⬆
      </span>
    );
  }

  renderShiftDownButton(marketId: string) {
    return (
      <span
        className={styles.button}
        onClick={() => this.onShiftDownButtonClick(marketId)}
      >
        ⬇
      </span>
    );
  }

  renderRemoveButton(marketId: string) {
    return (
      <span
        className={`${styles.button} ${styles.closeButton}`}
        onClick={() => this.onRemoveButtonClick(marketId)}
      >
        ✖
      </span>
    );
  }
}

export default EditCoinsForm;
