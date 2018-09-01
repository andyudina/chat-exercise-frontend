import { connect } from 'react-redux'
import CreateGroupChat from '../components/CreateGroupChat'
import { createGroupChat } from '../actions/chat'

const mapStateToProps = (state, ownProps) => ({
  errors: state.chat.chatCreateError,
  isCreating: state.chat.isCreating
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  createGroupChat: (name) => dispatch(createGroupChat(name))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGroupChat)
