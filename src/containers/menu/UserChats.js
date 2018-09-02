import { connect } from 'react-redux'
import UserChats from 'components/menu/UserChats'
import { retrieveUserChats } from 'actions/user'

const mapStateToProps = (state, ownProps) => ({
  chats: state.user.chats
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  retrieveUserChats: () => dispatch(retrieveUserChats())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserChats)
