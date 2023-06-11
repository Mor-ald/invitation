import "./Remained.css";
import {useEffect, useState} from "react";

const Remained = () => {
    const [finishTime] = useState(new Date("2023-09-09 12:30").getTime());
    const [[diffDays, diffH, diffM, diffS], setDiff] = useState([0, 0, 0, 0]);
    const [tick, setTick] = useState(false);

    function dayTitle(number: number) {
        if (number > 10 && [11, 12, 13, 14].includes(number%100)) return 'дней';
        const last_num = number%10;
        if (last_num == 1) return 'день';
        if ([2,3,4].includes(last_num)) return 'дня';
        if ([5,6,7,8,9, 0].includes(last_num)) return 'дней';
    }

    useEffect(()=> {
        const diff = (finishTime - new Date()) / 1000;
        if (diff < 0) return // время вышло
        setDiff([
            Math.floor(diff / 86400), // дни
            Math.floor((diff / 3600) % 24),
            Math.floor((diff / 60) % 60),
            Math.floor(diff % 60)
        ])
    }, [tick, finishTime]);

    useEffect(()=>{
        const timerID = setInterval(() => setTick(!tick), 1000);
        return () => clearInterval(timerID);
    }, [tick])

    return (
        <div className="remained">
            <div className="remained__photos">
                <img className={"remained_img"} src={"/p2.jpg"} alt={"remained photo"}/>
                <img className={"remained_img"} src={"/p4.jpg"} alt={"remained photo"}/>
            </div>
            <div className="remained__container">
                <div className="remained__date">Девятое сентября 2023</div>
                <div className="remained__text">До свадьбы осталось</div>
                <div className="remained__last_time">
                    <div className="remained__days">{diffDays} {dayTitle(Number(diffDays))}</div>
                    <hr className="remained__line"/>
                    <div className="remained__time">{diffH.toString().padStart(2, '0')}:{diffM.toString().padStart(2, '0')}:{diffS.toString().padStart(2, '0')}</div>
                </div>
            </div>
        </div>
    );
};

export default Remained;