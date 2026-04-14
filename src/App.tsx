import { Button } from './components/button'

function App() {

  return (
    <>
      <div className='bg-gray-500 h-screen flex flex-col items-center justify-center'>
        <h1>Refunds</h1>
        <Button onClick={() => alert('Button clicked!')}>
          Click me
        </Button>
      </div>
    </>
  )
}

export default App
