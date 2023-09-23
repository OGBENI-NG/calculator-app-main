import React, {useContext, useState, useEffect} from 'react'
import { ThemeContext } from '../Hook/UseContext'
import NumberButton from './NumberButton'
import {FiChevronDown} from "react-icons/fi"
import {Ri24HoursFill, RiDeleteBinFill} from "react-icons/ri"
import {RiDeleteBinLine} from "react-icons/ri"

function CalFunction() {
      const { theme, toggle, openHistory } = useContext(ThemeContext)
      const [history, setHistory] = useState(() => {
            const saveHistory = localStorage.getItem('history')
            return saveHistory ? JSON.parse(saveHistory) : []
      })
      const [input, setInput] = useState(() => {
            const savedInput = localStorage.getItem('input')
            return savedInput ? JSON.parse(savedInput) : []
      })
        
      const [result, setResult] = useState(() => {
            const savedResult = localStorage.getItem('result')
            return savedResult ? savedResult : ''
      })
        
      useEffect(() => {
            localStorage.setItem('input', JSON.stringify(input))
            localStorage.setItem('result', result)
            localStorage.setItem('history', JSON.stringify(history))
      }, [input, result, history])
      
      function handleButtonClick(value) {
            if (value === 'x') {
                  value = '*'
            }
            if (value === 'DEL') {
                  // Remove the last element from the input
                  setInput((prevInput) => prevInput.slice(0, -1))
            }  else if (value === '=') {
                  // Calculate the result when '=' is clicked
                  try {
                        const calculateResult = evaluateInput(input)
                        setResult(calculateResult.toString())
                        // Save the current calculation to history
                        setHistory((prevHistory) => [
                              ...prevHistory,
                              `${input.join('')} = ${calculateResult}`,
                        ]);
                  } catch (error) {
                        setResult('')
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
            setResult("")
      }  
      function evaluateInput(inputArray) {
            try {
                  const expression = inputArray.join('')
                  const tokens = expression.match(/(\d+(\.\d+)?)|(\+|\-|\*|\/)/g)
                  if (!tokens) return 'Error'
                  let result = parseFloat(tokens[0])
                  for (let i = 1; i < tokens.length; i += 2) {
                        const operator = tokens[i]
                        const operand = parseFloat(tokens[i + 1])
                        if (isNaN(operand)) return '' 
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
      //display all first input values and result values
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
      const entry = history.map((entry, index) => (
            <p key={index}  className='history-result'>
                  {entry}
            </p>
      ))
      const deleteIcons = history.length ? (<RiDeleteBinFill 
            className='bin'
            onClick={() => {
                  setHistory([])
                  setInput([])
                  setResult('')
                  localStorage.clear()
            }}
      />) : (
            <RiDeleteBinLine className='bin'/>
      )

      return (
            <>
                  <div className={`screen ${theme}-theme`}>
                        <span className='result'>{input.join('')}</span>
                        <h2>{resultValue}</h2>
                  </div>
                  <span 
                        className='history' 
                        onClick={toggle}
                  >History 
                        <FiChevronDown 
                              className={`icon ${openHistory ? "chev-icon" : ""}`}
                        />
                  </span>
                  <section className={`buttons-wrapper ${theme}-theme`}>
                        {openHistory ? (
                              <div className='history-wrapper'>
                                    {deleteIcons}
                                    <div  className='entry-wrapper'>
                                          {!history.length ? "No History" : entry}
                                    </div>
                              </div>
                              ) : (
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
                        )}
                  </section>
            </>
      )
}

export default CalFunction