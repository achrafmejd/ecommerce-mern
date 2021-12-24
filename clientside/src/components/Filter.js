const Filter = () => {
    return (
		<div className="products-filter">
                       <div className="sidebar_section"><h5>Category</h5></div>
                        <div className="navProducts">
                            <ul className="sidebar_categories">
                                <li className="active"><a href=""><span><i className="fa fa-angle-double-right" aria-hidden="true"></i></span>All Categories</a></li>
                                <li><a href="#">Phones</a></li>
                                <li><a href="#">TV</a></li>
                                <li><a href="#">Laptop</a></li>
                                <li><a href="#">Mouses</a></li>
                                <li><a href="#">Webcam</a></li>
                                <li><a href="#">Hard Disks</a></li>
                            </ul>
                            <button className="filter">
                                Filter
                            </button>
                        </div>
        </div>
	)
}
 
export default Filter;