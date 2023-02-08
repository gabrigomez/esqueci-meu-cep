import React, { useState } from 'react';

export const Main = () => {
  const [Uf, setUf] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [street, setStreet] = useState<string>('')


  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    console.log(Uf, city, street)
  }
  return (
    <div className='flex flex-col mt-20 p-4 items-center justify-center border rounded-2xl shadow-xl'>
      <div>
        <p className='text-sm'>
          Preencha seus dados
        </p>
      </div>
      <form className='flex flex-col items-center' onSubmit={handleSubmit}>
        <input        
          type="text"
          placeholder='UF'
          value={Uf}
          onChange={(e) => setUf(e.target.value)}
        />
        <input 
          type="text"
          placeholder='Cidade'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input 
          type="text"
          placeholder='Logradouro (rua, avenida, etc)'
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <button 
          className='p-2 mt-4 rounded-3xl text-sm text-white bg-blue-400 hover:bg-blue-500 duration-300' 
          type='submit'
        >
          ACHE MEU CEP!
        </button>
      </form>
    </div>
  )
}