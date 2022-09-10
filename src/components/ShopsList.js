import React from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShopsList = (props) => {

    /** 
     * Checks the length of a given string, in case it's too long cuts the end of it
     * @param  {string}  string
     * @return  {string}  string
     */
    const checkString = (string) => {
        if (string) {
            if (string.length > 25) {
                const newString = string.substring(0, 25)
                return newString + '...'
            } else {
                return string
            }
        } 
    }

    return (
        <div className="shops-list">
            {
                props.list ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Indirizzo</th>
                                <th>Città</th>
                                <th>Ultimo Contatto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.list.length > 0 ? (
                                    props.list.map((shop, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <Link to={`/shop/${shop.id}`} key={index} style={{textDecoration: 'none'}}>{checkString(shop.nome)}</Link>
                                                </td>
                                                <td>
                                                    <Link to={`/shop/${shop.id}`} key={index} style={{textDecoration: 'none'}}>{checkString(shop.indirizzo) || "--"}</Link>
                                                </td>
                                                <td>
                                                    <Link to={`/shop/${shop.id}`} key={index} style={{textDecoration: 'none'}}>{shop.città ? checkString(shop.città) : "--"}</Link>
                                                </td>
                                                <td>
                                                    <Link to={`/shop/${shop.id}`} key={index} style={{textDecoration: 'none'}}>
                                                    {
                                                        shop.contattato ? props.formatDate(shop.ultimo_contatto) : "--"
                                                    }</Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    null
                                )
                            }
                        </tbody>
                    </Table>
                ) : (
                    null
                )
            }
        </div>
    )
}

export default ShopsList;