import React, { useState } from 'react'
import './App.css';
import Header from './Components/Header/Header'
import MyTeams from './Components/MyTeams/MyTeams'
import Top5 from './Components/Top5/Top5'
import Statistics from './Components/Statistics/Statistics'
import Configure from './Components/Configure/Configure'
import Footer from './Components/Footer/Footer'

function App() {

  let [configure, setConfigure] = useState(false)

  return (
    <div className="App">
      <div className='Header'>
        <Header />
      </div>
      < div className='MyTeams'>
        <MyTeams configure={setConfigure} />
      </div>
      <Top5 />
      <Statistics />
      {configure ? <Configure configure={setConfigure} /> : ''}
      <div className='Footer'>
        <Footer />
      </div>
    </div>
  );
}

export default App;
