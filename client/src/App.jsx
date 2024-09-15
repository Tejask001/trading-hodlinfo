import { useState } from 'react';
import BelowHeader from './components/BelowHeader';
import Footer from './components/Footer';
import Header from './components/Header';
import CoinData from './components/CoinData';
import './App.css'

const App = () => {

  const [lightMode, setlightMode] = useState(true)

  return (
    <div className='app' style={{
      backgroundColor: lightMode ? "#fff" : "#191d28",
      // color: lightMode ? "#000" : "#fff",
      transition: "all .5s"
    }}>
      <Header
        lightMode={lightMode}
        setlightMode={setlightMode}
      />
      <BelowHeader
        lightMode={lightMode}
      />

      <CoinData
        lightMode={lightMode}
      />

      <Footer />
    </div>
  )
}

export default App
