/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import Preloader from './Preloader'
/* eslint-enable no-unused-vars */

/*

  Style

*/

const setNicknameStyle = {
  flexGrow: 1,
  flexShrink: 1,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

/*

  Component

*/

class SetNickname extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nickname: props.nickname || ''
    }
  }

  updateNickname () {
    this.props.updateNickname(
      this.state.nickname
    )
  }

  render () {
    return (
      <div style={setNicknameStyle}>
        {!this.props.isUpdating &&
        <div className="row align-items-center">
          <form>
            <div className="form-group">
              <label htmlFor="nickname">Choose nickname</label>
              {this.props.errors.general &&
                <div className="text-danger">
                  {this.props.errors.general}
                </div>}
              <input className={'form-control ' + (this.props.errors.nickname ? 'is-invalid' : '')}
                placeholder="Your nickname" name="nickname"
                value={this.state.nickname}
                onChange={(e) => {
                  this.setState({ nickname: e.target.value })
                }}/>
              {this.props.errors.nickname &&
                <small className="text-danger">
                  {this.props.errors.nickname}
                </small>}
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={
                (e) => {
                  e.preventDefault()
                  this.updateNickname()
                }
              }>
              UPDATE
            </button>
          </form>
        </div>}
        {this.props.isUpdating && <Preloader />}
      </div>
    )
  }
}

export default SetNickname
