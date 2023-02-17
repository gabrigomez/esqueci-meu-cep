import { Route, Routes } from 'react-router-dom';
import { About } from './Components/About';
import { Main } from './Components/Main';
import { NavBar } from './Components/NavBar';
import { useTheme } from './useTheme';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`flex h-screen flex-col ${ theme ? 'bg-black' : 'bg-white' }`}>
      <NavBar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/about' element={<About />} />        
      </Routes>
    </div>
  );
}

export default App;
