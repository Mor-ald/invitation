import "./Dress.css";

const Dress = () => {
    const dressCodeLady = ["#f2eadf", "#fbded6", "#d89d8f", "#e8c6bc", "#e1b5ac", "#d2c1b1"];
    const dressCodeMan = ["#08080A", "#55585d", "#A9A9A9", "#9C958A"];

    return (
        <div className="dress-code">
            <h5>DRESS CODE</h5>
            <div className="dress-code__text">
                Мы очень хотим, чтобы вы поддержали атмосферу нашего праздника своим хорошим настроением, улыбками и нарядами. <br></br>
                Цветовая гамма нашей свадьбы
            </div>
            <div className="dress-code__who">Леди:</div>
            <div className="dress-code__container">
                {dressCodeLady.map(item => (<div className="dress-code_item" style={{background: item, boxShadow: `2px 2px 10px 0px ${item}`}}></div>))}
            </div>
            <div className="dress-code__who">Джентельмены:</div>
            <div className="dress-code__container">
                {dressCodeMan.map(item => (<div className="dress-code_item" style={{background: item, boxShadow: `2px 2px 10px 0px ${item}`}}></div>))}
            </div>
        </div>
    );
};

export default Dress;