import axios from 'axios';
import { useState } from 'react';
import {useEffect} from 'react';
import { Link } from 'react-router-dom';
const DisplayProducts = () => {

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
        //console.log('products',products);
        {/* {isPending && <div>Loading...</div>}
        {products && products.map(product=> */}
    return (
        <div className="products">
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

                    {/* Hadshi li hnaya gha zwaa9 */}
                    <div className="product"><div className="product-image"></div>
                    <div className="product-info"></div></div>
                    <div className="product"><div className="product-image"></div>
                    <div className="product-info"></div></div>
                    <div className="product"><div className="product-image"></div>
                    <div className="product-info"></div></div>
                    <div className="product"><div className="product-image"></div>
                    <div className="product-info"></div></div>
                    <div className="product"><div className="product-image"></div>
                    <div className="product-info"></div></div>
                    <div className="product"><div className="product-image"></div>
                    <div className="product-info"></div></div>
                    <div className="product"><div className="product-image"></div>
                    <div className="product-info"></div></div>
        </div>
    )
}
 
export default DisplayProducts;