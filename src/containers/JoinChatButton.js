import { connect } from 'react-redux'
import JoinChatButton from '../components/JoinChatButton'
import { joinChat } from '../actions/chat'

const mapStateToProps = (state, ownProps) => ({
  hasFailed: !!state.chat.failedToJoin[ownProps.chatId],
  isLoading: !!state.chat.isTryingToJoin[ownProps.chatId]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  joinChat: (chatId) => dispatch(joinChat(chatId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinChatButton)
