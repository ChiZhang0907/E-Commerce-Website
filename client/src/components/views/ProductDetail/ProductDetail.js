import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import {Row, Col, Typography} from 'antd'
import {useDispatch} from 'react-redux'
import ProductImage from './Sections/ProductImage'
import ProductInfo from './Sections/ProductInfo'
import {addToCart} from '../../../_actions/user_actions'

const {Title} = Typography

function ProductDetail (props) {

    const dispatch = useDispatch()

    const productId = props.match.params.productId
    const [product, setProduct] = useState([])

    useEffect(() => {
        Axios.get(`/api/products?id=${productId}&type=single`).then(
            response => {
                setProduct(response.data[0])
                console.log(response.data)
            }
        )
    }, [])

    const handleAddToCart = (productId) => {
        dispatch(addToCart(productId))
    }

    return (
        <div className="postPage" style={{width: '100%', padding: '3rem 4rem'}}>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Title level={2}>{product.title}</Title>
            </div>

            <br></br>

            <Row gutter={[16, 16]} >
                <Col lg={12} xs={24}>
                    <ProductImage detail={product}></ProductImage>
                </Col>
                <Col lg={12} xs={24}>
                    <ProductInfo detail={product} addToCart={handleAddToCart}></ProductInfo>
                </Col>
            </Row>
        </div>
    )
}

export default ProductDetail