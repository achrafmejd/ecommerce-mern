import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Navbar from './components/Navbar';
import Checkout from './pages/Checkout';
import PaymentComponent from "./PaymentWidget/PaymentComponent";
import { Container } from "react-bootstrap";
import Footer from './components/Footer';
import Benefits from './components/Benefits';
import Newsletter from './components/Newsletter';
/*  import PaymentComponent from "./components/PaymentComponent";
 */

function App() {
  return (
      <Router>
        <Navbar />
            <Switch>
              <Route exact path="/">
                    <Home />
                </Route>
                {/* <Route exact path="/signin">
                    <SignIn />
                </Route>
                <Route exact path="/signup">
                    <SignUp />
                </Route> */}
                <Route exact path="/products">
                  <Products />
                </Route>
                <Route exact path="/products/:id">
                  <SingleProduct />
                </Route>
                <Route exact path="/checkout">
                  <Container>
                    <PaymentComponent
                        keys={{
                            stripe: "pk_test_51KTD5GBbdooSCxMFV8hLU7XFToVcCR3YwXYCPnz7qvzb0yFZEHnwV946NZweNl86HuuvptZ5vtVcO09fBAp8GwuS00lOOKonsO"
                            }}
                    />
                  </Container>
                </Route>
            </Switch>
            <Benefits />
            <Newsletter />
            <Footer />
      </Router>
  );
}

export default App;