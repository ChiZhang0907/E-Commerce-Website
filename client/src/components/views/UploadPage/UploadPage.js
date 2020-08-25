import React, { useState } from 'react'
import {Typography, Button, Form, message, Input, Icon} from 'antd'
import FileUpload from '../../utils/FileUpload'

const {Title} = Typography
const {TextArea} = Input

const Continents = [
    {key:1, value: "Africa"},
    {key:2, value: "Europe"},
    {key:3, value: "Asia"},
    {key:4, value: "North America"},
    {key:5, value: "South America"},
    {key:6, value: "Australia"},
]

function UploadPage() {

    const [destinationValue, setDestinationValue] = useState("")
    const [descriptionValue, setDescriptionValue] = useState("")
    const [priceValue, setPriceValue] = useState(0)
    const [continentValue, setContinentValue] = useState(1)
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

    const continentChange = (event) => {
        setContinentValue(event.currentTarget.value)
    } 

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    return (
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2}> Upload Travel Product </Title>
            </div>

            <FileUpload refreshFunction={updateImages}></FileUpload>

            <Form onSubmit>
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
                <label style={{fontFamily: '-moz-initial', fontWeight: 'bold'}}>Continent</label>
                <br></br>
                <select onChange={continentChange} value={continentValue}>  
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>
                            {item.value}
                        </option>)
                    )}
                </select>
                
                <br></br>
                <br></br>
                <Button style={{fontFamily: '-moz-initial', fontWeight: 'bold'}} onClick>Submit</Button>
            </Form>
        </div>
    )
}

export default UploadPage