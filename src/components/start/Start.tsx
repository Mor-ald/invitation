import './Start.css'

const Start = () => {
    return (
        <div className="start">
            <img className="start__background" src="/start.png" alt={"start background photo"}/>
            <div className="start__container">
                <div className="start__logo">A&A</div>
                <div className="start__text_container">
                    <div className="start__welcome">Дорогие гости!</div>
                    <div className="start__date">09.09.2023</div>
                    <div className="start__text">
                    <span>
                        Мы будем рады разделить с вами неповторимый для нас день - день нашей свадьбы!
                        Приглашаем присоединиться к нашему празднику и украсить его своим присутствием!
                    </span>
                    </div>
                    <div className="start__additional">
                        <span>Сбор гостей: <span className="start__time">12:30</span></span>
                        <span>Адрес: <a className="start__address" href="https://yandex.ru/maps/org/dvorets_brakosochetaniya_1/1311913400/?ll=30.293878%2C59.933961&z=17">Дворец Бракосочетания №1, Английская наб., 28</a></span>
                        <span>С любовью, ваши:</span>
                    </div>
                    <div className="start__grooms">
                        <span>Алексей и Алина</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Start;