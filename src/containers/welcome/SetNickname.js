import { connect } from 'react-redux'
import SetNickname from 'components/welcome/SetNickname'
import { updateNickname } from 'actions/user'

const mapStateToProps = (state, ownProps) => ({
  errors: state.user.nicknameUpdateErrors,
  isUpdating: state.user.isNicknameUpdating,
  nickname: state.user.nickname
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateNickname: (nickname) => dispatch(updateNickname(nickname))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetNickname)
