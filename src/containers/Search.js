import { connect } from 'react-redux'
import Search from 'components/Search'
import { searchUsers } from 'actions/user'
import { searchChats } from 'actions/chat'

const mapStateToProps = (state, ownProps) => ({
  isSearchingUsers: state.search.isSearchingUsers,
  isSearchingChats: state.search.isSearchingChats,
  chats: state.search.chatResults,
  users: state.search.userResults,
  chatSearchError: state.search.chatSearchError,
  userSearchError: state.search.userSearchError
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  searchUsers: (nickname) => dispatch(searchUsers(nickname)),
  searchChats: (name) => dispatch(searchChats(name))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
