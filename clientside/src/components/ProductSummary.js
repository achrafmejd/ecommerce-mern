import axios from 'axios';
import { useState } from 'react';
import {useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../assets/categories.css';
import '../assets/categoriesResponsive.css';
import {productsDB} from '../db/products.js';

const ProductSummary = () => {
    /* This is gonna be all our data coming from our server respecting the format used products.js file */
    const [dbProducts, setDbProducts] = useState(productsDB);
    /* By default the best seller button is clicked and we display the best seller products */
    const [products, setProducts] = useState(productsDB[0].productsBestSellersDB);
    /* These 2 lines below are used to control the style of the buttons Best sellers & New Arravals */
    const [buttonBS, setButtonBestSeller] = useState({color: '#FFFFFF',background: '#fe4c50'});
    const [buttonNA, setButtonNewArrivals] = useState({color : '', background: ''});
    /* We control the state when data is not fetched yet by default should be false */
    const [isPending, setPending] = useState(true);

   /* This will be used when fetching from db */  
    /*useEffect(()=>{
        axios.get('/products')
            .then((res)=>{
                console.log(res.data.products);
                setProducts(res.data.products);
                setPending(false);
            });
    }, []) */

    const handleClickButton = (element)=> {
            if(element=='BS'){
                /* Best seller Button is clicked */
                if(buttonBS.color == '' && buttonBS.background == ''){
                    /* if the other button of new arrivals is clicked */ 
                    if(buttonNA.background != '' && buttonNA.color != ''){
                        setButtonNewArrivals({color : '', background: ''});
                        setButtonBestSeller({color: '#FFFFFF',background: '#fe4c50'});
                        setProducts(productsDB[0].productsBestSellersDB);
                    }else{
                        setButtonBestSeller({color: '#FFFFFF',background: '#fe4c50'});
                    }
                }
            }else{
                /* New arrivals Button is clicked */
                if(buttonNA.color == '' && buttonNA.background == ''){
                    /* if the other button of best sellers is clicked */ 
                    if(buttonBS.background != '' && buttonBS.color != ''){
                        setButtonBestSeller({color: '',background: ''});
                        setButtonNewArrivals({color: '#FFFFFF',background: '#fe4c50'});
                        setProducts(productsDB[0].productsNewArrivalsDB);
                    }else{
                        setButtonBestSeller({color: '#FFFFFF',background: '#fe4c50'});
                    }
                }
            }
    }



    return ( 
        <section>
            <div className="new_arrivals">
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <div className="section_title new_arrivals_title">
                                <h2>OUR RECOMMENDATION </h2>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col text-center">
                            <div className="new_arrivals_sorting">
                                <ul className="arrivals_grid_sorting clearfix button-group filters-button-group">
                                    <li className="grid_sorting_button button d-flex flex-column justify-content-center align-items-center active is-checked" data-filter="" style={buttonBS} onClick={(e)=>handleClickButton('BS')}>Best Sellers</li>
                                    <li className="grid_sorting_button button d-flex flex-column justify-content-center align-items-center" data-filter="" style={buttonNA} onClick={(e)=>handleClickButton('NA')}>New Arrivals</li>
                                </ul>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                    { products && products.map(product=>
                        <div className="product">
                            <div className="product-image" style={{backgroundImage : 'url(./item.jpg)'}}></div>
                            <div className="add-to-cart">
                                <Link to={{
                                    pathname: `/product/${product._id}`,
                                    state: product
                                }}>
                                    <button className="add-to-cart-btn">More Details</button>
                                </Link>
                                {/* <a href={`/product/${product._id}`}>
                                </a> */}
                            </div>
                            <div className="product-info">
                                <div className="title-price">
                                    <h6>{product.title}</h6>
                                    <p>{product.price}.00$</p>
                                </div>
                            </div>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </section>
     );
}


export default ProductSummary;

