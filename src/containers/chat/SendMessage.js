import { connect } from 'react-redux'
import SendMessage from 'components/chat/SendMessage'
import { createMessage } from 'actions/message'

const mapStateToProps = (state, ownProps) => ({
  errors: state.sendMessageState.errors,
  isSending: state.sendMessageState.isSending
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  createMessage: (chatId, message) => dispatch(createMessage(chatId, message))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendMessage)
