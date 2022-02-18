import axios from 'axios';
import { useState } from 'react';
import {useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../assets/categories.css';
import '../assets/categoriesResponsive.css';
import {productsDB} from '../db/products.js';
import 'animate.css';


const ProductSummary = () => {
    /* This is gonna be all our data coming from our server respecting the format used products.js file */
    const [dbProducts, setDbProducts] = useState(null);
    /* By default the best seller button is clicked and we display the best seller products */
    const [products, setProducts] = useState(null);
    /* These 2 lines below are used to control the style of the buttons Best sellers & New Arravals */
    const [buttonBS, setButtonBestSeller] = useState({color: '#FFFFFF',background: '#fe4c50'});
    const [buttonNA, setButtonNewArrivals] = useState({color : '', background: ''});
    /* We control the state when data is not fetched yet by default should be false */
    const [isPending, setPending] = useState(true);

    /* This will be used when fetching from db */  
    useEffect(()=>{
        axios.get('http://localhost:3001')
            .then((res)=>{
                setDbProducts(res.data[0]);
            })
    }, [])

    useEffect(()=>{
        if(dbProducts != null){
            console.log('DB PRODUCTS CHANGED ')
            console.log(dbProducts)
            setProducts(dbProducts.popularProducts)

        }else{
            console.log('not cnaged')
        }

    }, [dbProducts])


    
    console.log('ALL DATA', dbProducts);
    console.log('BUTTON DATA first', products);
    //console.log('BUTTON DATA sedonc', dbProducts.sortedProducts)
    const handleClickButton = (element)=> {
            if(element=='BS'){
                /* Best seller Button is clicked */
                if(buttonBS.color == '' && buttonBS.background == ''){
                    /* if the other button of new arrivals is clicked */ 
                    if(buttonNA.background != '' && buttonNA.color != ''){
                        setButtonNewArrivals({color : '', background: ''});
                        setButtonBestSeller({color: '#FFFFFF',background: '#fe4c50'});
                        setProducts(dbProducts.popularProducts);
                        //console.log(dbProducts.popularProducts)
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
                        setProducts(dbProducts.sortedProducts);
                        //console.log(dbProducts[0].sortedProducts)
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


                    <div className="row ">
                    { products && products.map(product=>
                        <div  className="product animate__backOutLeft">
                            <div className="product-image" style={{backgroundImage : 'url(./item.jpg)'}}></div>
                            <div className="add-to-cart">
                                <Link to={{
                                    pathname: `/products/${product._id}`,
                                    state: product
                                }}>
                                    <button className="add-to-cart-btn">More Details</button>
                                </Link>
                            </div>
                            <div className="product-info">
                                <div className="title-price">
                                    <h6>{product.title}</h6>
                                    <p>{product.price}.00$</p>
                                    <p>Add</p>
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

