import { useState , useEffect} from 'react';
import { Button, Modal, Form, Row, Col, InputGroup, FormControl, Toast, Spinner} from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import DisplayProducts from './DisplayProducts';
import {productsDB} from '../db/products.js';
import axios from 'axios';

import {Link} from 'react-router-dom';
const selectOption = {
  marginLeft : '5em',
  fontSize: '0.8rem',
  color: '#4a4a4a',
  padding: '7px 1.6rem',
  background: 'transparent',
  fontWeight: '700',
  border: '1px solid #e1e1e1',
  backgroundImage: 'linear-gradient(45deg,transparent 50%,#e1e1e1 0),linear-gradient(135deg,#e1e1e1 50%,transparent 0),linear-gradient(90deg,#e1e1e1,#e1e1e1)',
  backgroundPosition: 'calc(100% - 20px) calc(1em + 2px),calc(100% - 15px) calc(1em + 2px),calc(100% - 3.2em) 0.2em',
  backgroundSize: '5px 5px,5px 5px,1px 1.8em',
  backgroundRepeat: 'no-repeat',
  width: '15%'
}

const title = {
  marginLeft : '1.5em',
  marginBottom : '1.5em'
} 

const Filter = () => {
    const [products, setProducts] = useState(null);
    const [tempProducts, setTempProducts] = useState(null);
    const [isPending, setPending] = useState(true);
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [categories, setCategories ] = useState(null);

    useEffect(()=>{
      axios.get('/products')
          .then((res)=>{
              console.log(res.data.products);
              setProducts(res.data.products);
              setPending(false);
              console.log(products)
          });
      }, [])
    
    useEffect(()=>{
      const temp = []
        products && products.map((element)=>{
        temp.push(Object.values(element)[4])
     });
     temp.unshift('Category');
     setCategories([...temp]);
    }, [products])

    /* const handleCategory = (CATEGORY_VALUE) =>{
      if(CATEGORY_VALUE !== 'Category'){
        alert(CATEGORY_VALUE);
        let p = [];
        products.filter((product)=> product.category == category)
        setProducts([...p])
        console.log(products)
      }
    } */

    const handleSortBy = (SORT_VALUE) =>{
      if(SORT_VALUE == 'priceDesc'){
        setProducts([...products.sort((a,b)=>b.price - a.price)]);
      }else{
        setProducts([...products.sort((a,b)=>a.price - b.price)])
      }
    }
    const handleCategory = (CATEGORY_VALUE) =>{
      setProducts([...products.filter((product)=>product.category === CATEGORY_VALUE)])
      console.log(products)
    }

    const  [text, setText] = useState('');
    const [sugg, setSugg] = useState([]);

    const onChangeHandler = (text) =>{
      let matches = []
      if(text.length >0){
          matches = products.filter((dt)=>{
              const regex = new RegExp(`${text}`, "gi");
              return dt.title.match(regex);
          })
      }
      console.log(matches);
      setSugg(matches);
      setText(text);
  }

    return (
		      <div className="products-filter">

            <div className="container">
              <div className="row">
                <h6 style={title}>Filter the products :</h6>
                <InputGroup className="mb-3" style={{width : '100%'}}>
                    <select style={selectOption} onChange={(e)=>handleCategory(e.target.value)}>
                        <>
                        {categories && categories.map((categ)=>{
                          return(
                            <option value={categ}>{categ}</option>                     
                          )
                        })}
                        </>
                    </select>
                    <select style={selectOption} onChange={(e)=>handleSortBy(e.target.value)}> 
                      <option value="">Sort By</option>
                      <option value="priceDesc">Price High - Low</option>
                      <option value="priceAsc">Price Low - High</option>
                    </select>
                  <FormControl
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Search By Product Name"
                      style={{  marginLeft : '5em', marginRight: '1.5em'}}
                      value={text}
                      onChange={(e)=>{onChangeHandler(e.target.value)}}
                    />
                    <div className='s-container' style={{
                        position: 'absolute',
                        width: '51%',display: 'flex',
                        flexDirection: 'column',
                        right: '2.8%',
                        top: '100%',
                        zIndex: 2,
                        
                    }}>
                            {
                                sugg && sugg.map((s, i)=>{
                                        return(
                                            <Link key={s.idMeal} className="sugg-container" to={{
                                                pathname : '/products/'+s.idMeal,
                                                state: s
                                            }}
                                            style={{
                                              backgroundColor: 'white',
                                              padding: '10px',
                                              color: 'black',
                                              padding: '5px',
                                              height: '40px',
                                              textDecoration: 'none',
                                              positon: 'absolute',
                                              top: '25%',
                                              borderBottom: '1px solid grey'
                                            }}>{s.title} - {s.category } - {s.price} MAD</Link>
                                       )
                                })
                            }
                        </div>
                </InputGroup>
                
            
              </div>
            </div>

            {isPending ? <div className="container" style={{padding:'40px',display: 'flex', justifyContent: 'space-around', height: '800px', position: 'relative'}}><div className="row"><Spinner animation="border" variant="danger" style={{position: 'absolute', top:'50%'}}/></div></div> : <DisplayProducts products={products} /> }
            {/* <DisplayProducts pending={isPending} products={products} /> */}
          </div>
	)
}
 
export default Filter;