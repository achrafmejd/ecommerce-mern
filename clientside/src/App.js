import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Products from './Products';
import SingleProduct from './SingleProduct';
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
