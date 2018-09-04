/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import Preloader from 'components/Preloader'
import Error from 'components/Error'
/* eslint-enable no-unused-vars */

/*

 Styles

*/

const createChatStyle = {
  alignItems: 'stretch',
  flexGrow: 0,
  flexShrink: 0,
  margin: 20
}

/*

 Component

*/

class CreateGroupChat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: props.name || ''
    }
  }

  createChat () {
    this.props.createGroupChat(
      this.state.name
    )
  }

  render () {
    return (
      <div style={createChatStyle}>
        {!this.props.isCreating &&
        <div className="row align-items-center">
          <div>
            <form>
              <div className="card-header">Create group chat</div>
              <div className="input-group">
                {this.props.errors.general &&
                  <Error error={this.props.errors.general}/>}
                <input className={'form-control ' + (this.props.errors.nickname ? 'is-invalid' : '')}
                  placeholder="Chat name" name="name"
                  value={this.state.name}
                  onChange={(e) => {
                    this.setState({ name: e.target.value })
                  }}/>
                <span className="input-group-append">
                  <button
                    type="submit"
                    className="btn btn-outline-primary"
                    onClick={
                      (e) => {
                        e.preventDefault()
                        this.createChat()
                      }
                    }>
                    CREATE
                  </button>
                </span>
              </div>
              {this.props.errors.name &&
                <Error error={this.props.errors.name}/>}
            </form>
          </div>
        </div>}
        {this.props.isCreating && <Preloader />}
      </div>
    )
  }
}

export default CreateGroupChat
