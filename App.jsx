
import React, {useContext} from 'react';
import './App.css';
import { ThemeContext } from './Hook/UseContext';
import Header from './Components/Header';
import NumberButton from './Components/NumberButton';


function App() {
  const {theme} = useContext(ThemeContext)
  return (
    <main className={`app ${theme}-theme`}>
      <Header/>
      <h2 className={`screen ${theme}-theme`}>339,99</h2>
      <section className={`buttons-wrapper ${theme}-theme`}>
        <div className='buttons-wrapper-inner'>
          <NumberButton className={`key-btn ${theme}-theme`} >7</NumberButton>
          <NumberButton className={`key-btn ${theme}-theme`} >8</NumberButton>
          <NumberButton className={`key-btn ${theme}-theme`} >9</NumberButton>
          <NumberButton className={`delete-btn ${theme}-theme`}>DEL</NumberButton>
          <NumberButton className={`key-btn ${theme}-theme`} >4</NumberButton>
          <NumberButton className={`key-btn ${theme}-theme`} >5</NumberButton>
          <NumberButton className={`key-btn ${theme}-theme`} >6</NumberButton>
          <NumberButton className={`key-btn ${theme}-theme`} >+</NumberButton>
          <NumberButton className={`key-btn ${theme}-theme`} >3</NumberButton>
          <NumberButton className={`key-btn ${theme}-theme`} >2</NumberButton>
          <NumberButton className={`key-btn ${theme}-theme`} >1</NumberButton>
          <NumberButton className={`key-btn ${theme}-theme`} >-</NumberButton>
          <NumberButton className={`key-btn ${theme}-theme`} >.</NumberButton>
          <NumberButton className={`key-btn ${theme}-theme`} >0</NumberButton>
          <NumberButton className={`key-btn ${theme}-theme`} >/</NumberButton>
          <NumberButton className={`key-btn ${theme}-theme`}>x</NumberButton>
          <NumberButton className={`reset-btn ${theme}-theme`}>RESET</NumberButton>
          <NumberButton className={`equal-btn ${theme}-theme`}>=</NumberButton>
        </div>
      </section>
    </main>
  );
}

export default App;
