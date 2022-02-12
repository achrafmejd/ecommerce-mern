import Navbar from '../components/Navbar';
import '../assets/categories.css';
import '../assets/categoriesResponsive.css';
import Breadcrumb from '../components/Breadcrumb';
import Sidebar from '../components/Sidebar';
import DisplayProducts from '../components/DisplayProducts';
import Filter from '../components/Filter';
import Benefits from '../components/Benefits';
import '../assets/mycss.css';
import '../assets/mycssResponsive.css';

const Products = () => {
    return (
        <div className="">
            <Navbar />
            <div className="productPage">
                <div className="products-nav">
                    <Breadcrumb />
                    <Filter />
                </div>
                <DisplayProducts />
                <div className="benefits">
                    <h5>Benefits of buying our products</h5>
                    <Benefits />
                </div>
            </div>
        </div>
    )
}
 
export default Products;
            