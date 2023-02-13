import * as React from 'react';

export const About = () => {
  return (
    <div className='flex flex-col items-center my-4'>
      <div className='flex flex-col justify-center w-80 mx-2 p-4 shadow-lg border rounded-xl border-slate-200'>
        <p className='text-center text-md mb-4'>
          Aplicativo para consulta de ceps baseado na API do <a className='text-blue-500' href="https://viacep.com.br/">ViaCEP.</a> 
        </p>
        <p className='text-center text-md mb-4'>
          Para mais informações, acesse o meu link do repositório no <a className='text-blue-500' href="https://github.com/gabrigomez/esqueci-meu-cep">
          Github</a>
        </p>
        <p className='text-center text-md mb-4'>
          Desenvolvido por gabrigomez - 2023. Todos os direitos reservados.
        </p>
      </div>
    </div>
  )
}