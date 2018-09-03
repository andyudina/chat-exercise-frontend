/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import ChatHeader from 'components/chat/ChatHeader'
import ChatMessages from 'components/chat/ChatMessages'
import SendMessage from 'containers/chat/SendMessage'
import Error from 'components/Error'
import Preloader from 'components/Preloader'
/* eslint-enable no-unused-vars */

import {
  joinChat,
  leaveChat,
  onRefreshMessges
} from 'sockets/api'

/*

  Styles

*/

const chatStyle = {
  flexDirection: 'column',
  display: 'flex',
  position: 'absolute',
  bottom: 0,
  top: 0,
  right: 0,
  left: 0,
  overflow: 'hidden'
}

/*

  Component

*/

class Chat extends Component {
  componentDidMount (prevProps) {
    // Try fetch chat
    this.props.fetchChat(this.props.match.params.chatId)
    // Register callback to refresh messages
    onRefreshMessges(this.refreshMessages.bind(this))
  }

  componentDidUpdate (prevProps) {
    if (this.props.match.params.chatId !== prevProps.match.params.chatId) {
      this.props.fetchChat(this.props.match.params.chatId)
      joinChat(this.props.match.params.chatId)
    }
    if (this.props.loadChatSuccessfully !== prevProps.loadChatSuccessfully) {
      if (this.props.loadChatSuccessfully) {
        // Join socket to listen to chat updates
        joinChat(this.props.match.params.chatId)
      } else {
        // Leave socket
        leaveChat(this.props.match.params.chatId)
      }
    }
  }

  refreshMessages () {
    this.props.listNewMessages(
      this.props.match.params.chatId,
      this.getLastMessageDate()
    )
  }

  canNotSendMessages () {
    return this.props.isLoading || this.hasErrors()
  }

  getLastMessageDate () {
    const lastMessage = this.props.messages[this.props.messages.length - 1]
    return new Date(lastMessage.createdAt)
  }

  hasErrors () {
    return !!Object
      .values(this.props.errors)
      .reduce((prevValue, value) => prevValue || value, false)
  }

  loadNextPage () {
    this.props.listMessages(
      this.props.match.params.chatId,
      this.props.page + 1
    )
  }

  canLoadMoreMessages () {
    return (
      (this.props.isLoading === false) &&
      (this.props.hasNextPage === true))
  }

  showPreloader () {
    // Show preloader only when first page is being loaded
    return (
      (this.props.page === 1) &&
      (this.props.isLoading))
  }

  render () {
    return (
      <div style={chatStyle} className="card">
        <ChatHeader
          users={this.props.chat.users || []}
          name={this.props.chat.name}
          isGroupChat={this.props.chat.isGroupChat} />
        { this.showPreloader() && <Preloader /> }
        {
          this.props.errors.general &&
          <Error error={this.props.errors.general}/>
        }
        {
          this.props.errors.chat &&
          <Error error={this.props.errors.chat}/>
        }
        <ChatMessages
          canLoadMoreMessages={this.canLoadMoreMessages()}
          loadNextPage={this.loadNextPage.bind(this)}
          messages={this.props.messages}
          chatId={this.props.match.params.chatId}
          hasNextPage={this.props.hasNextPage}
          currentUserId={this.props.currentUserId} />
        <SendMessage
          disabled={this.canNotSendMessages()}
          chatId={this.props.chat._id}/>
      </div>
    )
  }
}

export default Chat
