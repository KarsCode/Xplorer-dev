"use client"
import React from 'react'
import Logo from './Logo'
import MapComponent from './Map'
import MapButton from './MapButton'

const LeftSide = () => {
  return (
   <div className="LeftSide"> <Logo/>
    <MapButton/>
    </div>
  )
}

export default LeftSide