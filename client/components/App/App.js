// @flow

import React, { PureComponent } from "react";

import Markets from "../Markets";
import IconSettings from "../IconSettings";
import SettingsModal from "../SettingsModal";

import styles from "./App.css";

type Props = {};

type State = {
  isSettingsModalOpened: boolean,
};

class App extends PureComponent<Props, State> {
  state = {
    isSettingsModalOpened: false,
  };

  onSettingsButtonClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.setState({
      isSettingsModalOpened: true,
    });
  };

  onCloseSettingsModal = () => {
    this.setState({
      isSettingsModalOpened: false,
    });
  };

  render() {
    const { isSettingsModalOpened } = this.state;

    return (
      <div className={styles.app}>
        <Markets />
        <SettingsModal
          show={isSettingsModalOpened}
          onCloseModal={this.onCloseSettingsModal}
        />
        {this.renderSettingsButton()}
      </div>
    );
  }

  renderSettingsButton() {
    return (
      <div
        className={styles.settingsButton}
        onClick={this.onSettingsButtonClick}
      >
        <IconSettings className={styles.settingsButtonIcon} />
      </div>
    );
  }
}

export default App;
