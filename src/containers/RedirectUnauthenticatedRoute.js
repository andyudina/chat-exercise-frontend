import { connect } from 'react-redux'
import RedirectUnauthenticatedRoute from '../components/RedirectUnauthenticatedRoute'

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.user.isAuthenticated
})

export default connect(
  mapStateToProps
)(RedirectUnauthenticatedRoute)
