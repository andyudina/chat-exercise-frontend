/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import SendMessage from '../containers/SendMessage'
import Error from './Error'
import Preloader from './Preloader'
/* eslint-enable no-unused-vars */

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
    this.props.fetchChat(this.props.match.params.chatId)
  }

  componentDidUpdate (prevProps) {
    if (this.props.match.params.chatId !== prevProps.match.params.chatId) {
      this.props.fetchChat(this.props.match.params.chatId)
    }
  }

  canNotSendMessages () {
    return this.props.isLoading || this.hasErrors()
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
      <div style={chatStyle} className="col-md-6 card">
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
