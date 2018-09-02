/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import JoinChatButton from 'containers/JoinChatButton'
import SearchResults from 'components/SearchResults'
/* eslint-enable no-unused-vars */

class ChatSearchResults extends Component {
  createButton (chatId) {
    return (
      <JoinChatButton chatId={chatId}/>
    )
  }

  render () {
    return (
      <SearchResults
        name='Chats'
        results={this.props.results}
        createButton={this.createButton}
      />
    )
  }
}

export default ChatSearchResults
