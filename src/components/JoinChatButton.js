/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import GoToChatButton from 'components/GoToChatButton'
/* eslint-enable no-unused-vars */

class JoinChatButton extends Component {
  joinChat () {
    this.props.joinChat(this.props.chatId)
  }

  render () {
    return (
      <GoToChatButton
        hasFailed={this.props.hasFailed}
        isLoading={this.props.isLoading}
        onClickCallback={this.joinChat.bind(this)} />
    )
  }
}

export default JoinChatButton
