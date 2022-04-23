import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Navbar from './components/Navbar';
import PaymentComponent from "./PaymentWidget/PaymentComponent";
import { Container } from "react-bootstrap";
import Footer from './components/Footer';
import Benefits from './components/Benefits';
import Newsletter from './components/Newsletter';
/*  import PaymentComponent from "./components/PaymentComponent";
 */
import Dashboard from "./components/Dashboard";
import Checkout from "./components/Checkout";
import Login from "./components/login";
import Register from "./components/Register";
import { ContextProvider } from "./context/GlobalContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthedRoute from "./components/AuthedRoute";
import TwoFactor from "./components/twoFactor";
import Validation from "./components/validation";

function App() {
  return (
    <ContextProvider>
    <Router>
      <Navbar />
      <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/products">
                  <Products />
                </Route>
                <ProtectedRoute exact path="/products/:id" component={SingleProduct}></ProtectedRoute>
        <AuthedRoute exact path="/login" component={Login} />
        <AuthedRoute path="/register" component={Register} />
        <ProtectedRoute exact path="/checkout" component={Checkout}></ProtectedRoute>
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/dashboard/2fa" component={TwoFactor} />
        <ProtectedRoute path="/user/validate" component={Validation} />
      </Switch>
    </Router>
    <Benefits />
    <Newsletter />
    <Footer />
  </ContextProvider>
  );
}

export default App;