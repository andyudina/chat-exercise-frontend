import { connect } from 'react-redux'
import Chat from '../components/Chat'
import { fetchChat } from '../actions/message'

const mapStateToProps = (state, ownProps) => ({
  chat: state.currentChat.chat,
  messages: state.currentChat.messages,
  currentUserId: state.user.user._id,
  isLoading: state.currentChat.isLoading,
  errors: state.currentChat.fetchErrors
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchChat: (chatId) => dispatch(fetchChat(chatId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
