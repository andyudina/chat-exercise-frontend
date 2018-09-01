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

  render () {
    return (
      <div style={chatStyle} className="col-md-6 card">
        <ChatHeader
          users={this.props.chat.users || []}
          name={this.props.chat.name}
          isGroupChat={this.props.chat.isGroupChat} />
        {this.props.isLoading && <Preloader />}
        {
          this.props.errors.general &&
          <Error error={this.props.errors.general}/>
        }
        {
          this.props.errors.chat &&
          <Error error={this.props.errors.chat}/>
        }
        <ChatMessages
          messages={this.props.messages}
          currentUserId={this.props.currentUserId} />
        <SendMessage
          disabled={this.canNotSendMessages()}
          chatId={this.props.chat._id}/>
      </div>
    )
  }
}

export default Chat
