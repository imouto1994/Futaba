// @flow
import React, { PureComponent } from "react";

import Input from "../Input";
import Market from "../Market";
import { addMarket } from "../../actions/market";

type Props = {
  dispatch: Dispatch<*>,
};

type State = {
  addMarketId: string,
};

class AddCoinForm extends PureComponent<Props, State> {
  state = {
    addMarketId: "",
  };

  onAddMarketInputChange = (marketId: string) => {
    this.setState({
      addMarketId: marketId,
    });
  };

  onFormSubmit = (e: SyntheticEvent<*>) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { addMarketId } = this.state;
    dispatch(addMarket(addMarketId));
  };

  render() {
    const { addMarketId } = this.state;

    return (
      <form onSubmit={this.onFormSubmit}>
        <Input label="Market" onInputChange={this.onAddMarketInputChange} />
        <Market marketId={addMarketId} />
      </form>
    );
  }
}

export default AddCoinForm;
