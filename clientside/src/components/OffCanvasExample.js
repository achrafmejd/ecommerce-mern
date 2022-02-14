import {useState} from 'react';
import { Button, Offcanvas, ListGroup, Badge} from 'react-bootstrap';

function OffCanvasExample({ name, ...props }) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="light" onClick={handleShow} className="me-2">
                  <li className="checkout">
                              <a href="#" /* onClick={()=>{handleClick('cart')}} */>
											<i className="fa fa-shopping-cart" aria-hidden="true"></i>
											<span id="checkout_items" className="checkout_items">0</span>
										</a>
									</li>
        </Button>
        <Offcanvas show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title><i class="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;CART</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
              <ListGroup as="ol">
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                  style={{marginBottom: '10px', position: 'relative'}}
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">PRODUCT NAME</div>
                    Quantity : 5
                  </div>
                  <Badge variant="warning" pill>
                    15 MAD
                  </Badge>
                  <a id="close-cart" href="#">
										<i className="fa fa-times" aria-hidden="true"></i>
									</a>
                </ListGroup.Item>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">PRODUCT NAME</div>
                    Quantity : 5
                  </div>
                  <Badge variant="warning" pill>
                    15 MAD
                  </Badge>
                  <a id="close-cart" href="#">
										<i className="fa fa-times" aria-hidden="true"></i>
									</a>
                </ListGroup.Item>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">PRODUCT NAME</div>
                    Quantity : 5
                  </div>
                  <Badge variant="warning" pill>
                    15 MAD
                  </Badge>
                  <a id="close-cart" href="#">
										<i className="fa fa-times" aria-hidden="true"></i>
									</a>
                </ListGroup.Item>

                <div style={{position: 'absolute', bottom: '0%', marginBottom: '5px', width: '95%'}}>
                      <p>SUMMARY</p>
											<span>NUMBER OF PRODUCTS : 4</span><br/>
											<span>BILL : 21$</span>
											<div className="checkout-container" >
												<div className="red_button shop_now_button" ><a href="/products">GO TO CHECKOUT</a></div>
											</div>
                </div>
              </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }

export default OffCanvasExample;