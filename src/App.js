import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Hedder from './components/hedder/Header';
import Home from './components/home/Home'
import Login from './components/login/Login'
import SearchItem from './components/search prodects/Prodects'
import Footer from './components/footer/Footer'

function App() {
  const [reMountHedderr, setHeMountHedderr] = useState(0)
  const [onLogout, setlogoutCount] = useState(0)
  const [reMountHedder, setHeMountHedder] = useState(2)
  const [pdata, setPdata] = useState(2)

  const reMount = (item) => {
    setHeMountHedderr(item + 1)
    setHeMountHedderr(item + 2)
  }
  const reMountt = (item) => {

    setHeMountHedderr(item + 1)
    setHeMountHedderr(item + 2)

    console.log("h " + reMountHedderr);
  }
  const onLogut = (count) => {
    setlogoutCount(count)
  }
  const getPdata = (itm) => {
    setPdata(itm);
  }
  return (
    <div className="App">





      <Router>

        <Hedder data={getPdata}  onLogut={onLogut} reMountHedder={reMountHedder} reMountHedderr={reMountHedderr} />

        <Switch>
          <Route path="/" exact>
            <Home data={reMountt} />
          </Route>
          <Route path="/home" exact>
            <Home data={reMountt} />
          </Route>
          <Route path="/login" >
            <Login data={reMountt} />
          </Route>
          <Route path="/Sprodects" >
            <SearchItem data={pdata} />
          </Route>

        </Switch>

        <Footer />

      </Router>



    </div>
  );
}

export default App;
