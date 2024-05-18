import React from 'react'

const ContentWrapper = ({children ,className}) => {
  return (
    <div className={` max-w-screen-xl mx-auto ${className} border-black border-2`}>{children}</div>
  )
}

export default ContentWrapper