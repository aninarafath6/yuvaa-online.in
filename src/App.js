import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Hedder from './components/hedder/Header';
import Home from './components/home/Home'

function App() {
  return (
    <div className="App">
     


       

      <Router>

        <Hedder />

        <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="/home" exact>
            <Home/>
          </Route>
          
        </Switch>


      </Router>

   
      
    </div>
  );
}

export default App;
