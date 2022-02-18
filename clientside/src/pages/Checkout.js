import Benefits from '../components/Benefits';
import DealOfTheWeek from '../components/DealOfTheWeek';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import ProductSummary from '../components/ProductSummary';
import { Form, Modal, Button, Row, Col, ListGroup, Badge} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Field from "../components/Field";
import axios from 'axios';
import { useHistory, Redirect, Link } from "react-router-dom";


import {
    CardElement,
    useElements,
    useStripe,
    Elements,
} from "@stripe/react-stripe-js";

//config of fonts for the stripe prebuilt elements
const ELEMENTS_OPTIONS = {
    fonts: [
        {
            cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
        },
    ],
};

//credit card element specific styling
const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "18px",
			color: "#424770",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": {
                   color: '#cccccc',
            },
            "::placeholder": {
                   color: '#888',
            },
        },
        invalid: {
            iconColor: "red",
            color: "red",
        },
    },
};

//scredit card button sub component
const CardField = ({onChange}) => (
    <div className="FormRow">
      <CardElement options={CARD_OPTIONS} onChange={onChange} />
    </div>
  );

//submit button sub component
const SubmitButton = ({ processing, error, children, disabled }) => (
    <button
        className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
        type="submit"
        disabled={processing || disabled}
    >
        {processing ? "Processing..." : children}
    </button>
);


const Checkout = (props) => {
    let history = useHistory();

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false)
    const [cardComplete, setCardComplete] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [price, setPrice] = useState(0);
    const [billingDetails, setBillingDetails] = useState({
        email: '',
        firstname: '',
        lastname: '',
        address: '',
    });
    const [myCart, setMyCart] = useState(JSON.parse(localStorage.getItem("myCart")) || [] );
    const [bill, setBill] = useState(0);
    let tempBill=0;
    useEffect(()=>{
          localStorage.setItem("myCart", JSON.stringify(myCart));
          myCart.forEach((p)=>tempBill+=p.price*p.quantityWanted)
          setBill(tempBill)
          setPrice(bill)
        }, [myCart])
    //resets state on completion
    const reset = () => {
        setError(null);
        setProcessing(false);
        setPaymentMethod('');
        setPrice(0);
        setSuccess(false);
        setCardComplete(false);
        setBillingDetails({
            email: '',
            firstname: '',
            lastname: '',
            address: '',
        });
    };

    /*
	This code runs when a card transaction is submitted
	There are three main components to this function:
		
		1. create a new stripe payment method using the form data
		
		2. get a payment intent from the server using the speficied price

		3. confirm the payment intent using the new payment method

		4. send a confiemation to the server if the payment succeeded
	*/
    const handleSubmit = async (event) => {
        console.log(billingDetails)
        //prevent default form values
        event.preventDefault();

        ///if stripe api is loaded
        if (!stripe || !elements) {
            console.log("137")
            return;
        }

        //handle errors
        if (error) {
            console.log(error);
            elements.getElement("card").focus();
            return;
        }

        if(price == 0) {
            return;
        }

        //start processing animation on submit button
        if (cardComplete) {
            setProcessing(true);
        } else {
            return;
        }
		//STEP 1:
        //create new payment method based on card and form information
        const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: billingDetails
        });

        //handle errors, otherwise set the new payment method in state
        if (payload.error) {
            setError(payload.error);
            return;
        } 
		
		//STEP 2:
        //create a new payment request and get irs client secret + id from the server
        const intentData = await axios
            .post("http://localhost:3001/stripe", {
                //include the bet amount
                price: price,
            })
            .then(
                (response) => {
                    //SUCCESS: put client secret and id into an object and return it
                    return {
                        secret: response.data.client_secret,
                        id: response.data.intent_id,
                    };
                },
                (error) => {
                    //ERROR: log the error and return
                    setError(error)
                    return error;
                }
            );
		
		//STEP 3:
        //confirm the payment and use the new payment method
        const result = await stripe.confirmCardPayment(intentData.secret, {
            payment_method: payload.paymentMethod.id,
        });

        //handle errors again
        if (result.error) {
            setError(result.error);
            return
        }
		
		//STEP 4:
        // The payment has been processed! send a confirmation to the server
        if (result.paymentIntent.status === "succeeded") {
            const confirmedPayment = await axios
                .post("http://localhost:3001/confirm-payment", {
                    //include id of payment
                    payment_id: intentData.id,
                    payment_type: "stripe",
                    //send any other data here
                })
                .then(
                    (response) => {
                        //SUCCESS: return the response message
                        return response.data.success;
                    },
                    (error) => {
                        //ERROR:
                        console.log(error);
                        setError(error)
                        return error;
                    }
                );
            //reset the state and show the success message
            if (confirmedPayment) {

                //reset the form
                
                reset();
                /*
                 YOUR APPLICATION SPECIFIC CODE HERE:
                 for this example all we do is render a modal
                */
                setSuccess(true);
            }
        }
    }

    

    //render
    return ( 
        <div>
            <Navbar />
            <div className="col text-center" style={{marginTop: '8em', marginBottom : '2.5em'}}>
                <div className="section_title new_arrivals_title">
                    <h2>CHECKOUT</h2>
                </div>            
            </div>
                <Row>
                    <Col className="" style={{marginLeft : '4em', marginRight: '4em'}}>
                        <h2>Billing address</h2>
                        <Form onSubmit={handleSubmit}>
                            {/* Error modal */}
                            <Modal show={error!=null}>
                                <Modal.Header>
                                    <Modal.Title>Error</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <p>{error}</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="danger" onClick={(event)=>{setError(null)}}>Close</Button>    
                                </Modal.Footer>
                            </Modal>


                            {/* success banner, only shows after confirmation */}
                            <Modal show={success}>
                                <Modal.Header>
                                    <Modal.Title>Payment Succeeded</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Your card payment has been confirmed
                                </Modal.Body>
                                <Modal.Footer>
                                        <Button variant="success" onClick={ () =>{history.push("/")}}>Close</Button>
                                    
                                </Modal.Footer>
                            </Modal>
                            {/* Billing info */}
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    {/* <Form.Label>First name</Form.Label>
                                    <Form.Control type="text" placeholder="First name" /> */}

                                    <Field
                                        label="frstName"
                                        id="name"
                                        type="text"
                                        placeholder="First name"
                                        required
                                        autoComplete="name"
                                        value={billingDetails.firstname}
                                        onChange={(event) => {
                                            setBillingDetails({...billingDetails, firstname: event.target.value});
                                        }}
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                {/*     <Form.Label>Last name</Form.Label>
                                    <Form.Control type="text" placeholder="Last name" /> */}
                                    <Field
                                        label="lastname"
                                        id="name"
                                        type="text"
                                        placeholder="Last name"
                                        required
                                        autoComplete="name"
                                        value={billingDetails.lastname}
                                        onChange={(event) => {
                                            setBillingDetails({...billingDetails, lastname: event.target.value});
                                        }}
                                    />
                                </Form.Group>

                            </Row>
                                <Form.Group as={Col} controlId="">
                                    {/* <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email" /> */}

                                    {/* email field */}
                                    <Field
                                        label="Email"
                                        id="email"
                                        type="email"
                                        placeholder="Your email"
                                        required
                                        autoComplete="email"
                                        value={billingDetails.email}
                                        onChange={(event) => {
                                            setBillingDetails({...billingDetails, email: event.target.value});
                                        }}
                                    />
                                </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                {/* <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="Shipping Address" /> */}
                                <Field
                                    label="Billing Address"
                                    id="line1"
                                    type="address-line1"
                                    placeholder="Shipping Address"
                                    required
                                    autoComplete="address-line1"
                                    value={billingDetails.address.line1}
                                    onChange={(event) => {
                                        setBillingDetails({...billingDetails, 
                                            address: event.target.value
                                        });
                                    }}
                                />
                            </Form.Group>

                    
                            <hr style={{marginTop: '2em'}}/>  
                    
                            <h2>Credit Card Info</h2>  
                            {/* credit card field and submit button */}
                            <fieldset className="FormGroup">
                                {/* card */}
                                <CardField
                                    style={{display: 'block'}}
                                    onChange={(event) => {
                                        setError(event.error);
                                        setCardComplete(event.complete);
                                    }}
                                />  
                            </fieldset>     
                            {/* submit */}
                            <SubmitButton
                                    processing={processing}
                                    error={error}
                                    disabled={!stripe}
                                >
                                    Make Payment
                            </SubmitButton>                  
                        </Form>
                    </Col>
                    {/* Right side : CART SUMMARY */}
                    <Col className="" style={{marginTop : '1.7em', marginRight: '4em'}}>
                        <h2>Cart summary</h2>  
                        {myCart && myCart.map((product)=>{
                            return(
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                    style={{ position: 'relative'}}
                                >
                                    <div className="ms-2 me-auto">
                                    <div className="fw-bold">{product.title}</div>
                                    Quantity : {product.quantityWanted}
                                    </div>
                                    <Badge variant="warning" pill>
                                    {product.price}&nbsp;MAD
                                    </Badge>
                                    <a id="close-cart" href="#">
                                    <i className="fa fa-time}s" aria-hidden="true"></i>
                                    </a>
                                </ListGroup.Item>
                        )
                    })} 
                    <hr />
                    <h2>You will pay : {bill} MAD</h2>
                    </Col>
                </Row>
        </div>
     );
}
 
export default Checkout;