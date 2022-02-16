import Benefits from '../components/Benefits';
import DealOfTheWeek from '../components/DealOfTheWeek';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import ProductSummary from '../components/ProductSummary';
import { Form, Row, Col, Button, ListGroup, Badge} from 'react-bootstrap';
import {useState, useEffect} from 'react';


const Checkout = () => {

    const [myCart, setMyCart] = useState(JSON.parse(localStorage.getItem("myCart")) || [] );
    const [bill, setBill] = useState(0);
    let tempBill=0;
    useEffect(()=>{
          localStorage.setItem("myCart", JSON.stringify(myCart));
          myCart.forEach((p)=>tempBill+=p.price*p.quantityWanted)
          setBill(tempBill)
        }, [myCart])  
        
    
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
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="text" placeholder="First name" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" placeholder="Last name" />
                            </Form.Group>

                        </Row>
                            <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" />
                            </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="Shipping Address" />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control />
                            </Form.Group>
                            
                        </Row>
                    </Form>
                    <hr style={{marginTop: '2em'}}/>  
                    <h2>Credit Card Info</h2>  
                    <Form>
                        
                       


                        <Button variant="danger" className="red_button shop_now_button"  type="submit">
                            Proceeed
                        </Button>

                        
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