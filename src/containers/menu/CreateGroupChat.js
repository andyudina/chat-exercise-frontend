import { connect } from 'react-redux'
import CreateGroupChat from 'components/menu/CreateGroupChat'
import { createGroupChat } from 'actions/chat'

const mapStateToProps = (state, ownProps) => ({
  errors: state.createChatState.errors,
  isCreating: state.createChatState.isCreating
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  createGroupChat: (name) => dispatch(createGroupChat(name))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGroupChat)
