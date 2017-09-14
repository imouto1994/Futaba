// @flow
import React, { PureComponent } from "react";

import Market from "../Market";

import styles from "./Markets.css";

type Props = {
  marketIds: Array<string>,
};

class Markets extends PureComponent<Props> {
  render() {
    const { marketIds } = this.props;

    return (
      <div className={styles.container}>{marketIds.map(this.renderMarket)}</div>
    );
  }

  renderMarket(marketId: string) {
    return (
      <div className={styles.market} key={marketId}>
        <div className={styles.wrapper}>
          <Market marketId={marketId} />
        </div>
      </div>
    );
  }
}

export default Markets;
