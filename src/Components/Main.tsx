import React, { useState } from 'react';
import { searchSchema } from '../Validations/searchValidation';
import { BsSave2 } from 'react-icons/bs';


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

  return (
    <div className='flex flex-col'>   
      <div className='flex flex-col mt-10 items-center justify-center '>
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
      </div>
      <div className='flex flex-col mt-8 items-center justify-around'>              
        <p className='text-xs mb-2'>
          MEUS CEPS
        </p>
        <div 
          className='flex items-center 
          border bg-blue-100 w-full p-1 overflow-y-hidden'>
          <div 
            className="flex flex-col gap-1 h-32 w-44   
            items-start p-2 m-2 bg-slate-100 
            duration-300 border rounded-2xl shadow-xl"
            >
              <p className='truncate'>
                Rua Exemplo
              </p>
              <p className='text-blue-500'>
                28000-000
              </p>
              <p className='text-xs'>
                Ao lado de Nada
              </p>
              <p className='text-xs'>
                Canão
              </p>
          </div>
          <div 
            className="flex flex-col gap-1 h-32 w-44   
            items-start p-2 m-2 bg-slate-100 
            duration-300 border rounded-2xl shadow-xl"
            >
              <p className='truncate'>
                Rua Exemplo
              </p>
              <p className='text-blue-500'>
                28000-000
              </p>
              <p className='text-xs'>
                Ao lado de Nada
              </p>
              <p className='text-xs'>
                Canão
              </p>
          </div>
          <div 
            className="flex flex-col gap-1 h-32 w-44   
            items-start p-2 m-2 bg-slate-100 
            duration-300 border rounded-2xl shadow-xl"
            >
              <p className='truncate'>
                Rua Exemplo
              </p>
              <p className='text-blue-500'>
                28000-000
              </p>
              <p className='text-xs'>
                Ao lado de Nada
              </p>
              <p className='text-xs'>
                Canão
              </p>
          </div>          
        </div>
        <div className='flex flex-col w-2/4 my-2 p-1'>
          {results.map(result => {
            return (
              <div 
                key={result.cep}
                className="flex flex-col gap-1 h-32 w-52 
                items-start p-2 m-2 hover:bg-slate-100 
                duration-300 border rounded-2xl shadow-xl">
                <p className='text-sm'>
                  {result.logradouro}
                </p>
                <p className='text-blue-500'>
                  {result.cep}
                </p>
                <p className='text-xs'>
                  {result.complemento}
                </p>
                <p className='text-xs mb-1'>
                  {result.bairro}
                </p>
                <div className='flex cursor-pointer'>
                  <BsSave2 className='text-blue-500 mr-1' />
                  <p className='text-xs'>Salvar</p>
                </div>
              </div>
            )
          })}
        </div>      
      </div>
    </div>
  );
};