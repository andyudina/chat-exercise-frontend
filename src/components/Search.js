/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import Preloader from './Preloader'
import ChatSearchResults from './ChatSearchResults'
import UserSearchResults from './UserSearchResults'
import NothingFound from './NothingFound'
import SearchError from './SearchError'
/* eslint-enable no-unused-vars */

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
      <div className="col-md-4">
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
        <div className="panel panel-default">
          <div className="panel-heading">Users</div>
          <div className="panel-body">
            {this.foundUsers() &&
             <UserSearchResults
               results={this.state.users}/>}
            {this.noUsersFound() && <NothingFound />}
            {this.userErrorOccured() && <SearchError error={this.props.userSearchError}/>}
            {this.areUsersLoading() && <Preloader />}
          </div>
        </div>

        {/* Search results - chats */}
        <div className="panel panel-default">
          <div className="panel-heading">Chats</div>
          <div className="panel-body">
            {this.foundChats() &&
             <ChatSearchResults
               results={this.props.chats}/>}
            {this.noChatsFound() && <NothingFound />}
            {this.chatErrorOccured() && <SearchError error={this.props.chatSearchError}/>}
            {this.areChatsLoading() && <Preloader />}
          </div>
        </div>
      </div>
    )
  }
}

export default Search
