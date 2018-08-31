/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import MAX_ELEMENTS_IN_LIST from '../app-constants'

const ChatList = ({ name, chats }) => {
  chats = chats.slice(0, MAX_ELEMENTS_IN_LIST)
  return (
    <ul className="list-group">
      <li className="list-group-item active">{name}</li>
      {
        chats.map((chat, i) => <li key={i} className="list-group-item">{chat.name}</li>)
      }
    </ul>
  )
}

export default ChatList
