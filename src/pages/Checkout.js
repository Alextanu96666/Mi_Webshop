import React from 'react'
import styled from 'styled-components'
import { AppContext } from '../App'
import { useContext } from 'react'

export default function Checkout() {


  const {cartObjects, setCartObjects} = useContext(AppContext)

  return (
    <Style className='checkout contained'>
       <h1>Checkout</h1>
       {cartObjects.length == 0 ?

        <h2>Det finns inget</h2>

        :


        cartObjects.map(c => (

          <p>{c.id}</p>
        ))

       }

       <h2>Test</h2>
    </Style>
  )
}

const Style = styled.section`

`