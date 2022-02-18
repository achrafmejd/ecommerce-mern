import React from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {Card, Row, Col, ToggleButtonGroup, ToggleButton, Form, FormGroup, Button} from 'react-bootstrap';
/* import CreditCardForm from './CreditCardForm';
 */import 'bootstrap/dist/css/bootstrap.min.css';

import { useHistory, Redirect, Link } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import Checkout from '../pages/Checkout';


//config of fonts for the stripe prebuilt elements
const ELEMENTS_OPTIONS = {
    fonts: [
        {
            cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
        },
    ],
};

//declare class
export default function PaymentComponent(props) {

    let history = useHistory();

    //render
    return ( 
        //bootstrap card container
        <Card border="primary" id="paymentWidgetContainerCard">

            {/* body */}
            <Card.Body >

                <Elements stripe={loadStripe(props.keys.stripe)} options={ELEMENTS_OPTIONS}>
                    <Checkout />
                </Elements>
                <Benefits />
            </Card.Body>
        </Card>
        );
    
}
