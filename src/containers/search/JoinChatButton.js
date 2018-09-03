import { connect } from 'react-redux'
import JoinChatButton from 'components/search/JoinChatButton'
import { joinChat } from 'actions/chat'
import {
  isTryingToJoinGroupChat,
  failedToJoinGroupChat } from 'reducers/getters'

const mapStateToProps = (state, ownProps) => ({
  hasFailed: failedToJoinGroupChat(ownProps.chatId, state),
  isLoading: isTryingToJoinGroupChat(ownProps.chatId, state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  joinChat: (chatId) => dispatch(joinChat(chatId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinChatButton)
