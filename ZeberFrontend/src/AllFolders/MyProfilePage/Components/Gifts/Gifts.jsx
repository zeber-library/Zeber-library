import { faCoins } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './gifts.css'

const Gifts = () => {
  return (
    <div className='gifts'>
      <h2>Gifts</h2>
      <FontAwesomeIcon icon={faCoins}/>
      <span>{`100`}</span>
    </div>
  )
}

export default Gifts