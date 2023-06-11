import "./Time.css";
import { Timeline } from 'primereact/timeline';


const Time = () => {
    const events = [
        { text: 'трансфер до банкетной площадки', time: '13.30'},
        { text: 'welcome', time: '14.30'},
        { text: 'начало банкета ', time: '15:15'},
        { text: 'свадебный торт', time: '19:30'},
        { text: 'завершение вечера', time: '22:00'},

    ];

    const customizedContent = (item) => {
        return (
          <div className="event">
              <span className="event__time">{item.time}</span>
              &nbsp;–&nbsp;
              <span className="event__text">{item.text}</span>
          </div>
        );
    };

    return (
        <div className="time">
            <h5>ТАЙМИНГ</h5>
            <div className="time-container">
                <Timeline value={events} content={customizedContent}/>
            </div>

        </div>
    );
};

export default Time;