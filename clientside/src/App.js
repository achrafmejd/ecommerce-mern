import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Navbar from './components/t';

function App() {
  return (
      <Router>
        <Switch>
        <Route exact path="/">
              <Home />
          </Route>
          <Route exact path="/signin">
              <SignIn />
          </Route>
          <Route exact path="/signup">
              <SignUp />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/product/:id">
            <SingleProduct />
          </Route>
          <Route exact path="/test">
            <Navbar />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;