import { connect } from "react-redux";

import EditCoinsForm from "./EditCoinsForm";
import { marketIdsSelector } from "../../selectors/market";

function mapStateToProps(state) {
  return {
    marketIds: marketIdsSelector(state),
  };
}

export default connect(mapStateToProps)(EditCoinsForm);
