import React, {useEffect, useState} from 'react'
import {Button} from 'antd'
import Axios from 'axios'


function Addtolist (props) {

    const [shopInList, setShopInList] = useState(false)

    useEffect(() => {
        Axios.get(`/api/users/productinlist?id=${props.pId}`).then(response => {
            if(response.data.success) {
                setShopInList(response.data.productinlist)
            } else {
                alert('Failed to get list information')
            }
        })
    },[])

    const handleClick = () => {
        const variables = {
            id: props.pId
        }

        if(shopInList) {
            Axios.post('/api/users/removefromlist', variables).then(response => {
                if(response.data.success) {
                    setShopInList(!shopInList)
                    props.reduceList()
                } else {
                    alert('Failed to remove from list')
                }
            })
        } else {
            Axios.post('/api/users/addtolist', variables).then(response => {
                if(response.data.success) {
                    setShopInList(!shopInList)
                    props.addList()
                } else {
                    alert('Failed to add to list')
                }
            })
        }
    }
    
    return (
        <div>
            <Button size="large" shape="round" type="danger" onClick={handleClick}>
                {shopInList ? 'Remove from List' : 'Add to List'}
            </Button>
        </div>
    )
}

export default Addtolist