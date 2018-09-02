/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
/* eslint-enable no-unused-vars */

/*

  Styles

*/

const messageStyle = {
  width: '70%',
  padding: '10px',
  margin: '10px 0'
}

const messageAuthorStyle = {
  borderBottom: '2px solid white'
}

/*

  Component

*/

class ChatMessage extends Component {
  render () {
    return (
      <div style={messageStyle}
        className={
          'alert ' + (this.props.isCurrentUser ? 'alert-primary float-right' : 'alert-info float-left')}>
        <div style={messageAuthorStyle}>
          { this.props.message.author.nickname }
        </div>
        <div>
          { this.props.message.text }
        </div>
      </div>
    )
  }
}

export default ChatMessage
