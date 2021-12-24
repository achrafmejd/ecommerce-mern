const Breadcrumb = () => {
    return (
        <div className="products-breadcrumb">
                        <ul>
					        <li><a href="index.html">Home</a></li>
				            <li className="active"><a href="index.html"><i className="fa fa-angle-right" aria-hidden="true"></i>All Products</a></li>
			            </ul>
        </div>
    );
}
 
export default Breadcrumb;