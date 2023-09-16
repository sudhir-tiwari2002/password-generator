import { useState , useCallback, useEffect , useRef} from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed , setNumberAllowed]= useState(false)
  const [charAllowed , setCharAllowed] = useState(false)
  const [password , setPassword] = useState('')
  
  //useref hook

  const paswordRef = useRef()




  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+= "0123456789"
    if(charAllowed) str+="!@#$%&*_"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length +1)
      pass += str.charAt(char) // concating the str value into the pass 
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])

  const copyPassword = useCallback(()=>{
    paswordRef.current?.select()
    // paswordRef.current?.setSelectionRange(0,5) // use for setting the range of the selection that how may charecter want to select
    window.navigator.clipboard.writeText(password) // this will not work at the next js project because there are server side rendering present
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[numberAllowed,charAllowed,length,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2  text-orange-500 bg-gray-700 '>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className=' flex shadow-sm rounded-lg overflow-hidden mb-4'>
          <input type='text' value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={paswordRef}/>
          <button className=' outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPassword}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2 '>
          <div className=' flex items-center gap-x-1'>
            <input type='range'
            min={6}
            max={100}
            value={length}
            className=' cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}/>
            <label htmlFor=""> length {length}</label>
          </div>
          <div className=' flex items-center gap-x-1'>
            <input type="checkbox" 
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={()=>{setNumberAllowed((prev) => !prev)}}/>
            <label> Number </label>
          </div>
          <div className=' flex items-center gap-x-1'>
            <input type="checkbox" 
            defaultChecked={charAllowed}
            id='charInput'
            onChange={()=>{setCharAllowed((prev) => !prev)}}/>
            <label> Charecter </label>
          </div>
        </div>
      </div>
    </>
  )
}
 
export default App
