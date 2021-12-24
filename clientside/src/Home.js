import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ProductSummary from './components/ProductSummary';

const Home = () => {
    return ( 
        <div>
            <Navbar />
            <Hero />
            <ProductSummary />
        </div>
     );
}
 
export default Home;