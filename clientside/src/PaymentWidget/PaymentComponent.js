import React from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {Card, Row, Col, ToggleButtonGroup, ToggleButton, ListGroup, Badge, Form, FormGroup, Button} from 'react-bootstrap';
import CreditCardForm from './CreditCardForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PaymentComponent.css';
import "./elements.css";
import { useHistory, Redirect, Link } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import Navbar from '../components/Navbar';
import{useState, useEffect} from 'react'
 
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
    const [myCart, setMyCart] = useState(JSON.parse(localStorage.getItem("myCart")) || [] );

    const [bill, setBill] = useState(0);

    let tempBill=0;

    useEffect(()=>{

          localStorage.setItem("myCart", JSON.stringify(myCart));

          myCart.forEach((p)=>tempBill+=p.price*p.quantityWanted)

          setBill(tempBill)

        }, [myCart])  

    //render
    return ( 
        //bootstrap card container
        <>
            <Navbar />
            <div className="col text-center" style={{marginTop: '8em', marginBottom : '2.5em'}}>
                <div className="section_title new_arrivals_title">
                    <h2>CHECKOUT</h2>
                </div>            
            </div>
            <Row>
                <Col>
                       <Elements stripe={loadStripe(props.keys.stripe)} options={ELEMENTS_OPTIONS}>
                            <CreditCardForm />
                        </Elements>
                </Col>
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
        </>
        );
    
}
