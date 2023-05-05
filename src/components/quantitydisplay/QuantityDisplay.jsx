import React from 'react'
import styles from './QuantityDisplay.module.css'

function QuantityDisplay ({onDecrease, onIncrease, quantity}) {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </div>   
    </div>
  )
}

export default QuantityDisplay
