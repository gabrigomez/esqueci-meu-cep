import React, { useState } from 'react';
import { searchSchema } from '../Validations/searchValidation';

interface Address {
  logradouro: string,
  cep: string,
  complemento: string,
  bairro: string,
}

export const Main = () => {
  const [Uf, setUf] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [results, setResults] = useState<Address[]>([]);
  const [error, setError] = useState<string>('')

  const endpoint = `https://viacep.com.br/ws/${Uf}/${city}/${street}/json/`;

  setTimeout(() => {
    setError('')
  }, 3000)

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const isValid = await searchSchema.isValid({street});

    if(isValid) {
      const data = await fetch(endpoint).then(response => response.json());
      setResults(data);
    } else {
      setError('A busca deve conter ao menos 3 letras');
    };
  };

  console.log(results)
  return (
    <div className='flex flex-col mt-20 items-center justify-center '>
      <div className='mb-2'>
        <p className='text-sm'>
          Preencha seus dados
        </p>
      </div>
      <form className='flex flex-col items-center border rounded-2xl shadow-xl p-4' onSubmit={handleSubmit}>
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
      {error !== '' && (
        <div>
          <p className='text-xs mt-2 text-red-600'>
            {error}
          </p>
        </div>
      )}
      {results.length > 0 && (
        <div className='flex flex-col items-center p-4 border rounded-2xl shadow-xl'>
          {results.map(result => {
            return (
              <div key={result.cep}>
                <p>
                  {result.logradouro}
                </p>
                <p>
                  {result.cep}
                </p>
                <p>
                  {result.complemento}
                </p>
                <p>
                  {result.bairro}
                </p>
              </div>
            )
          })}
        </div>
      )}      
    </div>
  );
};