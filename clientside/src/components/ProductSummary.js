import axios from 'axios';
import { useState } from 'react';
import {useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../assets/categories.css';
import '../assets/categoriesResponsive.css';

const ProductSummary = () => {

    const [products, setProducts] = useState(null);
    const [isPending, setPending] = useState(true);
    useEffect(()=>{
        axios.get('/products')
            .then((res)=>{
                console.log(res.data.products);
                setProducts(res.data.products);
                setPending(false);
            });
    }, [])



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
                                    <li className="grid_sorting_button button d-flex flex-column justify-content-center align-items-center active is-checked" data-filter="">Best Sellers</li>
                                    <li className="grid_sorting_button button d-flex flex-column justify-content-center align-items-center" data-filter="">New Arrivals</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                            { products && products.map(product=>
                                <div className="product">
                                    <div className="product-image" ></div>
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
                    <div className="product"><div className="product-image"></div>
                    <div className="product-info"></div></div>
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default ProductSummary;