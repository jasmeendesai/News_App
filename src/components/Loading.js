import React, { Component } from 'react'
import spinner from './loading.gif'

export class Loading extends Component {
  render() {
    return (
      <div className='text-center my-3'>
        <img src={spinner} alt="Loading" />
      </div>
    )
  }
}

export default Loading
