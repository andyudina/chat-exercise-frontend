/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import StartPrivateChatButton from '../containers/StartPrivateChatButton'
import SearchResults from './SearchResults'
/* eslint-enable no-unused-vars */

class UserSearchResults extends Component {
  createButton (userId) {
    return (
      <StartPrivateChatButton userId={userId}/>
    )
  }

  render () {
    return (
      <SearchResults
        results={this.props.results}
        createButton={this.createButton}
      />
    )
  }
}

export default UserSearchResults
