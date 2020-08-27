import React, {useEffect, useState} from 'react'
import {Icon, Col, Row, Card, Button, Empty} from 'antd'
import Axios from 'axios'
import ImageSlider from '../../utils/ImageSlider'

const {Meta} = Card

function ShopList() {

    const [products, setProducts] = useState([])
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(8)
    const [postSize, setPostSize] = useState(0)

    const getProducts = (variables) => {
        Axios.post('/api/users/shoplist', variables).then(response => {
            if(response.data.success) {
                if(variables.loadMore)
                    setProducts([...products, ...response.data.products])
                else
                    setProducts(response.data.products)

                setPostSize(response.data.postSize)
            } else {
                alert('Failed to fectch shop list')
            }
        })
    }

    useEffect(() => {
        const variables = {skip, limit}

        getProducts(variables)
    }, [])

    const loadMore = () => {
        let newSkip = skip + limit
        
        const variables = {
            skip: newSkip,
            limit: limit,
            loadMore: true
        }
        
        getProducts(variables)

        setSkip(newSkip)
    }

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
                <h2> Wish List <Icon type="rocket"/></h2>
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
                        <h1>No Items In the List</h1>
                    </center>
                    <Empty description={false}></Empty>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>
                        {productCard}
                    </Row>
                </div>
            }
            
            <br></br>
            <br></br>
            {postSize >= limit  &&
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button style={{fontFamily: '-moz-initial', fontWeight: 'bold'}} onClick={loadMore}>Load More</Button>
                </div>
            }
        </div>
    )
}

export default ShopList