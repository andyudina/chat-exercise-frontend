/* eslint-disable no-unused-vars */
import React from 'react'
import { MdChevronRight, MdSync } from 'react-icons/md'
/* eslint-enable no-unused-vars */

const GoToChatButton = ({ hasFailed, onClickCallback, isLoading }) => (
  <span className={'badge float-right m-2 ' + (hasFailed ? 'badge-danger' : 'badge-primary')}
    onClick={
      (e) => {
        e.preventDefault()
        onClickCallback()
      }
    }>
    {hasFailed && !isLoading && 'Sorry, attempt failed'}
    {isLoading && !hasFailed && <MdSync />}
    {!hasFailed && !isLoading && <MdChevronRight />}
  </span>
)

export default GoToChatButton
