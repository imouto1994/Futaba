import { connect } from "react-redux";

import Markets from "./Markets";
import { marketIdsSelector } from "../../selectors/market";

const mapStateToProps = function(state) {
  return {
    marketIds: marketIdsSelector(state),
  };
};

export default connect(mapStateToProps)(Markets);
