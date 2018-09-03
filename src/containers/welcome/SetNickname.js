import { connect } from 'react-redux'
import SetNickname from 'components/welcome/SetNickname'
import { updateNickname } from 'actions/user'

const mapStateToProps = (state, ownProps) => ({
  errors: state.changeNicknameState.errors,
  isUpdating: state.changeNicknameState.isUpdating,
  nickname: state.userNickname
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateNickname: (nickname) => dispatch(updateNickname(nickname))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetNickname)
