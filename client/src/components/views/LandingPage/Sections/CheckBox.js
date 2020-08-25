import React, {useState} from 'react'
import {Checkbox, Collapse} from 'antd'

const {Panel} = Collapse

const categories = [
    {"_id":1, "category": "Cultural Trip"},
    {"_id":2, "category": "Modern City"},
    {"_id":3, "category": "Natural Scenery"},
    {"_id":4, "category": "Culinary Journey"},
    {"_id":5, "category": "Historical Landmark"}
]

function CheckBox (props) {

    const [checked, setChecked] = useState([])

    const handleToggle = (value) => {
        const index = checked.indexOf(value)
        const newChecked = [...checked]

        if(index === -1)
            newChecked.push(value)
        else
            newChecked.splice(index, 1)

        setChecked(newChecked)
        
        props.handleFilters(newChecked)
    }

    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Categories" key="1" style={{fontFamily: '-moz-initial'}}>
                    {categories.map((value, index) => (
                        <React.Fragment key={index}>
                            <Checkbox onChange={()=>handleToggle(value._id)} type="checkbox" checked={checked.indexOf(value._id) !== -1}>
                                <span>{value.category}</span>
                            </Checkbox>
                        </React.Fragment>
                    ))}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox