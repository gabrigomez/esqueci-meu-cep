import { Route, Routes } from 'react-router-dom';
import { About } from './Components/About';
import { Main } from './Components/Main';
import { NavBar } from './Components/NavBar';

function App() {
  return (
    <div className="flex flex-col">
      <NavBar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/about' element={<About />} />        
      </Routes>
    </div>
  );
}

export default App;
