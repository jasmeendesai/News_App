import React from 'react'
import spinner from './loading.gif'

const Loading = ()=> {

    return (
      <div className='text-center my-3'>
        <img src={spinner} alt="Loading" />
      </div>
    )
  
}

export default Loading
