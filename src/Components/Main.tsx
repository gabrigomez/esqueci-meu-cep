import React, { useEffect, useState } from 'react';
import { searchSchema } from '../Validations/searchValidation';
import { BsSave2 } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';

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
  const [error, setError] = useState<string>('');
 
  const initialList: Address[] = JSON.parse(localStorage.getItem("ceps") || "") 
  const [savedList] = useState<Address[]>([...initialList]);

  const endpoint = `https://viacep.com.br/ws/${Uf}/${city}/${street}/json/`;

  setTimeout(() => {
    setError('');
  }, 3000);

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

  const saveCep = (item: Address) => {
    savedList.push(item);
    const convertedItem = JSON.stringify(savedList);
    localStorage.setItem('ceps', convertedItem);
  };

  const removeItem = (item: Address) => {
    for(let i = 0; i < savedList.length; i++) {
      if (savedList[i].cep === item.cep) {
        savedList.splice(i, 1);
        const convertedItem = JSON.stringify(savedList);
        localStorage.setItem('ceps', convertedItem);
      };
    };
  };

  useEffect(() => {
    
  }, [initialList])

  return (
    <div className='flex flex-col'>      
      <div className='flex flex-col mt-8 items-center justify-around'>
          <p className='text-xs mb-2'>
            MEUS CEPS
          </p>
          <div className='flex overflow-x-auto'>
            {initialList && (
              initialList.map(item => {
                return (
                  <div
                    key={item.cep} 
                    className="flex flex-col gap-1 h-32 w-44   
                    items-start p-2 m-2 bg-slate-100 
                    duration-300 border rounded-2xl shadow-xl"
                    >
                      <p className='truncate'>
                        {item.logradouro}
                      </p>
                      <p className='text-blue-500'>
                        {item.cep}
                      </p>
                      <p className='text-xs'>
                        {item.complemento}
                      </p>
                      <p className='text-xs'>
                        {item.bairro}
                      </p>
                      <button className='flex cursor-pointer' onClick={() => removeItem(item)}>
                        <MdDeleteForever className='text-blue-500 mr-1' />
                        <p className='text-xs hover:text-red-500 duration-300'>
                          Deletar
                        </p>
                      </button>
                  </div>        
                )
              })
              )}        
          </div>
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
                <button className='flex cursor-pointer ' onClick={() => saveCep(result)}>
                  <BsSave2 className='text-blue-500 mr-1' />
                  <p className='text-xs hover:text-blue-500 duration-300'>
                    Salvar
                  </p>
                </button>
              </div>
            )
          })}
        </div>      
      </div>
    </div>
  );
};