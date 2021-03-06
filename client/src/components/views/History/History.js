import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import moment from 'moment'

function History () {
    
    const [history, setHistory] = useState([])

    useEffect(() => {
        Axios.get('api/users/history').then(response => {
            if(response.data.success) {
                setHistory(response.data.history)
            } else {
                alert('Failed to get history')
            }
        })
    }, [])

    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>Purchase History</h1>
            </div>
            <br />

            <table>
                <thead>
                    <tr>
                        <th>Payment Id</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>

                    {history.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{`$ ${item.price}`}</td>
                                <td>{item.quantity}</td>
                                <td>{moment(item.dateOfPurchase).format("MM/DD/YYYY")}</td>
                            </tr>
                        ))}

                </tbody>
            </table>
        </div>
    )
}

export default History