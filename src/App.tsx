import { MotionConfig } from 'motion/react'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HomePage />
    </MotionConfig>
  )
}

export default App
