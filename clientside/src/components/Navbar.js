import '../assets/components.css';
import '../assets/componentsResponsive.css';
import 'font-awesome/css/font-awesome.min.css';
import {useState} from 'react';

const Navbar = () => {
	const [cart, setCart] = useState({display : 'none'});
	const [user, setUser] = useState({display : 'none'});
	const handleClick = (element) => {
		if(element === 'cart'){
			if(cart.display === 'none'){
				if(user.display ==='block'){
					setUser({display : 'none'});
					setCart({display: 'block'});
				}else{
					setCart({display: 'block'});
				}
			}else{
				setCart({display : 'none'})
			}
		}else{
			if(user.display === 'none'){
				if(cart.display ==='block'){
					setCart({display : 'none'});
					setUser({display: 'block'});
				}else{
					setUser({display: 'block'});
				}
				setUser({display : 'block'})
			}else{
				setUser({display: 'none'});
			}
		}
	}
	
    return (
			<header className="header trans_300">
			<div className="top_nav">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="top_nav_left" style={{textAlign: 'center'}}>free shipping on all Morroco orders over 20 MAD</div>
						</div>
					</div>
				
				</div>
			</div>

			

			<div className="main_nav_container">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 text-right">
							<div className="logo_container">
								<a href="#">eBUY<span>store</span></a>
							</div>
							<nav className="navbar">
								<ul className="navbar_menu">
									<li><a href="/">home</a></li>
									<li><a href="/products">our products</a></li>
									<li><a href="#">about us</a></li>
									<li><a href="#">contact us</a></li>
								</ul>

								<ul className="navbar_user">
									<li className="checkout">
										<a href="#" onClick={()=>{handleClick('cart')}}>
											<i className="fa fa-shopping-cart" aria-hidden="true"></i>
											<span id="checkout_items" className="checkout_items">0</span>
										</a>
									</li>
									<li className=""><a href="#" onClick={()=>{handleClick('user')}}><i className="fa fa-user" aria-hidden="true"></i></a></li>
									{/* <li className=""><a href="#"><i className="fa fa-bars" aria-hidden="true"></i></a></li> */}

								</ul>

								<div className="cart-dropdown" style={cart}>
									<ul>
										<li className="product-small-desc">
											<a href="#">PRODUCT NAME</a>
											<span>QUANTITY : 1</span>
											<span>PRICE : 21$</span>
											<a id="close-cart" href="#">
												<i className="fa fa-times" aria-hidden="true"></i>
											</a>
										</li>
										<li className="product-small-desc">
											<a href="#">PRODUCT NAME</a>
											<span>QUANTITY : 1</span>
											<span>PRICE : 21$</span>
											<a id="close-cart" href="#">
												<i className="fa fa-times" aria-hidden="true"></i>
											</a>
										</li>
										<li className="product-small-desc">
											<a href="#">PRODUCT NAME</a>
											<span>QUANTITY : 1</span>
											<span>PRICE : 21$</span>
											<a id="close-cart" href="#">
												<i className="fa fa-times" aria-hidden="true"></i>
											</a>
										</li>
										<li className="product-small-desc">
											<p>SUMMARY</p>
											<span>NUMBER OF PRODUCTS : 4</span>
											<span>BILL : 21$</span>
											<div className="checkout-container" >
												<div className="red_button shop_now_button" ><a href="/products">GO TO CHECKOUT</a></div>
											</div>
										</li>

									</ul>
								</div>

								<div className="user-dropdown" style={user}>
								<ul>
										<li className="">
											<i className="fa fa-user" aria-hidden="true"></i>&nbsp;
											<a href="#">MY PROFILE</a>
										</li>
										<li className="">
											<i className="fa fa-sign-in" aria-hidden="true"></i>&nbsp;
											<a href="#">LOG IN</a>
											 
										</li>
										<li className="">
											<i className="fa fa-user-plus" aria-hidden="true"></i>&nbsp;
											<a href="#">REGISTER</a>
											 
										</li>
										<li className="">
											<i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp;
											<a href="#">LOG OUT</a>
										</li>
									</ul>
								</div>


								
							</nav>
						</div>
					</div>
				</div>
			</div>
			
		</header>
     );
}
 
export default Navbar;