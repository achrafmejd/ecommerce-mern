import axios from 'axios';
import { useState, componentDidMount } from 'react';
import {useEffect} from 'react';
import { Link } from 'react-router-dom';
import {productsDB} from '../db/products.js';



const DisplayProducts = (props) => {


    return (
        <div className="container">
            <div className="row">

                <div className="products" style={{clear : 'both'}}>
                        { props.products && props.products.map(product=>
                            <div className="product">
                                <div className="product-image" style={{backgroundImage : 'url(./item.jpg)'}}></div>
                                <div className="add-to-cart">
                                    <Link to={{
                                        pathname: `/products/${product._id}`,
                                        state: product._id
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
    )
}


export default DisplayProducts;