import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import italia from '../geography';

import SelectComponent from "./SelectComponent";


const Form = (props) => {

    const navigate= useNavigate();

    const [nome, setNome] = useState();
    const [indirizzo, setIndirizzo] = useState();
    const [cap, setCap] = useState();
    const [città, setCittà] = useState();
    const [provincia, setProvincia] = useState();
    const [regione, setRegione] = useState();
    const [email, setEmail] = useState();
    const [telefono, setTelefono] = useState();
    const [telefonoReferente, setTelefonoReferente] = useState();
    const [nomeReferente, setNomeReferente] = useState();
    const [contattato, setContattato] = useState();
    const [ultimoContatto, setUltimoContatto] = useState()
    const [cliente, setCliente] = useState();
    const [compra, setCompra] = useState();
    const [buste, setBuste] = useState();
    const [sfuso, setSfuso] = useState();
    const [note, setNote] = useState();


    const submit = (e) => {
        e.preventDefault();
        const shop = {
            nome, indirizzo, cap, città, provincia, regione, email, telefono, telefonoReferente, nomeReferente, contattato, ultimoContatto, cliente, compra, buste, sfuso, note
        }
        props.submit(e, shop);
    }

    /** 
     * This function fixes a problem I was having with MySQL that I couldn't fix on the server side, in which every date sent back from the server would go back 1 day.
     * Takes a date and after a series of conditional statements adds 1 day.
     * @param  {date}  date
     * @return  {date}  newDate
     */
    const fixDate = (date) => {
        let subDate = date.substring(0, 10);
        let lastDayString = subDate.slice(8);
        let lastDayInt = parseInt(lastDayString);
        const month = subDate.slice(5, 7)
        if (month === '02') {
            if (lastDayInt === 28) {
                const newDay = '01';
                const newMonth = '03';
                const year = date.substring(0, 4);
                const newDate = `${year}-${newMonth}-${newDay}`;
                return newDate;
            } else {
                lastDayInt += 1;
                let newDayString = lastDayInt.toString();
                if (newDayString.length === 1) {
                    newDayString = '0' + newDayString;
                }
                let newSubDate = subDate.substring(0, 8);
                let newDate = newSubDate.concat('', newDayString);
                return newDate;
            }
        } else if (month === '12') {
            if (lastDayInt === 31) {
                const newDay = '01';
                const newMonth = '01';
                const year = date.substring(0, 4);
                let yearInt = parseInt(year);
                yearInt += 1;
                const newYearString = yearInt.toString()
                const newDate = `${newYearString}-${newMonth}-${newDay}`;
                return newDate;
            } else {
                lastDayInt += 1;
                let newDayString = lastDayInt.toString();
                if (newDayString.length === 1) {
                    newDayString = '0' + newDayString;
                }
                let newSubDate = subDate.substring(0, 8);
                let newDate = newSubDate.concat('', newDayString);
                return newDate;
            }
        } else if (month === '11' || month === '09') {
            if (lastDayInt === 30) {
                const newDay = '01';
                const month = date.substring(5, 7);
                let monthInt = parseInt(month);
                monthInt += 1;
                const monthString = monthInt.toString();
                let year = date.substring(0, 4);
                const newDate = `${year}-${monthString}-${newDay}`;
                return newDate;
            } else {
                lastDayInt += 1;
                let newDayString = lastDayInt.toString();
                if (newDayString.length === 1) {
                    newDayString = '0' + newDayString;
                }
                let newSubDate = subDate.substring(0, 8);
                let newDate = newSubDate.concat('', newDayString);
                return newDate;
            }
        } else if (month === '04' || month === '06') {
            if (lastDayInt === 30) {
                const newDay = '01';
                const month = date.substring(5, 7);
                let monthInt = parseInt(month);
                monthInt += 1;
                const monthString = monthInt.toString();
                const newMonthString = '0' + monthString;
                let year = date.substring(0, 4);
                const newDate = `${year}-${newMonthString}-${newDay}`;
                return newDate;
            } else {
                lastDayInt += 1;
                let newDayString = lastDayInt.toString();
                if (newDayString.length === 1) {
                    newDayString = '0' + newDayString;
                }
                let newSubDate = subDate.substring(0, 8);
                let newDate = newSubDate.concat('', newDayString);
                return newDate;
            }
        } else {
            if (lastDayInt === 31) {
                const newDay = '01';
                const month = date.substring(5, 7);
                let monthInt = parseInt(month);
                monthInt += 1;
                let monthString = monthInt.toString();
                if (monthString.length === 1) {
                    monthString = '0' + monthString;
                }
                let year = date.substring(0, 4);
                const newDate = `${year}-${monthString}-${newDay}`;
                return newDate;
            } else {
                lastDayInt += 1;
                let newDayString = lastDayInt.toString();
                if (newDayString.length === 1) {
                    newDayString = '0' + newDayString;
                }
                let newSubDate = subDate.substring(0, 8);
                let newDate = newSubDate.concat('', newDayString);
                return newDate;
            }
        }          
    }

    /** 
     * On render checks for the update prop, if it's true calls the getShop function
     * with the given id and assigns the shop values to the component state which will be assigned to the form inputs values
     */
    useEffect(() => {
        if (props.update) {
            props.getShop(props.id)
            .then(res => {
                if (res !== null) {
                    setNome(res[0].nome);
                    setIndirizzo(res[0].indirizzo);
                    setCap(res[0].cap);
                    setCittà(res[0].città);
                    setProvincia(res[0].provincia);
                    setRegione(res[0].regione);
                    setEmail(res[0].email);
                    setTelefono(res[0].telefono);
                    setTelefonoReferente(res[0].telefono_referente);
                    setNomeReferente(res[0].nome_referente);
                    setContattato(res[0].contattato);
                    if (res[0].ultimo_contatto) {
                        setUltimoContatto(fixDate(res[0].ultimo_contatto));
                    }
                    setCompra(res[0].compra);
                    setCliente(res[0].cliente)
                    setSfuso(res[0].sfuso);
                    setBuste(res[0].buste);
                    setNote(res[0].note);
                } else {
                    navigate('/notfound')
                }
            })
            .catch(err => {
                console.log(err.message);
                navigate('/error');
            })
        }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <h2>{props.title}</h2>
            {
                !props.errors ? (
                    null
                ) : (
                    <div className="validationErrors">
                        <h3>Errore di Validazione</h3>
                        <p>{props.errors}</p>
                    </div>
                )
            }
            <form className="form" spellCheck="false" onSubmit={submit}>
                <div className="form-div">
                    <div className="form-div-1">
                        <label>&nbsp;Nome 
                            <input type="text" id="name" value={nome || ""} onChange={(e) => setNome(e.target.value)} />
                        </label>
                        <label>&nbsp;Indirizzo 
                            <input type="text" id="address" value={indirizzo || ""} onChange={(e) => setIndirizzo(e.target.value)} />
                        </label>
                        <label>&nbsp;Cap 
                            <input type="text" id="zip" value={cap || ""} onChange={(e) => setCap(e.target.value)} />
                        </label>
                        <label>&nbsp;Città 
                            <input type="text" id="city" value={città || ""} onChange={(e) => setCittà(e.target.value)} />
                        </label>
                        <SelectComponent
                            options={italia.italia}
                            onChange={(item) => setRegione(item)}
                            value={regione || ""}
                            label="Regione"
                        />
                        <SelectComponent
                            options={regione ? italia.italia[regione] : undefined}
                            onChange={(item) => setProvincia(item)}
                            value={provincia || ""}
                            label="Provincia"
                        />
                        <label>&nbsp;Note 
                            <textarea className="textarea" value={note || ""} onChange={(e) => setNote(e.target.value)}>
                            </textarea>
                        </label>
                    </div>
                    <div className="form-div-2">
                        <label>&nbsp;Email 
                            <input type="email" id="email" value={email || ""} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label>&nbsp;Telefono 
                            <input type="tel" id="telephone" value={telefono || ""} onChange={(e) => setTelefono(e.target.value)} />
                        </label>
                        <label>&nbsp;Telefono Referente
                            <input type="tel" value={telefonoReferente || ""} id="telephoneRef" onChange={(e) => setTelefonoReferente(e.target.value)} />
                        </label>
                        <label>&nbsp;Nome Referente
                            <input type="text" value={nomeReferente || ""} id="nomeReferente" onChange={(e) => setNomeReferente(e.target.value)} />
                        </label>
                        <div className="form-business-div">
                            <label>
                                Cliente 
                                <div>
                                    <input className="radio-si" type="radio" value="1" checked={cliente === 1 ? true : false} name="cliente" onChange={(e) => setCliente(1)} />
                                    <span className="radio-span si">Si</span>
                                    <input className="radio-no" type="radio" value="0" checked={cliente === 0 ? true : false} name="cliente" onChange={(e) => setCliente(0)} />
                                    <span className="radio-span no">No</span>
                                </div>
                            </label>
                            <label>
                                Compra 
                                <div>
                                    <input className="radio-si" type="radio" value="1" checked={compra === 1 ? true : false} name="compra" onChange={(e) => setCompra(1)} />
                                    <span className="radio-span si">Si</span>
                                    <input className="radio-no" type="radio" value="0" checked={compra === 0 ? true : false} name="compra" onChange={(e) => setCompra(0)} />
                                    <span className="radio-span no">No</span>
                                </div>
                            </label>
                            <label>
                                Buste
                                <div>
                                    <input className="radio-si" type="radio" value="1" checked={buste === 1 ? true : false} name="compraImbustato" onChange={(e) => setBuste(1)} />
                                    <span className="radio-span si">Si</span>
                                    <input className="radio-no" type="radio" value="0" checked={buste === 0 ? true : false} name="compraImbustato" onChange={(e) => setBuste(0)} />
                                    <span className="radio-span no">No</span>
                                </div>
                            </label>
                            <label>
                                Sfuso
                                <div>
                                    <input className="radio-si" type="radio" value="1" checked={sfuso === 1 ? true : false} name="compraSfuso" onChange={(e) => setSfuso(1)} />
                                    <span className="radio-span si">Si</span>
                                    <input className="radio-no" type="radio" value="0" checked={sfuso === 0 ? true : false} name="compraSfuso" onChange={(e) => setSfuso(0)} />
                                    <span className="radio-span no">No</span>
                                </div>
                            </label>
                            <label>
                                Contattato
                                <div>
                                    <input className="radio-si" type="radio" value="1" checked={contattato === 1 ? true : false} name="contattato" onChange={(e) => setContattato(1)} />
                                    <span className="radio-span si">Si</span>
                                    <input className="radio-no" type="radio" value="0" checked={contattato === 0 ? true : false} name="contattato" onChange={(e) => setContattato(0)} />
                                    <span className="radio-span no">No</span>
                                </div>
                            </label>
                        </div>
                            {
                                contattato === 1 ? (
                                    <div className="datepicker-div">
                                        <label>Ultimo Contatto
                                            <input type="date" value={ultimoContatto || ""} onChange={(e) => setUltimoContatto(e.target.value)} />
                                        </label>
                                    </div>
                                ) : (
                                    null
                                )
                            }
                    </div>
                </div>
                {
                    props.submitted ? (
                        <h4 className="submit-confirmation">{props.submitted}</h4>
                    ) : (
                        null
                    )
                }
                <button className="form-btn button" type="submit">{props.button}</button>
            </form>
        </div>
    )
}

export default Form;