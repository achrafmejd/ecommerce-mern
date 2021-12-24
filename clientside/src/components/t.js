import '../assets/components.css';
import '../assets/componentsResponsive.css';
import 'font-awesome/css/font-awesome.min.css';

const Navbar = () => {
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
								<li><a href="#">home</a></li>
								<li><a href="#">our products</a></li>
								<li><a href="#">about us</a></li>
								<li><a href="#">contact us</a></li>
							</ul>

							<ul className="navbar_user">
								<li><a href="#"><i className="fa fa-search" aria-hidden="true"></i></a></li>
								<li className="checkout">
									<a href="#">
										<i className="fa fa-shopping-cart" aria-hidden="true"></i>
										<span id="checkout_items" className="checkout_items">2</span>
									</a>
								</li>
								<li className=""><a href="#"><i className="fa fa-bars" aria-hidden="true"></i></a></li>
							</ul>
							
						</nav>
					</div>
				</div>
			</div>
		</div>
    </header>
     );
}
 
export default Navbar;