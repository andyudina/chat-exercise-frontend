import { connect } from 'react-redux'
import Chat from 'components/Chat'
import { fetchChat, listMessages, listNewMessages } from 'actions/message'

const mapStateToProps = (state, ownProps) => ({
  chat: state.currentChat.chat,
  messages: state.currentChat.messages,
  currentUserId: state.user.user._id,
  isLoading: state.currentChat.isLoading,
  errors: state.currentChat.fetchErrors,
  page: state.currentChat.lastLoadedPage,
  hasNextPage: state.currentChat.hasNextPage,
  loadChatSuccessfully: state.currentChat.loadChatSuccessfully
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchChat: (chatId) => dispatch(fetchChat(chatId)),
  listMessages: (chatId, page) => dispatch(listMessages(chatId, page)),
  listNewMessages: (chatId, date) => dispatch(listNewMessages(chatId, date))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
