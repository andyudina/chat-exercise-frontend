import { connect } from 'react-redux'
import RedirectUnauthenticated from '../components/RedirectUnauthenticated'

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.user.isAuthenticated
})

export default connect(
  mapStateToProps
)(RedirectUnauthenticated)
