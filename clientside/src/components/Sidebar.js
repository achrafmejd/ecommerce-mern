const Sidebar = () => {
    return ( 
        <div className="sidebar" style={{
            flex: '0 1 20%'
        }}>
					<div className="sidebar_section">
						<div className="sidebar_title">
							<h5>Product Category</h5>
						</div>

						<ul className="sidebar_categories">
                        <li className="active"><a href="#"><span><i className="fa fa-angle-double-right" aria-hidden="true"></i> </span>All</a></li>
							<li><a href="#">Phones</a></li>
							<li className="">
                                <a href="#">
                                    TV
                                </a>
                            </li>
							<li><a href="#">Laptop</a></li>
							<li><a href="#">Mouses</a></li>
							<li><a href="#">Webcam</a></li>
							<li><a href="#">Hard Disks</a></li>
						</ul>
					</div>
				</div>
     );
}
 
export default Sidebar;