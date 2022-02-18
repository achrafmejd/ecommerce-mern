import Navbar from "../components/Navbar";
import Benefits from "../components/Benefits";
import Newsletter from "../components/Newsletter";
import '../assets/single.css';
import '../assets/mycss_single.css';
import {Link} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState , useEffect} from "react";
import Footer from "../components/Footer";
import axios from "axios"


const SingleProduct = () => {

	const [product, setProduct]=useState(null);
	const location = useLocation();
	const [quantity, setQuantity] = useState(1);
	const [myCart, setMyCart] = useState(JSON.parse(localStorage.getItem("myCart")) || [] );
	useEffect(()=>{
		axios.get(`/products/${location.state}`)
			/* .then((r)=>{
				r.json()
			}) */
			.then((r)=>{
				console.log(r.data)
				setProduct(r.data.product)
			})
			
	}, [])

	
	const increment= ()=>{
		if(quantity==product.quantity-1){
			return;
		}
		setQuantity(prev=>prev+1)
	}
	  
	const decrement=()=> {
		if(quantity==1){
			return;
		}
		setQuantity(prev=>prev-=1)
	  }

	useEffect(()=>{
		localStorage.setItem("myCart", JSON.stringify(myCart));
	}, [myCart])

	const updateCart = async (product, quantity)=>{
		if (myCart.some(e => e.title === product.title)) {
			/* cart contains already the product we want to add  */
			console.log('no')
			return;
		}else{
			/* cart contains already the product we want to add  */
			console.log('ok')
			product['quantityWanted']=quantity;
			await setMyCart([...myCart, product]);
		}
		window.location.reload()
	}
	const removeProduct = (product)=>{
		setMyCart([...myCart.filter((e)=>e._id !== product._id)])
		window.location.reload() 
		//console.log(myCart.filter((e)=>e._id !== product._id))
	}
	return (
        <div>
			{product && 
			
        <div className="singleProduct-grid">
            <div className="single_product_image">
			<img src='/item.jpg' width="90%" height="100%" alt="" />
			{/* <img src={product.image} width="90%" height="100%" alt="" /> */}
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
					<div className="original_price">{product.price+200}MAD</div>
					<div className="product_price">{product.price}MAD</div>
					<div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
						

						{
							myCart.some((p)=>p._id === product._id) === true ? 
								 <div className="red_button add_to_cart_button_p" style={{marginLeft: '0'}}><a  onClick={()=>removeProduct(product)}>remove from cart</a></div> :
								 <>
								<span>Quantity:</span>

								 <div className="quantity_selector">
									<span className="minus"><i className="fa fa-minus" aria-hidden="true" onClick={()=>decrement()}></i></span>
									<span id="quantity_value">{quantity}</span>
									<span className="plus"><i className="fa fa-plus" aria-hidden="true" onClick={()=>increment()}></i></span>
								</div>
								 <div className="red_button add_to_cart_button_p"><a  onClick={()=>updateCart(product, quantity)}>add to cart</a></div>
								 </>
						}
					</div>
				</div>
            </div>
        </div>
			}
        </div>
    );
}
 
export default SingleProduct;