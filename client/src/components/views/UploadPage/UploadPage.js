import React, { useState } from 'react'
import {Typography, Button, Form, message, Input, Icon} from 'antd'
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios'

const {Title} = Typography
const {TextArea} = Input

const Categories = [
    {key:1, value: "Cultural Trip"},
    {key:2, value: "Modern City"},
    {key:3, value: "Natural Scenery"},
    {key:4, value: "Culinary Journey"},
    {key:5, value: "Historical Landmark"}
]

function UploadPage(props) {

    const [destinationValue, setDestinationValue] = useState("")
    const [descriptionValue, setDescriptionValue] = useState("")
    const [priceValue, setPriceValue] = useState(0)
    const [categoryValue, setCategoryValue] = useState(1)
    const [Images, setImages] = useState([])
    
    const destinationChange = (event) => {
        setDestinationValue(event.currentTarget.value)
    }

    const descriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    } 

    const priceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    } 

    const categoryChange = (event) => {
        setCategoryValue(event.currentTarget.value)
    } 

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const onSubmit = (event) => {
        event.preventDefault()

        if(!descriptionValue || !destinationValue || !priceValue  || !Images)
            return alert('Please fill all the fields')

        const variables = {
            writer: props.user.userData._id,
            destination: destinationValue,
            description: descriptionValue,
            price: priceValue,
            images: Images,
            category: categoryValue
        }

        Axios.post('/api/products/uploadProduct', variables).then(response => {
            if(response.data.success) {
                alert('Product successfully released')
                props.history.push('/')
            } else {
                alert('Failed to upload product')
            }
        })
    }

    return (
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2}> Upload Travel Product </Title>
            </div>

            <FileUpload refreshFunction={updateImages}></FileUpload>

            <Form onSubmit={onSubmit}>
                <br></br>
                <br></br>
                <label style={{fontFamily: '-moz-initial', fontWeight: 'bold'}}>Destination</label>
                <Input onChange={destinationChange} value={destinationValue}/>

                <br></br>
                <br></br>
                <label style={{fontFamily: '-moz-initial', fontWeight: 'bold'}}>Description</label>
                <TextArea onChange={descriptionChange} value={descriptionValue}/>

                <br></br>
                <br></br>
                <label style={{fontFamily: '-moz-initial', fontWeight: 'bold'}}>Price</label>
                <Input onChange={priceChange} value={priceValue} type="number"/>
                
                <br></br>
                <br></br>
                <label style={{fontFamily: '-moz-initial', fontWeight: 'bold'}}>Category</label>
                <br></br>
                <select onChange={categoryChange} value={categoryValue}>  
                    {Categories.map(item => (
                        <option key={item.key} value={item.key}>
                            {item.value}
                        </option>)
                    )}
                </select>
                
                <br></br>
                <br></br>
                <Button style={{fontFamily: '-moz-initial', fontWeight: 'bold'}} onClick={onSubmit}>Submit</Button>
            </Form>
        </div>
    )
}

export default UploadPage