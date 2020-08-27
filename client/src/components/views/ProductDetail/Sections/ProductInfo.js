
import React, {useEffect, useState} from 'react'
import {Button, Descriptions} from 'antd';
import Addtolist from './Addtolist'
import Axios from 'axios';

function ProductInfo(props) {

    const [product, setProduct] = useState({})
    const [listNumber, setListNumber] = useState(0)

    useEffect(() => {

        Axios.get(`/api/users/listnumber?id=${props.pId}`).then(response => {
            if(response.data.success) {
                setListNumber(response.data.listnumber)
                console.log(response.data.listnumber)
            } else {
                alert('Failed to get list information')
            }
        })

        setProduct(props.detail)

    }, [props.detail])

    const handleAddToCart = () => {
        props.addToCart(props.detail._id)
    }

    const addList = () => {
        setListNumber(listNumber + 1)
    }

    const reduceList = () => {
        setListNumber(listNumber - 1)
    }

    console.log(props.detail._id)

    return (
        <div>
            <Descriptions title="Product Infomation">
                <Descriptions.Item label="Price"> {product.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{product.sold}</Descriptions.Item>
                <Descriptions.Item label="Added to List"> {listNumber}</Descriptions.Item>
                <Descriptions.Item label="Description"> {product.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Addtolist pId={props.pId} addList={addList} reduceList={reduceList}></Addtolist>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button size="large" shape="round" type="danger" onClick={handleAddToCart}>
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}

export default ProductInfo