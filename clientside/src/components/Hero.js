import '../assets/components.css';
import '../assets/componentsResponsive.css';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

const Hero = () => {
	
    return (
    <div className="main_slider" style={{backgroundImage: "url(/hero.jpg)"}}>
		<div className="container fill_height">
			<div className="row align-items-center fill_height">
				<div className="col">
					<div className="main_slider_content">
						<h6>TECH / NEW ARRIVALS 2022</h6>
						<h1>Get up to 30% Off New Arrivals</h1>
						<div className="hero-nav-container">
													
							<input type="text"  placeholder="What are you looking for ?"/>
							<div className="red_button shop_now_button"><a href="/products">shop now</a></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    );
}
 
export default Hero;