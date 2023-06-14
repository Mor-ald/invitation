import "./Questionnaire.css";
import { MultiSelect } from 'primereact/multiselect';
import React, {useCallback, useRef, useState} from "react";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Toast} from "primereact/toast";
import axios from "axios";

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
    const toast = useRef<Toast>(null);

    const showInfo = useCallback((toast: React.RefObject<Toast>, summary: string, detail: string) => {
        toast.current?.show({severity: "info", summary: summary, detail: detail});
    }, []);

    const showError = useCallback((toast: React.RefObject<Toast>, summary: string, detail: string) => {
        toast.current?.show({severity: "error", summary: summary, detail: detail});
    }, []);

    const sendData = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const TOKEN = process.env.REACT_APP_BOT_TOKEN;
        const CHAT_ID = process.env.REACT_APP_CHAT_ID;
        const URL = `https://api.telegram.org/bot${ TOKEN }/sendMessage`;
        const itemData = {
            nameGuest: name,
            goTo: go,
        };

        if (selectedAlco) itemData["alco"] = selectedAlco.map((item) => item.label).join(", ")

        const message = `<b>Заполнение формы гостя</b>
<b>Фамилия и Имя</b>: ${itemData.nameGuest}.
<b>Придет на свадьбу</b>: ${itemData.goTo}.
<b>Будет пить</b>: ${itemData["alco"]}.
        `;

        axios.post(URL, {
            chat_id: CHAT_ID,
            parse_mode: "html",
            text: message
        }).then(
            () => {
                setGo("");
                setName("");
                setSelectedAlco(null);
                return showInfo(toast, "Заполнение формы", "Данные были отправлены!");
            }
        ).catch(
            () => {
                return showError(toast, "Заполнение формы", "Данные не были отправлены! :(");
            }
        );


    }, [name, go, selectedAlco, showInfo, showError]);


    return (
        <div className="questionnaire">
            <Toast ref={toast}></Toast>
            <h5>АНКЕТА ГОСТЯ</h5>
            <div className="questionnaire__text">
                Пожалуйста, чтобы всё прошло идеально, ответьте на несколько вопросов в анкете:
            </div>
            <form className="questionnaire__form" onSubmit={sendData}>
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
                        autoComplete="off"
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