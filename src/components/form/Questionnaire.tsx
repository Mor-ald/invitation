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
    const [selectedAlco, setSelectedAlco] = useState([]);
    const [yesChecked, setYesChecked] = useState(false);
    const [noChecked, setNoChecked] = useState(false);

    const alcohol = [
        {label: "Красное сухое вино", value: "Красное сухое вино"},
        {label: "Красное п/сл вино", value: "Красное п/сл вино"},
        {label: "Белое сухое", value: "Белое сухое"},
        {label: "Белое п/сл вино", value: "Белое п/сл вино"},
        {label: "Шампанское", value: "Шампанское"},
        {label: "Мартини", value: "Мартини"},
        {label: "Коньяк", value: "Коньяк"},
        {label: "Водка", value: "Водка"},
        {label: "Виски", value: "Виски"},
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

        const TOKEN = import.meta.env.VITE_APP_BOT_TOKEN;
        const CHAT_ID = import.meta.env.VITE_APP_CHAT_ID;
        const URL = `https://api.telegram.org/bot${ TOKEN }/sendMessage`;

        let message = `<b>Заполнение формы гостя</b>

<b>Фамилия и Имя</b>: ${name}
<b>Придет на свадьбу</b>: ${go}
`;
        if(selectedAlco.length !==0) message += `<b>Будет пить</b>: ${selectedAlco.join(", ")}`

        axios.post(URL, {
            chat_id: CHAT_ID,
            parse_mode: "html",
            text: message
        }).then(
            () => {
                setGo("");
                setName("");
                setSelectedAlco(null);
                setYesChecked(false);
                setNoChecked(false);
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
                            <input className="questionnaire__fieldset_item" checked={yesChecked} type="radio" name="go" value="Да" id="yes" onClick={() => {
                                setGo("Да");
                                setYesChecked(true);
                                setNoChecked(false);
                            }}/>
                            Да, с удовольствием!
                        </label>
                        <label htmlFor={"yes"}>
                            <input className="questionnaire__fieldset_item" checked={noChecked} type="radio" name="go" value="Нет" id="no" onClick={() => {
                                setGo("Нет");
                                setYesChecked(false);
                                setNoChecked(true);
                            }}/>
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
                        disabled={noChecked}
                    />
                </div>
                <Button className="questionnaire__button" label={"Отправить"} disabled={go === "" || name === ""}/>
            </form>
        </div>
    );
};

export default Questionnaire;