import React, { useState } from 'react';
import { searchSchema } from '../Validations/searchValidation';
import { BsSave2 } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';
import { states } from '../utils/states';
interface Address {
  logradouro: string,
  cep: string,
  complemento: string,
  bairro: string,
};

export const Main = () => {
  const [Uf, setUf] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [results, setResults] = useState<Address[]>([]);
  const [error, setError] = useState<string>('');
 
  const initialList: Address[] = JSON.parse(localStorage.getItem("ceps") || '{"":""}'); 
  const [savedList, setSavedList] = useState<Address[]>(initialList.length > 0 ? [...initialList] : []);  

  const endpoint = `https://viacep.com.br/ws/${Uf}/${city}/${street}/json/`;

  setTimeout(() => {
    setError('');
  }, 6000);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const isValid = await searchSchema.isValid({street});

    if(isValid) {
      const data = await fetch(endpoint).then(response => response.json());
      if(data.length > 0) {
        setResults(data);
      }
      else {
        setResults([]);
        setError("A busca não obteve resultados para este endereço");
      }
    } else {
      setError('A busca deve conter ao menos 3 letras em cada campo');
    };
  };
  
  const saveCep = (item: Address) => {
    const isDuplicate = !!savedList.find(add => add.cep === item.cep);    
      
    if (savedList.length > 0) {     
      if (isDuplicate) {
        setError('Endereço e CEP já salvos!');
      } else {
        const newList = [...savedList];
        newList.push(item);
        setSavedList(newList);
        
        const convertedItem = JSON.stringify(newList);
        localStorage.setItem('ceps', convertedItem);
      };      
    } else {
      const newList = [...savedList];
      newList.push(item);
      
      setSavedList(newList);  
      const convertedItem = JSON.stringify(newList);
      localStorage.setItem('ceps', convertedItem);
    }
  };

  const removeItem = (item: Address) => {
    const newList = [...savedList];
    for(let i = 0; i < newList.length; i++) {
      if (newList[i].cep === item.cep) {
        newList.splice(i, 1);
        setSavedList(newList);

        const convertedItem = JSON.stringify(newList);
        localStorage.setItem('ceps', convertedItem);
      };
    };
  };

  return (
    <div className='flex flex-col font-raleway'>      
      <div className='flex flex-col mt-5 items-center justify-center'>
        <p className='text-xs mb-1 font-bold dark:text-white'>
          MEUS CEPS
        </p>
        <div className='flex max-w-[340px] xs:max-w-[500px] md:max-w-[700px] xl:max-w-[1000px] overflow-x-auto'>
          {savedList.length > 0 && (
            savedList.map(item => {
              return (
                <div
                  key={item.cep} 
                  className="flex flex-col gap-1 max-h-40 w-44   
                  items-start p-2 m-2 bg-slate-300    
                  duration-300 border rounded-2xl shadow-md"
                  >
                    <p className='w-40 truncate'>
                      {item.logradouro}
                    </p>
                    <p className='text-blue-500 font-bold'>
                      {item.cep}
                    </p>
                    <p className='text-xs truncate h-4'>
                      {item.complemento}
                    </p>
                    <p className='text-xs font-semibold'>
                      {item.bairro}
                    </p>
                    <button className='flex self-end cursor-pointer' onClick={() => removeItem(item)}>
                      <MdDeleteForever className='text-blue-500 text-xl hover:text-red-500 duration-300' />
                    </button>
                </div>        
              )
            })
          )}        
        </div>
        <div className='flex flex-col w-full mt-5 items-center justify-center '>
          <form className='flex flex-col w-3/4 sm:w-2/4 xl:w-1/4 items-center border rounded-2xl shadow-xl p-4' onSubmit={handleSubmit}>
            <select
              className='mb-2 bg-blue-100 rounded-lg p-1'        
              placeholder='UF'
              value={Uf}
              onChange={(e) => setUf(e.target.value)}
            >
              {states.map(state => {
                return (
                  <option key={state} value={state}>
                    {state}
                  </option>
                )
              })}            
            </select>
            <input
              className='w-full dark:bg-black dark:text-white focus:outline-none mb-2 focus:border-b focus:border-blue-200' 
              type="text"
              placeholder='Cidade'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              className='w-full dark:bg-black dark:text-white focus:outline-none mb-2 focus:border-b focus:border-blue-200' 
              type="text"
              placeholder='Logradouro completo (rua, avenida, etc)'
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
        <div className='flex flex-col my-2 p-1'>
          {results.map(result => {
            return (
              <div 
                key={result.cep}
                className="flex flex-col gap-1 max-h-40 w-52 
                items-start p-2 m-2 hover:bg-slate-100 dark:hover:bg-slate-800 
                duration-300 border rounded-2xl shadow-xl">
                <p className='text-sm dark:text-white'>
                  {result.logradouro}
                </p>
                <p className='text-blue-500'>
                  {result.cep}
                </p>
                <p className='text-xs dark:text-white'>
                  {result.complemento}
                </p>
                <p className='text-xs mb-1 dark:text-white'>
                  {result.bairro}
                </p>
                <button className='flex cursor-pointer' onClick={() => saveCep(result)}>
                  <BsSave2 className='text-blue-500 mr-1' />
                  <p className='text-xs hover:text-blue-500 duration-300 dark:text-white'>
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