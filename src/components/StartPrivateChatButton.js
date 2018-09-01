/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import GoToChatButton from './GoToChatButton'
/* eslint-enable no-unused-vars */

class StartPrivateChatButton extends Component {
  startPrivateChat () {
    this.props.createPrivateChat(this.props.userId)
  }

  render () {
    return (
      <GoToChatButton
        hasFailed={this.props.hasFailed}
        isLoading={this.props.isLoading}
        onClickCallback={this.startPrivateChat.bind(this)} />
    )
  }
}

export default StartPrivateChatButton
