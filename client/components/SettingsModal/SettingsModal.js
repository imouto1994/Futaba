// @flow
import type { Dispatch } from "redux";

import React, { PureComponent } from "react";

import IconAdd from "../IconAdd";
import IconEdit from "../IconEdit";
import IconClose from "../IconClose";
import AddCoinForm from "../AddCoinForm";
import EditCoinsForm from "../EditCoinsForm";

import styles from "./SettingsModal.css";

type Props = {
  show: boolean,
  dispatch: Dispatch<*>,
  onCloseModal: () => void,
};

type State = {
  activeTab: string,
};

class SettingsModal extends PureComponent<Props, State> {
  state = {
    activeTab: "add",
  };

  onAddTabClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.setState({
      activeTab: "add",
    });
  };

  onEditTabClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.setState({
      activeTab: "edit",
    });
  };

  onCloseModal = (e: SyntheticEvent<*>) => {
    e.preventDefault();
    const { onCloseModal } = this.props;
    onCloseModal();
  };

  render() {
    const { show } = this.props;

    return (
      <div className={`${styles.modal} ${show ? styles.isActive : ""}`}>
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderFooter()}
      </div>
    );
  }

  renderHeader() {
    const { activeTab } = this.state;

    return (
      <div className={styles.header}>
        <div
          className={`${styles.headerItem} ${activeTab === "add"
            ? styles.isActive
            : ""}`}
          onClick={this.onAddTabClick}
        >
          <IconAdd
            className={`${styles.headerItemIcon} ${activeTab === "add"
              ? styles.isActive
              : ""}`}
          />
        </div>
        <div
          className={`${styles.headerItem} ${activeTab === "edit"
            ? styles.isActive
            : ""}`}
          onClick={this.onEditTabClick}
        >
          <IconEdit
            className={`${styles.headerItemIcon} ${activeTab === "edit"
              ? styles.isActive
              : ""}`}
          />
        </div>
      </div>
    );
  }

  renderBody() {
    const { activeTab } = this.state;

    return (
      <div className={styles.body}>
        {activeTab === "add" ? (
          this.renderAddTabBody()
        ) : (
          this.renderEditTabBody()
        )}
      </div>
    );
  }

  renderAddTabBody() {
    return (
      <div className={styles.addTabBody}>
        <h1>Add New Coin</h1>
        <AddCoinForm />
      </div>
    );
  }

  renderEditTabBody() {
    return (
      <div className={styles.editTabBody}>
        <h1>Edit Coin List</h1>
        <EditCoinsForm />
      </div>
    );
  }

  renderFooter() {
    return (
      <div className={styles.footer} onClick={this.onCloseModal}>
        <IconClose className={styles.footerIcon} />
      </div>
    );
  }
}

export default SettingsModal;
