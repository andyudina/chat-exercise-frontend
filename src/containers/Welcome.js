import { connect } from 'react-redux'
import Welcome from 'components/Welcome'

const mapStateToProps = (state, ownProps) => ({
  nickname: state.user.user.nickname || state.user.defaultNickname
})

export default connect(
  mapStateToProps
)(Welcome)
