/* eslint-disable no-unused-vars */
import React from 'react'
import UserChats from 'containers/menu/UserChats'
import CreateGroupChat from 'containers/menu/CreateGroupChat'
/* eslint-enable no-unused-vars */

/*

  Styles

*/

const chatMenuStyle = {
  flexDirection: 'column',
  display: 'flex',
  flexGrow: 0,
  flexShrink: 0,
  minWidth: '200px',
  maxWidth: '300px'
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
