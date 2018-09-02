/* eslint-disable no-unused-vars */
import React from 'react'
import UserChats from 'containers/UserChats'
import CreateGroupChat from 'containers/CreateGroupChat'
/* eslint-enable no-unused-vars */

/*

  Styles

*/

const chatMenuStyle = {
  flexDirection: 'column',
  display: 'flex',
  flexGrow: 0,
  flexShrink: 0,
  minWidth: '200px'
}

/*

  Component

*/

const ChatMenu = () => (
  <div style={chatMenuStyle}>
    <UserChats/>
    <CreateGroupChat/>
  </div>
)

export default ChatMenu