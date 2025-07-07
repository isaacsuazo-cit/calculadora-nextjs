'use client'

import Calculator from './components/Calculator'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Calculadora Next.js</h1>
      <Calculator />
    </main>
  )
}