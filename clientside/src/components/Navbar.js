import '../assets/components.css';
import '../assets/componentsResponsive.css';
import 'font-awesome/css/font-awesome.min.css';
import {useState} from 'react';
import OffCanvasExample from './OffCanvasExample';
import { Link } from 'react-router-dom';

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
								<Link to="/">eBUY<span>store</span></Link>
							</div>
							<nav className="navbar">
								<ul className="navbar_menu">
									<li><Link to="/">home</Link></li>
									<li><Link to="/products">our products</Link></li>
									<li><a href="#">about us</a></li>
									<li><a href="#">contact us</a></li>
								</ul>

								<ul className="navbar_user">

									<OffCanvasExample key={0} placement={'end'} name={'end'}/>
									<li className=""><a href="#" onClick={()=>{handleClick('user')}}><i className="fa fa-user" aria-hidden="true"></i></a></li>

								</ul>


								<div className="user-dropdown" style={user}>
								<ul>
										<li className="">
											<i className="fa fa-user" aria-hidden="true"></i>&nbsp;
											<a href="/dashboard">My Dashboard</a>
										</li>
										{/* <li className="">
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
										</li> */}
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