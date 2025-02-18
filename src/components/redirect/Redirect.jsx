import React from 'react'
import Fetching from '../fetching/Fetching'

const Redirect = ({url}) => {
    React.useEffect(() => {
        window.location.replace(url)
      }, [])
  return (
    <Fetching />
  )
}

export default Redirect