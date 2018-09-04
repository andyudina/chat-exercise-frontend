import { connect } from 'react-redux'
import UserChats from 'components/menu/UserChats'
import { retrieveUserChats } from 'actions/user'
import { geCurrentUserChats, getCurrentChatId } from 'reducers/getters'

const mapStateToProps = (state, ownProps) => ({
  chats: geCurrentUserChats(state),
  currentChatId: getCurrentChatId(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  retrieveUserChats: () => dispatch(retrieveUserChats())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserChats)
