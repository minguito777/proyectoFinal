import React  from 'react'
import './StylesBtnAddToCart.css'

function BtnAddToCart({ text , handlerOnclick , onDisabler , }) {


//  
  return (
    <button className="btn btn-secondary  btn-card btn-default" onClick={handlerOnclick} disabled={onDisabler}>
    {text}
  </button>
  )
}

export default BtnAddToCart
