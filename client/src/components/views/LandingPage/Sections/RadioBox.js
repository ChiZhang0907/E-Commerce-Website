import React, {useState} from 'react'
import {Collapse, Radio} from 'antd'
import { TabPaneProps } from 'antd/lib/tabs'

const {Panel} = Collapse 

function RadioBox(props) {
    
    const [range, setRange] = useState('0')

    const handlerChange = (event) => {
        setRange(event.target.value)

        props.handleFilters(event.target.value)
    }

    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Price" key="1" style={{fontFamily: 'Helvetica'}}>
                    <Radio.Group onChange={handlerChange} value={range}>
                        {props.list.map((value) => (
                            <Radio key={value._id} value={`${value._id}`} style={{fontFamily: 'Helvetica'}}>{value.price}</Radio>
                        ))}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox