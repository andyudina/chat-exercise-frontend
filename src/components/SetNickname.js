/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
/* eslint-enable no-unused-vars */

class SetNickname extends Component {
  render () {
    return (
      <div className="row align-items-center">
        <div className="col-6">
          <form>
            <div className="form-group">
              <label for="nickname">Choose nickname</label>
              <input className="form-control"
                placeholder="Your nickname" name="nickname"/>
            </div>
            <button type="submit" className="btn btn-primary">
              Next
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default SetNickname
