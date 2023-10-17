"use client"
import React from 'react'
import Logo from './Logo'
import MapComponent from './Map'
import MapButton from './MapButton'

const LeftSide = () => {
  return (
   <div className="w-1/3 bg-white p-4">
    <Logo/>
    <MapButton/>
    </div>
  )
}

export default LeftSide