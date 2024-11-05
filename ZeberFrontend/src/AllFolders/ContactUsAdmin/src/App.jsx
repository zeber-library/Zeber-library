import './App.css'
import Messages from "./components/messages";
import logo from "./../../../assets/logo.png"

function App() {

  return <div className=''>
    <div className='flex p-5 border-b-2 justify-between'>
      <div className='flex'>
        <img src={logo} className='w-40 h-12'></img>
        <h1 className='text-5xl mt-1 ml-2 font-bold text-indigo-400'>Services</h1>
      </div>
      <div>
        <h1 className='text-4xl mt-2'>Messages For Admins</h1>
      </div>
    </div>
    <Messages />
  </div>
}

export default App
