import React  from 'react'

function InputForm(props) {



  return (
    <div  className='mb-3  justify-content-center' >
      <input
      
      className='p-1 w-100 text-center border '
        placeholder={props.label}
        value={props.value}
        name={props.name}
        type="text"
        onChange={props.onChange}
      />
    </div>
  )
}

export default InputForm
