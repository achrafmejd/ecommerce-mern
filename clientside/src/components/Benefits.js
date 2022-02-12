const Benefits = () => {
    return ( 
	<div className="benefit" style={{
        marginTop : '30px'
    }}>
    <div className="container">
        <div className="row">
            <div className="col text-center">
            <div className="section_title new_arrivals_title">
                    <h2>OUR BENEFITS</h2>
                </div>
            </div>
        </div>
        <div className="row benefit_row" style={{marginTop: '3em', marginBottom: '3em'}}>
            <div className="col-lg-3 benefit_col">
                <div className="benefit_item d-flex flex-row align-items-center">
                    <div className="benefit_icon"><i className="fa fa-truck" aria-hidden="true"></i></div>
                    <div className="benefit_content">
                        <h6>free shipping</h6>
                        <p>Suffered Alteration in Some Form</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 benefit_col">
                <div className="benefit_item d-flex flex-row align-items-center">
                    <div className="benefit_icon"><i className="fa fa-money" aria-hidden="true"></i></div>
                    <div className="benefit_content">
                        <h6>cach on delivery</h6>
                        <p>The Internet Tend To Repeat</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 benefit_col">
                <div className="benefit_item d-flex flex-row align-items-center">
                    <div className="benefit_icon"><i className="fa fa-undo" aria-hidden="true"></i></div>
                    <div className="benefit_content">
                        <h6>45 days return</h6>
                        <p>Making it Look Like Readable</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 benefit_col">
                <div className="benefit_item d-flex flex-row align-items-center">
                    <div className="benefit_icon"><i className="fa fa-clock-o" aria-hidden="true"></i></div>
                    <div className="benefit_content">
                        <h6>opening all week</h6>
                        <p>8AM - 09PM</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
     );
}
 
export default Benefits;