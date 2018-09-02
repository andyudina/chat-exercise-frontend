import { connect } from 'react-redux'
import Chat from '../components/Chat'
import { fetchChat, listMessages } from '../actions/message'

const mapStateToProps = (state, ownProps) => ({
  chat: state.currentChat.chat,
  messages: state.currentChat.messages,
  currentUserId: state.user.user._id,
  isLoading: state.currentChat.isLoading,
  errors: state.currentChat.fetchErrors,
  page: state.currentChat.lastLoadedPage,
  hasNextPage: state.currentChat.hasNextPage
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchChat: (chatId) => dispatch(fetchChat(chatId)),
  listMessages: (chatId, page) => dispatch(listMessages(chatId, page))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
