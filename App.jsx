
import React, {useContext, useState} from 'react';
import './App.css';
import { ThemeContext } from './Hook/UseContext';
import Header from './Components/Header';
import NumberButton from './Components/NumberButton';


function App() {
  const { theme } = useContext(ThemeContext);
  const [input, setInput] = useState([]); // Initialize as an empty array
  const [result, setResult] = useState('');

  function handleButtonClick(value) {
    console.log(value);
    if (value === 'x') {
      value = '*';
    }
    if (value === 'RESET') {
      // Clear input field
      setInput([]);
      setResult('');
    } else if (value === 'DEL') {
      // Remove the last element from the input
      setInput((prevInput) => prevInput.slice(0, -1));
    }  
    else if (value === '=') {
      // Calculate the result when '=' is clicked
      try {
        const calculateResult = evaluateInput(input);
        setResult(calculateResult.toString());
      } catch (error) {
        setResult('Error');
      }
    } else if (isOperator(value)) {
      // Handle operator precedence without spaces
      setInput((prevInput) => {
        const trimmedInput = prevInput.join('').trim(); // Join and remove leading/trailing spaces
        const lastChar = trimmedInput.charAt(trimmedInput.length - 1);

        if (isOperator(lastChar)) {
          // Replace the last operator with the new one
          prevInput[prevInput.length - 1] = value;
          return [...prevInput];
        } else {
          // Append the operator without spaces around it
          return [...prevInput, value];
        }
      });
    } else {
      // Append the clicked button's value to the current input element
      setInput((prevInput) => [...prevInput, value]);
    }
  }

  // Helper function to check if a value is an operator
  function isOperator(value) {
    
    return ['+', '-', '*', '/'].includes(value);
  }

    // Replace your existing evaluateInput function with this one:
  function evaluateInput(inputArray) {
    try {
      const expression = inputArray.join('');
      const tokens = expression.match(/(\d+(\.\d+)?)|(\+|\-|\*|\/)/g);
      if (!tokens) return 'Error';

      let result = parseFloat(tokens[0]);
      for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const operand = parseFloat(tokens[i + 1]);
        if (isNaN(operand)) return 'Error';

        if (operator === '+') result += operand;
        else if (operator === '-') result -= operand;
        else if (operator === '*') result *= operand;
        else if (operator === '/') result /= operand;
      }
      return result.toString();
    } catch (error) {
      return 'Error';
    }
  }

  
  return (
    <main className={`app ${theme}-theme`}>
      <Header/>
      <h2 className={`screen ${theme}-theme`}>{result || input.join('')}</h2>
      <section className={`buttons-wrapper ${theme}-theme`}>
        <div className='buttons-wrapper-inner'>
          <NumberButton 
            className={`key-btn ${theme}-theme`}
            onClick={handleButtonClick} 
          >7</NumberButton>
          <NumberButton 
            className={`key-btn ${theme}-theme`}
            onClick={handleButtonClick} 
          >8</NumberButton>
          <NumberButton 
            className={`key-btn ${theme}-theme`}
            onClick={handleButtonClick} 
          >9</NumberButton>
          <NumberButton 
            className={`delete-btn ${theme}-theme`}
            onClick={handleButtonClick}
          >DEL</NumberButton>
          <NumberButton 
            className={`key-btn ${theme}-theme`}
            onClick={handleButtonClick} 
          >4</NumberButton>
          <NumberButton 
            className={`key-btn ${theme}-theme`}
            onClick={handleButtonClick} 
          >5</NumberButton>
          <NumberButton 
            className={`key-btn ${theme}-theme`}
            onClick={handleButtonClick} 
          >6</NumberButton>
          <NumberButton 
            className={`key-btn ${theme}-theme`}
            onClick={handleButtonClick} 
          >+</NumberButton>
          <NumberButton 
            className={`key-btn ${theme}-theme`}
            onClick={handleButtonClick} 
          >3</NumberButton>
          <NumberButton 
            className={`key-btn ${theme}-theme`}
            onClick={handleButtonClick} 
          >2</NumberButton>
          <NumberButton 
            className={`key-btn ${theme}-theme`}
            onClick={handleButtonClick} 
          >1</NumberButton>
          <NumberButton 
            className={`key-btn ${theme}-theme`}
            onClick={handleButtonClick} 
          >-</NumberButton>
          <NumberButton 
            className={`key-btn ${theme}-theme`}
            onClick={handleButtonClick} 
          >.</NumberButton>
          <NumberButton 
            className={`key-btn ${theme}-theme`}
            onClick={handleButtonClick} 
          >0</NumberButton>
          <NumberButton 
            className={`key-btn ${theme}-theme`}
            onClick={handleButtonClick} 
          >/</NumberButton>
          <NumberButton 
            className={`key-btn ${theme}-theme`}
            onClick={handleButtonClick}
          >
            x</NumberButton>
          <NumberButton
            className={`reset-btn ${theme}-theme`}
            onClick={handleButtonClick}
          >
            RESET</NumberButton>
          <NumberButton 
            className={`equal-btn ${theme}-theme`}
            onClick={handleButtonClick}
          >
            =</NumberButton>
        </div>
      </section>
    </main>
  );
}
export default App;
