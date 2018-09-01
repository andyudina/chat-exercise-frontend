/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import Preloader from './Preloader'
/* eslint-enable no-unused-vars */

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
      <div>
        {!this.props.isCreating &&
        <div className="row align-items-center">
          <div className="col-6">
            <form>
              <div className="form-group">
                <label htmlFor="nickname">Create group chat</label>
                {this.props.errors.general &&
                  <div className="text-danger">
                    {this.props.errors.general}
                  </div>}
                <input className={'form-control ' + (this.props.errors.nickname ? 'is-invalid' : '')}
                  placeholder="Chat name" name="name"
                  value={this.state.name}
                  onChange={(e) => {
                    this.setState({ name: e.target.value })
                  }}/>
                {this.props.errors.name &&
                  <small className="text-danger">
                    {this.props.errors.name}
                  </small>}
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={
                  (e) => {
                    e.preventDefault()
                    this.createChat()
                  }
                }>
                UPDATE
              </button>
            </form>
          </div>
        </div>}
        {this.props.isCreating && <Preloader />}
      </div>
    )
  }
}

export default CreateGroupChat
