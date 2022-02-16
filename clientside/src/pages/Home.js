import Benefits from '../components/Benefits';
import DealOfTheWeek from '../components/DealOfTheWeek';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import ProductSummary from '../components/ProductSummary';
import {useEffect} from 'react';



const Home = () => {
    useEffect(()=>{
        localStorage.setItem("myCart", JSON.stringify([]));
    }, [])
    return ( 
        <div>
            <Navbar />
            <Hero />
            <ProductSummary />
            <DealOfTheWeek />
            <Benefits />
            <Newsletter />
            <Footer />
        </div>
     );
}
 
export default Home;