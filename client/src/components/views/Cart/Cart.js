import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {getCartItems, removeCartItem, onSuccessBuy} from '../../../_actions/user_actions'
import CartCard from './Sections/CartCard'
import Paypal from '../../utils/Paypal'
import {Result, Empty} from 'antd'
import Axios from 'axios'

function Cart (props) {

    const dispatch = useDispatch();

    const [price, setPrice] = useState(0)
    const [showPrice, setShowPrice] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const calculatePrice = (cartDetail) => {
        let total = 0

        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        })

        setPrice(total)
        setShowPrice(true)
    }

    const removeFromCart = (productId) => {
        dispatch(removeCartItem(productId)).then(
            Axios.get('/api/users/cartInfo').then(response => {
                if(response.data.success) {
                    if(response.data.cartDetail.length <= 0)
                        setShowPrice(false)
                    else
                        calculatePrice(response.data.cartDetail)
                } else {
                    alert('Failed to get cart info')
                }
            })
        )
    }

    const transactionSuccess = (data) => {

        const variables = {
            cartDetail: props.user.cartDetail,
            paymentData: data
        }

        Axios.post('/api/users/successBuy', variables).then(response => {
            if(response.data.success) {
                setShowSuccess(true)
                setShowPrice(false)

                dispatch(onSuccessBuy({
                    cart: response.data.cart,
                    cartDetail: response.data.cartDetail
                }))
            } else {
                alert('Failed to pay')
            }
        })
    }

    const transactionError = () => {
        console.log('Paypal Error')
    }

    const transactionCancled = () => {
        console.log('Transaction Canceled')
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
            {showPrice && <h1>My Cart</h1>}
            
            <div>
                {showPrice && <CartCard products={props.user.cartDetail} removeItem={removeFromCart}></CartCard>}

                {showPrice ? 
                    <div style={{marginTop: '3rem'}}>
                        <h2>Total amount: $ {price}</h2>
                    </div>
                    : showSuccess ? 
                        <div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                        <Result status="success" title="Successfully Purchased Items" style={{fontFamily: 'Helvetica'}}></Result>
                        </div> :
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
                                <h1>No Items In the Cart</h1>
                            </center>
                            <Empty description={false}></Empty>
                        </div>
                }

            </div>

            {showPrice && <Paypal 
                productPrice={price} 
                onSuccess={transactionSuccess} 
                transactionError={transactionError} 
                transactionCancled={transactionCancled}/>
            }

        </div>
    )
}

export default Cart