import { connect } from 'react-redux'
import StartPrivateChatButton from 'components/search/StartPrivateChatButton'
import { createPrivateChat } from 'actions/chat'

const mapStateToProps = (state, ownProps) => ({
  hasFailed: !!state.chat.failedToCreatePrivateChat[ownProps.userId],
  isLoading: !!state.chat.isTryingToCreatePrivateChat[ownProps.userId]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  createPrivateChat: (userId) => dispatch(createPrivateChat(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartPrivateChatButton)
