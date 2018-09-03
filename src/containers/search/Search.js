import { connect } from 'react-redux'
import Search from 'components/search/Search'
import { searchUsers } from 'actions/user'
import { searchChats } from 'actions/chat'

const mapStateToProps = (state, ownProps) => ({
  isSearchingUsers: state.searchState.isSearchingUsers,
  isSearchingChats: state.searchState.isSearchingChats,
  chats: state.searchChatResults,
  users: state.searchUserResults,
  chatSearchError: state.searchState.chatSearchError,
  userSearchError: state.searchState.userSearchError
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  searchUsers: (nickname) => dispatch(searchUsers(nickname)),
  searchChats: (name) => dispatch(searchChats(name))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
