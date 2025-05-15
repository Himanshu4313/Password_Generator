import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [Password, setPassword] = useState(" ");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  //useRef hook 

  const passwordRef = useRef(null);


  function passwordGenerator() {
    let pass = "";
    let str = 'ABCEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const specialChar = '~`!@#$%^&*(){}?*-+'
    const number = '0123456789';


    if (numberAllowed) {
      str += number;
    }

    if (charAllowed) {
      str += specialChar;
    }

    for (let i = 1; i <= length; i++) {
      let randomNum = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(randomNum);

    }
    setPassword(pass);
  }


  //logic for copy password 
  function copyPassword() {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(Password); // This line of code help to copy the password value 

  }


  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed])

  return (
    <>
      <div className=' bg-gray-950  w-[100vw] h-[100vh] flex justify-center items-center '>
        <div className=' text-white border-2 border-gray-500 rounded-2xl shadow-gray-500 h-72 w-[40vw]'>
          <h1 className='text-center py-4 text-2xl'>Password Generator</h1>

          <div className=' flex justify-around items-center'>
            <input type="text"
              placeholder='Password'
              value={Password}
              className='border-2 border-gray-500 rounded-2xl p-3 w-[30vw] outline-none '
              readOnly
              ref={passwordRef}
            />


            <button
              className=' bg-cyan-300 text-black font-bold py-2 px-5 rounded-xl cursor-pointer hover:bg-cyan-400 '
              onClick={copyPassword}
            >
              Copy
            </button>
          </div>

          <div className=' flex justify-around items-center flex-wrap'>
            <div className='my-8 '>
              <input type="range"
                min={8}
                max={100}
                value={length}
                className=' cursor-pointer '

                onChange={(e) => setLength(e.target.value)} />

              <label htmlFor="range" className='px-3 '>Length {length}</label>

            </div>

            <div className='my-8'>
              <input type="checkbox"
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((previousState) => !previousState);
                }}
              />
              <label htmlFor="checkbox" className='px-3'>Number</label>
            </div>
            <div className='my-8'>
              <input type="checkbox"
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((previousState) => !previousState);
                }}
              />
              <label htmlFor="checkbox" className='px-3'>SpecialCharacter</label>
            </div>




          </div>

        </div>
      </div>
    </>
  )
}

export default App
