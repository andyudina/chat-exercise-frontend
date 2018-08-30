import { connect } from 'react-redux'
import Router from '../components/Router'

const mapStateToProps = (state, ownProps) => ({
  isUserLoaded: state.user.isUserLoaded
})

export default connect(
  mapStateToProps
)(Router)
