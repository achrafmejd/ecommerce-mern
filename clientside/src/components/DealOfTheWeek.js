import React, { useEffect, useState } from "react";

const DealOfTheWeek = () => {
    
    const calculateTimeLeft = () => {
        let year = new Date().getFullYear();
        const difference = +new Date(`${year}-10-1`) - +new Date();
        let timeLeft = {};
    
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
    
        return timeLeft;
      };
    
      const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    
      useEffect(() => {
        const timer = setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 5000);

        return () => clearTimeout(timer);
      });
    
      const timerComponents = [{}];
      const keys = Object.keys(timeLeft); 
      const values = Object.values(timeLeft);
    
      Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
          return;
        }
        
            keys.forEach((key)=>{
                Object.assign(timerComponents[0], { [key] : 0});
            })
          
    
        values.forEach((value, index)=>{
                timerComponents[0][keys[index]] = value;
          })
          
      });

      
    return ( 
        
        <div class="deal_ofthe_week">
            
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <div class="deal_ofthe_week_img">
                            <img src="/Shop.png" alt="" />
                        </div>
                    </div>
                    <div class="col-lg-6 text-right deal_ofthe_week_col">
                        <div class="deal_ofthe_week_content d-flex flex-column align-items-center float-right">
                            <div class="section_title">
                                <h2>Deal Of The Week</h2>
                            </div>
                            
                            {timerComponents.length != 0 ? 
                                <ul class="timer">
                                    <li class="d-inline-flex flex-column justify-content-center align-items-center">
                                        <div id="day" class="timer_num">{timerComponents[0].days}</div>
                                        <div class="timer_unit">Day</div>
                                    </li>
                                    <li class="d-inline-flex flex-column justify-content-center align-items-center">
                                        <div id="hour" class="timer_num">{timerComponents[0].hours}</div>
                                        <div class="timer_unit">Hours</div>
                                    </li>
                                    <li class="d-inline-flex flex-column justify-content-center align-items-center">
                                        <div id="minute" class="timer_num">{timerComponents[0].minutes}</div>
                                        <div class="timer_unit">Mins</div>
                                    </li>
                                    <li class="d-inline-flex flex-column justify-content-center align-items-center">
                                        <div id="second" class="timer_num">{timerComponents[0].seconds}</div>
                                        <div class="timer_unit">Sec</div>
                                    </li> 
                                </ul>
                            
                            : <span>Time's up!</span>}
                                
                            <div className="red_button shop_now_button"><a href="/products">shop now</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default DealOfTheWeek;