
import React, {useContext, useState} from 'react';
import './App.css';
import { ThemeContext } from './Hook/UseContext';
import Header from './Components/Header';
import NumberButton from './Components/NumberButton';
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
