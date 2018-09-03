import { connect } from 'react-redux'
import RedirectUnauthenticated from 'components/RedirectUnauthenticated'

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.currentUserState.isAuthenticated
})

export default connect(
  mapStateToProps
)(RedirectUnauthenticated)
