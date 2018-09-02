/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import ChatList from 'components/menu/ChatList'
/* eslint-enable no-unused-vars */

/*

  Styles

*/

const userChatsStyle = {
  alignItems: 'stretch',
  flexGrow: 1,
  flexShrink: 1
}

/*

  Contaienr

*/

class UserChats extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // We split chats in differetn groups by type
      chats: []
    }
  }

  componentDidMount () {
    this.props.retrieveUserChats()
  }

  componentDidUpdate (prevProps) {
    if (this.props.chats !== prevProps.chats) {
      this.setState({
        chats: this.splitChatsByType(this.props.chats)
      })
    }
  }

  splitChatsByType (chats) {
    const groupChats = chats.filter(chat => chat.isGroupChat === true)
    const privateChats = chats.filter(chat => chat.isGroupChat === false)
    const chatGroups = [
      {
        name: 'Group chats',
        chats: groupChats
      },
      {
        name: 'Private chats',
        chats: privateChats
      }
    ]
    // Filter out empty chat groups
    return chatGroups.filter(chatGroup => chatGroup.chats.length > 0)
  }

  render () {
    return (
      <div style={userChatsStyle} className="card">
        {
          this.state.chats.map(
            (chats, i) => <ChatList chats={chats.chats} key={i} name={chats.name} />
          )
        }
      </div>
    )
  }
}

export default UserChats
