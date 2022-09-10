import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrdersList = (props) => {

    return (
        <div className="orders-list">
            {
                props.list ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Data Ordine</th>
                                <th>Numero Fattura</th>
                                <th>Data Fattura</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.list.length > 0 ? (
                                    props.list.map((order, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {props.formatDate(order.order_date)}
                                                </td>
                                                <td>
                                                    {order.invoice_code}
                                                </td>
                                                <td>
                                                    {props.formatDate(order.invoice_date)}
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

export default OrdersList;