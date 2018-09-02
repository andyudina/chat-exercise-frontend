import { connect } from 'react-redux'
import SendMessage from 'components/SendMessage'
import { createMessage } from 'actions/message'

const mapStateToProps = (state, ownProps) => ({
  errors: state.currentChat.sendMessageErrors,
  isSending: state.currentChat.messageIsSending
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  createMessage: (chatId, message) => dispatch(createMessage(chatId, message))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendMessage)
