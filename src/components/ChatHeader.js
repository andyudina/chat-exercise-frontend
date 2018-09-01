/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

/*

 Styles

*/

const chatNameStyle = {
  fontWeight: 'bold'
}

const chatHeaderStyle = {
  alignItems: 'stretch',
  flexGrow: 0,
  flexShrink: 0
}

/*

  Component

*/

const concatUsersToStr = (users) => {
  let counts = {}
  users.forEach((nickname) => {
    counts[nickname] = (counts[nickname] || 0) + 1
  })
  return Object.keys(counts)
    .map(
      nickname => counts[nickname] > 1
        ? nickname + ' x ' + counts[nickname]
        : nickname
    )
    .join(', ')
}

const ChatHeader = ({ users, name, isGroupChat }) => {
  const usersStr = concatUsersToStr(users.map(user => user.nickname))
  return (
    <div style={chatHeaderStyle} className="row card-header">
      {isGroupChat && <span>Chat <span style={chatNameStyle}>{name}</span> with</span>}
      {!isGroupChat && <span>Private chat with</span>}
      <span>&nbsp;{usersStr}</span>
    </div>
  )
}

export default ChatHeader
