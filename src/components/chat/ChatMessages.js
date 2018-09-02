/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import ChatMessage from 'components/chat/ChatMessage'
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
  constructor (props) {
    super(props)
    this.state = {
      initialScrollCompleted: false
    }
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  scrollToBottom () {
    if (this.state.initialScrollCompleted) { return }
    if (!this.messagesEnd) { return }
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }

  canLoadMoreMessages () {
    return (
      (this.props.canLoadMoreMessages === true) &&
      (this.state.initialScrollCompleted === true))
  }

  firstElementIsVisible (isVisible) {
    if (!(isVisible)) { return }
    if (!this.canLoadMoreMessages()) { return }
    window.requestAnimationFrame(this.props.loadNextPage)
  }

  lastElementIsVisible (isVisible) {
    if (!(isVisible)) { return }
    this.setState({ initialScrollCompleted: true })
  }

  renderChatMessage (message) {
    return (
      <ChatMessage
        key={message._id}
        message={message}
        isCurrentUser={this.props.currentUserId === message.author._id}/>
    )
  }

  render () {
    return (
      <div
        style={chatMessagesStyle}
        className="card-body">
        {
          this.props.messages.map(
            (message, i) => {
              if (i === 0) {
                // Track first element visibility
                return (
                  <VisibilitySensor key={message._id} onChange={this.firstElementIsVisible.bind(this)} >
                    {this.renderChatMessage(message)}
                  </VisibilitySensor>
                )
              } else if (i === this.props.messages.length - 1) {
                // Track last element visibility
                return (
                  <VisibilitySensor key={message._id} onChange={this.lastElementIsVisible.bind(this)} >
                    {this.renderChatMessage(message)}
                  </VisibilitySensor>
                )
              } else {
                return this.renderChatMessage(message)
              }
            }
          )
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
