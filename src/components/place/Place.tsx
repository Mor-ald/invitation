import "./Place.css";

const Place = () => {
  return (
      <div className="place">
          <h5>МЕСТО ПРОВЕДЕНИЯ</h5>
          <div className="place__container">
              <img className="place__photo" src="/place.png" alt="place photo"/>
              <div className="place__text_container">
                  <div className="place__name">Парк-отель <br></br> «Levada»</div>
                  <div className="place__address">
                      Адрес: <br/>
                      <a href="https://yandex.ru/maps/10174/saint-petersburg-and-leningrad-oblast/house/kottedzhny_posyolok_dranishniki_uch2/Z0kYdAFlTkwBQFhqfX1zd35qbA==/?ll=30.271808%2C60.125287&z=15.9">уч2, коттеджный посёлок Дранишники</a>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Place;