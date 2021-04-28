import React, { useState, useEffect } from 'react';

function AuctionCountdownTime(){
    const[time, setTime] = useState("");
    useEffect(()=>{
        let countDownDate = new Date("Apr 27, 2021 20:08:00").getTime();
        let x = setInterval(function(){
            let nowTime = new Date().getTime();
            let gap = countDownDate - nowTime;

            let days    = Math.floor(gap / (1000 * 60 * 60 *24));
            let hours   = Math.floor((gap % (1000 * 60 * 60 *24))/(1000 * 60 *60));
            let minutes = Math.floor((gap %(1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((gap/(1000 * 60)) / 1000);

            setTime(days + "d" + hours + minutes + "m" + seconds + "s");

            if(gap < 0){
                clearInterval(x);
                setTime("Bid time out")
            }
        }, 1000)
    }, []);

    return <div>{time}</div>
}

export default AuctionCountdownTime;