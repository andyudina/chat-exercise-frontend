/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import Error from './Error'
/* eslint-enable no-unused-vars */

/*

  Styles

*/

const sendMessageStyle = {
  alignItems: 'stretch',
  flexGrow: 0,
  flexShrink: 0
}

/*

  Component

*/

class SendMessage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: ''
    }
  }

  sendMessage () {
    this.props.createMessage(
      this.props.chatId, this.state.message
    )
  }

  canSendMessage () {
    return (
      (this.props.disabled === false) &&
      (this.props.isSending === false))
  }

  render () {
    return (
      <div style={sendMessageStyle} className="card-footer input-group">
        {this.props.errors.general && <Error error={this.props.errors.general}/>}
        {this.props.errors.message && <Error error={this.props.errors.message}/>}
        <textarea
          type="text"
          className="form-control"
          value={this.state.message}
          onChange={(e) => {
            this.setState({ message: e.target.value })
          }}
          aria-describedby="send-message-button-addon"
          disabled={this.canSendMessage() ? '' : 'disabled' }>
        </textarea>
        <div className="input-group-append">
          <button
            className="input-group-text" id="send-message-button-addon"
            onClick={
              (e) => {
                e.preventDefault()
                this.sendMessage()
              }
            }>
            Send
          </button>
        </div>
      </div>
    )
  }
}

export default SendMessage
