import Navbar from "./components/Navbar";
import Benefits from "./components/Benefits";
import './assets/single.css';
import './assets/mycss_single.css';
import {Link} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState , useEffect} from "react";
import Footer from "./components/Footer";


const SingleProduct = () => {
	const [product, setProduct]=useState(null);
	const location = useLocation();
	useEffect(()=>{
		setProduct(location.state);
	}, [])
	return (
        <div>
            <Navbar />
			{product && 
			
        <div className="singleProduct-grid">
            <div className="single_product_image">
                <img src={product.image} width="90%" height="100%" alt="" />
            </div>
            <div className="single_product_description">
            <div className="product_details">
					<div className="product_details_title">
						<h2>{product.title}</h2>
						<p>{product.description}</p>
					</div>
					<div className="free_delivery d-flex flex-row align-items-center justify-content-center">
						<span className="ti-truck"></span><span>free delivery</span>
					</div>
					<div className="original_price">${product.price+200}</div>
					<div className="product_price">${product.price}</div>
					<ul className="star_rating">
						<li><i className="fa fa-star" aria-hidden="true"></i></li>
						<li><i className="fa fa-star" aria-hidden="true"></i></li>
						<li><i className="fa fa-star" aria-hidden="true"></i></li>
						<li><i className="fa fa-star" aria-hidden="true"></i></li>
						<li><i className="fa fa-star-o" aria-hidden="true"></i></li>
					</ul>
					<div className="product_color">
						<span>Select Color:</span>
						<ul>
							<li style={{background: '#e54e5d'}}></li>
							<li style={{background: '#252525'}}></li>
							<li style={{background: '#60b3f3'}}></li>
						</ul>
					</div>
					<div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
						<span>Quantity:</span>
						<div className="quantity_selector">
							<span className="minus"><i className="fa fa-minus" aria-hidden="true"></i></span>
							<span id="quantity_value">1</span>
							<span className="plus"><i className="fa fa-plus" aria-hidden="true"></i></span>
						</div>
						<div className="red_button add_to_cart_button_p"><a href="#">add to cart</a></div>
						<div className="product_favorite d-flex flex-column align-items-center justify-content-center"></div>
					</div>
				</div>
            </div>
        </div>
			}
        <Benefits />
	
        </div>
    );
}
 
export default SingleProduct;