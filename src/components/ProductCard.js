import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../App'


export default function ProductCard({product}) {


    const {cartObjects, setCartObjects, setOpen, sum, setSum}  = useContext(AppContext)
    
    const [quantity, setQuantity] = useState(1)    

    const addToCart = (product, quantity) => {

        product = Object.assign({}, {...product}, { quantity: quantity });

        setCartObjects([...cartObjects, product])

        // let finded = cartObjects.filter(c => c.id == product.id)

        // cartObjects.map(c => {

        //     if (c.id == product.id) {
        //         setQuantity(c.quantity + quantity)
        //     } else {
        //         setCartObjects([...cartObjects, product])
        //     }

        // }) 
        

        if (sum == undefined) {
            setSum(product.price)
        } else {
            setSum(sum + product.price)
        }
        

    }

    return (

        <Style className='product-card'>
            <img src={product.url}></img>
            <h2>{product.title}</h2>
            <p>{product.price}</p>
            <button onClick={() => {addToCart(product, quantity); setOpen(true)}}>Add to Cart</button>
            <input type = "number" min = {quantity} max = '100' onChange={(e) => setQuantity(Number(e.target.value))}></input>
            <Link to={`/product/${product.id}`}>About</Link>
            <Link to = '/checkout'>Checkout</Link>
        </Style>
    )
}

const Style = styled.div`
    
display: flex;
flex-direction: column;
box-shadow: 0 2px 3px rgba(0,0,0,.1),0 10px min(calc(1rem * (15 / (20 + .167 * 0))),15px) rgba(0,0,0,.06);
padding: 1rem;
align-items: center;
justify-content: center;

h2 {
    font-family: var(--font-heading);
}


& > * {
    width: fit-content;
}

& > *:not(:last-child) {
    margin-bottom: 1rem;
}


img {
    height: 15rem;
    object-fit: cover;
    width: 100%;
}

`