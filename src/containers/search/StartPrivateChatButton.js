import { connect } from 'react-redux'
import StartPrivateChatButton from 'components/search/StartPrivateChatButton'
import { createPrivateChat } from 'actions/chat'
import {
  isTryingToStartPrivateChat,
  failedToStartPrivateChat } from 'reducers/getters'

const mapStateToProps = (state, ownProps) => ({
  hasFailed: failedToStartPrivateChat(ownProps.userId, state),
  isLoading: isTryingToStartPrivateChat(ownProps.userId, state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  createPrivateChat: (userId) => dispatch(createPrivateChat(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartPrivateChatButton)
