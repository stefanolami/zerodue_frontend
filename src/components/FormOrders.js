import React, { useState } from 'react';


const FormOrders = (props) => {

    const [orderDate, setOrderDate] = useState();
    const [invoiceCode, setInvoiceCode] = useState();
    const [invoiceDate, setInvoiceDate] = useState();

    const submit = (e) => {
        e.preventDefault();
        const order = {
            orderDate, invoiceCode, invoiceDate
        }
        props.submit(e, order);
    }

    return (
        <div>
            <h2>Aggiungi Ordine</h2>
            <form className="form-orders" spellCheck="false" onSubmit={submit}>
                <div className="form-orders-div">
                    <label>&nbsp;Data Ordine
                        <input type="date" onChange={(e) => setOrderDate(e.target.value)} />
                    </label>
                    <label>&nbsp;Data Fattura
                        <input type="date" onChange={(e) => setInvoiceDate(e.target.value)} />
                    </label>
                    <label>&nbsp;Numero Fattura
                        <input type="text" onChange={(e) => setInvoiceCode(e.target.value)} />
                    </label>
                    
                </div>
                <button className="form-orders-btn" type="submit">Aggiungi</button>
            </form>
        </div>
    )
}

export default FormOrders;