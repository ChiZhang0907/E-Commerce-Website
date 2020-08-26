import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {getCartItems} from '../../../_actions/user_actions'
import CartCard from './Sections/CartCard'
import {Result, Empty} from 'antd'

function Cart (props) {

    const dispatch = useDispatch();

    const [price, setPrice] = useState(0)

    const calculatePrice = (cartDetail) => {
        let total = 0

        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        })

        setPrice(total)
    }

    useEffect (() => {
        let cartItems = []
        if(props.user.userData && props.user.userData.cart) {
            if(props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })
                dispatch(getCartItems(cartItems, props.user.userData.cart))
            }
        }
    }, [props.user.userData])

    useEffect(() => {
        if(props.user.cartDetail && props.user.cartDetail.length > 0) {
            calculatePrice(props.user.cartDetail)
        }
    }, [props.user.cartDetail])

    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <h1>My Cart</h1>
            
            <div>
                <CartCard products={props.user.cartDetail}></CartCard>

                <div style={{marginTop: '3rem'}}>
                    <h2>Total amount: $ {price}</h2>
                </div>

                <Result status="success" title="Successfully Purchased Items"></Result>

                <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <br></br>
                    <Empty description={false}></Empty>
                    <p>No Items In the Cart</p>
                </div>
            </div>
        </div>
    )
}

export default Cart