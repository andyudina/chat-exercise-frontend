/* eslint-disable no-unused-vars */
import React from 'react'
import PreloaderIcon from 'react-preloader-icon'
import Oval from 'react-preloader-icon/loaders/Oval'
/* eslint-enable no-unused-vars */

/*

  Styles

*/

const preloaderStyle = {
  maxWidth: '200px',
  width: '80%',
  height: '80%',
  margin: 20,
  display: 'flex'
}

/*

  Component

*/

const Preloader = () => (
  <PreloaderIcon
    style={preloaderStyle}
    loader={Oval}
    strokeWidth={8}
    strokeColor="#007bff"
    duration={800}
  />
)

export default Preloader
