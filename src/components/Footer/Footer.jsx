import React from 'react'
import './StylesFooter.css'

function Footer() {
  return (
    <div className='Footer-container text-center' >

        <div className='text-center p-5 fs-5'>
          
          <span className='p-1'>Contaco </span>
          <a
          className='p-s'
          href={'https://www.instagram.com/dario_gonzal3x/'}
          target={'_blank'}
          rel='noreferrer'
          >
           Instangram
          </a>
          <p className='fs-6 pt-5'>@Jane Modas Copyright 2023</p>
        </div>

    </div>
  )
}

export default Footer
