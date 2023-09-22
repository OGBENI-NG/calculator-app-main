import React, {useContext, useState} from 'react'
import { ThemeContext } from '../Hook/UseContext'
import NumberButton from './NumberButton'

function CalFunction() {
      const { theme } = useContext(ThemeContext)
      const [input, setInput] = useState([]) // Initialize as an empty array
      const [result, setResult] = useState('')

      function handleButtonClick(value) {
            if (value === 'x') {
                  value = '*'
            }
            if (value === 'DEL') {
                  // Remove the last element from the input
                  setInput((prevInput) => prevInput.slice(0, -1))
            }  
            else if (value === '=') {
                  // Calculate the result when '=' is clicked
                  try {
                  const calculateResult = evaluateInput(input)
                  setResult(calculateResult.toString())
                  } catch (error) {
                  setResult('Error')
                  }
            } else if (isOperator(value)) {
                  // Handle operator precedence without spaces
                  setInput((prevInput) => {
                  const trimmedInput = prevInput.join('').trim() // Join and remove leading/trailing spaces
                  const lastChar = trimmedInput.charAt(trimmedInput.length - 1)

                  if (isOperator(lastChar)) {
                  // Replace the last operator with the new one
                  prevInput[prevInput.length - 1] = value
                  return [...prevInput]
                  } else {
                  // Append the operator without spaces around it
                  return [...prevInput, value]
                  }
                  })
            } else {
                  // Append the clicked button's value to the current input element
                  setInput((prevInput) => [...prevInput, value])
            }
            }

            // Helper function to check if a value is an operator
            function isOperator(value) {
            return ['+', '-', '*', '/'].includes(value)
            }
            function clearInput() {
            setInput([])
            setResult(0)
            }  

            const resultValue = !input.join("") ? "0" : (
            result || (() => {
                  let firstInput = ''
                  for (let i = 0; i < input.length; i++) {
                  if (isOperator(input[i])) {
                  break
                  }
                  firstInput += input[i]
                  }
                  return firstInput
            })()
            )

            function evaluateInput(inputArray) {
            try {
                  const expression = inputArray.join('')
                  const tokens = expression.match(/(\d+(\.\d+)?)|(\+|\-|\*|\/)/g)
                  if (!tokens) return 'Error'

                  let result = parseFloat(tokens[0])
                  for (let i = 1; i < tokens.length; i += 2) {
                        const operator = tokens[i]
                        const operand = parseFloat(tokens[i + 1])
                        if (isNaN(operand)) return 'Error'
                        if (operator === '+') result += operand
                        else if (operator === '-') result -= operand
                        else if (operator === '*') result *= operand
                        else if (operator === '/') result /= operand
                  }
                  return result.toString()
            } catch (error) {
                  return 'Error'
            }
      }
      return (
            <>
                  <div className={`screen ${theme}-theme`}>
                        <span className='result'>{input.join('')}</span>
                        <h2>{resultValue}</h2>
                  </div>
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
                              {result ? (<NumberButton 
                                    className={`delete-btn ${theme}-theme`}
                                    onClick={clearInput}
                              >C</NumberButton>) : (<NumberButton 
                                    className={`delete-btn ${theme}-theme`}
                                    onClick={handleButtonClick}
                              >DEL</NumberButton>)}
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
                                    onClick={clearInput}
                              >
                              RESET</NumberButton>
                              <NumberButton 
                                    className={`equal-btn ${theme}-theme`}
                                    onClick={handleButtonClick}
                                    disabled={!input.join('') ? true : false}
                              >
                              =</NumberButton>
                        </div>
                  </section>
            </>
      )
}

export default CalFunction