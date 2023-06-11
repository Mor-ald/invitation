import "./Questionnaire.css";
import {InputText} from "primereact/inputtext";
import { MultiSelect } from 'primereact/multiselect';
import {useState} from "react";
import {Button} from "primereact/button";

const Questionnaire = () => {
    const [go, setGo] = useState("");
    const [name, setName] = useState("");
    const [selectedAlco, setSelectedAlco] = useState(null)
    const alcohol = [
        {label: "Красное сухое вино", value: "dry red wine"},
        {label: "Красное п/сл вино", value: "semi-sweet red wine"},
        {label: "Белое сухое", value: "dry white wine"},
        {label: "Белое п/сл вино", value: "semi-sweet white wine"},
        {label: "Шампанское", value: "champagne"},
        {label: "Мартини", value: "martini"},
        {label: "Коньяк", value: "cognac"},
        {label: "Водка", value: "vodka"},
        {label: "Виски", value: "whiskey"},
    ];


    return (
        <div className="questionnaire">
            <h5>АНКЕТА ГОСТЯ</h5>
            <div className="questionnaire__text">
                Пожалуйста, чтобы всё прошло идеально, ответьте на несколько вопросов в анкете:
            </div>
            <form className="questionnaire__form">
                <div className="questionnaire__item">
                    <span>
                        Планируете ли Вы присутствовать на свадьбе?
                    </span>
                    <fieldset className="questionnaire__fieldset">
                        <label htmlFor={"yes"}>
                            <input className="questionnaire__fieldset_item" type="radio" name="go" value="Да" id="yes" onClick={() => setGo("Да")}/>
                            Да, с удовольствием!
                        </label>
                        <label htmlFor={"yes"}>
                            <input className="questionnaire__fieldset_item" type="radio" name="go" value="Нет" id="no" onClick={() => setGo("Нет")}/>
                            К сожалению, не смогу
                        </label>
                    </fieldset>
                </div>
                <div className="questionnaire__item">
                    <label htmlFor={"name"}>
                        Ваша фамилия и имя:
                    </label>
                    <InputText
                        className="questionnaire__name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={"Морозов Алексей, Морозова Алина"}
                        autocomplete="off"
                        required
                    />
                </div>
                <div className="questionnaire__item">
                    <label htmlFor={"alco"}>
                        Уточните ваши предпочтения в алкоголе, выбрав один или несколько вариантов:
                    </label>
                    <MultiSelect
                        className="questionnaire__alco"
                        value={selectedAlco}
                        options={alcohol}
                        onChange={(e) => setSelectedAlco(e.value)}
                        placeholder="Выберите напитки"
                        display={"chip"}
                    />
                </div>
                <Button className="questionnaire__button" label={"Отправить"} disabled={go === "" || name === ""}/>
            </form>
        </div>
    );
};

export default Questionnaire;