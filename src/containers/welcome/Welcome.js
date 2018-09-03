import { connect } from 'react-redux'
import Welcome from 'components/welcome/Welcome'

const mapStateToProps = (state, ownProps) => ({
  nickname: state.userNickname
})

export default connect(
  mapStateToProps
)(Welcome)
