import React, {useState} from 'react'
import {Collapse, Radio} from 'antd'
import { TabPaneProps } from 'antd/lib/tabs'

const {Panel} = Collapse

const price = [
    {"_id": 0, "price": "Any", "array": []},
    {"_id": 1, "price": "Under $100", "array": [0, 99]},
    {"_id": 2, "price": "$100 to $199", "array": [100, 199]},
    {"_id": 3, "price": "$200 to $249", "array": [200, 249]},
    {"_id": 4, "price": "$250 to $299", "array": [250, 299]},
    {"_id": 5, "price": "More than $300", "array": [300, 200000]},
]

function RadioBox(props) {
    
    const [range, setRange] = useState('0')

    const handlerChange = (event) => {
        setRange(event.target.value)

        props.handleFilters(event.target.value)
    }

    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Price" key="1" style={{fontFamily: '-moz-initial'}}>
                    <Radio.Group onChange={handlerChange} value={range}>
                        {price.map((value) => (
                            <Radio key={value._id} value={`${value._id}`}>{value.price}</Radio>
                        ))}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox