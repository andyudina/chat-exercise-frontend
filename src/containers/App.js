import { connect } from 'react-redux'
import App from 'components/App'

const mapStateToProps = (state, ownProps) => ({
  isUserLoaded: state.currentUserState.isLoaded
})

export default connect(
  mapStateToProps
)(App)
