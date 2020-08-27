import React, {useEffect, useState} from 'react'
import {Icon, Col, Row, Card, Empty} from 'antd'
import Axios from 'axios'
import ImageSlider from '../../utils/ImageSlider'

const {Meta} = Card

function Recommendation() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        Axios.get('/api/users/recommendation').then(response => {
            if(response.data.success) {
                setProducts(response.data.products)
            } else {
                alert('Failed to fectch shop list')
            }
        })
    }, [])

    const productCard = products.map((product, index) => {
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <Card hoverable={true} cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images}/></a>}>
                    <Meta title={product.title} description={`$${product.price}`} style={{fontWeight: 'bold'}}>
                    </Meta>
                </Card>
            </Col>
        )
    })

    return (
        <div style={{width: '75%', margin:'3rem auto'}}>
            {products.length !== 0 && <div style={{textAlign: 'center'}}>
                <h2> Recommendation Destination <Icon type="rocket"/></h2>
            </div>}

            <br></br>
            {products.length === 0 ? 
                <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <center>
                        <h1>No Recommendation Destination</h1>
                    </center>
                    <Empty description={false}></Empty>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>
                        {productCard}
                    </Row>
                </div>
            }
        </div>
    )
}

export default Recommendation

