/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import Preloader from 'components/Preloader'
import ChatSearchResults from 'components/search/ChatSearchResults'
import UserSearchResults from 'components/search/UserSearchResults'
import NothingFound from 'components/search/NothingFound'
import Error from 'components/Error'
/* eslint-enable no-unused-vars */

/*

 Search

*/

const searchStyle = {
  alignItems: 'stretch',
  flexGrow: 0,
  flexShrink: 0
}

/*

 Component

*/

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // We need change users.nickname to name
      // so different results can be used unified
      users: [],
      searchValue: '',
      // Show error because of empty ssearch value
      searchValueIsMissing: false,
      // Store word that was searched last
      lastSearchValue: ''
    }
  }

  componentWillUpdate (nextProps) {
    if (this.props.users !== nextProps.users) {
      this.setState({
        users: this.renameNicknameField(nextProps.users)
      })
    }
  }

  renameNicknameField (users) {
    return users.map(
      user => Object.assign(
        {},
        user,
        { name: user.nickname }
      )
    )
  }

  attemptSearch () {
    // Validate input and trigger search
    if (this.state.searchValue) {
      this.setState({
        searchValueIsMissing: false,
        lastSearchValue: this.state.searchValue
      })
      this.search(this.state.searchValue)
      return
    }
    this.setState({ searchValueIsMissing: true })
  }

  search (value) {
    this.props.searchUsers(value)
    this.props.searchChats(value)
  }

  foundUsers () {
    return this.state.users.length > 0
  }

  foundChats () {
    return this.props.chats.length > 0
  }

  userErrorOccured () {
    return !!this.props.userSearchError
  }

  chatErrorOccured () {
    return !!this.props.chatSearchError
  }

  areUsersLoading () {
    return this.props.isSearchingUsers
  }

  areChatsLoading () {
    return this.props.isSearchingChats
  }

  isNewSearchAttempt () {
    return (
      (this.state.searchValue) &&
      (this.state.searchValue !== this.state.lastSearchValue))
  }

  noUsersFound () {
    return (
      (this.foundUsers() === false) &&
      (this.areUsersLoading() === false) &&
      (this.isNewSearchAttempt() === false))
  }

  noChatsFound () {
    return (
      (this.foundChats() === false) &&
      (this.areChatsLoading() === false) &&
      (this.isNewSearchAttempt() === false))
  }

  render () {
    return (
      <div style={searchStyle}>
        {/* Search field */}
        <div className="input-group">
          <input
            className={'form-control ' + (this.props.searchValueIsMissing ? 'is-invalid' : '')}
            type="search"
            placeholder="User nickname or chat name"
            value={this.state.searchValue}
            onChange={(e) => {
              this.setState({ searchValue: e.target.value })
            }}/>
          <span className="input-group-append">
            <button className="btn btn-outline-secondary" type="button"
              onClick={
                (e) => {
                  e.preventDefault()
                  this.attemptSearch()
                }
              }>
              Search
            </button>
          </span>
        </div>

        {/* Search results - users */}
        <div>
          {this.foundUsers() &&
            <UserSearchResults
              results={this.state.users}/>}
          {this.noUsersFound() && <NothingFound />}
          {this.userErrorOccured() && <Error error={this.props.userSearchError}/>}
          {this.areUsersLoading() && <Preloader />}
        </div>

        {/* Search results - chats */}
        <div>
          {this.foundChats() &&
            <ChatSearchResults
              results={this.props.chats}/>}
          {this.noChatsFound() && <NothingFound />}
          {this.chatErrorOccured() && <Error error={this.props.chatSearchError}/>}
          {this.areChatsLoading() && <Preloader />}
        </div>
      </div>
    )
  }
}

export default Search
