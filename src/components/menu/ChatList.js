/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
/* eslint-enable no-unused-vars */
import { MAX_ELEMENTS_IN_LIST } from 'app-constants'

const ChatList = ({ name, chats, currentChatId }) => {
  chats = chats.slice(0, MAX_ELEMENTS_IN_LIST)
  return (
    <ul className="list-group">
      <li className="list-group-item active">{name}</li>
      {
        chats.map(
          (chat, i) =>
            <li key={i} className="list-group-item">
              <Link className={ (currentChatId === chat._id) ? 'disabled list-group-item-light' : '' } to={'/chat/' + chat._id}>{chat.name}</Link>
            </li>
        )
      }
    </ul>
  )
}

export default ChatList
