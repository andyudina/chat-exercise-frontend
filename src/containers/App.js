import { connect } from 'react-redux'
import App from 'components/App'

const mapStateToProps = (state, ownProps) => ({
  isUserLoaded: state.user.isUserLoaded
})

export default connect(
  mapStateToProps
)(App)
