
import React, {useContext} from 'react';
import './App.css';
import { ThemeContext } from './Hook/UseContext';
import Header from './Components/Header';
import CalFunction from './Components/CalFunction';


function App() {
  const { theme } = useContext(ThemeContext);
  
  
  return (
    <main className={`app ${theme}-theme`}>
      <section className='app-inner'>
        <Header/>
        <CalFunction/>
      </section>
    </main>
  );
}
export default App;
