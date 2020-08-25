import React, {useEffect, useState} from 'react'
import {Icon, Col, Row, Card, Button, Radio} from 'antd'
import Axios from 'axios'
import ImageSlider from '../../utils/ImageSlider'
import CheckBox from './Sections/CheckBox'
import RadioBox from './Sections/RadioBox'

const {Meta} = Card

function LandingPage() {

    const [products, setProducts] = useState([])
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(8)
    const [postSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        categories: [],
        price: []
    })


    const getProducts = (variables) => {
        Axios.post('/api/products/getProducts', variables).then(response => {
            if(response.data.success) {
                if(variables.loadMore)
                    setProducts([...products, ...response.data.products])
                else
                    setProducts(response.data.products)

                setPostSize(response.data.postSize)
            } else {
                alert('Failed to fectch product datas')
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
                <Card hoverable={true} cover={<ImageSlider images={product.images}/>}>
                    <Meta title={product.destination} description={`$${product.price}`}>
                    </Meta>
                </Card>
            </Col>
        )
    })

    const showFilters = (filters) => {
        const variables = {
            skip: 0,
            limit: limit,
            filters: filters
        }
        
        getProducts(variables)
        setSkip(0)
    }

    const handlerPirce

    const handleFilters = (filters, category) => {
        const newFilters = {...Filters}

        newFilters[category] = filters

        if(category === 'price') {
            let priceRange = handlePrice(filters)
        }
        
        showFilters(newFilters)
        setFilters(newFilters)
    }

    return (
        <div style={{width: '75%', margin:'3rem auto'}}>
            <div style={{textAlign: 'center'}}>
                <h2> Just Travel Without Hesitation <Icon type="rocket"/></h2>
            </div>

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <CheckBox handleFilters={filters => handleFilters(filters, "category")}></CheckBox>
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox handleFilters={filters => handleFilters(filters, "price")}></RadioBox>
                </Col>
            </Row>

            {products.length === 0 ? 
                <div style={{display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center'}}>
                    <h2>Not post yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>
                        {productCard}
                    </Row>
                </div>
            }
            
            <br></br>
            <br></br>
            {postSize >= limit && 
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button style={{fontFamily: '-moz-initial', fontWeight: 'bold'}} onClick={loadMore}>Load More</Button>
                </div>
            }
        </div>
    )
}

export default LandingPage