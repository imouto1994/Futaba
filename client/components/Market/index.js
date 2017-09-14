import { connect } from "react-redux";

import Market from "./Market";
import {
  marketSummaryByIdSelector,
  previousMarketSummaryByIdSelector,
  getLatestBitcoinPrice,
  getLatestEthereumPrice,
} from "../../selectors/market";

function mapStateToProps(state, props) {
  return {
    market: marketSummaryByIdSelector(state, props),
    previousMarket: previousMarketSummaryByIdSelector(state, props),
    latestBitcoinPrice: getLatestBitcoinPrice(state),
    latestEthereumPrice: getLatestEthereumPrice(state),
  };
}

export default connect(mapStateToProps)(Market);
