/* eslint-disable no-unused-vars */
import React from 'react'
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

const ChatMessage = ({ message, isCurrentUser }) => (
  <div style={messageStyle}
    className={
      'alert ' + (isCurrentUser ? 'alert-primary float-right' : 'alert-info float-left')}>
    <div style={messageAuthorStyle}>
      { message.author.nickname }
    </div>
    <div>
      { message.text }
    </div>
  </div>
)

export default ChatMessage
