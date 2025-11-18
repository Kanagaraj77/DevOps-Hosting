import React from 'react'
import error from '/images/404.avif'
import '../css/error.css'


const Error = () => {
  return (
    <div className='error-container container center'>
      <img className="error-image" src={error} alt="404" />
    </div>
  )
}

export default Error