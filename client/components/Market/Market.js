// @flow
import type { Dispatch } from "redux";

import type { Market as $Market } from "../../models/market";

import React, { PureComponent } from "react";
import ceil from "lodash/ceil";
import classNames from "classnames";

import * as CoinImages from "../../../config/coins";
import { getMarketTicker } from "../../actions/market";
import { isValidMarket } from "../../models/market";

import styles from "./Market.css";

type Props = {
  className: string,
  // Current Market Summary
  market: $Market,
  // Previous Market Summary if exists
  previousMarket: $Market,
  latestBitcoinPrice: number,
  latestEthereumPrice: number,
  marketId: string,
  dispatch: Dispatch<*>,
};

const BASE_URL = "https://www.cryptocompare.com";
const PRECISION = 8;
const INTERVAL_DURATION = 60 * 1000;

class Market extends PureComponent<Props> {
  interval: number;

  static defaultProps = {
    className: "",
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      const { marketId, dispatch } = this.props;
      if (marketId) {
        dispatch(getMarketTicker(marketId));
      }
    }, INTERVAL_DURATION);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    delete this.interval;
  }

  componentWillReceiveProps(nextProps: Props) {
    const { dispatch } = this.props;

    if (nextProps.marketId !== this.props.marketId) {
      dispatch(getMarketTicker(nextProps.marketId));
    }
  }

  render() {
    const { className, market, previousMarket } = this.props;
    const currencies = market.MarketName.split("-");
    const sourceCurrency = currencies[0];
    const targetCurrency = currencies[1];

    if (!isValidMarket(market)) {
      return null;
    }

    return (
      <div className={`${className} ${styles.container}`}>
        <div className={styles.imageContainer}>
          <a
            className={styles.imageLink}
            target="__blank"
            href={`https://bittrex.com/Market/Index?MarketName=${market.MarketName}`}
          >
            <img
              className={styles.image}
              src={`${BASE_URL}${CoinImages[targetCurrency]}`}
            />
          </a>
        </div>
        <div className={styles.title}>
          <strong>{market.MarketName}</strong>
        </div>
        {this.renderStat(
          "Last",
          previousMarket.Last,
          market.Last,
          sourceCurrency,
          targetCurrency,
        )}
        {this.renderStat(
          "Ask",
          previousMarket.Ask,
          market.Ask,
          sourceCurrency,
          targetCurrency,
        )}
        {this.renderStat(
          "Bid",
          previousMarket.Bid,
          market.Bid,
          sourceCurrency,
          targetCurrency,
        )}
        {this.renderStat(
          "High",
          previousMarket.High,
          market.High,
          sourceCurrency,
          targetCurrency,
        )}
        {this.renderStat(
          "Low",
          previousMarket.Low,
          market.Low,
          sourceCurrency,
          targetCurrency,
        )}
        {this.renderStat(
          "Volume",
          previousMarket.BaseVolume,
          market.BaseVolume,
          null,
          null,
          0,
        )}
      </div>
    );
  }

  renderStat(
    label: string,
    previousStat: ?number,
    stat: number,
    sourceCurrency: ?string,
    targetCurrency: ?string,
    precision: number = PRECISION,
  ) {
    const { latestBitcoinPrice, latestEthereumPrice } = this.props;
    const statNumberClassname = classNames(
      styles.statNumber,
      previousStat && stat > previousStat ? styles.isIncrease : "",
      previousStat && stat < previousStat ? styles.isDecrease : "",
    );

    let usdValue = 0;
    if (sourceCurrency) {
      if (sourceCurrency !== "USDT") {
        if (sourceCurrency === "BTC" && latestBitcoinPrice) {
          usdValue = ceil(stat * latestBitcoinPrice, 3);
        }
        if (sourceCurrency === "ETH" && latestEthereumPrice) {
          usdValue = ceil(stat * latestEthereumPrice, 3);
        }
      }
    }

    return (
      <div className={styles.stat}>
        <span className={styles.statLabel}>
          <strong>{label}:&nbsp;</strong>
        </span>
        <span className={statNumberClassname}>
          {ceil(stat, precision).toLocaleString("en-US", {
            maximumFractionDigits: PRECISION,
          })}
          {targetCurrency && targetCurrency !== "BTC" && latestBitcoinPrice ? (
            ` - $${usdValue}`
          ) : null}
          {previousStat && stat > previousStat ? <span>⬆</span> : null}
          {previousStat && stat < previousStat ? <span>⬇</span> : null}
        </span>
      </div>
    );
  }
}

export default Market;
