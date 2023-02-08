import React, { useState } from 'react';

export const Main = () => {
  const [Uf, setUf] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [results, setResults] = useState<Array<object>>([])

  const endpoint = `https://viacep.com.br/ws/${Uf}/${city}/${street}/json/`


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const data = await fetch(endpoint).then(response => response.json());

    setResults(data)
    console.log(results)
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
          className='focus:outline-none mb-2 focus:border-b focus:border-blue-200'        
          type="text"
          placeholder='UF'
          value={Uf}
          onChange={(e) => setUf(e.target.value)}
        />
        <input
          className='focus:outline-none mb-2 focus:border-b focus:border-blue-200' 
          type="text"
          placeholder='Cidade'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          className='focus:outline-none mb-2 focus:border-b focus:border-blue-200' 
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
  );
};