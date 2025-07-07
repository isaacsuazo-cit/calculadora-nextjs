'use client'

import { useState } from 'react'
import styles from './Calculator.module.css'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num))
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForNewValue(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  return (
    <div className={styles.calculator}>
      <div className={styles.display}>{display}</div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={clear}>C</button>
        <button className={styles.button} onClick={() => performOperation('÷')}>÷</button>
        <button className={styles.button} onClick={() => performOperation('×')}>×</button>
        <button className={styles.button} onClick={() => performOperation('-')}>-</button>
        
        <button className={styles.button} onClick={() => inputNumber(7)}>7</button>
        <button className={styles.button} onClick={() => inputNumber(8)}>8</button>
        <button className={styles.button} onClick={() => inputNumber(9)}>9</button>
        <button className={`${styles.button} ${styles.tall}`} onClick={() => performOperation('+')}>+</button>
        
        <button className={styles.button} onClick={() => inputNumber(4)}>4</button>
        <button className={styles.button} onClick={() => inputNumber(5)}>5</button>
        <button className={styles.button} onClick={() => inputNumber(6)}>6</button>
        
        <button className={styles.button} onClick={() => inputNumber(1)}>1</button>
        <button className={styles.button} onClick={() => inputNumber(2)}>2</button>
        <button className={styles.button} onClick={() => inputNumber(3)}>3</button>
        <button className={`${styles.button} ${styles.tall}`} onClick={() => performOperation('=')}>=</button>
        
        <button className={`${styles.button} ${styles.wide}`} onClick={() => inputNumber(0)}>0</button>
        <button className={styles.button} onClick={inputDecimal}>.</button>
      </div>
    </div>
  )
}