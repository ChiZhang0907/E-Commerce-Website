import React from 'react'

function CartCard (props) {
   
    const handleImage = (images) => {
        if(images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }

    const renderItems = () => (
        props.products && props.products.map(product => (
            <tr key={product._id}>
                <td>
                    <img style={{ width: '70px' }} alt="product" src={handleImage(product.images)}></img>
                </td> 
                <td style={{fontFamily: 'Helvetica'}}>{product.quantity} EA</td>
                <td style={{fontFamily: 'Helvetica'}}>$ {product.price} </td>
                <td style={{fontFamily: 'Helvetica'}}>
                    <button onClick>Remove</button> 
                </td>
            </tr>
        ))
    )

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th style={{fontFamily: 'Helvetica'}}>Product Image</th>
                        <th style={{fontFamily: 'Helvetica'}}>Product Quantity</th>
                        <th style={{fontFamily: 'Helvetica'}}>Product Price</th>
                        <th style={{fontFamily: 'Helvetica'}}>Remove from Cart</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default CartCard