import React, {useState} from 'react'
import {Input} from 'antd'

const {Search} = Input

function SearchBox(porps) {
    
    const [keyWord, setKeyWord] = useState("")

    const handleSearch = (event) => {
        setKeyWord(event.currentTarget.value)

        porps.refreshFunction(event.currentTarget.value)
    }
    
    return (
        <div>
            <Search value={keyWord} onChange={handleSearch} placeholder="Search A Destination"></Search>
        </div>
    )
}

export default SearchBox