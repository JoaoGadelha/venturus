import React, { useState } from 'react'
import styles from './App.module.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Header from './Components/Header/Header'
import MyTeams from './Components/MyTeams/MyTeams'
import Top5 from './Components/Top5/Top5'
import { Provider } from "./Context.js";
import Statistics from './Components/Statistics/Statistics'
import Configure from './Components/Configure/Configure'
import Footer from './Components/Footer/Footer'

function App() {

  let [configure, setConfigure] = useState(false);

  return (

    <Provider>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" >
              <div className={styles.container}>
                <MyTeams />
                <Top5 />
                <Statistics />
              </div>
            </Route>
            <Route exact path="/configure" component={Configure} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
