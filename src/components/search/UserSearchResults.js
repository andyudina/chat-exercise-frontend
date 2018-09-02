/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import StartPrivateChatButton from 'containers/search/StartPrivateChatButton'
import SearchResults from 'components/search/SearchResults'
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
        name='Users'
        results={this.props.results}
        createButton={this.createButton}
      />
    )
  }
}

export default UserSearchResults
