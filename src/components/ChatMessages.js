/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import ChatMessage from './ChatMessage'
/* eslint-enable no-unused-vars */

/*

  Styles

*/

const chatMessagesStyle = {
  alignItems: 'stretch',
  flexGrow: 1,
  flexShrink: 1,
  overflow: 'auto',
  WebkitOverflowScrolling: 'auto'
}

const messageListBottomStyle = {
  float: 'left',
  clear: 'both'
}

/*

  Component

*/

class ChatMessages extends Component {
  componentDidMount () {
    this.scrollToBottom()
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  scrollToBottom () {
    this.messagesEnd &&
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }

  render () {
    return (
      <div style={chatMessagesStyle} className="card-body">
        {
          this.props.messages.map(message => <ChatMessage key={message._id} message={message} isCurrentUser={this.props.currentUserId === message.author._id}/>)
        }
        <div
          style={messageListBottomStyle}
          ref={el => { this.messagesEnd = el }}>
        </div>
      </div>
    )
  }
}

export default ChatMessages
