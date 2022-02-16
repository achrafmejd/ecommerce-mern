import {useState, useEffect} from 'react';
import { Button, Offcanvas, ListGroup, Badge} from 'react-bootstrap';

function OffCanvasExample({ name, ...props }) {
    const [show, setShow] = useState(false);
    const [bill, setBill] = useState(0);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [myCart, setMyCart] = useState(JSON.parse(localStorage.getItem("myCart")) || [] );
    let tempBill = 0;
    useEffect(()=>{
      localStorage.setItem("myCart", JSON.stringify(myCart));
      myCart.forEach((p)=>tempBill+=p.price*p.quantityWanted)
      setBill(tempBill)
    }, [myCart])

    useEffect(() => {
    
      window.addEventListener('storage', () => {
        // When local storage changes, dump the list to
        // the console.
         setMyCart(JSON.parse(localStorage.getItem('myCart')) || [])   
      });
      }, []); 
    
      const removeProduct = (product)=>{
        setMyCart([...myCart.filter((e)=>e._id !== product._id)])
        window.location.reload() 
        //console.log(myCart.filter((e)=>e._id !== product._id))
      }

  
    return (
      <>
        <Button variant="light" onClick={handleShow} className="me-2">
                  <li className="checkout">
                              <a href="#" /* onClick={()=>{handleClick('cart')}} */>
											<i className="fa fa-shopping-cart" aria-hidden="true"></i>
											<span id="checkout_items" className="checkout_items">{myCart.length}</span>
										</a>
									</li>
        </Button>
        <Offcanvas show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title><i class="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;CART</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
              <ListGroup as="ol">
                  {myCart.length == 0 ? <p className="text-center">Empty Cart</p> : myCart.map((product)=>{
                    return(

                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        style={{marginBottom: '10px', position: 'relative'}}
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">{product.title}</div>
                          Quantity : {product.quantityWanted}
                        </div>
                        <Badge variant="warning" pill>
                          {product.price}&nbsp;MAD
                        </Badge>
                        <a id="close-cart" href="#" onClick={()=>removeProduct(product)}>
                          <i className="fa fa-times" aria-hidden="true"></i>
                        </a>
                    </ListGroup.Item>
                    )
                  })}
        
                {myCart.length == 0 ? <></> : 
                  <div style={{position: 'absolute', bottom: '0%', marginBottom: '5px', width: '95%'}}>
                        <p>SUMMARY</p>
                        <span>NUMBER OF PRODUCTS : {myCart.length} </span><br/>
                        <span>BILL : {bill}&nbsp;MAD</span>
                        <div className="checkout-container" >
                          <div className="red_button shop_now_button" ><a href="/checkout">GO TO CHECKOUT</a></div>
                        </div>
                  </div>
                }
              </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }

export default OffCanvasExample;